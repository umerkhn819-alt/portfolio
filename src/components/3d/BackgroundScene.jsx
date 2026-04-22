import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { NeuralNetwork } from "./NeuralNetwork";
import { motion, useScroll, useTransform } from "framer-motion";

export function BackgroundScene() {
  const { scrollY } = useScroll();
  // Move the background up slightly as the user scrolls down for parallax depth
  const y = useTransform(scrollY, [0, 5000], [0, -200]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none", // Prevent capturing interactions
        y // Apply parallax translation
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
    </motion.div>
  );
}
