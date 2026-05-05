import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

export function NeuralNetwork() {
  const pointsRef = useRef(null);
  const scrollRef = useRef(0);

  // Generate 2000 particles in a spherical distribution
  const [positions, colors] = useMemo(() => {
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color("#F5F5F4");
    const color2 = new THREE.Color("#8A8A86");

    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution
      const r = 20 * Math.cbrt(Math.random()); // Radius up to 20
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Mix colors based on distance or random
      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    return [positions, colors];
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Normalize scroll progress (0 to 1 approx based on document height)
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.elapsedTime;

    // 1. Continuous breathing/swirling motion (SLOWER)
    pointsRef.current.rotation.y = Math.sin(time * 0.05) * 0.25 + time * 0.025;
    pointsRef.current.rotation.x = Math.cos(time * 0.075) * 0.1;

    // 2. Scroll-driven camera physics
    // Base camera Z is 15. As we scroll (0 -> 1), move camera forward (decrease Z)
    const targetZ = 15 - scrollRef.current * 25; // Move from Z=15 to Z=-10
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05);
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef} positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}
