// src/components/OptimizedCanvas.tsx

import React, { Suspense, memo, useMemo, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { useIntersectionObserver, getQualitySettings } from '../utils/performance';

interface OptimizedCanvasProps {
  children: React.ReactNode;
  className?: string;
  camera?: any;
  style?: React.CSSProperties;
  dpr?: [number, number];
}

const OptimizedCanvas: React.FC<OptimizedCanvasProps> = memo(({ 
  children, 
  className = "", 
  camera = { position: [0, 0, 5], fov: 50 },
  style = {},
  dpr
}) => {
  const { elementRef, isIntersecting, hasIntersected } = useIntersectionObserver({
    threshold: 0.05,
    rootMargin: '100px',
  });

  const qualitySettings = useMemo(() => getQualitySettings(), []);
  const [isReady, setIsReady] = useState(false);
  const [isDegraded, setDegraded] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // Delay rendering to prevent blocking main thread
  useEffect(() => {
    if (hasIntersected && !isReady) {
      timeoutRef.current = setTimeout(() => {
        setIsReady(true);
      }, 50); // Small delay to let other operations complete
    }

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hasIntersected, isReady]);

  // Only render canvas if it has been intersected and is ready
  const shouldRender = hasIntersected && isReady;

  return (
    <div 
      ref={elementRef} 
      className={className}
      style={style}
    >
      {shouldRender && !isDegraded ? (
        <Suspense fallback={null}>
          <Canvas
            camera={camera}
            dpr={dpr || qualitySettings.pixelRatio}
            performance={{ min: 0.5 }}
            frameloop={isIntersecting ? 'always' : 'never'}
            style={{ 
              pointerEvents: 'none',
              ...style 
            }}
            gl={{
              antialias: qualitySettings.antialias,
              alpha: true,
              powerPreference: 'high-performance',
              stencil: false,
              depth: false,
              preserveDrawingBuffer: false, // Better performance
              failIfMajorPerformanceCaveat: true, // Skip on low-end devices
            }}
          >
            <PerformanceMonitor 
              onDecline={() => setDegraded(true)}
              threshold={0.7} // Performance threshold to trigger fallback
              iterations={3} // Number of frames to wait before triggering
            />
            {children}
          </Canvas>
        </Suspense>
      ) : shouldRender && isDegraded ? (
        // Fallback static background when performance is degraded
        <div 
          className="w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.3,
          }}
        />
      ) : null}
    </div>
  );
});

OptimizedCanvas.displayName = 'OptimizedCanvas';

export default OptimizedCanvas;
