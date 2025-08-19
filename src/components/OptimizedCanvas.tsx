// src/components/OptimizedCanvas.tsx

import React, { Suspense, memo, useMemo, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useIntersectionObserver, getQualitySettings } from '../utils/performance';

interface OptimizedCanvasProps {
  children: React.ReactNode;
  className?: string;
  camera?: any;
  style?: React.CSSProperties;
}

const OptimizedCanvas: React.FC<OptimizedCanvasProps> = memo(({ 
  children, 
  className = "", 
  camera = { position: [0, 0, 5], fov: 50 },
  style = {}
}) => {
  const { elementRef, isIntersecting, hasIntersected } = useIntersectionObserver({
    threshold: 0.05,
    rootMargin: '100px',
  });

  const qualitySettings = useMemo(() => getQualitySettings(), []);
  const [isReady, setIsReady] = useState(false);
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
      {shouldRender && (
        <Suspense fallback={null}>
          <Canvas
            camera={camera}
            dpr={qualitySettings.pixelRatio}
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
            {children}
          </Canvas>
        </Suspense>
      )}
    </div>
  );
});

OptimizedCanvas.displayName = 'OptimizedCanvas';

export default OptimizedCanvas;
