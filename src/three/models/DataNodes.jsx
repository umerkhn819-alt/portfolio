import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

/**
 * Premium floating data nodes with pulsing animations and orbital trails
 */
export function DataNodes() {
  const groupRef = useRef(null);
  const meshRefs = useRef([]);
  const trailRefs = useRef([]);

  const nodeCount = 8;
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2;
    nodes.push({
      x: Math.cos(angle) * 0.9,
      y: Math.sin(angle) * 0.6,
      z: Math.cos(angle * 2) * 0.5,
      offset: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.6 + 0.4,
      color: i % 4 === 0 ? "#10b981" : i % 4 === 1 ? "#34d399" : i % 4 === 2 ? "#6ee7b7" : "#a7f3d0",
    });
  }

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.z += 0.0025;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.3;
      groupRef.current.rotation.y = Math.cos(time * 0.15) * 0.2;
    }

    // Update individual nodes
    meshRefs.current.forEach((mesh, i) => {
      if (mesh) {
        const node = nodes[i];
        const offset = Math.sin(time * node.speed + node.offset) * 0.2;

        mesh.position.x = node.x + offset * Math.cos(node.offset);
        mesh.position.y = node.y + offset * Math.sin(node.offset);
        mesh.position.z = node.z + offset * 0.4;

        // Pulsing scale with more intensity
        const scale = 1.2 + Math.sin(time * 2 + i) * 0.4;
        mesh.scale.set(scale, scale, scale);

        // Rotation animation
        mesh.rotation.x += 0.02;
        mesh.rotation.y += 0.015;
      }
    });

    // Update orbital trails
    trailRefs.current.forEach((trail, i) => {
      if (trail && trail.material) {
        trail.material.opacity = Math.sin(time * 1.5 + i) * 0.2 + 0.3;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Data nodes with enhanced styling */}
      {nodes.map((node, i) => (
        <group
          key={`data-node-${i}`}
          position={[node.x, node.y, node.z]}
          ref={(group) => {
            meshRefs.current[i] = group;
          }}
        >
          {/* Main data node */}
          <mesh>
            <octahedronGeometry args={[0.08, 2]} />
            <meshStandardMaterial
              color={node.color}
              emissive={node.color}
              emissiveIntensity={0.7}
              metalness={0.6}
              roughness={0.2}
            />
          </mesh>

          {/* Glow effect */}
          <mesh scale={1.3}>
            <octahedronGeometry args={[0.08, 2]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.3} />
          </mesh>

          {/* Inner accent */}
          <mesh scale={0.5}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshBasicMaterial color={node.color} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}

      {/* Multi-layer orbital rings */}
      <mesh
        ref={(mesh) => {
          trailRefs.current[0] = mesh;
        }}
      >
        <torusGeometry args={[0.9, 0.04, 12, 150]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.4} />
      </mesh>

      <mesh
        ref={(mesh) => {
          trailRefs.current[1] = mesh;
        }}
        rotation={[Math.PI * 0.3, 0, 0]}
      >
        <torusGeometry args={[0.85, 0.03, 12, 150]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.3} />
      </mesh>

      <mesh
        ref={(mesh) => {
          trailRefs.current[2] = mesh;
        }}
        rotation={[Math.PI * -0.3, 0, 0]}
      >
        <torusGeometry args={[0.95, 0.03, 12, 150]} />
        <meshBasicMaterial color="#6ee7b7" transparent opacity={0.25} />
      </mesh>

      {/* Central hub */}
      <mesh>
        <sphereGeometry args={[0.1, 20, 20]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#10b981"
          emissiveIntensity={0.6}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}
