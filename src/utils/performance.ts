// src/utils/performance.ts

import { useEffect, useState, useRef } from 'react';

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  const [fps, setFps] = useState(60);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let animationId: number;
    
    const measureFPS = () => {
      frameCount.current++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime.current >= 1000) {
        setFps(frameCount.current);
        frameCount.current = 0;
        lastTime.current = currentTime;
      }
      
      animationId = requestAnimationFrame(measureFPS);
    };
    
    animationId = requestAnimationFrame(measureFPS);
    
    return () => cancelAnimationFrame(animationId);
  }, []);

  return fps;
};

// Intersection Observer hook for lazy loading 3D content
export const useIntersectionObserver = (options: IntersectionObserverInit = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting && !hasIntersected) {
        setHasIntersected(true);
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px',
      ...options,
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasIntersected, options]);

  return { elementRef, isIntersecting, hasIntersected };
};

// Device performance detection
export const getDevicePerformance = () => {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
  
  if (!gl) return 'low';
  
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo ? gl.getParameter((debugInfo as any).UNMASKED_RENDERER_WEBGL) : '';
  
  // Memory check
  const memory = (navigator as any).deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  
  if (memory >= 8 && cores >= 8 && typeof renderer === 'string' && !renderer.toLowerCase().includes('intel')) {
    return 'high';
  } else if (memory >= 4 && cores >= 4) {
    return 'medium';
  }
  
  return 'low';
};

// Adaptive quality settings based on device performance
export const getQualitySettings = () => {
  const performance = getDevicePerformance();
  
  const settings = {
    low: {
      pixelRatio: Math.min(window.devicePixelRatio, 1),
      shadowMapSize: 256,
      antialias: false,
      maxLights: 2,
      geometryDetail: 'low',
      animationFrameSkip: 2,
    },
    medium: {
      pixelRatio: Math.min(window.devicePixelRatio, 1.5),
      shadowMapSize: 512,
      antialias: true,
      maxLights: 3,
      geometryDetail: 'medium',
      animationFrameSkip: 1,
    },
    high: {
      pixelRatio: Math.min(window.devicePixelRatio, 2),
      shadowMapSize: 1024,
      antialias: true,
      maxLights: 4,
      geometryDetail: 'high',
      animationFrameSkip: 0,
    },
  };
  
  return settings[performance];
};

// Throttled animation frame
export const useThrottledFrame = (callback: (state: any) => void, fps: number = 30) => {
  const callbackRef = useRef(callback);
  const lastTimeRef = useRef(0);
  const frameInterval = 1000 / fps;

  callbackRef.current = callback;

  return (state: any) => {
    const currentTime = performance.now();
    if (currentTime - lastTimeRef.current >= frameInterval) {
      callbackRef.current(state);
      lastTimeRef.current = currentTime;
    }
  };
};

// Memory usage monitor
export const useMemoryMonitor = () => {
  const [memoryUsage, setMemoryUsage] = useState<any>(null);

  useEffect(() => {
    const checkMemory = () => {
      if ('memory' in performance) {
        setMemoryUsage((performance as any).memory);
      }
    };

    const interval = setInterval(checkMemory, 5000);
    checkMemory();

    return () => clearInterval(interval);
  }, []);

  return memoryUsage;
};
