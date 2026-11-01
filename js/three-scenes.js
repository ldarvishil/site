/**
 * آکادمی ذهن آزاد (azazmind) — اکوسیستم سه‌بعدی تعاملی Three.js
 *
 * شامل ۴ صحنه سه‌بعدی رویه‌ای (Procedural) و تعاملی:
 * ۱. صحنه Hero: مدل چندبخشی دو نیمکره مغز، گره‌های کورتکس و شبکه سیناپسی نوری همگام با سرعت مطالعه (WPM)
 * ۲. صحنه شبیه‌ساز چشم: کره چشم چندلایه، مخروط زاویه دید (Visual Span) و مقایسه سه‌بعدی عبارت‌خوانی با تک‌کلمه‌خوانی
 * ۳. صحنه مسیر یادگیری: سفر سه‌بعدی اسکرول‌محور در ۳ ایستگاه تثبیت مهارت با حرکت نرم دوربین روی منحنی فضایی
 * ۴. صحنه علمی ابینگهاوس: توپوگرافی سه‌بعدی منحنی فراموشی، ستون‌های مرور طلایی و شبکه کاخ حافظه
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

/* ==========================================================================
   0. SHARED ENGINE UTILITIES, SOFTWARE-WEBGL GUARD & PERSIAN FORMATTING
   ========================================================================== */

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

function toPersianDigits(value) {
  if (value === null || value === undefined) return '';
  return String(value).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
}

const isSoftwareGl = (() => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
})();

const isWebGLSupported = (() => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return false;
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
})();

// Pre-allocated math helpers at module scope (Zero GC in render loops)
const _vec3A = new THREE.Vector3();
const _vec3B = new THREE.Vector3();
const _vec3C = new THREE.Vector3();
const _mat4 = new THREE.Matrix4();
const _quat = new THREE.Quaternion();
const _euler = new THREE.Euler();
const _color = new THREE.Color();
const _dummy = new THREE.Object3D();

/**
 * Software-WebGL safe frame scheduler using WebGL2 fenceSync
 */
function scheduleAfterDraw(renderer, callback) {
  const gl = renderer.getContext();
  if (gl && typeof gl.fenceSync === 'function') {
    const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    gl.flush();
    const poll = () => {
      if (!sync) {
        window.setTimeout(callback, 80);
        return;
      }
      const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
      if (state === gl.UNSIGNALED) {
        window.setTimeout(poll, 5);
      } else {
        gl.deleteSync(sync);
        window.setTimeout(callback, 80);
      }
    };
    return window.setTimeout(poll, 5);
  }
  return window.setTimeout(callback, 80);
}

/**
 * Creates a standardized PBR WebGLRenderer with RoomEnvironment & context safety
 */
function createStudioRenderer(container, scene) {
  const renderer = new THREE.WebGLRenderer({
    antialias: !isSoftwareGl,
    alpha: false,
    powerPreference: 'high-performance',
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = !isSoftwareGl;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const width = Math.max(280, container.clientWidth || 640);
  const height = Math.max(240, container.clientHeight || 400);
  renderer.setSize(width, height, false);
  renderer.domElement.className = 'three-webgl-canvas';
  renderer.domElement.setAttribute('aria-hidden', 'true');

  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Studio Environment Map (RoomEnvironment)
  try {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envScene = new RoomEnvironment();
    scene.environment = pmremGenerator.fromScene(envScene, 0.04).texture;
    envScene.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose());
        else child.material.dispose();
      }
    });
    pmremGenerator.dispose();
  } catch {
    // Continue gracefully if PMREM fails
  }

  // Context loss & restore resilience
  renderer.domElement.addEventListener(
    'webglcontextlost',
    (e) => {
      e.preventDefault();
    },
    false
  );

  return renderer;
}

/**
 * Creates a procedural radial contact shadow texture (100% zero-404)
 */
function createRadialShadowTexture(renderer, colorHex = '#020617') {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(128, 128, 16, 128, 128, 120);
    grad.addColorStop(0, colorHex);
    grad.addColorStop(0.55, 'rgba(2, 6, 23, 0.45)');
    grad.addColorStop(1, 'rgba(2, 6, 23, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
}

/**
 * Creates a procedural Persian label badge texture on HTML5 Canvas
 */
function createPersianBadgeTexture(renderer, text, subtext, accentHex = '#d97706') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.clearRect(0, 0, 512, 160);
    // Rounded dark card background
    ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
    ctx.strokeStyle = accentHex;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(12, 12, 488, 136, 24);
    ctx.fill();
    ctx.stroke();

    ctx.direction = 'rtl';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f8fafc';
    ctx.font = '700 34px Vazirmatn, Tahoma, sans-serif';
    ctx.fillText(text, 256, 74);

    if (subtext) {
      ctx.fillStyle = '#fde68a';
      ctx.font = '500 24px Vazirmatn, Tahoma, sans-serif';
      ctx.fillText(subtext, 256, 118);
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
}

/**
 * Adds a balanced 3-point studio lighting rig + hemisphere fill
 */
function setupStudioLights(scene, bgHex = 0x0b1120) {
  scene.background = new THREE.Color(bgHex);
  scene.fog = new THREE.FogExp2(bgHex, 0.042);

  const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x0f172a, 0.85);
  hemiLight.position.set(0, 12, 0);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfffbeb, 2.1);
  keyLight.position.set(6, 9, 7);
  if (!isSoftwareGl) {
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.set(1024, 1024);
    const d = 6;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
  }
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.95);
  fillLight.position.set(-7, 4, 5);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xf59e0b, 1.35);
  rimLight.position.set(0, 5, -7);
  scene.add(rimLight);

  return { hemiLight, keyLight, fillLight, rimLight };
}

/**
 * Setups collapsible bottom dock toggle button for any 3D stage
 */
function setupDockCollapseToggle(stageWrapper) {
  if (!stageWrapper) return;
  const toggleBtn = stageWrapper.querySelector('[data-dock-toggle]');
  const dock = stageWrapper.querySelector('.three-bottom-dock');
  if (!toggleBtn || !dock) return;

  toggleBtn.addEventListener('click', () => {
    const isCollapsed = dock.classList.toggle('is-collapsed');
    toggleBtn.setAttribute('aria-expanded', isCollapsed ? 'false' : 'true');
    const labelSpan = toggleBtn.querySelector('[data-dock-toggle-label]');
    const iconSpan = toggleBtn.querySelector('[data-dock-toggle-icon]');
    if (labelSpan) {
      labelSpan.textContent = isCollapsed ? 'نمایش پنل کنترل سه‌بعدی' : 'پنهان کردن کنترل‌ها';
    }
    if (iconSpan) {
      iconSpan.textContent = isCollapsed ? '▴' : '▾';
    }
  });
}

// Shared reactive bus so DOM widgets and 3D scenes stay in sync
const sceneBus = new EventTarget();

/* ==========================================================================
   1. SCENE 1: HERO 3D NEURAL BRAIN & SYNAPTIC SPEED NETWORK
   ========================================================================== */

const PILLAR_NODES_DATA = [
  {
    id: 0,
    title: 'تندخوانی علمی و دید محیطی',
    sub: 'قشر بینایی و دریافت عبارتی (Chunking)',
    desc: 'حذف تلفظ ذهنی و انتقال مستقیم تصویر عبارات از قشر بینایی به مراکز درک معنا با سرعت ۵۲۰+ کلمه در دقیقه.',
    pos: new THREE.Vector3(1.15, 0.45, 0.85),
    camPos: new THREE.Vector3(2.9, 1.4, 3.6),
    color: 0xf59e0b,
  },
  {
    id: 1,
    title: 'مدیریت تمرکز و قفل توجه',
    sub: 'قشر پیش‌پیشانی و ریتم پومودورو',
    desc: 'مهار سرگردانی ذهن و هماهنگ‌سازی سرعت حرکت چشم با ظرفیت پردازش قشر پیش‌پیشانی برای تمرکز عمیق.',
    pos: new THREE.Vector3(-1.15, 0.55, 0.9),
    camPos: new THREE.Vector3(-2.9, 1.5, 3.6),
    color: 0x0ea5e9,
  },
  {
    id: 2,
    title: 'مهندسی حافظه و کاخ ذهنی',
    sub: 'هیپوکامپ و هماهنگی دو نیمکره',
    desc: 'فعال‌سازی همزمان نیمکره چپ (منطق و واژه) و نیمکره راست (تصویر و فضا) برای کدگذاری پایدار در کاخ حافظه.',
    pos: new THREE.Vector3(-1.05, 0.25, -0.95),
    camPos: new THREE.Vector3(-2.8, 1.3, -3.5),
    color: 0x10b981,
  },
  {
    id: 3,
    title: 'سنجش مستمر و مرور ابینگهاوس',
    sub: 'تثبیت سیناپسی بلندمدت (۸۵٪+)',
    desc: 'پایش مستمر شاخص WPM و تقویت پیوندهای سیناپسی در ۴ بازه طلایی مرور برای جلوگیری از فراموشی.',
    pos: new THREE.Vector3(1.05, 0.3, -0.95),
    camPos: new THREE.Vector3(2.8, 1.3, -3.5),
    color: 0xa855f7,
  },
];

