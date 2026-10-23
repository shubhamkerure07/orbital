import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetData } from '../../types';

interface PlanetMeshProps {
  planet: PlanetData;
  speedMultiplier: number;
  isPaused: boolean;
  isSelected: boolean;
  onSelect: (planet: PlanetData) => void;
  showLabels: boolean;
}

export const PlanetMesh: React.FC<PlanetMeshProps> = ({
  planet,
  speedMultiplier,
  isPaused,
  isSelected,
  onSelect,
  showLabels
}) => {
  const orbitGroupRef = useRef<THREE.Group>(null);
  const planetMeshRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Initial random orbit offset so all planets don't align in a line
  const initialOffset = useRef((planet.orderFromSun * 1.618) % (Math.PI * 2));

  useFrame((_, delta) => {
    if (!isPaused && orbitGroupRef.current) {
      // Orbital revolution speed is inversely related to orbital period
      // Kepler's 3rd law approximation for visual pacing
      const orbitSpeed = (1 / Math.sqrt(planet.orbitRadiusVisual)) * 0.4 * speedMultiplier;
      orbitGroupRef.current.rotation.y += delta * orbitSpeed;
    }

    if (!isPaused && planetMeshRef.current) {
      // Axial rotation
      const spinSpeed = 0.5 * speedMultiplier;
      planetMeshRef.current.rotation.y += delta * spinSpeed;
    }

    if (!isPaused && moonRef.current) {
      moonRef.current.rotation.y += delta * 1.5 * speedMultiplier;
    }
  });

  const tiltRad = (planet.axialTiltDegrees * Math.PI) / 180;

  return (
    <group ref={orbitGroupRef} rotation={[0, initialOffset.current, 0]}>
      {/* Planet Container at orbit radius */}
      <group position={[planet.orbitRadiusVisual, 0, 0]}>
        
        {/* Axial Tilt Wrapper */}
        <group rotation={[tiltRad, 0, 0]}>
          <mesh
            ref={planetMeshRef}
            name={`planet-${planet.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(planet);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHovered(true);
            }}
            onPointerOut={() => setHovered(false)}
            scale={hovered || isSelected ? 1.15 : 1.0}
          >
            <sphereGeometry args={[planet.sizeVisualScale, 36, 36]} />
            <meshStandardMaterial
              color={planet.colorHex}
              roughness={0.7}
              metalness={0.1}
              emissive={hovered || isSelected ? planet.accentColor : '#000000'}
              emissiveIntensity={hovered || isSelected ? 0.35 : 0}
            />
          </mesh>

          {/* Planetary Rings (Saturn, Uranus) */}
          {planet.hasRings && planet.ringsRadiusInner && planet.ringsRadiusOuter && (
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry
                args={[
                  planet.sizeVisualScale * planet.ringsRadiusInner,
                  planet.sizeVisualScale * planet.ringsRadiusOuter,
                  64
                ]}
              />
              <meshStandardMaterial
                color={planet.colorHex}
                roughness={0.8}
                metalness={0.2}
                side={THREE.DoubleSide}
                transparent
                opacity={0.75}
              />
            </mesh>
          )}

          {/* Earth's Moon */}
          {planet.id === 'earth' && (
            <group ref={moonRef}>
              <mesh position={[1.8, 0, 0]} scale={0.22}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshStandardMaterial color="#D1D5DB" roughness={0.9} />
              </mesh>
            </group>
          )}
        </group>

        {/* Hover Highlight Ring */}
        {(hovered || isSelected) && (
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry
              args={[
                planet.sizeVisualScale * 1.3,
                planet.sizeVisualScale * 1.45,
                32
              ]}
            />
            <meshBasicMaterial
              color={isSelected ? '#F59E0B' : '#38BDF8'}
              side={THREE.DoubleSide}
              transparent
              opacity={0.8}
            />
          </mesh>
        )}

        {/* Planet Label Indicator */}
        {showLabels && (
          <Html
            position={[0, planet.sizeVisualScale + 0.6, 0]}
            center
            distanceFactor={30}
            style={{ pointerEvents: 'none' }}
          >
            <div className={`px-2 py-0.5 rounded text-[11px] font-mono whitespace-nowrap transition-all border ${
              isSelected
                ? 'bg-gold-500/90 text-space-950 font-bold border-gold-400 shadow-lg'
                : hovered
                ? 'bg-space-900/90 text-gold-400 border-gold-500/40 shadow'
                : 'bg-space-950/70 text-slate-300 border-slate-700/60 backdrop-blur-sm'
            }`}>
              {planet.name}
            </div>
          </Html>
        )}
      </group>
    </group>
  );
};
