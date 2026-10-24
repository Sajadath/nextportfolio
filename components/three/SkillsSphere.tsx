"use client";

import { skills } from "@/data/skillsData";
import {
  DragRotation,
  stepDragRotation,
  useDragRotation,
} from "@/lib/hooks/useDragRotation";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useInView, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { RefObject, useMemo, useRef } from "react";
import * as THREE from "three";

const RADIUS = 2.6;

function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius,
      ),
    );
  }
  return points;
}

function Globe({
  accent,
  labels,
  texts,
  drag,
}: {
  accent: string;
  labels: RefObject<(HTMLDivElement | null)[]>;
  texts: RefObject<(HTMLSpanElement | null)[]>;
  drag: RefObject<DragRotation>;
}) {
  const group = useRef<THREE.Group>(null);
  const positions = useMemo(() => fibonacciSphere(skills.length, RADIUS), []);
  const projected = useMemo(() => new THREE.Vector3(), []);
  const { viewport } = useThree();
  const scale = Math.min(1, viewport.width / 6.2);
  const radius = RADIUS * scale;

  useFrame((state, delta) => {
    const g = group.current;
    const r = drag.current;
    if (!g || !r) return;
    stepDragRotation(r, delta, 0.22);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, r.y, 8, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, r.x, 8, delta);
    g.updateMatrixWorld();

    const { width, height } = state.size;
    positions.forEach((position, i) => {
      const node = labels.current[i];
      if (!node) return;
      projected.copy(position).applyMatrix4(g.matrixWorld);
      const depth = (projected.z + radius) / (radius * 2);
      projected.project(state.camera);
      const x = (projected.x * 0.5 + 0.5) * width;
      const y = (-projected.y * 0.5 + 0.5) * height;
      node.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${0.6 + depth * 0.5})`;
      node.style.opacity = String(0.1 + depth * 0.9);
      node.style.zIndex = String(Math.round(depth * 100));
      node.style.filter = depth < 0.35 ? "blur(1.5px)" : "none";
      const text = texts.current[i];
      if (text)
        text.style.opacity = depth > 0.62 ? String((depth - 0.62) / 0.38) : "0";
    });
  });

  return (
    <group ref={group} scale={scale}>
      <mesh>
        <sphereGeometry args={[RADIUS * 0.98, 28, 28]} />
        <meshBasicMaterial
          color={accent}
          wireframe
          transparent
          opacity={0.05}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.5} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.34, 32, 32]} />
        <meshBasicMaterial color={accent} transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

export default function SkillsSphere() {
  const wrapper = useRef<HTMLDivElement>(null);
  const labels = useRef<(HTMLDivElement | null)[]>([]);
  const texts = useRef<(HTMLSpanElement | null)[]>([]);
  const inView = useInView(wrapper, { margin: "150px" });
  const reduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const { rotation, handlers } = useDragRotation();
  const accent = resolvedTheme === "light" ? "#00a85a" : "#00ff88";

  return (
    <div
      ref={wrapper}
      {...handlers}
      className="relative isolate h-full w-full touch-pan-y select-none"
      data-cursor="Drag"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        frameloop={inView && !reduceMotion ? "always" : "demand"}
        className="pointer-events-none"
      >
        <Globe accent={accent} labels={labels} texts={texts} drag={rotation} />
      </Canvas>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {skills.map((skill, i) => {
          const Icon = skill.Icon;
          return (
            <div
              key={skill.text}
              ref={(node) => {
                labels.current[i] = node;
              }}
              style={{ opacity: 0 }}
              className="absolute top-0 left-0 flex flex-col items-center gap-1 will-change-transform"
            >
              <div className="dark:border-mainGreen/30 grid size-10 place-items-center rounded-xl border border-emerald-600/30 bg-white/85 shadow-[0_0_18px_rgba(0,255,136,0.22)] dark:bg-black/70">
                <Icon className="dark:text-mainGreen size-[18px] text-emerald-600" />
              </div>
              <span
                ref={(node) => {
                  texts.current[i] = node;
                }}
                className="text-[9px] font-semibold tracking-wider whitespace-nowrap text-black uppercase dark:text-white"
              >
                {skill.text}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