const BRAIN_MODES = {
  speed: {
    label: 'حالت فعال: تندخوانی علمی و عبارت‌خوانی',
    sub: 'جریان پرسرعت سیناپسی بین قشر بینایی و مراکز پردازش معنا',
    primaryColor: 0xf59e0b,
    emissiveColor: 0xd97706,
    pulseSpeedMultiplier: 1.85,
    defaultWpm: 520,
    targetCam: new THREE.Vector3(0, 1.35, 4.55),
  },
  focus: {
    label: 'حالت فعال: تمرکز عمیق و آرامش شناختی',
    sub: 'نظم‌دهی امواج قشر پیش‌پیشانی و حذف نویز پرش افکار',
    primaryColor: 0x0ea5e9,
    emissiveColor: 0x0284c7,
    pulseSpeedMultiplier: 1.0,
    defaultWpm: 360,
    targetCam: new THREE.Vector3(-1.6, 1.65, 4.2),
  },
  memory: {
    label: 'حالت فعال: مهندسی حافظه و نقشه ذهنی',
    sub: 'تثبیت شبکه‌ای اطلاعات بین دو نیمکره مغز و کاخ حافظه',
    primaryColor: 0x10b981,
    emissiveColor: 0x059669,
    pulseSpeedMultiplier: 1.35,
    defaultWpm: 450,
    targetCam: new THREE.Vector3(1.6, 1.6, 4.25),
  },
};

