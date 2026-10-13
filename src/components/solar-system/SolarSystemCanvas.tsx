import React, { useState, useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { PLANETS } from '../../data/planets';
import { PlanetData } from '../../types';
import { SunMesh } from './SunMesh';
import { PlanetMesh } from './PlanetMesh';
import { OrbitRing } from './OrbitRing';
import { SolarSystemControls } from './SolarSystemControls';
import { PlanetInfoSheet } from './PlanetInfoSheet';
import { SolarFallback2D } from './SolarFallback2D';
import { LoadingSpinner } from '../common/LoadingSpinner';

/**
 * CameraController lerps the camera towards the focused planet or returns to overview
 */
function CameraController({
  selectedPlanet,
  resetTrigger
}: {
  selectedPlanet: PlanetData | null;
  resetTrigger: number;
}) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);

  // When resetTrigger changes, reset camera to overview position
  useEffect(() => {
    if (resetTrigger > 0) {
      camera.position.set(0, 45, 65);
      camera.lookAt(0, 0, 0);
    }
  }, [resetTrigger, camera]);

  useFrame(() => {
    if (selectedPlanet) {
      // Find approximate target
      const targetPos = new THREE.Vector3(selectedPlanet.orbitRadiusVisual, 0, 0);
      const desiredCamPos = new THREE.Vector3(
        selectedPlanet.orbitRadiusVisual + selectedPlanet.sizeVisualScale * 3.5,
        selectedPlanet.sizeVisualScale * 2.5,
        selectedPlanet.sizeVisualScale * 4
      );
      camera.position.lerp(desiredCamPos, 0.04);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      minDistance={4}
      maxDistance={140}
      maxPolarAngle={Math.PI / 2 + 0.1}
      dampingFactor={0.05}
    />
  );
}

// Simple Error Boundary for WebGL canvas
class WebGLErrorBoundary extends React.Component<
  { fallback: React.ReactNode; children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const SolarSystemCanvas: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [resetTrigger, setResetTrigger] = useState<number>(0);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);
  const [cameraZoomStep, setCameraZoomStep] = useState<number>(0);

  // Check WebGL availability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setWebGLSupported(supported);
    } catch {
      setWebGLSupported(false);
    }
  }, []);

  const handleResetCamera = () => {
    setSelectedPlanet(null);
    setResetTrigger(prev => prev + 1);
  };

  const handleZoomIn = () => {
    setCameraZoomStep(prev => prev + 1);
    // Camera trigger
    setResetTrigger(prev => prev + 0.001);
  };

  const handleZoomOut = () => {
    setCameraZoomStep(prev => prev - 1);
    setResetTrigger(prev => prev - 0.001);
  };

  const fallbackUI = (
    <SolarFallback2D
      onSelectPlanet={(p) => setSelectedPlanet(p)}
      selectedPlanet={selectedPlanet}
      speedMultiplier={speedMultiplier}
      isPaused={isPaused}
      showLabels={showLabels}
    />
  );

  return (
    <div className="relative w-full h-[700px] lg:h-[820px] bg-space-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      
      {/* 3D R3F Viewport or 2D Fallback */}
      {!webGLSupported ? (
        fallbackUI
      ) : (
        <WebGLErrorBoundary fallback={fallbackUI}>
          <Suspense fallback={<LoadingSpinner message="Synthesizing orbital vectors..." size="lg" />}>
            <Canvas
              camera={{ position: [0, 48, 68], fov: 45, near: 0.1, far: 500 }}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
            >
              <color attach="background" args={['#050608']} />
              
              {/* Starfield */}
              <Stars radius={160} depth={60} count={3500} factor={4} saturation={0.3} fade speed={1} />
              
              {/* Camera & Controls */}
              <CameraController
                selectedPlanet={selectedPlanet}
                resetTrigger={resetTrigger}
              />

              {/* Central Sun */}
              <SunMesh
                onSelect={() => setSelectedPlanet(null)}
                isSelected={!selectedPlanet}
              />

              {/* Orbit Paths and Planets */}
              {PLANETS.map((planet) => (
                <React.Fragment key={planet.id}>
                  <OrbitRing radius={planet.orbitRadiusVisual} />
                  <PlanetMesh
                    planet={planet}
                    speedMultiplier={speedMultiplier}
                    isPaused={isPaused}
                    isSelected={selectedPlanet?.id === planet.id}
                    onSelect={(p) => setSelectedPlanet(p)}
                    showLabels={showLabels}
                  />
                </React.Fragment>
              ))}
            </Canvas>
          </Suspense>
        </WebGLErrorBoundary>
      )}

      {/* Floating System Controls at Bottom Left */}
      <div className="absolute bottom-4 left-4 z-20 max-w-[calc(100%-2rem)]">
        <SolarSystemControls
          speed={speedMultiplier}
          onSpeedChange={setSpeedMultiplier}
          isPaused={isPaused}
          onTogglePause={() => setIsPaused(prev => !prev)}
          showLabels={showLabels}
          onToggleLabels={() => setShowLabels(prev => !prev)}
          onResetCamera={handleResetCamera}
          selectedPlanet={selectedPlanet}
          onSelectPlanet={(p) => setSelectedPlanet(p)}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
        />
      </div>

      {/* Scientific Legend Badge Top Left */}
      <div className="absolute top-4 left-4 z-20 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-space-900/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-slate-400">
        <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
        <span>Scale: Normalized Ephemeris Distance Ratio • 3D Real-time R3F</span>
      </div>

      {/* Planet Detail Side Sheet */}
      <PlanetInfoSheet
        planet={selectedPlanet}
        onClose={() => setSelectedPlanet(null)}
      />
    </div>
  );
};
