import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

/**
 * Premium sci-fi torus with neon effects and multi-layer rings
 */
export function SciFiTorus() {
  const groupRef = useRef(null);
  const toruses = useRef([]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.5;
      groupRef.current.rotation.z += 0.005;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
    }

    // Animate each ring independently
    toruses.current.forEach((torus, i) => {
      if (torus) {
        torus.rotation.y += 0.003 * (i + 1);
        if (torus.material && torus.material.emissiveIntensity !== undefined) {
          torus.material.emissiveIntensity = Math.sin(state.clock.elapsedTime * 1.5 + i) * 0.3 + 0.7;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Primary bright cyan torus */}
      <mesh
        ref={(mesh) => {
          toruses.current[0] = mesh;
        }}
      >
        <torusGeometry args={[0.6, 0.16, 32, 200]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#00d9ff"
          emissiveIntensity={0.8}
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Secondary pink accent ring */}
      <mesh rotation={[Math.PI * 0.25, 0, 0]}>
        <torusGeometry args={[0.58, 0.1, 24, 150]} />
        <meshStandardMaterial
          color="#ff006e"
          emissive="#ff006e"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.15}
        />
      </mesh>

      {/* Purple glow layer */}
      <mesh rotation={[Math.PI * -0.25, 0, 0]}>
        <torusGeometry args={[0.62, 0.08, 20, 120]} />
        <meshStandardMaterial
          color="#9d4edd"
          emissive="#9d4edd"
          emissiveIntensity={0.5}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Bright center core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.9}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Inner glowing sphere */}
      <mesh scale={0.8}>
        <sphereGeometry args={[0.12, 24, 24]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.3} />
      </mesh>

      {/* Outer glow effect */}
      <mesh>
        <torusGeometry args={[0.68, 0.06, 16, 100]} />
        <meshBasicMaterial color="#00d9ff" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
