// src/components/OptimizedCanvas.tsx

import React, { Suspense, memo, useMemo } from 'react';
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

  // Only render canvas if it has been intersected at least once
  const shouldRender = hasIntersected;

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
