import { useRef } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, MeshWobbleMaterial, MeshTransmissionMaterial, Float, Environment, ContactShadows } from "@react-three/drei";

// --- 3D Visual Components for Cards ---
export function NeuralNode() {
  const meshRef = useRef();
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.2, 4]} />
      <MeshTransmissionMaterial 
        background={null}
        transmission={1} 
        roughness={0.1} 
        thickness={2}
        ior={1.5}
        chromaticAberration={1}
        color="#D6D6D2"
      />
    </mesh>
  );
}

export function WireframeFlower() {
  const meshRef = useRef();
  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.2, 1]} />
      <meshStandardMaterial color="#8A8A86" wireframe emissive="#8A8A86" emissiveIntensity={1.2} />
    </mesh>
  );
}

export function BoundingScan() {
  const meshRef = useRef();
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
    meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3) * 0.05);
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color="#D6D6D2" wireframe />
    </mesh>
  );
}

export function DataWave() {
  const meshRef = useRef();
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.PI / 2;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.5;
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <MeshWobbleMaterial color="#D6D6D2" factor={1} speed={2} wireframe />
    </mesh>
  );
}

export function EngineCore() {
  const meshRef = useRef();
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;
  });
  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[1.2, 0]} />
      <MeshDistortMaterial color="#E2E8F0" distort={0.6} speed={3} metalness={1} roughness={0} />
    </mesh>
  );
}

export function QuantumCube() {
  const meshRef = useRef();
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.2, 1.2, 1.2]} />
      <MeshDistortMaterial color="#8A8A86" distort={0.2} speed={5} wireframe emissive="#8A8A86" emissiveIntensity={0.8} />
    </mesh>
  );
}

export function HoloKit() {
  const meshRef = useRef();
  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
  });
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[0.8, 0.3, 16, 100]} />
      <MeshTransmissionMaterial transmission={0.9} roughness={0} color="#F5F5F4" />
    </mesh>
  );
}

export function DroneSwarm() {
  const groupRef = useRef();
  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
  });
  return (
    <group ref={groupRef}>
      {[...Array(5)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.sin(i * Math.PI * 0.4) * 1.5, 
            Math.cos(i * Math.PI * 0.8) * 0.5, 
            Math.cos(i * Math.PI * 0.4) * 1.5
          ]}
        >
          <tetrahedronGeometry args={[0.3]} />
          <meshStandardMaterial color="#E2E8F0" wireframe />
        </mesh>
      ))}
    </group>
  );
}

export const renderVisual = (type) => {
  switch (type) {
    case "neuralNode": return <NeuralNode />;
    case "wireframeFlower": return <WireframeFlower />;
    case "boundingScan": return <BoundingScan />;
    case "dataWave": return <DataWave />;
    case "engineCore": return <EngineCore />;
    case "quantumCube": return <QuantumCube />;
    case "holoKit": return <HoloKit />;
    case "droneSwarm": return <DroneSwarm />;
    default: return <EngineCore />;
  }
};

export function DetailDashboard({ project, onClose }) {
  return (
    <motion.div
      layoutId={`project-${project.id}`}
      className="fixed inset-0 z-[100] bg-[#030303] flex flex-col md:flex-row overflow-hidden"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 text-[var(--accent-primary)] font-display text-sm tracking-[0.2em] uppercase border border-[var(--accent-primary)]/30 px-4 py-2 rounded hover:bg-[var(--accent-primary)]/10 transition-colors"
      >
        [ CLOSE CONNECTION ]
      </button>

      {/* Left: Terminal Specs */}
      <div className="w-full md:w-1/3 h-1/2 md:h-full p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center relative z-10 bg-black/40 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="text-[var(--accent-secondary)] font-mono text-xs mb-4 uppercase tracking-widest">// TARGET ACQUIRED</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 uppercase tracking-wide leading-tight">
            {project.title}
          </h2>
          <p className="font-mono text-[var(--text-main)] mb-8 text-sm md:text-base leading-relaxed opacity-80">
            {project.desc}
          </p>
          
          <div className="space-y-4 mb-10">
            {project.specs?.map((spec, i) => (
              <div key={i} className="flex items-center gap-3 font-mono text-xs md:text-sm text-[var(--accent-primary)]">
                <span className="w-1.5 h-1.5 bg-[var(--accent-primary)] rounded-full animate-pulse" />
                {spec}
              </div>
            ))}
          </div>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[var(--text-main)] px-6 py-3 font-mono text-sm text-[#050505] transition-colors hover:bg-white"
            >
              &gt; VIEW_SOURCE
            </a>
          )}
        </motion.div>
      </div>

      {/* Right: Massive 3D View */}
      <div className="relative h-1/2 w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.06] via-[#030303] to-[#030303] md:h-full md:w-2/3">
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8A8A86" />
          <Environment preset="city" />
          <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
            {renderVisual(project.visualType)}
          </Float>
          <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} far={4} color="#F5F5F4" />
        </Canvas>
        
        {/* HUD Elements */}
        <div className="absolute top-8 left-8 font-mono text-xs text-white/20">SYS.ON // RENDERING</div>
        <div className="absolute bottom-8 right-8 font-mono text-xs text-white/20">OPT.TRUE // 60FPS</div>
      </div>
    </motion.div>
  );
}
