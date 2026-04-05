/**
 * 性能分析工具
 */

class PerformanceCollector {
  private metrics: Map<string, number> = new Map();
  private marks: Map<string, number> = new Map();

  mark(name: string) {
    this.marks.set(name, performance.now());
  }

  measure(name: string, startMark: string, endMark?: string) {
    const start = this.marks.get(startMark);
    if (!start) {
      console.warn(`Start mark "${startMark}" not found`);
      return;
    }

    const end = endMark ? this.marks.get(endMark) : performance.now();
    if (!end) {
      console.warn(`End mark "${endMark}" not found`);
      return;
    }

    this.metrics.set(name, end - start);
    return end - start;
  }

  getMetrics() {
    return Object.fromEntries(this.metrics);
  }

  getMarks() {
    return Object.fromEntries(this.marks);
  }

  clear() {
    this.metrics.clear();
    this.marks.clear();
  }
}

export const performanceCollector = new PerformanceCollector();

export interface WebVitals {
  FCP?: number;
  LCP?: number;
  FID?: number;
  CLS?: number;
  TTFB?: number;
}

export async function collectWebVitals(): Promise<WebVitals> {
  return new Promise((resolve) => {
    const vitals: WebVitals = {};
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "paint") {
          const paintEntry = entry as PerformancePaintTiming;
          if (paintEntry.name === "first-contentful-paint") {
            vitals.FCP = paintEntry.startTime;
          }
        }
        if (entry.entryType === "navigation") {
          const navEntry = entry as PerformanceNavigationTiming;
          vitals.TTFB = navEntry.responseStart - navEntry.requestStart;
        }
      }
    });

    setTimeout(() => {
      observer.disconnect();
      resolve(vitals);
    }, 3000);

    try {
      observer.observe({ entryTypes: ["paint", "navigation"] });
    } catch {
      // 某些环境可能不支持
    }
  });
}

export function analyzeBundleSize() {
  if (import.meta.env.PROD && window.performance) {
    const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
    const jsResources = resources.filter((r) => r.name.endsWith(".js"));
    const totalSize = jsResources.reduce((acc, r) => acc + r.transferSize, 0);

    return {
      totalSize,
      totalSizeFormatted: formatBytes(totalSize),
      resources: jsResources.map((r) => ({
        name: r.name.split("/").pop(),
        size: r.transferSize,
        sizeFormatted: formatBytes(r.transferSize),
        duration: r.duration,
      })),
    };
  }
  return null;
}

export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function getMemoryUsage(): { usedJSHeapSize: number; totalJSHeapSize: number } | null {
  // @ts-expect-error - memory 是 Chrome 特有的 API
  const memory = window.performance?.memory;
  if (memory) {
    return {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
    };
  }
  return null;
}

interface RenderStats {
  count: number;
  average: number;
  min: number;
  max: number;
}

interface RenderTracker {
  track: (componentName: string, renderTime: number) => void;
  getStats: (componentName: string) => RenderStats | null;
}

export function createRenderTracker(): RenderTracker {
  const renderTimes: Map<string, number[]> = new Map();

  return {
    track(componentName: string, renderTime: number) {
      const times = renderTimes.get(componentName) || [];
      times.push(renderTime);
      if (times.length > 10) {
        times.shift();
      }
      renderTimes.set(componentName, times);
    },

    getStats(componentName: string): RenderStats | null {
      const times = renderTimes.get(componentName);
      if (!times || times.length === 0) return null;
      return {
        count: times.length,
        average: times.reduce((a, b) => a + b, 0) / times.length,
        min: Math.min(...times),
        max: Math.max(...times),
      };
    },
  };
}

export const renderTracker = createRenderTracker();
