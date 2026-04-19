import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

/**
 * Premium crystalline structure with multi-layer geometry and advanced animations
 */
export function CrystalStructure() {
  const groupRef = useRef(null);
  const meshRefs = useRef([]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.004;
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.z += 0.003;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }

    // Animate individual crystal layers
    meshRefs.current.forEach((mesh, i) => {
      if (mesh && mesh.material && mesh.material.emissiveIntensity !== undefined) {
        mesh.material.emissiveIntensity = Math.sin(state.clock.elapsedTime * 1.2 + i * 0.5) * 0.3 + 0.5;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Primary octahedron - Main crystal */}
      <mesh
        ref={(mesh) => {
          meshRefs.current[0] = mesh;
        }}
      >
        <octahedronGeometry args={[0.35, 3]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.6}
          metalness={0.7}
          roughness={0.15}
        />
      </mesh>

      {/* Secondary golden inner crystal */}
      <mesh
        scale={0.7}
        ref={(mesh) => {
          meshRefs.current[1] = mesh;
        }}
      >
        <octahedronGeometry args={[0.35, 2]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.2}
        />
      </mesh>

      {/* Wireframe outer glow - large */}
      <mesh
        scale={1.2}
        ref={(mesh) => {
          meshRefs.current[2] = mesh;
        }}
      >
        <octahedronGeometry args={[0.35, 2]} />
        <meshBasicMaterial color="#f472b6" transparent opacity={0.25} wireframe={true} />
      </mesh>

      {/* Wireframe accent - medium */}
      <mesh rotation={[Math.PI * 0.25, Math.PI * 0.3, Math.PI * 0.1]}>
        <octahedronGeometry args={[0.3, 2]} />
        <meshBasicMaterial color="#a5b4fc" transparent opacity={0.2} wireframe={true} />
      </mesh>

      {/* Tetrahedron accent - rotating */}
      <mesh
        scale={0.65}
        rotation={[Math.PI * 0.5, 0, Math.PI * 0.25]}
        ref={(mesh) => {
          meshRefs.current[3] = mesh;
        }}
      >
        <tetrahedronGeometry args={[0.28]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#f59e0b"
          emissiveIntensity={0.5}
          metalness={0.5}
          roughness={0.25}
        />
      </mesh>

      {/* Center bright point */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={0.8}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>

      {/* Glowing edge lines - top */}
      <mesh rotation={[0, 0, 0.5]}>
        <boxGeometry args={[0.6, 0.03, 0.03]} />
        <meshBasicMaterial color="#f472b6" opacity={0.4} transparent />
      </mesh>

      {/* Glowing edge lines - bottom */}
      <mesh rotation={[0, 0, -0.5]}>
        <boxGeometry args={[0.6, 0.03, 0.03]} />
        <meshBasicMaterial color="#a5b4fc" opacity={0.3} transparent />
      </mesh>
    </group>
  );
}
