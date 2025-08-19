// src/components/PerformanceMonitor.tsx

import { useEffect, useState } from 'react';
import { usePerformanceMonitor, useMemoryMonitor } from '../utils/performance';

const PerformanceMonitor = () => {
  const fps = usePerformanceMonitor();
  const memory = useMemoryMonitor();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'P') {
        setIsVisible(!isVisible);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 left-4 z-50 glass p-4 rounded-lg text-sm font-mono">
      <div className="space-y-2">
        <div className="text-gradient-accent font-bold">Performance Monitor</div>
        <div className={`${fps >= 55 ? 'text-green-600' : fps >= 30 ? 'text-yellow-600' : 'text-red-600'}`}>
          FPS: {fps}
        </div>
        {memory && (
          <>
            <div className="text-slate-600">
              Used JS Heap: {(memory.usedJSHeapSize / 1024 / 1024).toFixed(1)} MB
            </div>
            <div className="text-slate-600">
              Total JS Heap: {(memory.totalJSHeapSize / 1024 / 1024).toFixed(1)} MB
            </div>
            <div className="text-slate-600">
              Heap Limit: {(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(1)} MB
            </div>
          </>
        )}
        <div className="text-xs text-slate-500 mt-2">
          Press Ctrl+Shift+P to toggle
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
