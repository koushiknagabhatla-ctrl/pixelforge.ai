import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment, ContactShadows, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleSphere = ({ count = 2000 }) => {
  const points = useRef();
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = 2 + (Math.random() * 0.5); // Add a little variance
        
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    const time = state.clock.getElapsedTime();
    // Rotate slowly over time
    points.current.rotation.y = time * 0.05;
    points.current.rotation.x = time * 0.02;

    // React to mouse tracking (mouse position goes from -1 to 1)
    const targetX = state.mouse.x * 0.5;
    const targetY = state.mouse.y * 0.5;

    points.current.rotation.y += (targetX - points.current.rotation.y) * 0.05;
    points.current.rotation.x += (-targetY - points.current.rotation.x) * 0.05;
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#ffffff" size={0.015} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.4} />
    </Points>
  );
};

const AbstractModel = () => {
    const meshRef = useRef();

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        const targetX = state.mouse.x * Math.PI * 0.2;
        const targetY = state.mouse.y * Math.PI * 0.2;

        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetX + time * 0.1, 0.05);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, -targetY + time * 0.1, 0.05);
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={meshRef}>
                <icosahedronGeometry args={[1.5, 1]} />
                <meshPhysicalMaterial 
                    color="#aaaaaa" 
                    metalness={1} 
                    roughness={0.1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    wireframe={true}
                    transparent={true}
                    opacity={0.3}
                />
            </mesh>
        </Float>
    );
};

export default function Background3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        
        {/* Core Geometry */}
        <AbstractModel />
        
        {/* Outer Particle Shell */}
        <ParticleSphere />
        
        <Environment preset="city" />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  );
}
