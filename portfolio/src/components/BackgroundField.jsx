// BackgroundField.js
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function BackgroundField() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    // --- setup scene, camera, renderer ---
    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(12, 8, 16);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- 1. moving hexgrid ---
    const hexGroup = new THREE.Group();
    scene.add(hexGroup);

    const hexRadius = 1.5;
    const spacingX = hexRadius * 1.8;
    const spacingZ = hexRadius * 1.6;
    const cols = 22;
    const rows = 22;

    const steelColor = new THREE.Color('#7f8c9e');
    const amberColor = new THREE.Color('#d48c3a');

    const hexGeo = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 - Math.PI / 6;
      const x = hexRadius * Math.cos(angle);
      const z = hexRadius * Math.sin(angle);
      vertices.push(x, 0, z);
    }
    hexGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const hexMeshes = [];
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows; row++) {
        const offsetX = (row % 2 === 0) ? 0 : spacingX * 0.5;
        const x = (col - cols/2) * spacingX + offsetX;
        const z = (row - rows/2) * spacingZ;
        const dist = Math.sqrt(x*x + z*z);
        if (dist > 18) continue;

        const isAmber = (Math.abs(x) < 6 && Math.abs(z) < 4) || (dist < 7 && Math.random() > 0.7);
        const color = isAmber ? amberColor : steelColor;

        const material = new THREE.LineBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0.2 + 0.1 * (1 - dist / 22),
        });
        const hex = new THREE.LineLoop(hexGeo, material);
        hex.position.set(x, 0, z);
        
        hex.userData = {
          phaseX: Math.random() * 10,
          phaseZ: Math.random() * 10,
          floatSpeed: 0.5 + Math.random() * 0.8,
          floatAmp: 0.08 + Math.random() * 0.12,
          rotSpeed: 0.002 + Math.random() * 0.004,
        };
        
        hexGroup.add(hex);
        hexMeshes.push(hex);
      }
    }

    // --- 2. cyber nodes ---
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const nodePositions = [];
    const nodeCount = 90;

    for (let i = 0; i < nodeCount; i++) {
      const radius = 5 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      let x = radius * Math.sin(phi) * Math.cos(theta);
      let y = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
      let z = radius * Math.cos(phi) * 1.2;
      
      if (i < 20) {
        const r2 = 2 + Math.random() * 3;
        const t2 = Math.random() * Math.PI * 2;
        const p2 = Math.acos((Math.random() * 2) - 1);
        x = r2 * Math.sin(p2) * Math.cos(t2);
        y = r2 * Math.sin(p2) * Math.sin(t2) * 0.8;
        z = r2 * Math.cos(p2) * 1.2;
      }
      
      nodePositions.push(new THREE.Vector3(x, y, z));
    }

    const sphereGeo = new THREE.SphereGeometry(0.18, 8, 8);
    const nodeMeshes = [];
    
    nodePositions.forEach((pos, idx) => {
      const isAmber = idx % 3 === 0 || idx < 15;
      const color = isAmber ? new THREE.Color('#d48c3a') : new THREE.Color('#7f8c9e');
      const material = new THREE.MeshStandardMaterial({
        color: color,
        emissive: isAmber ? new THREE.Color('#d48c3a') : new THREE.Color('#2a3340'),
        emissiveIntensity: isAmber ? 0.25 : 0.08,
        roughness: 0.3,
        metalness: 0.6,
      });
      const sphere = new THREE.Mesh(sphereGeo, material);
      sphere.position.copy(pos);
      sphere.userData = {
        basePos: pos.clone(),
        speed: 0.3 + Math.random() * 0.4,
        amp: 0.2 + Math.random() * 0.5,
        phase: Math.random() * 100,
        axis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
      };
      nodeGroup.add(sphere);
      nodeMeshes.push(sphere);
    });

    // --- 3. dynamic lines ---
    const lineGroup = new THREE.Group();
    scene.add(lineGroup);
    let lineSegments = null;

    function buildLines() {
      while(lineGroup.children.length > 0) {
        lineGroup.remove(lineGroup.children[0]);
      }
      
      const positions = nodeMeshes.map(m => m.position);
      const pairs = [];
      const maxDist = 4.8;
      
      for (let i = 0; i < positions.length; i++) {
        for (let j = i+1; j < positions.length; j++) {
          const dist = positions[i].distanceTo(positions[j]);
          if (dist < maxDist && Math.random() < 0.15) {
            pairs.push([i, j]);
          }
        }
      }
      
      const pointArray = [];
      pairs.forEach(([i, j]) => {
        const p1 = positions[i];
        const p2 = positions[j];
        pointArray.push(p1.x, p1.y, p1.z);
        pointArray.push(p2.x, p2.y, p2.z);
      });
      
      if (pointArray.length === 0) return;
      
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(pointArray, 3));
      
      const material = new THREE.LineBasicMaterial({
        color: 0x7f8c9e,
        transparent: true,
        opacity: 0.18,
      });
      
      const lines = new THREE.LineSegments(geometry, material);
      lineGroup.add(lines);
      lineSegments = lines;
    }

    buildLines();

    // --- lighting ---
    const ambientLight = new THREE.AmbientLight(0x404060, 0.7);
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0xffe6b0, 1.2);
    dirLight.position.set(5, 12, 8);
    scene.add(dirLight);
    
    const backLight = new THREE.DirectionalLight(0x446688, 0.8);
    backLight.position.set(-6, 4, -10);
    scene.add(backLight);

    const fillLight = new THREE.PointLight(0x335577, 0.5);
    fillLight.position.set(0, 6, 0);
    scene.add(fillLight);

    // --- animation loop ---
    let frameCount = 0;
    
    function animate() {
      const elapsed = performance.now() / 1000;

      // hexgrid floating
      hexMeshes.forEach((hex) => {
        const ud = hex.userData;
        const wave = Math.sin(elapsed * ud.floatSpeed + ud.phaseX) * ud.floatAmp;
        hex.position.y = wave;
        hex.rotation.y += ud.rotSpeed * 0.03;
        const pulse = 1 + Math.sin(elapsed * 0.5 + ud.phaseZ) * 0.02;
        hex.scale.set(pulse, pulse, pulse);
      });

      // nodes orbiting
      nodeMeshes.forEach((node) => {
        const ud = node.userData;
        const offset = Math.sin(elapsed * ud.speed + ud.phase) * ud.amp;
        const moveVec = ud.axis.clone().multiplyScalar(offset * 0.2);
        node.position.copy(ud.basePos).add(moveVec);
        node.rotation.x += 0.01;
        node.rotation.y += 0.02;
      });

      // rebuild lines periodically
      frameCount++;
      if (frameCount % 3 === 0) {
        const positions = nodeMeshes.map(m => m.position);
        const pairs = [];
        const maxDist = 5.0;
        
        for (let i = 0; i < positions.length; i++) {
          for (let j = i+1; j < positions.length; j++) {
            const dist = positions[i].distanceTo(positions[j]);
            if (dist < maxDist && Math.random() < 0.12) {
              pairs.push([i, j]);
            }
          }
        }
        
        const pointArray = [];
        pairs.forEach(([i, j]) => {
          const p1 = positions[i];
          const p2 = positions[j];
          pointArray.push(p1.x, p1.y, p1.z);
          pointArray.push(p2.x, p2.y, p2.z);
        });
        
        if (pointArray.length > 0 && lineSegments) {
          const geom = new THREE.BufferGeometry();
          geom.setAttribute('position', new THREE.Float32BufferAttribute(pointArray, 3));
          lineSegments.geometry.dispose();
          lineSegments.geometry = geom;
        }
      }

      // camera orbit
      const camRadius = 18;
      const camAngle = elapsed * 0.03;
      camera.position.x = Math.sin(camAngle) * camRadius * 0.6;
      camera.position.z = Math.cos(camAngle) * camRadius * 0.8 + 4;
      camera.position.y = 5 + Math.sin(elapsed * 0.05) * 1.2;
      camera.lookAt(0, 0.5, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    // --- resize handler ---
    function handleResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener('resize', handleResize);

    // --- cleanup ---
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: 'var(--color-base)' }}
    >
      {/* Gradient overlays to match your original design */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 90% 70% at 50% 0%, transparent 0%, var(--color-base) 75%)",
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div 
        className="absolute inset-0" 
        style={{ 
          background: 'var(--color-base)', 
          opacity: 0.6,
          pointerEvents: 'none',
          zIndex: 1,
        }} 
      />
    </div>
  );
}