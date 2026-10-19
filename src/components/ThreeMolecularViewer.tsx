import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCw, ZoomIn, ZoomOut, Activity, Atom, Pill } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolio } from '../context/PortfolioContext';

type ModelType = 'dna' | 'molecule' | 'capsule';

interface ThreeMolecularViewerProps {
  className?: string;
}

export const ThreeMolecularViewer: React.FC<ThreeMolecularViewerProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [modelType, setModelType] = useState<ModelType>('dna');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const { isClinical } = useTheme();
  const { data } = usePortfolio();

  const themeAccentColor = data.secondaryAccent || '#c084fc';

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const objectGroupRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const autoRotateRef = useRef<boolean>(autoRotate);
  autoRotateRef.current = autoRotate;

  const isDraggingRef = useRef<boolean>(false);
  const prevMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Build model logic driven dynamically by current dashboard theme color
  const buildModel = (type: ModelType, accentColorHex: string, clinicalMode: boolean) => {
    const group = objectGroupRef.current;
    if (!group) return;

    while (group.children.length > 0) {
      const obj = group.children[0];
      group.remove(obj);
      if ('geometry' in obj && obj.geometry instanceof THREE.BufferGeometry) {
        obj.geometry.dispose();
      }
    }

    if (type === 'dna') {
      // 3D Double Helix with Lavender & Violet Strands
      const strandRadius = 0.18;
      const basePairs = 24;
      const heightStep = 0.45;
      const angleStep = Math.PI / 6;
      const radius = 2.4;

      const themeColor = new THREE.Color(accentColorHex);
      const sphereGeo = new THREE.SphereGeometry(strandRadius * 1.5, 16, 16);
      const matA = new THREE.MeshStandardMaterial({ color: themeColor, roughness: 0.3, metalness: 0.25 }); // Theme accent
      const matB = new THREE.MeshStandardMaterial({ color: 0x818cf8, roughness: 0.3, metalness: 0.25 }); // Soft Violet
      const rungMat = new THREE.MeshStandardMaterial({ color: 0xe9d5ff, roughness: 0.4 }); // Pale lilac

      for (let i = 0; i < basePairs; i++) {
        const angle = i * angleStep;
        const y = (i - basePairs / 2) * heightStep;

        const x1 = Math.cos(angle) * radius;
        const z1 = Math.sin(angle) * radius;

        const x2 = Math.cos(angle + Math.PI) * radius;
        const z2 = Math.sin(angle + Math.PI) * radius;

        // Strand Nodes
        const s1 = new THREE.Mesh(sphereGeo, matA);
        s1.position.set(x1, y, z1);
        group.add(s1);

        const s2 = new THREE.Mesh(sphereGeo, matB);
        s2.position.set(x2, y, z2);
        group.add(s2);

        // Connecting Rung
        const p1 = new THREE.Vector3(x1, y, z1);
        const p2 = new THREE.Vector3(x2, y, z2);
        const dist = p1.distanceTo(p2);
        const midpoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

        const cylGeo = new THREE.CylinderGeometry(0.06, 0.06, dist, 8);
        const rungMesh = new THREE.Mesh(cylGeo, rungMat);
        rungMesh.position.copy(midpoint);
        rungMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), p2.clone().sub(p1).normalize());
        group.add(rungMesh);
      }
    } else if (type === 'molecule') {
      // Bioactive Flavone Ring Core
      const themeColor = new THREE.Color(accentColorHex);
      const atomMatC = new THREE.MeshStandardMaterial({ color: themeColor, roughness: 0.3 }); // Theme accent
      const atomMatO = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.3 }); // Red Oxygen
      const atomMatH = new THREE.MeshStandardMaterial({ color: 0xf3e8ff, roughness: 0.3 }); // Light Lilac
      const bondMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.5 });

      const ringRadius = 2.2;
      const atoms = 6;
      const positions: THREE.Vector3[] = [];

      for (let i = 0; i < atoms; i++) {
        const theta = (i * Math.PI * 2) / atoms;
        const pos = new THREE.Vector3(Math.cos(theta) * ringRadius, Math.sin(theta) * ringRadius, 0);
        positions.push(pos);

        const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.38, 20, 20), i === 1 ? atomMatO : atomMatC);
        sphere.position.copy(pos);
        group.add(sphere);

        // Hydrogens on periphery
        if (i !== 1) {
          const hPos = pos.clone().multiplyScalar(1.55);
          const hSphere = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), atomMatH);
          hSphere.position.copy(hPos);
          group.add(hSphere);

          // Bond to H
          const bondDist = pos.distanceTo(hPos);
          const bondMid = new THREE.Vector3().addVectors(pos, hPos).multiplyScalar(0.5);
          const bondCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, bondDist, 8), bondMat);
          bondCyl.position.copy(bondMid);
          bondCyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), hPos.clone().sub(pos).normalize());
          group.add(bondCyl);
        }
      }

      // Ring Bonds
      for (let i = 0; i < atoms; i++) {
        const p1 = positions[i];
        const p2 = positions[(i + 1) % atoms];
        const dist = p1.distanceTo(p2);
        const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

        const bondCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, dist, 8), bondMat);
        bondCyl.position.copy(mid);
        bondCyl.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), p2.clone().sub(p1).normalize());
        group.add(bondCyl);
      }
    } else if (type === 'capsule') {
      // High-Gloss Pharmaceutical Two-Tone Capsule:
      // Automatically uses current dashboard theme color (including selected lavender shade)
      // for the colored side (Top), and Pure White Side (Bottom) kept pristine intact
      const capRadius = 1.45;
      const capLength = 2.45;
      const capColor = new THREE.Color(accentColorHex);

      // Ultra-glossy translucent gelatin physical material for colored side
      const topMat = new THREE.MeshPhysicalMaterial({
        color: capColor,
        emissive: capColor,
        emissiveIntensity: clinicalMode ? 0.08 : 0.16,
        roughness: clinicalMode ? 0.08 : 0.04,
        metalness: 0.01,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
        transmission: clinicalMode ? 0.22 : 0.28,
        ior: 1.49,
        reflectivity: 0.9,
        transparent: true,
        opacity: clinicalMode ? 0.72 : 0.90,
      });

      const topGeo = new THREE.SphereGeometry(capRadius, 28, 20, 0, Math.PI * 2, 0, Math.PI / 2);
      const topMesh = new THREE.Mesh(topGeo, topMat);
      topMesh.position.y = capLength / 2;
      group.add(topMesh);

      const topCylGeo = new THREE.CylinderGeometry(capRadius, capRadius, capLength / 2, 28, 1, true);
      const topCylMesh = new THREE.Mesh(topCylGeo, topMat);
      topCylMesh.position.y = capLength / 4;
      group.add(topCylMesh);

      // Bottom Pure White Side (kept pristine intact across all varieties)
      const botMat = new THREE.MeshPhysicalMaterial({
        color: clinicalMode ? 0xf8fafc : 0xffffff,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: clinicalMode ? 0.04 : 0.08,
        roughness: clinicalMode ? 0.09 : 0.05,
        metalness: 0.01,
        clearcoat: 1.0,
        clearcoatRoughness: 0.02,
        transmission: clinicalMode ? 0.18 : 0.22,
        ior: 1.49,
        reflectivity: 0.9,
        transparent: true,
        opacity: clinicalMode ? 0.70 : 0.88,
      });

      const botGeo = new THREE.SphereGeometry(capRadius, 28, 20, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
      const botMesh = new THREE.Mesh(botGeo, botMat);
      botMesh.position.y = -capLength / 2;
      group.add(botMesh);

      const botCylGeo = new THREE.CylinderGeometry(capRadius, capRadius, capLength / 2, 28, 1, true);
      const botCylMesh = new THREE.Mesh(botCylGeo, botMat);
      botCylMesh.position.y = -capLength / 4;
      group.add(botCylMesh);

      // Precision silver division band
      const ringGeo = new THREE.TorusGeometry(capRadius + 0.025, 0.05, 16, 32);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.06,
        metalness: 0.45,
        transparent: true,
        opacity: 0.65,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      group.add(ringMesh);
    }
  };

  // Initialize Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 16);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Clean Studio Lighting with multi-angle specular gleam
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(10, 14, 12);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf1f5f9, 1.3);
    dirLight2.position.set(-10, -10, -8);
    scene.add(dirLight2);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.1);
    rimLight.position.set(0, 14, -12);
    scene.add(rimLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    objectGroupRef.current = rootGroup;

    // Initial build
    buildModel(modelType, themeAccentColor, isClinical);

    // Mouse Interaction
    const handleMouseDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMousePosRef.current = { x: clientX, y: clientY };
    };

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current || !objectGroupRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMousePosRef.current.x;
      const deltaY = clientY - prevMousePosRef.current.y;

      objectGroupRef.current.rotation.y += deltaX * 0.01;
      objectGroupRef.current.rotation.x += deltaY * 0.01;
      prevMousePosRef.current = { x: clientX, y: clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (!cameraRef.current) return;
      cameraRef.current.position.z = Math.min(Math.max(cameraRef.current.position.z + e.deltaY * 0.01, 8), 24);
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('touchstart', handleMouseDown, { passive: true });
    window.addEventListener('touchmove', handleMouseMove, { passive: true });
    window.addEventListener('touchend', handleMouseUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (autoRotateRef.current && objectGroupRef.current && !isDraggingRef.current) {
        objectGroupRef.current.rotation.y += delta * 0.45;
        objectGroupRef.current.rotation.x += delta * 0.14;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      dom.removeEventListener('mousedown', handleMouseDown);
      dom.removeEventListener('touchstart', handleMouseDown);
      dom.removeEventListener('wheel', handleWheel);
      if (container.contains(dom)) container.removeChild(dom);
      renderer.dispose();
    };
  }, []);

  // Update model whenever modelType, dashboard themeAccentColor, or theme changes
  useEffect(() => {
    buildModel(modelType, themeAccentColor, isClinical);
  }, [modelType, themeAccentColor, isClinical]);

  const handleZoom = (amount: number) => {
    if (!cameraRef.current) return;
    cameraRef.current.position.z = Math.min(Math.max(cameraRef.current.position.z + amount, 8), 24);
  };

  const handleResetCamera = () => {
    if (!cameraRef.current || !objectGroupRef.current) return;
    cameraRef.current.position.set(0, 0, 16);
    objectGroupRef.current.rotation.set(0, 0, 0);
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden shadow-2xl ${
        isClinical
          ? 'bg-white/95 border-purple-200 shadow-slate-200/60'
          : 'bg-slate-900/80 border-purple-500/20 shadow-black/40'
      } ${className}`}
    >
      {/* Top Model Switcher Toolbar - Centered with generous spacing */}
      <div
        className={`flex items-center justify-center p-2.5 sm:p-3 border-b text-xs transition-colors shrink-0 ${
          isClinical
            ? 'bg-slate-50/90 border-purple-100 text-slate-800'
            : 'bg-slate-950/70 border-purple-500/20 text-slate-200'
        }`}
      >
        <div
          className={`flex items-center justify-center gap-1.5 p-1 rounded-xl border w-full max-w-xs sm:max-w-md ${
            isClinical
              ? 'bg-slate-100 border-slate-200'
              : 'bg-slate-900 border-slate-800'
          }`}
        >
          <button
            onClick={() => setModelType('dna')}
            title="DNA Helix"
            className={`flex-1 py-1.5 px-2 sm:px-3 text-xs font-medium rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              modelType === 'dna'
                ? 'bg-purple-600 text-white font-semibold shadow-sm shadow-purple-600/30'
                : isClinical
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px] sm:text-xs">DNA</span>
          </button>
          <button
            onClick={() => setModelType('molecule')}
            title="Molecule"
            className={`flex-1 py-1.5 px-2 sm:px-3 text-xs font-medium rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              modelType === 'molecule'
                ? 'bg-purple-600 text-white font-semibold shadow-sm shadow-purple-600/30'
                : isClinical
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Atom className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px] sm:text-xs">Molecule</span>
          </button>
          <button
            onClick={() => setModelType('capsule')}
            title="Capsule"
            className={`flex-1 py-1.5 px-2 sm:px-3 text-xs font-medium rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              modelType === 'capsule'
                ? 'bg-purple-600 text-white font-semibold shadow-sm shadow-purple-600/30'
                : isClinical
                ? 'text-slate-600 hover:text-slate-900'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Pill className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[11px] sm:text-xs">Capsule</span>
          </button>
        </div>
      </div>

      {/* 3D Canvas Stage */}
      <div className="relative flex-1 w-full min-h-[320px] flex items-center justify-center overflow-hidden">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* Modern, Clean & Professional Floating Camera & Zoom Controls (Positioned consistently across DNA, Molecule & Capsule tabs) */}
        <div className="absolute bottom-8 sm:bottom-9 inset-x-0 z-20 flex justify-center pointer-events-none px-3">
          <div
            className={`flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full border backdrop-blur-md shadow-xl pointer-events-auto transition-all ${
              isClinical
                ? 'bg-white/95 border-slate-200/90 shadow-slate-200/70 text-slate-700 ring-1 ring-purple-100/50'
                : 'bg-slate-900/95 border-purple-500/30 shadow-2xl shadow-black/80 text-slate-200 ring-1 ring-purple-500/20'
            }`}
          >
            {/* Auto Rotate Button with active status indication */}
            <button
              type="button"
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                autoRotate
                  ? isClinical
                    ? 'text-purple-700 bg-purple-100/90 shadow-xs ring-1 ring-purple-200/60'
                    : 'text-purple-300 bg-purple-500/30 shadow-xs ring-1 ring-purple-400/30'
                  : isClinical
                  ? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 active:scale-95'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80 active:scale-95'
              }`}
              title={autoRotate ? 'Pause Rotation' : 'Auto-Rotate'}
              aria-label={autoRotate ? 'Pause Rotation' : 'Auto-Rotate'}
            >
              {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <div className={`w-[1px] h-3.5 sm:h-4 ${isClinical ? 'bg-slate-200' : 'bg-slate-800'}`} />

            {/* Zoom In Button */}
            <button
              type="button"
              onClick={() => handleZoom(-1.5)}
              className={`p-2 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                isClinical
                  ? 'text-slate-600 hover:text-purple-700 hover:bg-purple-50 active:scale-95'
                  : 'text-slate-400 hover:text-white hover:bg-purple-500/20 active:scale-95'
              }`}
              title="Zoom In"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            {/* Zoom Out Button */}
            <button
              type="button"
              onClick={() => handleZoom(1.5)}
              className={`p-2 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                isClinical
                  ? 'text-slate-600 hover:text-purple-700 hover:bg-purple-50 active:scale-95'
                  : 'text-slate-400 hover:text-white hover:bg-purple-500/20 active:scale-95'
              }`}
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <div className={`w-[1px] h-3.5 sm:h-4 ${isClinical ? 'bg-slate-200' : 'bg-slate-800'}`} />

            {/* Reset View Button */}
            <button
              type="button"
              onClick={handleResetCamera}
              className={`p-2 rounded-full transition-all cursor-pointer flex items-center justify-center ${
                isClinical
                  ? 'text-slate-600 hover:text-purple-700 hover:bg-purple-50 active:scale-95'
                  : 'text-slate-400 hover:text-white hover:bg-purple-500/20 active:scale-95'
              }`}
              title="Reset View"
              aria-label="Reset View"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
