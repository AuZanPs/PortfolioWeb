// src/utils/preloader.ts

// Preload critical resources for better performance
export const preloadCriticalResources = () => {
  // Preload Three.js core components when idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      import('@react-three/fiber');
      import('@react-three/drei');
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      import('@react-three/fiber');
      import('@react-three/drei');
    }, 2000);
  }
};

// Preload images and assets
export const preloadImages = (imageUrls: string[]) => {
  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

// Preload fonts
export const preloadFonts = () => {
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.as = 'font';
  fontLink.type = 'font/woff2';
  fontLink.href = 'https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxjPVmUsaaDhw.woff2';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);
};

// Optimize resource loading
export const initializePerformanceOptimizations = () => {
  // Preload critical resources
  preloadCriticalResources();
  
  // Preload fonts
  preloadFonts();
  
  // Set up performance observer for monitoring
  if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        // Log performance metrics in development
        if (import.meta.env.DEV) {
          console.log(`${entry.name}: ${entry.duration}ms`);
        }
      });
    });
    
    observer.observe({ entryTypes: ['navigation', 'paint'] });
  }
};
