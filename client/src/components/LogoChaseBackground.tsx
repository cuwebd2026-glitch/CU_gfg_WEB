import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

function ChaseModel() {
  const { scene } = useGLTF('/model/gfg-logo.glb');
  const group = useRef<THREE.Group>(null);

  // Force the model to be GFG Green
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: '#2F8D46',
          roughness: 0.2,
          metalness: 0.8
        });
      }
    });
  }, [scene]);

  useFrame((state) => {
    if (group.current) {
      // Gentle rotation
      group.current.rotation.y = state.clock.elapsedTime * 0.3;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      
      // Moving left to right based on scroll position
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollRatio = scrollY / maxScroll; // 0 to 1
      
      const xRange = 8; // -8 (left) to +8 (right)
      const targetX = -xRange + (scrollRatio * xRange * 2);
      
      // Smooth out the movement slightly
      group.current.position.x += (targetX - group.current.position.x) * 0.1;
      
      // Hover slightly up and down
      group.current.position.y = Math.sin(state.clock.elapsedTime) * 1.5;
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={0.75} />
    </group>
  );
}

export default function LogoChaseBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-[0] opacity-40 dark:opacity-50 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2.5} />
        <Environment preset="city" />
        <Suspense fallback={null}>
          <ChaseModel />
        </Suspense>
      </Canvas>
    </div>
  );
}