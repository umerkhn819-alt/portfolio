import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Custom Shader for the glowing eclipse planet
const EclipseShaderMaterial = {
  uniforms: {
    time: { value: 0 },
    rimColor: { value: new THREE.Color("#F5F5F4") }, // Platinum glow matching site theme
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 rimColor;
    varying vec3 vNormal;
    varying vec3 vPosition;

    // Pseudo-random hash function for procedural particles
    float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }

    void main() {
      // 1. Pitch black base (silhouette blocking the stars)
      vec3 baseColor = vec3(0.0, 0.0, 0.0);
      
      // 2. Base Fresnel (calculates the edge of the sphere)
      vec3 viewDirection = normalize(-vPosition);
      float fresnel = dot(viewDirection, vNormal);
      fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
      
      // Make the rim very thin and sharp
      float rim = pow(fresnel, 8.0);
      float intenseRim = pow(fresnel, 20.0);

      // 3. Sweeping Light effect
      // Calculate angle around the sphere
      float angle = atan(vPosition.y, vPosition.x);
      
      // Create a moving highlight spot that travels along the edge
      float sweep = sin(angle * 1.0 + time * 0.8) * 0.5 + 0.5;
      sweep = pow(sweep, 4.0);

      // 4. Combine rim and sweep
      vec3 glow = rimColor * rim * sweep * 1.5;
      glow += rimColor * intenseRim * sweep * 2.0;

      // 5. Particles on the surface (Creative integration)
      // Create a cellular grid for large cyber nodes
      vec3 p = vPosition * 3.0;
      vec3 id = floor(p);
      vec3 f = fract(p) - 0.5;
      
      // Compute random offsets per cell
      float h1 = hash(id + vec3(1.0, 2.0, 3.0));
      float h2 = hash(id + vec3(4.0, 5.0, 6.0));
      float h3 = hash(id + vec3(7.0, 8.0, 9.0));
      
      vec3 offset = vec3(h1, h2, h3) * 0.8 - 0.4;
      float dist = length(f - offset);
      
      // Draw smooth dot
      float particle = smoothstep(0.06, 0.01, dist);
      
      // Twinkle effect
      float twinkle = sin(time * 2.0 + h1 * 10.0) * 0.5 + 0.5;
      
      // Neutral particle tones (platinum to soft gray) to match monochrome theme
      vec3 particleColor = mix(vec3(0.96, 0.96, 0.95), vec3(0.55, 0.55, 0.53), h2);
      
      // Fade out particles near the glowing rim so they stay in the "black area"
      float bodyMask = smoothstep(0.9, 0.4, fresnel);
      
      vec3 surfaceParticles = particleColor * particle * twinkle * bodyMask * 1.5;
      
      // Add subtle starry dust layer for depth
      float dust = hash(vPosition * 40.0);
      float dustTwinkle = sin(time * 1.5 + dust * 100.0) * 0.5 + 0.5;
      vec3 surfaceDust = vec3(0.72, 0.72, 0.7) * smoothstep(0.98, 1.0, dust) * dustTwinkle * bodyMask * 0.8;

      gl_FragColor = vec4(baseColor + glow + surfaceParticles + surfaceDust, 1.0);
    }
  `
};

function Planet() {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Extremely slow rotation for subtle live feel
      meshRef.current.rotation.y += 0.0005;
      meshRef.current.rotation.x += 0.0002;
    }
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, -11, 0]}>
      <sphereGeometry args={[14, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={EclipseShaderMaterial.uniforms}
        vertexShader={EclipseShaderMaterial.vertexShader}
        fragmentShader={EclipseShaderMaterial.fragmentShader}
        transparent={true}
        // Use normal blending so the black silhouette actually blocks the stars behind it
        blending={THREE.NormalBlending}
      />
    </mesh>
  );
}

export function PlanetEclipse() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }} dpr={[1, 2]}>
        <Planet />
      </Canvas>
    </div>
  );
}