function initHeroBrainScene() {
  const stageWrapper = document.getElementById('hero-3d-stage');
  const mountEl = document.getElementById('hero-3d-canvas-mount');
  if (!stageWrapper || !mountEl) return;

  setupDockCollapseToggle(stageWrapper);

  if (!isWebGLSupported) {
    stageWrapper.classList.add('webgl-fallback-active');
    return;
  }

  const scene = new THREE.Scene();
  const renderer = createStudioRenderer(mountEl, scene);
  const { keyLight, rimLight } = setupStudioLights(scene, 0x0b1324);

  const camera = new THREE.PerspectiveCamera(
    42,
    mountEl.clientWidth / Math.max(1, mountEl.clientHeight),
    0.1,
    60
  );
  camera.position.set(0, 1.35, 4.55);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = !isSoftwareGl;
  controls.dampingFactor = 0.06;
  controls.enablePan = false;
  controls.minDistance = 2.8;
  controls.maxDistance = 7.2;
  controls.maxPolarAngle = Math.PI * 0.62;
  controls.minPolarAngle = Math.PI * 0.18;
  controls.target.set(0, 0.15, 0);

  // Root Brain Assembly Group (Composite 9-part Procedural Model)
  const brainRoot = new THREE.Group();
  brainRoot.position.set(0, 0.15, 0);
  scene.add(brainRoot);

  // Ground Contact Shadow & Subtle Precision Ring
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 5.2),
    new THREE.MeshBasicMaterial({
      map: createRadialShadowTexture(renderer),
      transparent: true,
      depthWrite: false,
      opacity: 0.65,
    })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -1.35;
  scene.add(shadowPlane);

  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x334155,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.45,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
  const baseRing = new THREE.Mesh(new THREE.RingGeometry(1.65, 1.7, 64), ringMat);
  baseRing.rotation.x = -Math.PI / 2;
  baseRing.position.y = -1.33;
  scene.add(baseRing);

  const outerRing = new THREE.Mesh(new THREE.RingGeometry(2.15, 2.18, 64), ringMat);
  outerRing.rotation.x = -Math.PI / 2;
  outerRing.position.y = -1.33;
  scene.add(outerRing);

  // Helper to sculpt organic cerebral hemisphere geometry
  function createHemisphereGeometry(isRight) {
    const geo = new THREE.IcosahedronGeometry(1.12, 4);
    const pos = geo.attributes.position;
    const sign = isRight ? 1 : -1;

    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);

      // Elongate front-to-back (Z), shape temporal & frontal lobes
      z *= 1.28;
      y *= 0.88;
      x *= 0.62;

      // Flatten medial longitudinal fissure (inner wall between hemispheres)
      if (isRight && x < 0.08) {
        x = 0.08 + x * 0.12;
      } else if (!isRight && x > -0.08) {
        x = -0.08 + x * 0.12;
      }

      // Flatten inferior base slightly
      if (y < -0.35) {
        y = -0.35 + (y + 0.35) * 0.45;
      }

      // Procedural cortical sulci/gyri folds
      const fold =
        Math.sin(x * 7.5 + z * 5.2) *
        Math.cos(y * 6.8 - z * 4.4) *
        0.055;
      const len = Math.sqrt(x * x + y * y + z * z) || 1;
      x += (x / len) * fold + sign * 0.06;
      y += (y / len) * fold;
      z += (z / len) * fold;

      pos.setXYZ(i, x, y, z);
    }
    geo.computeVertexNormals();
    return geo;
  }

  // Part 1 & 2: Left & Right Translucent Cortical Shells
  const cortexShellMat = new THREE.MeshPhysicalMaterial({
    color: 0x1e293b,
    emissive: 0x0f172a,
    emissiveIntensity: 0.35,
    roughness: 0.22,
    metalness: 0.15,
    transmission: isSoftwareGl ? 0 : 0.72,
    transparent: true,
    opacity: isSoftwareGl ? 0.42 : 0.88,
    ior: 1.45,
    thickness: 1.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.15,
    depthWrite: false,
  });

  const rightHemiMesh = new THREE.Mesh(createHemisphereGeometry(true), cortexShellMat);
  const leftHemiMesh = new THREE.Mesh(createHemisphereGeometry(false), cortexShellMat);
  rightHemiMesh.renderOrder = 2;
  leftHemiMesh.renderOrder = 2;
  brainRoot.add(rightHemiMesh, leftHemiMesh);

  // Part 3 & 4: Wireframe Neural Mesh Overlay on Both Hemispheres
  const wireMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.45,
    roughness: 0.5,
    metalness: 0.8,
    wireframe: true,
    transparent: true,
    opacity: 0.18,
  });
  const rightWire = new THREE.Mesh(rightHemiMesh.geometry, wireMat);
  const leftWire = new THREE.Mesh(leftHemiMesh.geometry, wireMat);
  rightWire.scale.setScalar(1.008);
  leftWire.scale.setScalar(1.008);
  brainRoot.add(rightWire, leftWire);

  // Part 5: Glowing Thalamus & Corpus Callosum Core Bridge
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    emissive: 0xd97706,
    emissiveIntensity: 0.9,
    roughness: 0.3,
    metalness: 0.7,
  });
  const corpusBridge = new THREE.Mesh(
    new THREE.TorusGeometry(0.42, 0.11, 16, 40, Math.PI * 1.15),
    coreMat
  );
  corpusBridge.rotation.y = Math.PI / 2;
  corpusBridge.position.set(0, 0.12, 0.05);
  brainRoot.add(corpusBridge);

  // Part 6: Brainstem / Neural Conduit Column
  const stemCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0.05, -0.05),
    new THREE.Vector3(0, -0.55, -0.18),
    new THREE.Vector3(0, -1.18, -0.26),
  ]);
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    emissive: 0x1e293b,
    roughness: 0.55,
    metalness: 0.4,
  });
  const brainStem = new THREE.Mesh(new THREE.TubeGeometry(stemCurve, 20, 0.16, 12, false), stemMat);
  brainRoot.add(brainStem);

  // Part 7: Instanced Synaptic Micro-Nodes (96 Neurons inside the hemispheres)
  const SYNAPSE_COUNT = 96;
  const synapseGeo = new THREE.SphereGeometry(0.032, 10, 10);
  const synapseMat = new THREE.MeshStandardMaterial({
    color: 0xfef3c7,
    emissive: 0xf59e0b,
    emissiveIntensity: 0.85,
    roughness: 0.25,
    metalness: 0.5,
  });
  const synapseInstanced = new THREE.InstancedMesh(synapseGeo, synapseMat, SYNAPSE_COUNT);
  const synapsePositions = [];

  for (let i = 0; i < SYNAPSE_COUNT; i++) {
    const side = i % 2 === 0 ? 1 : -1;
    const theta = (i / SYNAPSE_COUNT) * Math.PI * 2 * 3.7;
    const phi = Math.acos(1 - (2 * ((i * 7) % SYNAPSE_COUNT)) / SYNAPSE_COUNT);
    const r = 0.42 + (i % 5) * 0.11;

    const x = side * (0.16 + Math.abs(Math.sin(phi) * Math.cos(theta)) * r * 0.85);
    const y = Math.cos(phi) * r * 0.72 + 0.08;
    const z = Math.sin(phi) * Math.sin(theta) * r * 1.18;

    const posVec = new THREE.Vector3(x, y, z);
    synapsePositions.push(posVec);

    _dummy.position.copy(posVec);
    const s = 0.85 + (i % 4) * 0.12;
    _dummy.scale.setScalar(s);
    _dummy.updateMatrix();
    synapseInstanced.setMatrixAt(i, _dummy.matrix);

    _color.setHex(i % 3 === 0 ? 0xfbbf24 : i % 3 === 1 ? 0x38bdf8 : 0x34d399);
    synapseInstanced.setColorAt(i, _color);
  }
  synapseInstanced.instanceMatrix.needsUpdate = true;
  if (synapseInstanced.instanceColor) synapseInstanced.instanceColor.needsUpdate = true;
  synapseInstanced.computeBoundingSphere();
  brainRoot.add(synapseInstanced);

  // Part 8: Neural Axon Pathways (Curves + Traveling Light Pulses)
  const axonCurves = [];
  const PULSE_COUNT = 28;
  const pulseGeo = new THREE.SphereGeometry(0.046, 12, 12);
  const pulseMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
  const pulseInstanced = new THREE.InstancedMesh(pulseGeo, pulseMat, PULSE_COUNT);
  pulseInstanced.frustumCulled = false;

  const axonLinePoints = [];
  for (let i = 0; i < PULSE_COUNT; i++) {
    const startNode = synapsePositions[(i * 3) % SYNAPSE_COUNT];
    const endNode = PILLAR_NODES_DATA[i % PILLAR_NODES_DATA.length].pos;
    const midPoint = new THREE.Vector3()
      .addVectors(startNode, endNode)
      .multiplyScalar(0.5)
      .add(new THREE.Vector3(0, 0.22 * ((i % 2) * 2 - 1), 0));

    const curve = new THREE.CatmullRomCurve3([startNode, midPoint, endNode]);
    axonCurves.push({
      curve,
      offset: (i / PULSE_COUNT) % 1,
      speedFactor: 0.65 + (i % 5) * 0.14,
    });

    const pts = curve.getPoints(16);
    for (let j = 0; j < pts.length - 1; j++) {
      axonLinePoints.push(pts[j], pts[j + 1]);
    }
  }

  const axonLinesGeo = new THREE.BufferGeometry().setFromPoints(axonLinePoints);
  const axonLinesMat = new THREE.LineBasicMaterial({
    color: 0xf59e0b,
    transparent: true,
    opacity: 0.34,
  });
  const axonLines = new THREE.LineSegments(axonLinesGeo, axonLinesMat);
  brainRoot.add(axonLines);
  brainRoot.add(pulseInstanced);

  // Part 9: 4 Interactive Cortical Pillar Nodes (Clickable via Raycaster)
  const clickableTargets = [];
  const pillarMeshGroups = [];

  PILLAR_NODES_DATA.forEach((pillar) => {
    const nodeGroup = new THREE.Group();
    nodeGroup.position.copy(pillar.pos);

    const coreSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 20, 20),
      new THREE.MeshStandardMaterial({
        color: pillar.color,
        emissive: pillar.color,
        emissiveIntensity: 0.95,
        roughness: 0.2,
        metalness: 0.4,
      })
    );
    coreSphere.userData = { pillarId: pillar.id };
    clickableTargets.push(coreSphere);

    const haloRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.21, 0.018, 12, 32),
      new THREE.MeshBasicMaterial({
        color: pillar.color,
        transparent: true,
        opacity: 0.75,
      })
    );
    haloRing.lookAt(pillar.pos.clone().multiplyScalar(2));

    nodeGroup.add(coreSphere, haloRing);
    brainRoot.add(nodeGroup);
    pillarMeshGroups.push({ group: nodeGroup, coreSphere, haloRing, data: pillar });
  });

  // State Management for Scene 1
  let activeModeKey = 'speed';
  let currentWpm = 520;
  let selectedPillarId = 0;
  let autoRotate = true;
  let isTransitioningCamera = false;
  const desiredCameraPos = new THREE.Vector3().copy(camera.position);

  // UI Elements in Hero 3D Stage
  const modeButtons = Array.from(stageWrapper.querySelectorAll('[data-brain-mode]'));
  const wpmSlider = document.getElementById('hero-3d-wpm-slider');
  const wpmValueEl = document.getElementById('hero-3d-wpm-value');
  const statusTitleEl = document.getElementById('hero-3d-status-title');
  const statusDescEl = document.getElementById('hero-3d-status-desc');
  const autoRotateBtn = document.getElementById('hero-3d-autorotate-btn');
  const resetCamBtn = document.getElementById('hero-3d-reset-btn');
  const pillarButtons = Array.from(stageWrapper.querySelectorAll('[data-brain-pillar]'));
  const heroCardPillarChips = Array.from(document.querySelectorAll('.hero-pillar-chip'));

  function applyBrainMode(modeKey, updateSlider = true) {
    const cfg = BRAIN_MODES[modeKey];
    if (!cfg) return;
    activeModeKey = modeKey;

    modeButtons.forEach((btn) => {
      const isMatch = btn.getAttribute('data-brain-mode') === modeKey;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
    });

    if (updateSlider && wpmSlider) {
      currentWpm = cfg.defaultWpm;
      wpmSlider.value = String(currentWpm);
      if (wpmValueEl) {
        wpmValueEl.textContent = `${toPersianDigits(currentWpm)} کلمه/دقیقه`;
      }
    }

    // Update materials & lighting mood
    coreMat.color.setHex(cfg.primaryColor);
    coreMat.emissive.setHex(cfg.emissiveColor);
    axonLinesMat.color.setHex(cfg.primaryColor);
    wireMat.color.setHex(cfg.primaryColor);
    wireMat.emissive.setHex(cfg.emissiveColor);
    rimLight.color.setHex(cfg.primaryColor);

    if (statusTitleEl) statusTitleEl.textContent = cfg.label;
    if (statusDescEl) statusDescEl.textContent = cfg.sub;

    desiredCameraPos.copy(cfg.targetCam);
    isTransitioningCamera = true;
  }

  function focusOnPillar(pillarId) {
    const pillar = PILLAR_NODES_DATA.find((p) => p.id === pillarId);
    if (!pillar) return;
    selectedPillarId = pillarId;

    pillarButtons.forEach((btn) => {
      const isCurrent = Number(btn.getAttribute('data-brain-pillar')) === pillarId;
      btn.classList.toggle('is-active', isCurrent);
      btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
    });

    heroCardPillarChips.forEach((chip, idx) => {
      chip.classList.toggle('is-3d-highlighted', idx === pillarId);
    });

    if (statusTitleEl) {
      statusTitleEl.textContent = `${pillar.title} (${pillar.sub})`;
    }
    if (statusDescEl) {
      statusDescEl.textContent = pillar.desc;
    }

    desiredCameraPos.copy(pillar.camPos);
    isTransitioningCamera = true;
  }

  // Bind UI Events
  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-brain-mode');
      if (mode) applyBrainMode(mode, true);
    });
  });

  pillarButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.getAttribute('data-brain-pillar'));
      if (!Number.isNaN(id)) focusOnPillar(id);
    });
  });

  heroCardPillarChips.forEach((chip, index) => {
    chip.style.cursor = 'pointer';
    chip.setAttribute('tabindex', '0');
    chip.addEventListener('click', () => focusOnPillar(index));
    chip.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        focusOnPillar(index);
      }
    });
  });

  if (wpmSlider) {
    wpmSlider.addEventListener('input', () => {
      currentWpm = Number(wpmSlider.value) || 520;
      if (wpmValueEl) {
        wpmValueEl.textContent = `${toPersianDigits(currentWpm)} کلمه/دقیقه`;
      }
    });
  }

  if (autoRotateBtn) {
    autoRotateBtn.addEventListener('click', () => {
      autoRotate = !autoRotate;
      autoRotateBtn.setAttribute('aria-pressed', autoRotate ? 'true' : 'false');
      autoRotateBtn.classList.toggle('is-active', autoRotate);
    });
  }

  if (resetCamBtn) {
    resetCamBtn.addEventListener('click', () => {
      desiredCameraPos.set(0, 1.35, 4.55);
      controls.target.set(0, 0.15, 0);
      isTransitioningCamera = true;
    });
  }

  controls.addEventListener('start', () => {
    isTransitioningCamera = false;
  });

  // Listen to external WPM speed test completion
  sceneBus.addEventListener('wpm-updated', (e) => {
    const newWpm = Math.max(150, Math.min(750, Number(e.detail?.wpm) || 520));
    currentWpm = newWpm;
    if (wpmSlider) wpmSlider.value = String(newWpm);
    if (wpmValueEl) wpmValueEl.textContent = `${toPersianDigits(newWpm)} کلمه/دقیقه`;
  });

  // Raycasting for clicking/hovering 3D Cortical Nodes
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let lastHoverTime = 0;

  renderer.domElement.addEventListener('pointermove', (e) => {
    const now = performance.now();
    if (now - lastHoverTime < 45) return;
    lastHoverTime = now;

    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(clickableTargets, false);
    renderer.domElement.style.cursor = hits.length > 0 ? 'pointer' : 'grab';
  });

  renderer.domElement.addEventListener('click', (e) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(clickableTargets, false);
    if (hits.length > 0) {
      const pId = hits[0].object.userData?.pillarId;
      if (typeof pId === 'number') {
        focusOnPillar(pId);
      }
    }
  });

  // Pre-warm shaders
  if (!isSoftwareGl) {
    renderer.compile(scene, camera);
  }

  // Visibility-gated Animation Loop
  let isVisible = true;
  let frameId = 0;
  let timerId = 0;
  const clock = new THREE.Clock();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function renderFrame() {
    if (!isVisible) return;
    const dt = Math.min(clock.getDelta(), 0.1);
    const elapsed = clock.getElapsedTime();

    // Smooth camera preset transition with exponential damping
    if (isTransitioningCamera) {
      camera.position.x = THREE.MathUtils.damp(camera.position.x, desiredCameraPos.x, 4.5, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, desiredCameraPos.y, 4.5, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, desiredCameraPos.z, 4.5, dt);
      if (camera.position.distanceToSquared(desiredCameraPos) < 0.005) {
        isTransitioningCamera = false;
      }
    }

    if (autoRotate && !isTransitioningCamera && !reduceMotion.matches && !isSoftwareGl) {
      brainRoot.rotation.y += dt * 0.22 * (currentWpm / 450);
    }

    // Gentle floating breathing motion for hemispheres
    if (!reduceMotion.matches) {
      brainRoot.position.y = 0.15 + Math.sin(elapsed * 1.6) * 0.035;
    }

    // Animate synaptic pulses along axons proportional to WPM & mode
    const modeCfg = BRAIN_MODES[activeModeKey] || BRAIN_MODES.speed;
    const wpmNormalized = currentWpm / 350;
    const pulseAdvance = dt * 0.45 * wpmNormalized * modeCfg.pulseSpeedMultiplier;

    for (let i = 0; i < PULSE_COUNT; i++) {
      const item = axonCurves[i];
      if (!reduceMotion.matches) {
        item.offset = (item.offset + pulseAdvance * item.speedFactor) % 1;
      }
      item.curve.getPointAt(item.offset, _vec3A);
      _dummy.position.copy(_vec3A);
      const pulseScale = 0.75 + Math.sin(item.offset * Math.PI) * 0.65;
      _dummy.scale.setScalar(pulseScale);
      _dummy.updateMatrix();
      pulseInstanced.setMatrixAt(i, _dummy.matrix);
    }
    pulseInstanced.instanceMatrix.needsUpdate = true;

    // Highlight selected cortical pillar node
    for (let i = 0; i < pillarMeshGroups.length; i++) {
      const pItem = pillarMeshGroups[i];
      const isSelected = pItem.data.id === selectedPillarId;
      const targetScale = isSelected ? 1.32 + Math.sin(elapsed * 4) * 0.08 : 1.0;
      pItem.group.scale.setScalar(
        THREE.MathUtils.damp(pItem.group.scale.x, targetScale, 8, dt)
      );
      pItem.haloRing.rotation.z += dt * (isSelected ? 1.8 : 0.5);
    }

    controls.update();
    renderer.render(scene, camera);

    if (isSoftwareGl) {
      timerId = scheduleAfterDraw(renderer, renderFrame);
    } else {
      frameId = window.requestAnimationFrame(renderFrame);
    }
  }

  function startLoop() {
    if (frameId || timerId) return;
    clock.start();
    renderFrame();
  }

  function stopLoop() {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    }
    if (timerId) {
      window.clearTimeout(timerId);
      timerId = 0;
    }
  }

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) startLoop();
          else stopLoop();
        });
      },
      { threshold: 0.08 }
    );
    obs.observe(stageWrapper);
  } else {
    startLoop();
  }

  window.addEventListener('resize', () => {
    const w = Math.max(280, mountEl.clientWidth);
    const h = Math.max(240, mountEl.clientHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  });
}

