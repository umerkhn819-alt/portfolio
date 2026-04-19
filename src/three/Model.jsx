import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const defaultPointer = { x: 0, y: 0 };

/**
 * Simple Roblox-style animated 3D structure with stacked blocks.
 * @param {{ pointerRef: import("react").MutableRefObject<{ x: number; y: number }> }} props
 */
export function HeroModel({ pointerRef }) {
  const parallax = useRef(null);
  const group = useRef(null);

  const { viewport } = useThree();

  useFrame((state, delta) => {
    const p = pointerRef?.current ?? defaultPointer;
    const t = state.clock.elapsedTime;

    if (group.current) {
      // Gentle rotation
      group.current.rotation.y += delta * 0.25;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        p.y * 0.25,
        0.08
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        -p.x * 0.15,
        0.06
      );

      // Vertical float
      const bob = Math.sin(t * 0.6) * 0.1;
      group.current.position.y = bob;
    }

    if (parallax.current) {
      const sideOffset = viewport.width < 6 ? 0 : 0.85;
      const targetX = sideOffset + p.x * 0.65;
      const targetY = p.y * 0.42;

      parallax.current.position.x = THREE.MathUtils.lerp(
        parallax.current.position.x,
        targetX,
        0.06
      );
      parallax.current.position.y = THREE.MathUtils.lerp(
        parallax.current.position.y,
        targetY,
        0.06
      );
      parallax.current.position.z = THREE.MathUtils.lerp(
        parallax.current.position.z,
        p.x * -0.18,
        0.05
      );
    }
  });

  return (
    <group ref={parallax}>
      <group ref={group}>
        {/* Bottom block - Red */}
        <mesh position={[0, -0.25, 0]}>
          <boxGeometry args={[0.6, 0.5, 0.6]} />
          <meshStandardMaterial color="#ef4444" metalness={0.4} roughness={0.6} />
        </mesh>

        {/* Middle block - Blue */}
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial color="#3b82f6" metalness={0.4} roughness={0.6} />
        </mesh>

        {/* Top block - Yellow */}
        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.4} roughness={0.6} />
        </mesh>

        {/* Side accent - Purple */}
        <mesh position={[0.35, 0.15, 0]}>
          <boxGeometry args={[0.3, 0.5, 0.3]} />
          <meshStandardMaterial color="#a855f7" metalness={0.4} roughness={0.6} />
        </mesh>

        {/* Side accent - Green */}
        <mesh position={[-0.35, 0.15, 0]}>
          <boxGeometry args={[0.3, 0.5, 0.3]} />
          <meshStandardMaterial color="#10b981" metalness={0.4} roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}
