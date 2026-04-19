import { Stars } from "@react-three/drei";

/**
 * @param {{ pointerRef: import("react").MutableRefObject<{ x: number; y: number }> }} props
 */
export function HeroScene({ pointerRef }) {
  return (
    <>
      <Stars
        radius={100}
        depth={50}
        count={500}
        factor={2.5}
        saturation={0}
        fade
        speed={0.3}
      />
      
      {/* Enhanced lighting for better visual depth */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[8, 10, 6]}
        intensity={1.5}
        color="#ffffff"
      />
      <directionalLight
        position={[-8, -5, -6]}
        intensity={0.6}
        color="#a5b4fc"
      />
    </>
  );
}