/* ==========================================================================
   2. SCENE 2: 3D EYE VISUAL SPAN & SACCADIC READING SIMULATOR
   ========================================================================== */

function initEyeVisualSpanScene() {
  const stageWrapper = document.getElementById('eye-3d-stage');
  const mountEl = document.getElementById('eye-3d-canvas-mount');
  if (!stageWrapper || !mountEl) return;

  setupDockCollapseToggle(stageWrapper);

  if (!isWebGLSupported) {
    stageWrapper.classList.add('webgl-fallback-active');
    return;
  }

  const scene = new THREE.Scene();
  const renderer = createStudioRenderer(mountEl, scene);
  setupStudioLights(scene, 0x0b1324);

  const camera = new THREE.PerspectiveCamera(
    40,
    mountEl.clientWidth / Math.max(1, mountEl.clientHeight),
    0.1,
    50
  );
  camera.position.set(0, 2.25, 5.4);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = !isSoftwareGl;
  controls.dampingFactor = 0.06;
  controls.enablePan = false;
  controls.minDistance = 3.2;
  controls.maxDistance = 8.0;
  controls.maxPolarAngle = Math.PI * 0.58;
  controls.target.set(0, 0.1, -0.4);

  // Ground grid & contact shadow
  const gridHelper = new THREE.GridHelper(10, 20, 0x334155, 0x1e293b);
  gridHelper.position.y = -1.1;
  scene.add(gridHelper);

  // Composite Multi-Part 3D Eyeball Assembly (6 parts)
  const eyeAssembly = new THREE.Group();
  eyeAssembly.position.set(0, 0.15, 1.55);
  scene.add(eyeAssembly);

  // 1. Sclera Outer Sphere
  const scleraMat = new THREE.MeshPhysicalMaterial({
    color: 0xf8fafc,
    roughness: 0.18,
    metalness: 0.05,
    clearcoat: 0.9,
    clearcoatRoughness: 0.1,
  });
  const scleraMesh = new THREE.Mesh(new THREE.SphereGeometry(0.56, 32, 32), scleraMat);
  eyeAssembly.add(scleraMesh);

  // 2. Iris Ring (looking toward -Z where the reading line sits)
  const irisMat = new THREE.MeshStandardMaterial({
    color: 0x059669,
    emissive: 0x047857,
    emissiveIntensity: 0.45,
    roughness: 0.3,
    metalness: 0.4,
  });
  const irisMesh = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.075, 16, 32), irisMat);
  irisMesh.position.set(0, 0, -0.51);
  eyeAssembly.add(irisMesh);

  // 3. Pupil Disc
  const pupilMesh = new THREE.Mesh(
    new THREE.CircleGeometry(0.13, 24),
    new THREE.MeshBasicMaterial({ color: 0x020617, side: THREE.DoubleSide })
  );
  pupilMesh.position.set(0, 0, -0.53);
  eyeAssembly.add(pupilMesh);

  // 4. Cornea Optical Dome
  const corneaMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.05,
    metalness: 0,
    transmission: isSoftwareGl ? 0 : 0.9,
    transparent: true,
    opacity: isSoftwareGl ? 0.28 : 0.95,
    ior: 1.48,
    clearcoat: 1.0,
    depthWrite: false,
  });
  const corneaMesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.32, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5),
    corneaMat
  );
  corneaMesh.rotation.x = -Math.PI / 2;
  corneaMesh.position.set(0, 0, -0.35);
  corneaMesh.renderOrder = 3;
  eyeAssembly.add(corneaMesh);

  // 5. Extraocular Muscle Bands (Superior/Lateral)
  const muscleMat = new THREE.MeshStandardMaterial({
    color: 0xe11d48,
    roughness: 0.65,
    metalness: 0.1,
  });
  const topMuscle = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.06, 0.55), muscleMat);
  topMuscle.position.set(0, 0.52, 0.18);
  eyeAssembly.add(topMuscle);

  // 6. Volumetric Visual Span Cone projecting from the Eye toward the 3D Reading Line
  const coneLength = 3.25;
  const coneGeo = new THREE.ConeGeometry(1.0, coneLength, 32, 1, true);
  // Shift cone so apex is at origin (0,0,0) and base opens toward -Z
  coneGeo.translate(0, -coneLength / 2, 0);
  coneGeo.rotateX(Math.PI / 2);

  const spanConeMat = new THREE.MeshBasicMaterial({
    color: 0x10b981,
    transparent: true,
    opacity: 0.2,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const spanConeMesh = new THREE.Mesh(coneGeo, spanConeMat);
  spanConeMesh.position.set(0, 0, -0.48);
  eyeAssembly.add(spanConeMesh);

  // 3D Reading Line: 13 Floating Word Blocks grouped into 3 Chunks (Right-to-Left for Persian)
  // Chunk 0 (words 0..3): x from +2.4 to +1.05
  // Chunk 1 (words 4..6): x from +0.45 to -0.45
  // Chunk 2 (words 7..12): x from -1.05 to -2.55
  const wordBlocks = [];
  const chunkHighlights = [];
  const readingLineGroup = new THREE.Group();
  readingLineGroup.position.set(0, 0.15, -1.75);
  scene.add(readingLineGroup);

  const WORD_COUNT = 13;
  const CHUNK_MAP = [0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 2];
  const CHUNK_CENTERS_X = [1.75, 0.0, -1.75];
  const CHUNK_WIDTHS = [1.65, 1.35, 1.85];

  // Create 3 Chunk Frame Enclosures
  for (let c = 0; c < 3; c++) {
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.4,
      roughness: 0.3,
      metalness: 0.6,
      transparent: true,
      opacity: 0.35,
    });
    const frameMesh = new THREE.Mesh(
      new THREE.BoxGeometry(CHUNK_WIDTHS[c], 0.56, 0.12),
      frameMat
    );
    frameMesh.position.set(CHUNK_CENTERS_X[c], 0, -0.08);
    readingLineGroup.add(frameMesh);
    chunkHighlights.push({ mesh: frameMesh, mat: frameMat, centerX: CHUNK_CENTERS_X[c] });
  }

  // Create 13 Individual Word Blocks (Right to Left: index 0 is rightmost)
  for (let w = 0; w < WORD_COUNT; w++) {
    const chunkIdx = CHUNK_MAP[w];
    let xPos = 0;
    if (chunkIdx === 0) {
      xPos = 2.38 - w * 0.42;
    } else if (chunkIdx === 1) {
      xPos = 0.45 - (w - 4) * 0.45;
    } else {
      xPos = -1.02 - (w - 7) * 0.29;
    }

    const wMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      emissive: 0x0f172a,
      emissiveIntensity: 0.25,
      roughness: 0.35,
      metalness: 0.4,
    });
    const wWidth = chunkIdx === 2 ? 0.23 : 0.34;
    const wMesh = new THREE.Mesh(new THREE.BoxGeometry(wWidth, 0.28, 0.16), wMat);
    wMesh.position.set(xPos, 0, 0.04);
    readingLineGroup.add(wMesh);
    wordBlocks.push({ mesh: wMesh, mat: wMat, x: xPos, chunkIdx });
  }

  // State for Eye Simulator
  let simMode = 'chunking'; // 'chunking' | 'traditional'
  let activeStep = 0;
  let stepAccumulator = 0;
  let targetGazeX = CHUNK_CENTERS_X[0];
  const traditionalWordOrder = [0, 1, 2, 3, 4, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  // DOM Controls synchronization
  const domModeButtons = Array.from(document.querySelectorAll('.eye-sim-mode-btn'));
  const dockModeButtons = Array.from(stageWrapper.querySelectorAll('[data-eye3d-mode]'));
  const spanBadgeEl = document.getElementById('eye-3d-span-badge');
  const resetEyeCamBtn = document.getElementById('eye-3d-reset-btn');

  function setEyeSimMode(newMode, triggerDom = false) {
    simMode = newMode;
    activeStep = 0;
    stepAccumulator = 0;

    dockModeButtons.forEach((btn) => {
      const isMatch = btn.getAttribute('data-eye3d-mode') === newMode;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
    });

    if (spanBadgeEl) {
      spanBadgeEl.textContent =
        newMode === 'chunking'
          ? 'زاویه دید محیطی: ۴.۵ واژه در هر مکث (۳ پرش نرم)'
          : 'زاویه دید کانونی: ۱ واژه در هر مکث (۱۳ توقف + برگشت نگاه)';
    }

    if (newMode === 'chunking') {
      spanConeMat.color.setHex(0x10b981);
      irisMat.color.setHex(0x059669);
      irisMat.emissive.setHex(0x047857);
      targetGazeX = CHUNK_CENTERS_X[0];
    } else {
      spanConeMat.color.setHex(0xf59e0b);
      irisMat.color.setHex(0xd97706);
      irisMat.emissive.setHex(0xb45309);
      targetGazeX = wordBlocks[0].x;
    }

    if (triggerDom) {
      const matchingDomBtn = domModeButtons.find(
        (b) => b.getAttribute('data-sim-mode') === newMode
      );
      if (matchingDomBtn && !matchingDomBtn.classList.contains('is-active')) {
        matchingDomBtn.click();
      }
    }
  }

  domModeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const m = btn.getAttribute('data-sim-mode');
      if (m && m !== simMode) setEyeSimMode(m, false);
    });
  });

  dockModeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const m = btn.getAttribute('data-eye3d-mode');
      if (m) setEyeSimMode(m, true);
    });
  });

  if (resetEyeCamBtn) {
    resetEyeCamBtn.addEventListener('click', () => {
      camera.position.set(0, 2.25, 5.4);
      controls.target.set(0, 0.1, -0.4);
    });
  }

  if (!isSoftwareGl) {
    renderer.compile(scene, camera);
  }

  let isVisible = false;
  let frameId = 0;
  let timerId = 0;
  const clock = new THREE.Clock();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function renderFrame() {
    if (!isVisible) return;
    const dt = Math.min(clock.getDelta(), 0.1);
    stepAccumulator += dt;

    const intervalSec = simMode === 'chunking' ? 0.95 : 0.48;
    if (!reduceMotion.matches && stepAccumulator >= intervalSec) {
      stepAccumulator = 0;
      if (simMode === 'chunking') {
        activeStep = (activeStep + 1) % 3;
        targetGazeX = CHUNK_CENTERS_X[activeStep];
      } else {
        activeStep = (activeStep + 1) % traditionalWordOrder.length;
        const wIdx = traditionalWordOrder[activeStep];
        targetGazeX = wordBlocks[wIdx].x;
      }
    }

    // Smoothly rotate eyeball & visual span cone toward targetGazeX
    const targetYaw = Math.atan2(-targetGazeX, 3.3);
    eyeAssembly.rotation.y = THREE.MathUtils.damp(eyeAssembly.rotation.y, targetYaw, 10, dt);

    // Adjust visual span cone width (wide in chunking, narrow in traditional)
    const desiredConeScaleX = simMode === 'chunking' ? 0.88 : 0.24;
    spanConeMesh.scale.x = THREE.MathUtils.damp(
      spanConeMesh.scale.x,
      desiredConeScaleX,
      8,
      dt
    );
    spanConeMesh.scale.y = THREE.MathUtils.damp(spanConeMesh.scale.y, 0.35, 8, dt);

    // Update 3D Chunk Enclosures & Word Blocks illumination
    const activeWordIdx =
      simMode === 'traditional' ? traditionalWordOrder[activeStep] : -1;

    for (let c = 0; c < 3; c++) {
      const ch = chunkHighlights[c];
      const isChunkActive = simMode === 'chunking' && activeStep === c;
      ch.mat.opacity = THREE.MathUtils.damp(
        ch.mat.opacity,
        isChunkActive ? 0.72 : simMode === 'chunking' ? 0.18 : 0.05,
        8,
        dt
      );
      const s = isChunkActive ? 1.06 : 1.0;
      ch.mesh.scale.setScalar(THREE.MathUtils.damp(ch.mesh.scale.x, s, 8, dt));
    }

    for (let w = 0; w < WORD_COUNT; w++) {
      const wb = wordBlocks[w];
      const isHighlighted =
        (simMode === 'chunking' && wb.chunkIdx === activeStep) ||
        (simMode === 'traditional' && w === activeWordIdx);

      if (isHighlighted) {
        wb.mat.color.setHex(simMode === 'chunking' ? 0x34d399 : 0xfbbf24);
        wb.mat.emissive.setHex(simMode === 'chunking' ? 0x059669 : 0xd97706);
        wb.mat.emissiveIntensity = 0.9;
        wb.mesh.position.z = THREE.MathUtils.damp(wb.mesh.position.z, 0.18, 10, dt);
      } else {
        wb.mat.color.setHex(0x475569);
        wb.mat.emissive.setHex(0x0f172a);
        wb.mat.emissiveIntensity = 0.2;
        wb.mesh.position.z = THREE.MathUtils.damp(wb.mesh.position.z, 0.04, 10, dt);
      }
    }

    controls.update();
    renderer.render(scene, camera);

    if (isSoftwareGl) {
      timerId = scheduleAfterDraw(renderer, renderFrame);
    } else {
      frameId = window.requestAnimationFrame(renderFrame);
    }
  }

  function startLoop() {
    if (frameId || timerId) return;
    clock.start();
    renderFrame();
  }

  function stopLoop() {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    }
    if (timerId) {
      window.clearTimeout(timerId);
      timerId = 0;
    }
  }

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) startLoop();
          else stopLoop();
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(stageWrapper);
  } else {
    isVisible = true;
    startLoop();
  }

  window.addEventListener('resize', () => {
    const w = Math.max(280, mountEl.clientWidth);
    const h = Math.max(220, mountEl.clientHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  });
}

