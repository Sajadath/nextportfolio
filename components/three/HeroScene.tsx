"use client";

import { DragRotation, stepDragRotation } from "@/lib/hooks/useDragRotation";
import {
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
  Sparkles,
  Trail,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useInView, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { RefObject, useMemo, useRef } from "react";
import * as THREE from "three";

type Palette = {
  accent: string;
  secondary: string;
  core: string;
  gem: string;
  dark: boolean;
};

const fresnelVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const fresnelFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uPower;
  uniform float uIntensity;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float f = pow(1.0 - abs(dot(vNormal, vView)), uPower);
    gl_FragColor = vec4(uColor, f * uIntensity);
  }
`;

function Halo({ palette, radius }: { palette: Palette; radius: number }) {
  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(palette.accent) },
      uPower: { value: 3.6 },
      uIntensity: { value: palette.dark ? 0.75 : 0.6 },
    }),
    [palette.accent, palette.dark],
  );

  return (
    <mesh scale={radius}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        vertexShader={fresnelVertex}
        fragmentShader={fresnelFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={palette.dark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </mesh>
  );
}

function ParticleDisc({
  palette,
  count = 2400,
}: {
  palette: Palette;
  count?: number;
}) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spread =
        (Math.random() + Math.random() + Math.random() - 1.5) * 0.8;
      const radius = 3.1 + spread;
      arr[i * 3] = Math.cos(angle) * radius;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.12 * (1 + Math.abs(spread));
      arr[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.06;
  });

  return (
    <points ref={ref} rotation={[0.38, 0, 0.12]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color={palette.accent}
        transparent
        opacity={palette.dark ? 0.75 : 0.6}
        sizeAttenuation
        depthWrite={false}
        blending={palette.dark ? THREE.AdditiveBlending : THREE.NormalBlending}
      />
    </points>
  );
}

function Gyro({
  radius,
  rotation,
  speed,
  offset,
  color,
  dark,
}: {
  radius: number;
  rotation: [number, number, number];
  speed: number;
  offset: number;
  color: string;
  dark: boolean;
}) {
  const comet = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!comet.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    comet.current.position.set(Math.cos(t) * radius, Math.sin(t) * radius, 0);
  });

  return (
    <group rotation={rotation}>
      <mesh>
        <torusGeometry args={[radius, 0.006, 8, 256]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={dark ? 0.45 : 0.6}
          toneMapped={false}
        />
      </mesh>
      <Trail
        width={2.6}
        length={9}
        decay={1}
        color={color}
        attenuation={(w) => w * w * w}
      >
        <mesh ref={comet}>
          <sphereGeometry args={[0.055, 24, 24]} />
          <meshBasicMaterial
            color={dark ? "#ffffff" : color}
            toneMapped={false}
          />
        </mesh>
      </Trail>
    </group>
  );
}

function Gem({
  position,
  size,
  color,
  shape,
}: {
  position: [number, number, number];
  size: number;
  color: string;
  shape: "octa" | "ico" | "tetra";
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.4;
    ref.current.rotation.y += delta * 0.6;
  });

  return (
    <Float speed={2.2} rotationIntensity={1.2} floatIntensity={1.6}>
      <mesh ref={ref} position={position} scale={size}>
        {shape === "octa" && <octahedronGeometry args={[1, 0]} />}
        {shape === "ico" && <icosahedronGeometry args={[1, 0]} />}
        {shape === "tetra" && <tetrahedronGeometry args={[1, 0]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          metalness={0.7}
          roughness={0.12}
          flatShading
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
}

function Core({
  palette,
  drag,
}: {
  palette: Palette;
  drag: RefObject<DragRotation>;
}) {
  const rig = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isWide = viewport.aspect > 1.15;

  useFrame((_, delta) => {
    const g = rig.current;
    const r = drag.current;
    if (!g || !r) return;
    stepDragRotation(r, delta, 0.18);
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, r.y, 8, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, r.x, 8, delta);
  });

  return (
    <group
      position={[isWide ? viewport.width * 0.22 : 0, isWide ? 0 : 1.1, 0]}
      scale={isWide ? 1 : 0.62}
    >
      <group ref={rig}>
        <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.8}>
          <mesh>
            <icosahedronGeometry args={[1.15, 48]} />
            <MeshDistortMaterial
              color={palette.core}
              roughness={0.22}
              metalness={0.92}
              envMapIntensity={1.3}
              distort={0.36}
              speed={1.6}
            />
          </mesh>
          <Halo palette={palette} radius={1.55} />
        </Float>

        <Gyro
          radius={1.9}
          rotation={[Math.PI / 2.4, 0, 0]}
          speed={0.9}
          offset={0}
          color={palette.accent}
          dark={palette.dark}
        />
        <Gyro
          radius={2.2}
          rotation={[Math.PI / 3, Math.PI / 3, 0]}
          speed={-0.7}
          offset={2}
          color={palette.secondary}
          dark={palette.dark}
        />
        <Gyro
          radius={2.5}
          rotation={[-Math.PI / 4, -Math.PI / 5, Math.PI / 6]}
          speed={0.55}
          offset={4}
          color={palette.accent}
          dark={palette.dark}
        />

        <Gem
          position={[-2.7, 1.5, -0.6]}
          size={0.2}
          color={palette.gem}
          shape="octa"
        />
        <Gem
          position={[2.6, -1.4, 0.5]}
          size={0.16}
          color={palette.gem}
          shape="ico"
        />
        <Gem
          position={[-2.1, -1.9, 0.9]}
          size={0.13}
          color={palette.gem}
          shape="tetra"
        />
        <Gem
          position={[2.2, 1.9, -1]}
          size={0.11}
          color={palette.gem}
          shape="octa"
        />

        <ParticleDisc palette={palette} />
      </group>
    </group>
  );
}

export default function HeroScene({ drag }: { drag: RefObject<DragRotation> }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapper, { margin: "100px" });
  const reduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme !== "light";

  const palette: Palette = dark
    ? {
        accent: "#00ff88",
        secondary: "#00f7ff",
        core: "#1d4a35",
        gem: "#bfffe0",
        dark,
      }
    : {
        accent: "#00b864",
        secondary: "#0891b2",
        core: "#c9f2dd",
        gem: "#9fe8c4",
        dark,
      };

  return (
    <div ref={wrapper} className="pointer-events-none absolute inset-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        frameloop={inView && !reduceMotion ? "always" : "demand"}
      >
        <ambientLight intensity={dark ? 0.2 : 0.8} />
        <directionalLight position={[4, 5, 5]} intensity={dark ? 0.8 : 1.4} />
        <Environment resolution={256}>
          <color attach="background" args={[dark ? "#020a06" : "#dfe9e4"]} />
          <Lightformer
            intensity={3}
            color={palette.accent}
            position={[0, 0, -8]}
            scale={[12, 12, 1]}
          />
          <Lightformer
            intensity={2.5}
            color={palette.accent}
            position={[-6, 0, 0]}
            rotation-y={Math.PI / 2}
            scale={[2, 10, 1]}
          />
          <Lightformer
            intensity={2}
            color={palette.secondary}
            position={[6, 0, 0]}
            rotation-y={-Math.PI / 2}
            scale={[2, 10, 1]}
          />
          <Lightformer
            intensity={dark ? 1.2 : 2}
            color="#ffffff"
            position={[0, 6, 0]}
            rotation-x={Math.PI / 2}
            scale={[10, 2, 1]}
          />
        </Environment>
        <Core palette={palette} drag={drag} />
        <Sparkles
          count={60}
          scale={[14, 8, 6]}
          size={2}
          speed={0.3}
          opacity={dark ? 0.6 : 0.45}
          color={palette.accent}
        />
      </Canvas>
    </div>
  );
}
