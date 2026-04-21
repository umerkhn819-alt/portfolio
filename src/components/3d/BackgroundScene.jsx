import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { NeuralNetwork } from "./NeuralNetwork";

export function BackgroundScene() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none", // Prevent capturing interactions
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={[1, 2]} // Optimize for performance and retina displays
      >
        <ambientLight intensity={0.5} />
        
        {/* Basic starfield for the AI deep space vibe */}
        <Stars
          radius={50}
          depth={50}
          count={3000}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />

        {/* The Swirling Neural Engine Particle Field */}
        <NeuralNetwork />
      </Canvas>
    </div>
  );
}