/* ==========================================================================
   3. SCENE 3: SCROLL-DRIVEN 3D LEARNING JOURNEY & COURSE STATIONS
   ========================================================================== */

const ROADMAP_STATIONS_3D = [
  {
    num: 1,
    title: 'ایستگاه ۱: شناخت و تکنیک‌های پایه',
    sub: 'مهار گفتار باطنی و فیزیولوژی حرکت چشم',
    pos: new THREE.Vector3(2.5, 0.0, 0.35),
    camPos: new THREE.Vector3(2.5, 1.65, 3.65),
    lookAt: new THREE.Vector3(2.1, 0.25, 0.1),
    color: 0x0ea5e9,
  },
  {
    num: 2,
    title: 'ایستگاه ۲: تثبیت عصبی و عضلانی',
    sub: 'تمرین روزانه ۱۵ دقیقه‌ای و گسترش دید محیطی',
    pos: new THREE.Vector3(0.0, 0.25, -0.35),
    camPos: new THREE.Vector3(0.0, 1.85, 3.45),
    lookAt: new THREE.Vector3(0.0, 0.35, -0.2),
    color: 0xf59e0b,
  },
  {
    num: 3,
    title: 'ایستگاه ۳: پایش WPM و تسلط کامل',
    sub: 'کاخ حافظه، نقشه ذهنی و تثبیت بالای ۸۵٪',
    pos: new THREE.Vector3(-2.5, 0.5, 0.25),
    camPos: new THREE.Vector3(-2.5, 1.95, 3.65),
    lookAt: new THREE.Vector3(-2.1, 0.5, 0.1),
    color: 0x10b981,
  },
];

