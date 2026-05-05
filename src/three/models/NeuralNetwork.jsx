import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

/**
 * Advanced AI/ML neural network visualization with glowing connections
 */
export function NeuralNetwork() {
  const groupRef = useRef(null);
  const nodeRefs = useRef([]);

  const nodeCount = 12;
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2;
    const radius = 0.8;
    nodes.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.7,
      z: Math.sin(angle * 3) * 0.4,
      size: Math.random() * 0.08 + 0.05,
      speed: Math.random() * 0.3 + 0.5,
      delay: Math.random() * Math.PI * 2,
    });
  }

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.0015;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.4;
      groupRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.3;
    }

    // Animate nodes with pulsing glow
    nodeRefs.current.forEach((mesh, i) => {
      if (mesh && mesh.material) {
        const pulse = Math.sin(state.clock.elapsedTime * nodes[i].speed + nodes[i].delay) * 0.4 + 0.8;
        mesh.material.emissiveIntensity = pulse;
        mesh.scale.set(pulse * 0.8, pulse * 0.8, pulse * 0.8);
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Central glowing core */}
      <mesh>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial
          color="#D6D6D2"
          emissive="#D6D6D2"
          emissiveIntensity={1}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Glow ring around core */}
      <mesh>
        <torusGeometry args={[0.15, 0.03, 16, 100]} />
        <meshBasicMaterial color="#D6D6D2" opacity={0.8} transparent />
      </mesh>

      {/* Neural nodes with glow */}
      {nodes.map((node, i) => (
        <group key={`neuron-${i}`} position={[node.x, node.y, node.z]}>
          {/* Inner bright sphere */}
          <mesh
            ref={(mesh) => {
              nodeRefs.current[i] = mesh;
            }}
          >
            <sphereGeometry args={[node.size, 24, 24]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? "#F5F5F4" : i % 3 === 1 ? "#D6D6D2" : "#8A8A86"}
              emissive={i % 3 === 0 ? "#F5F5F4" : i % 3 === 1 ? "#D6D6D2" : "#8A8A86"}
              emissiveIntensity={0.8}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>

          {/* Outer glow ring */}
          <mesh>
            <sphereGeometry args={[node.size * 1.4, 16, 16]} />
            <meshBasicMaterial
              color={i % 3 === 0 ? "#F5F5F4" : i % 3 === 1 ? "#D6D6D2" : "#8A8A86"}
              transparent
              opacity={0.2}
            />
          </mesh>
        </group>
      ))}

      {/* Multi-layered connection rings */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[0.8, 0.015, 8, 64]} />
        <meshBasicMaterial color="#D6D6D2" opacity={0.5} transparent />
      </mesh>
      <mesh rotation={[Math.PI * 0.3, 0, 0]}>
        <torusGeometry args={[0.75, 0.012, 8, 64]} />
        <meshBasicMaterial color="#8A8A86" opacity={0.35} transparent />
      </mesh>
      <mesh rotation={[Math.PI * -0.3, 0, 0]}>
        <torusGeometry args={[0.85, 0.012, 8, 64]} />
        <meshBasicMaterial color="#D6D6D2" opacity={0.3} transparent />
      </mesh>
    </group>
  );
}
