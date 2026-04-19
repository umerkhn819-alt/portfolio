import { Canvas } from "@react-three/fiber";
import { HeroScene } from "./Scene.jsx";

/**
 * @param {{ pointerRef: import("react").MutableRefObject<{ x: number; y: number }> }} props
 */
export function HeroCanvas({ pointerRef }) {
  return (
    <Canvas
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ zIndex: 1 }}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
        stencil: false,
      }}
      dpr={[1, 1.5]}
      frameloop="always"
    >
      <HeroScene pointerRef={pointerRef} />
    </Canvas>
  );
}