function initScrollRoadmapScene() {
  const stageWrapper = document.getElementById('roadmap-3d-stage');
  const mountEl = document.getElementById('roadmap-3d-canvas-mount');
  if (!stageWrapper || !mountEl) return;

  setupDockCollapseToggle(stageWrapper);

  if (!isWebGLSupported) {
    stageWrapper.classList.add('webgl-fallback-active');
    return;
  }

  const scene = new THREE.Scene();
  const renderer = createStudioRenderer(mountEl, scene);
  setupStudioLights(scene, 0x0b1324);

  const camera = new THREE.PerspectiveCamera(
    42,
    mountEl.clientWidth / Math.max(1, mountEl.clientHeight),
    0.1,
    60
  );
  camera.position.copy(ROADMAP_STATIONS_3D[0].camPos);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = !isSoftwareGl;
  controls.dampingFactor = 0.06;
  controls.enablePan = false;
  controls.minDistance = 2.5;
  controls.maxDistance = 8.5;
  controls.maxPolarAngle = Math.PI * 0.58;
  controls.target.copy(ROADMAP_STATIONS_3D[0].lookAt);

  // 3D Pathway Curve connecting Station 1 (Right) -> Station 2 (Center) -> Station 3 (Left)
  const pathCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(3.1, -0.1, 0.5),
    ROADMAP_STATIONS_3D[0].pos,
    new THREE.Vector3(1.25, 0.12, -0.25),
    ROADMAP_STATIONS_3D[1].pos,
    new THREE.Vector3(-1.25, 0.38, 0.35),
    ROADMAP_STATIONS_3D[2].pos,
    new THREE.Vector3(-3.1, 0.6, 0.1),
  ]);

  const tubeMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.45,
    roughness: 0.3,
    metalness: 0.7,
  });
  const pathMesh = new THREE.Mesh(new THREE.TubeGeometry(pathCurve, 64, 0.045, 12, false), tubeMat);
  scene.add(pathMesh);

  // Subtle floor grid
  const floorGrid = new THREE.GridHelper(12, 24, 0x334155, 0x1e293b);
  floorGrid.position.y = -0.65;
  scene.add(floorGrid);

  // Build 3 Multi-Part Station Monuments
  const stationMonuments = [];
  ROADMAP_STATIONS_3D.forEach((st, idx) => {
    const group = new THREE.Group();
    group.position.copy(st.pos);

    // Base Pedestal (Cylinder + Beveled Ring)
    const pedestal = new THREE.Mesh(
      new THREE.CylinderGeometry(0.42, 0.52, 0.22, 24),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.6 })
    );
    pedestal.position.y = -0.35;

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.46, 0.03, 12, 32),
      new THREE.MeshStandardMaterial({
        color: st.color,
        emissive: st.color,
        emissiveIntensity: 0.7,
      })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.24;

    // Hero Core Emblem per station
    let emblemGeo;
    if (idx === 0) {
      emblemGeo = new THREE.OctahedronGeometry(0.32, 0);
    } else if (idx === 1) {
      emblemGeo = new THREE.TorusKnotGeometry(0.22, 0.065, 48, 12);
    } else {
      emblemGeo = new THREE.IcosahedronGeometry(0.34, 1);
    }

    const emblemMat = new THREE.MeshPhysicalMaterial({
      color: st.color,
      emissive: st.color,
      emissiveIntensity: 0.65,
      roughness: 0.18,
      metalness: 0.5,
      clearcoat: 1.0,
    });
    const emblem = new THREE.Mesh(emblemGeo, emblemMat);
    emblem.position.y = 0.25;

    // Floating 3D Persian Station Badge Sprite
    const badgeSprite = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: createPersianBadgeTexture(
          renderer,
          `گام ${toPersianDigits(st.num)}`,
          st.num === 1 ? 'شناخت و تکنیک' : st.num === 2 ? 'تثبیت عصبی' : 'پایش و تسلط',
          idx === 0 ? '#0ea5e9' : idx === 1 ? '#f59e0b' : '#10b981'
        ),
        transparent: true,
        depthWrite: false,
      })
    );
    badgeSprite.scale.set(1.55, 0.48, 1);
    badgeSprite.position.set(0, 0.92, 0);

    group.add(pedestal, ring, emblem, badgeSprite);
    scene.add(group);
    stationMonuments.push({ group, emblem, ring, emblemMat, data: st });
  });

  // Traveler Energy Orb moving along the path
  const travelerOrb = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 20, 20),
    new THREE.MeshBasicMaterial({ color: 0xfef08a })
  );
  scene.add(travelerOrb);

  let activeStationNum = 1;
  let targetCurveT = 0.14;
  let currentCurveT = 0.14;
  const targetCamPos = new THREE.Vector3().copy(ROADMAP_STATIONS_3D[0].camPos);
  const targetLookAt = new THREE.Vector3().copy(ROADMAP_STATIONS_3D[0].lookAt);

  const stationBtns = Array.from(stageWrapper.querySelectorAll('[data-roadmap3d-station]'));
  const domStationCards = Array.from(document.querySelectorAll('[data-station-card]'));
  const statusEl = document.getElementById('roadmap-3d-status');
  const overviewBtn = document.getElementById('roadmap-3d-overview-btn');

  function selectRoadmapStation(stationNum) {
    const idx = Math.max(0, Math.min(2, stationNum - 1));
    const st = ROADMAP_STATIONS_3D[idx];
    activeStationNum = st.num;
    targetCurveT = idx === 0 ? 0.14 : idx === 1 ? 0.5 : 0.86;

    targetCamPos.copy(st.camPos);
    targetLookAt.copy(st.lookAt);

    stationBtns.forEach((b) => {
      const isCurrent = Number(b.getAttribute('data-roadmap3d-station')) === st.num;
      b.classList.toggle('is-active', isCurrent);
      b.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
    });

    if (statusEl) {
      statusEl.textContent = `${st.title} — ${st.sub}`;
    }
  }

  stationBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const n = Number(btn.getAttribute('data-roadmap3d-station'));
      if (!Number.isNaN(n)) {
        selectRoadmapStation(n);
        const matchingCard = domStationCards.find(
          (c) => Number(c.getAttribute('data-station-card')) === n
        );
        if (matchingCard) matchingCard.click();
      }
    });
  });

  domStationCards.forEach((card) => {
    const n = Number(card.getAttribute('data-station-card'));
    card.addEventListener('click', () => selectRoadmapStation(n));
    card.addEventListener('mouseenter', () => selectRoadmapStation(n));
  });

  if (overviewBtn) {
    overviewBtn.addEventListener('click', () => {
      targetCamPos.set(0, 2.45, 5.2);
      targetLookAt.set(0, 0.2, 0);
    });
  }

  // Scroll-Driven Progress Listener on #methodology section
  const methodologySection = document.getElementById('methodology');
  if (methodologySection) {
    window.addEventListener(
      'scroll',
      () => {
        const rect = methodologySection.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        if (rect.top < vh && rect.bottom > 0) {
          const ratio = Math.max(0, Math.min(1, (vh * 0.65 - rect.top) / Math.max(260, rect.height * 0.75)));
          if (ratio < 0.36 && activeStationNum !== 1) selectRoadmapStation(1);
          else if (ratio >= 0.36 && ratio < 0.72 && activeStationNum !== 2) selectRoadmapStation(2);
          else if (ratio >= 0.72 && activeStationNum !== 3) selectRoadmapStation(3);
        }
      },
      { passive: true }
    );
  }

  if (!isSoftwareGl) {
    renderer.compile(scene, camera);
  }

  let isVisible = false;
  let frameId = 0;
  let timerId = 0;
  const clock = new THREE.Clock();

  function renderFrame() {
    if (!isVisible) return;
    const dt = Math.min(clock.getDelta(), 0.1);
    const elapsed = clock.getElapsedTime();

    currentCurveT = THREE.MathUtils.damp(currentCurveT, targetCurveT, 5, dt);
    pathCurve.getPointAt(currentCurveT, _vec3A);
    travelerOrb.position.copy(_vec3A);
    travelerOrb.position.y += 0.12;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamPos.x, 4, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamPos.y, 4, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamPos.z, 4, dt);

    controls.target.x = THREE.MathUtils.damp(controls.target.x, targetLookAt.x, 5, dt);
    controls.target.y = THREE.MathUtils.damp(controls.target.y, targetLookAt.y, 5, dt);
    controls.target.z = THREE.MathUtils.damp(controls.target.z, targetLookAt.z, 5, dt);

    stationMonuments.forEach((m) => {
      const isSelected = m.data.num === activeStationNum;
      m.emblem.rotation.y += dt * (isSelected ? 1.4 : 0.45);
      m.emblem.position.y = 0.25 + Math.sin(elapsed * 2.2 + m.data.num) * 0.05;
      const targetScale = isSelected ? 1.25 : 0.95;
      m.emblem.scale.setScalar(THREE.MathUtils.damp(m.emblem.scale.x, targetScale, 7, dt));
    });

    controls.update();
    renderer.render(scene, camera);

    if (isSoftwareGl) {
      timerId = scheduleAfterDraw(renderer, renderFrame);
    } else {
      frameId = window.requestAnimationFrame(renderFrame);
    }
  }

  function startLoop() {
    if (frameId || timerId) return;
    clock.start();
    renderFrame();
  }

  function stopLoop() {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    }
    if (timerId) {
      window.clearTimeout(timerId);
      timerId = 0;
    }
  }

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) startLoop();
          else stopLoop();
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(stageWrapper);
  } else {
    isVisible = true;
    startLoop();
  }

  window.addEventListener('resize', () => {
    const w = Math.max(280, mountEl.clientWidth);
    const h = Math.max(220, mountEl.clientHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  });
}

