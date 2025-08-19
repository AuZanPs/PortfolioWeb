// src/components/LazyThreeComponents.tsx

import { lazy, Suspense } from 'react';
import { useIntersectionObserver } from '../utils/performance';

// Lazy load Three.js components only when needed
const ThreeCanvas = lazy(() => import('@react-three/fiber').then(module => ({ 
  default: module.Canvas 
})));

const ThreeSphere = lazy(() => import('@react-three/drei').then(module => ({ 
  default: module.Sphere 
})));

const ThreeBox = lazy(() => import('@react-three/drei').then(module => ({ 
  default: module.Box 
})));

const ThreeOctahedron = lazy(() => import('@react-three/drei').then(module => ({ 
  default: module.Octahedron 
})));

const ThreeTorus = lazy(() => import('@react-three/drei').then(module => ({ 
  default: module.Torus 
})));

const MeshDistortMaterial = lazy(() => import('@react-three/drei').then(module => ({ 
  default: module.MeshDistortMaterial 
})));

// Optimized Three.js loader with intersection observer
export const LazyThreeCanvas = ({ 
  children, 
  className, 
  camera, 
  ...props 
}: any) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });

  return (
    <div ref={elementRef} className={className}>
      {hasIntersected && (
        <Suspense fallback={<div className="w-full h-full bg-transparent" />}>
          <ThreeCanvas camera={camera} {...props}>
            {children}
          </ThreeCanvas>
        </Suspense>
      )}
    </div>
  );
};

// Export lazy components
export { ThreeSphere, ThreeBox, ThreeOctahedron, ThreeTorus, MeshDistortMaterial };
