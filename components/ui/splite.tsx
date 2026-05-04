"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Lazy load when section enters viewport (idle + intersection)
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const idle =
      "requestIdleCallback" in window
        ? (cb: () => void) =>
            (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(cb)
        : (cb: () => void) => setTimeout(cb, 1);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          idle(() => setShouldLoad(true));
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  // Forward document mouse to Spline canvas so the robot follows the cursor
  // even when mouse is outside the Spline div (e.g. over text content).
  useEffect(() => {
    if (!shouldLoad) return;
    let canvas: HTMLCanvasElement | null = null;

    const findCanvas = () => {
      const c = wrapperRef.current?.querySelector("canvas");
      if (c) canvas = c as HTMLCanvasElement;
    };

    // Canvas is created after Spline mounts; poll briefly.
    const pollInterval = setInterval(() => {
      findCanvas();
      if (canvas) clearInterval(pollInterval);
    }, 200);

    const handle = (e: MouseEvent) => {
      if (!canvas) findCanvas();
      if (!canvas) return;

      // Dispatch a synthetic pointer event scoped to the canvas with the
      // window-level coordinates. Spline's interaction system reads
      // clientX/clientY relative to its canvas bounding rect, so passing the
      // raw window coordinates lets the robot track the global cursor.
      const event = new PointerEvent("pointermove", {
        clientX: e.clientX,
        clientY: e.clientY,
        pointerType: "mouse",
        bubbles: false,
        cancelable: true,
      });
      canvas.dispatchEvent(event);
    };

    window.addEventListener("mousemove", handle, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handle);
      clearInterval(pollInterval);
    };
  }, [shouldLoad]);

  return (
    <div ref={wrapperRef} className={className}>
      {shouldLoad ? (
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
            </div>
          }
        >
          <Spline scene={scene} className="w-full h-full" />
        </Suspense>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