/* ==========================================================================
   4. SCENE 4: 3D EBBINGHAUS FORGETTING CURVE & MEMORY PALACE NETWORK
   ========================================================================== */

const EBBINGHAUS_3D_POINTS = [
  {
    idx: 0,
    label: '۲۰ دقیقه بعد',
    goodRetention: '۹۵٪ ماندگاری',
    badRetention: '۵۸٪ ماندگاری',
    x: 1.5,
    yGood: 1.25,
    yBad: 0.45,
  },
  {
    idx: 1,
    label: '۲۴ ساعت بعد',
    goodRetention: '۹۰٪ ماندگاری',
    badRetention: '۳۰٪ ماندگاری',
    x: 0.35,
    yGood: 1.18,
    yBad: -0.15,
  },
  {
    idx: 2,
    label: '۷ روز بعد',
    goodRetention: '۸۸٪ ماندگاری',
    badRetention: '۲۰٪ ماندگاری',
    x: -0.85,
    yGood: 1.14,
    yBad: -0.42,
  },
  {
    idx: 3,
    label: '۳۰ روز بعد',
    goodRetention: '۸۵٪+ تثبیت دائم',
    badRetention: '۱۵٪ ماندگاری',
    x: -2.15,
    yGood: 1.1,
    yBad: -0.58,
  },
];

