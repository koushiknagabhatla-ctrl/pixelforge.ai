import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════
   AURORA PARTICLE FIELD — Cursor-reactive 3D system
   ═══════════════════════════════════════════════════ */

const FloatingRing = ({ radius = 2.5, tubeRadius = 0.02, color = '#6366f1' }) => {
  const ref = useRef();
  
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const mx = state.mouse.x * 0.6;
    const my = state.mouse.y * 0.4;
    
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -my * Math.PI * 0.3 + t * 0.08, 0.03);
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mx * Math.PI * 0.3, 0.03);
    ref.current.rotation.z = t * 0.05;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, tubeRadius, 64, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.25} />
    </mesh>
  );
};

const FloatingOrb = () => {
  const ref = useRef();
  
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const mx = state.mouse.x;
    const my = state.mouse.y;
    
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mx * 2, 0.02);
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, my * 1.5, 0.02);
    ref.current.rotation.y = t * 0.15;
    ref.current.rotation.x = t * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <group ref={ref}>
        {/* Inner glowing sphere */}
        <mesh>
          <icosahedronGeometry args={[0.6, 2]} />
          <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.15} />
        </mesh>
        {/* Outer shell */}
        <mesh>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.08} />
        </mesh>
      </group>
    </Float>
  );
};

const AuroraParticles = ({ count = 3000 }) => {
  const ref = useRef();
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Spread particles in a wide flat disc with some vertical spread
      const angle = Math.random() * Math.PI * 2;
      const r = 1 + Math.random() * 6;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const mx = state.mouse.x * 0.3;
    const my = state.mouse.y * 0.2;
    
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, mx + t * 0.02, 0.015);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -my, 0.015);
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial 
        transparent 
        color="#a5b4fc" 
        size={0.012} 
        sizeAttenuation 
        depthWrite={false} 
        blending={THREE.AdditiveBlending} 
        opacity={0.5} 
      />
    </Points>
  );
};

export default function Background3D() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Delay mount slightly so page renders first
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.7 }}>
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }} 
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#818cf8" />
        
        <FloatingOrb />
        <FloatingRing radius={3} color="#6366f1" />
        <FloatingRing radius={4} tubeRadius={0.01} color="#818cf8" />
        <AuroraParticles />
      </Canvas>
    </div>
  );
}
