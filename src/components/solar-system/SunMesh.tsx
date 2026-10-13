import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SUN_DATA } from '../../data/planets';

interface SunMeshProps {
  onSelect: () => void;
  isSelected: boolean;
}

export const SunMesh: React.FC<SunMeshProps> = ({ onSelect, isSelected }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.z -= delta * 0.02;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Omnidirectional Light source */}
      <pointLight color="#FFE2A4" intensity={3.5} distance={200} decay={1.2} />
      <ambientLight intensity={0.12} />

      {/* Sun Body */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <sphereGeometry args={[SUN_DATA.radiusVisual, 48, 48]} />
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FF8C00"
          emissiveIntensity={2.0}
          roughness={0.4}
        />
      </mesh>

      {/* Corona Atmosphere Glow */}
      <mesh ref={coronaRef} scale={1.2}>
        <sphereGeometry args={[SUN_DATA.radiusVisual, 32, 32]} />
        <meshBasicMaterial
          color="#FF9F1C"
          transparent
          opacity={isSelected ? 0.35 : 0.2}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
};
