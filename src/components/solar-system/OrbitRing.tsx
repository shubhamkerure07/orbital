import React from 'react';
import * as THREE from 'three';

interface OrbitRingProps {
  radius: number;
  color?: string;
  opacity?: number;
}

export const OrbitRing: React.FC<OrbitRingProps> = ({
  radius,
  color = '#475569',
  opacity = 0.25
}) => {
  // Using a very thin ring geometry ensures robust rendering across all WebGL implementations
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.04, radius + 0.04, 96]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
};
