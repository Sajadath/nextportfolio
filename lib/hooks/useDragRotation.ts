"use client";

import { useMemo, useRef } from "react";

export type DragRotation = {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  dragging: boolean;
};

/**
 * Pointer-delta based rotation. Unlike pointer-position tracking it never
 * depends on the element's on-screen rect, so scrolling can't cause jumps.
 */
export function useDragRotation(sensitivity = 0.008) {
  const rotation = useRef<DragRotation>({
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    dragging: false,
  });
  const last = useRef({ x: 0, y: 0 });

  const handlers = useMemo(
    () => ({
      onPointerDown: (e: React.PointerEvent<HTMLElement>) => {
        if (e.button !== 0) return;
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {}
        rotation.current.dragging = true;
        rotation.current.velocityX = 0;
        rotation.current.velocityY = 0;
        last.current = { x: e.clientX, y: e.clientY };
      },
      onPointerMove: (e: React.PointerEvent<HTMLElement>) => {
        const r = rotation.current;
        if (!r.dragging) return;
        const dx = (e.clientX - last.current.x) * sensitivity;
        const dy = (e.clientY - last.current.y) * sensitivity;
        last.current = { x: e.clientX, y: e.clientY };
        r.y += dx;
        r.x = Math.max(-1.2, Math.min(1.2, r.x + dy));
        r.velocityY = dx;
        r.velocityX = dy;
      },
      onPointerUp: (e: React.PointerEvent<HTMLElement>) => {
        rotation.current.dragging = false;
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      },
      onPointerCancel: () => {
        rotation.current.dragging = false;
      },
    }),
    [sensitivity],
  );

  return { rotation, handlers };
}

/** Applies inertia + idle spin; call once per frame. */
export function stepDragRotation(
  r: DragRotation,
  delta: number,
  idleSpeed: number,
) {
  if (r.dragging) return;
  const decay = Math.pow(0.04, delta);
  r.y += r.velocityY + idleSpeed * delta;
  r.x = Math.max(-1.2, Math.min(1.2, r.x + r.velocityX));
  r.velocityX *= decay;
  r.velocityY *= decay;
  r.x *= Math.pow(0.6, delta);
}
