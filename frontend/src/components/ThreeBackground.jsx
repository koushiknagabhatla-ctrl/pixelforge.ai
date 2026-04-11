import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';

const DynamicGeometry = ({ position, color, scale, speed, mouse }) => {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Internal constant rotation and floating
    meshRef.current.rotation.x = time * speed;
    meshRef.current.rotation.y = time * (speed * 1.5);
    meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.4;

    // Reacting to mouse bounds (parallax sliding)
    if (mouse && mouse.current) {
       const targetX = (mouse.current.x * 2 - 1) * 2; // -2 to 2 range
       const targetY = -(mouse.current.y * 2 - 1) * 2; 
       
       // Linear interpolation for smooth catching
       meshRef.current.position.x += (targetX + position[0] - meshRef.current.position.x) * 0.05;
       meshRef.current.position.y += (targetY + position[1] - meshRef.current.position.y) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial 
         color={color} 
         wireframe={true}
         transparent={true} 
         opacity={0.15}
         emissive={color}
         emissiveIntensity={0.8}
      />
    </mesh>
  );
}

export default function ThreeBackground({ mouse }) {
  const models = useMemo(() => [
     { position: [-4, 2, -5], color: '#ffffff', scale: 2.2, speed: 0.15 },
     { position: [5, -3, -8], color: '#aaaaaa', scale: 3.5, speed: 0.1 },
     { position: [-3, -4, -4], color: '#ffffff', scale: 1.5, speed: 0.2 },
     { position: [4, 4, -6], color: '#dddddd', scale: 2.5, speed: 0.12 },
     { position: [0, 0, -12], color: '#666666', scale: 4.5, speed: 0.05 }
  ], []);

  return (
    <div className="absolute inset-0 w-full h-[100vh] -z-20 overflow-hidden pointer-events-none bg-[#010101]">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} className="w-full h-full">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#555555" />
        {models.map((model, i) => (
           <DynamicGeometry key={i} {...model} mouse={mouse} />
        ))}
      </Canvas>
      {/* Fallback fog overlay to blend the 3D models with the background content strictly */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#010101]/60 to-[#010101] z-10" />
    </div>
  );
}