function initEbbinghaus3DScene() {
  const stageWrapper = document.getElementById('ebbinghaus-3d-stage');
  const mountEl = document.getElementById('ebbinghaus-3d-canvas-mount');
  if (!stageWrapper || !mountEl) return;

  setupDockCollapseToggle(stageWrapper);

  if (!isWebGLSupported) {
    stageWrapper.classList.add('webgl-fallback-active');
    return;
  }

  const scene = new THREE.Scene();
  const renderer = createStudioRenderer(mountEl, scene);
  setupStudioLights(scene, 0x0b1324);

  const camera = new THREE.PerspectiveCamera(
    40,
    mountEl.clientWidth / Math.max(1, mountEl.clientHeight),
    0.1,
    60
  );
  camera.position.set(0, 1.9, 5.4);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = !isSoftwareGl;
  controls.dampingFactor = 0.06;
  controls.enablePan = false;
  controls.minDistance = 3.0;
  controls.maxDistance = 8.5;
  controls.maxPolarAngle = Math.PI * 0.56;
  controls.target.set(0, 0.3, 0);

  // Base Floor Grid
  const floorGrid = new THREE.GridHelper(10, 20, 0x334155, 0x1e293b);
  floorGrid.position.y = -0.85;
  scene.add(floorGrid);

  // 1. Spaced Repetition Golden Review Curve (Green Elevated Bridge at Z = +0.55)
  const goodCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(2.45, 1.35, 0.55),
    new THREE.Vector3(1.5, 1.25, 0.55),
    new THREE.Vector3(0.35, 1.18, 0.55),
    new THREE.Vector3(-0.85, 1.14, 0.55),
    new THREE.Vector3(-2.15, 1.1, 0.55),
  ]);
  const goodTubeMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    emissive: 0x059669,
    emissiveIntensity: 0.65,
    roughness: 0.25,
    metalness: 0.5,
  });
  scene.add(new THREE.Mesh(new THREE.TubeGeometry(goodCurve, 48, 0.065, 12, false), goodTubeMat));

  // 2. Traditional Unreviewed Forgetting Curve (Red/Amber Decaying Curve at Z = -0.55)
  const badCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(2.45, 1.35, -0.55),
    new THREE.Vector3(1.5, 0.45, -0.55),
    new THREE.Vector3(0.35, -0.15, -0.55),
    new THREE.Vector3(-0.85, -0.42, -0.55),
    new THREE.Vector3(-2.15, -0.58, -0.55),
  ]);
  const badTubeMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0xb91c1c,
    emissiveIntensity: 0.45,
    roughness: 0.45,
    metalness: 0.3,
  });
  scene.add(new THREE.Mesh(new THREE.TubeGeometry(badCurve, 48, 0.05, 12, false), badTubeMat));

  // 3. 4 Golden Review Pillars + Memory Palace Nodes vs Decaying Nodes
  const milestonePillars = [];
  EBBINGHAUS_3D_POINTS.forEach((pt) => {
    const goodHeight = pt.yGood - -0.85;
    const goodPillar = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.11, goodHeight, 16),
      new THREE.MeshStandardMaterial({
        color: 0x059669,
        emissive: 0x047857,
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.6,
      })
    );
    goodPillar.position.set(pt.x, -0.85 + goodHeight / 2, 0.55);
    scene.add(goodPillar);

    const goodOrb = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.18, 1),
      new THREE.MeshPhysicalMaterial({
        color: 0x34d399,
        emissive: 0x10b981,
        emissiveIntensity: 0.85,
        roughness: 0.15,
        metalness: 0.3,
        clearcoat: 1.0,
      })
    );
    goodOrb.position.set(pt.x, pt.yGood, 0.55);
    scene.add(goodOrb);

    const badOrb = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0xf87171,
        emissive: 0x991b1b,
        emissiveIntensity: 0.45,
        roughness: 0.5,
      })
    );
    badOrb.position.set(pt.x, pt.yBad, -0.55);
    scene.add(badOrb);

    milestonePillars.push({ pt, goodPillar, goodOrb, badOrb });
  });

  // 4. Translucent Time-Slice Comparison Plane that glides to active milestone
  const sliceGroup = new THREE.Group();
  const slicePlane = new THREE.Mesh(
    new THREE.PlaneGeometry(1.75, 2.45),
    new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  );
  slicePlane.rotation.y = Math.PI / 2;
  slicePlane.position.y = 0.35;

  const sliceRing = new THREE.Mesh(
    new THREE.RingGeometry(0.24, 0.29, 32),
    new THREE.MeshBasicMaterial({ color: 0xfef08a, side: THREE.DoubleSide })
  );
  sliceRing.position.set(0, 1.18, 0.55);
  sliceGroup.add(slicePlane, sliceRing);
  sliceGroup.position.x = EBBINGHAUS_3D_POINTS[1].x;
  scene.add(sliceGroup);

  let activeIdx = 1; // Default: 24 hours later
  let targetSliceX = EBBINGHAUS_3D_POINTS[1].x;
  let targetSliceRingY = EBBINGHAUS_3D_POINTS[1].yGood;
  const targetCamPos = new THREE.Vector3(0, 1.9, 5.4);

  const domMilestoneBtns = Array.from(document.querySelectorAll('.ebbinghaus-milestone-btn'));
  const dockMilestoneBtns = Array.from(stageWrapper.querySelectorAll('[data-ebbinghaus3d-ms]'));
  const viewPresetBtns = Array.from(stageWrapper.querySelectorAll('[data-ebbinghaus3d-view]'));
  const statusEl = document.getElementById('ebbinghaus-3d-status');

  function setMilestone3D(idx, triggerDom = false) {
    const item = EBBINGHAUS_3D_POINTS[idx];
    if (!item) return;
    activeIdx = idx;
    targetSliceX = item.x;
    targetSliceRingY = item.yGood;

    dockMilestoneBtns.forEach((btn) => {
      const isMatch = Number(btn.getAttribute('data-ebbinghaus3d-ms')) === idx;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
    });

    if (statusEl) {
      statusEl.textContent = `${item.label}: با نقشه ذهنی (${item.goodRetention}) در برابر بدون مرور (${item.badRetention})`;
    }

    if (triggerDom && domMilestoneBtns[idx]) {
      if (!domMilestoneBtns[idx].classList.contains('is-active')) {
        domMilestoneBtns[idx].click();
      }
    }
  }

  domMilestoneBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-milestone'));
      if (!Number.isNaN(idx) && idx !== activeIdx) {
        setMilestone3D(idx, false);
      }
    });
  });

  dockMilestoneBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.getAttribute('data-ebbinghaus3d-ms'));
      if (!Number.isNaN(idx)) setMilestone3D(idx, true);
    });
  });

  viewPresetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const view = btn.getAttribute('data-ebbinghaus3d-view');
      if (view === 'front') targetCamPos.set(0, 1.9, 5.4);
      else if (view === 'side') targetCamPos.set(-3.8, 2.1, 3.6);
      else if (view === 'top') targetCamPos.set(0, 4.6, 2.2);
    });
  });

  if (!isSoftwareGl) {
    renderer.compile(scene, camera);
  }

  let isVisible = false;
  let frameId = 0;
  let timerId = 0;
  const clock = new THREE.Clock();

  function renderFrame() {
    if (!isVisible) return;
    const dt = Math.min(clock.getDelta(), 0.1);
    const elapsed = clock.getElapsedTime();

    sliceGroup.position.x = THREE.MathUtils.damp(sliceGroup.position.x, targetSliceX, 7, dt);
    sliceRing.position.y = THREE.MathUtils.damp(sliceRing.position.y, targetSliceRingY, 7, dt);

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamPos.x, 4, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamPos.y, 4, dt);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamPos.z, 4, dt);

    milestonePillars.forEach((m, i) => {
      const isSelected = i === activeIdx;
      m.goodOrb.rotation.y += dt * (isSelected ? 1.8 : 0.6);
      const s = isSelected ? 1.35 + Math.sin(elapsed * 4) * 0.08 : 1.0;
      m.goodOrb.scale.setScalar(THREE.MathUtils.damp(m.goodOrb.scale.x, s, 8, dt));
      m.badOrb.scale.setScalar(THREE.MathUtils.damp(m.badOrb.scale.x, isSelected ? 1.25 : 0.9, 8, dt));
    });

    controls.update();
    renderer.render(scene, camera);

    if (isSoftwareGl) {
      timerId = scheduleAfterDraw(renderer, renderFrame);
    } else {
      frameId = window.requestAnimationFrame(renderFrame);
    }
  }

  function startLoop() {
    if (frameId || timerId) return;
    clock.start();
    renderFrame();
  }

  function stopLoop() {
    if (frameId) {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    }
    if (timerId) {
      window.clearTimeout(timerId);
      timerId = 0;
    }
  }

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) startLoop();
          else stopLoop();
        });
      },
      { threshold: 0.1 }
    );
    obs.observe(stageWrapper);
  } else {
    isVisible = true;
    startLoop();
  }

  window.addEventListener('resize', () => {
    const w = Math.max(280, mountEl.clientWidth);
    const h = Math.max(220, mountEl.clientHeight);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  });
}

/* ==========================================================================
   5. INITIALIZE ALL 4 THREE.JS SCENES & EXPORT BUS HOOK
   ========================================================================== */

export function notifyThreeScenesWpm(wpmValue) {
  sceneBus.dispatchEvent(new CustomEvent('wpm-updated', { detail: { wpm: wpmValue } }));
}

export function initAllThreeScenes() {
  initHeroBrainScene();
  initEyeVisualSpanScene();
  initScrollRoadmapScene();
  initEbbinghaus3DScene();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllThreeScenes);
} else {
  initAllThreeScenes();
}
