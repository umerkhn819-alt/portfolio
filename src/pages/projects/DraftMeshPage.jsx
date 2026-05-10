import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  Maximize, 
  Volume2, 
  VolumeX, 
  Cpu, 
  Share2, 
  GitMerge, 
  Database, 
  Zap, 
  CheckCircle2, 
  Activity, 
  FileText, 
  Clock, 
  Eye,
  Shuffle
} from "lucide-react";
import { Footer } from "../../components/layout/Footer";

export function DraftMeshPage() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const videoRef = useRef(null);

  // Flow simulation state
  const [simState, setSimState] = useState("idle"); // idle, running, finished
  const [activeNode, setActiveNode] = useState(null);
  const [nodeStates, setNodeStates] = useState({
    input: "idle",
    summarize: "idle",
    condition: "idle",
    trueBranch: "idle",
    falseBranch: "idle",
    output: "idle"
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log(err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changeSpeed = () => {
    if (videoRef.current) {
      let nextSpeed = 1;
      if (playbackSpeed === 1) nextSpeed = 1.5;
      else if (playbackSpeed === 1.5) nextSpeed = 2;
      else nextSpeed = 1;
      
      videoRef.current.playbackRate = nextSpeed;
      setPlaybackSpeed(nextSpeed);
    }
  };

  const triggerFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        videoRef.current.msRequestFullscreen();
      }
    }
  };

  // Run topological node simulation
  const startSimulation = async () => {
    if (simState === "running") return;
    setSimState("running");
    
    const resetStates = {
      input: "idle",
      summarize: "idle",
      condition: "idle",
      trueBranch: "idle",
      falseBranch: "idle",
      output: "idle"
    };
    setNodeStates(resetStates);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Step 1: Input
    setActiveNode("input");
    setNodeStates(prev => ({ ...prev, input: "running" }));
    await sleep(1200);
    setNodeStates(prev => ({ ...prev, input: "done" }));

    // Step 2: AI Summarize
    setActiveNode("summarize");
    setNodeStates(prev => ({ ...prev, summarize: "running" }));
    await sleep(1500);
    setNodeStates(prev => ({ ...prev, summarize: "done" }));

    // Step 3: Condition
    setActiveNode("condition");
    setNodeStates(prev => ({ ...prev, condition: "running" }));
    await sleep(1000);
    setNodeStates(prev => ({ ...prev, condition: "done" }));

    // Decide branch randomly
    const path = Math.random() > 0.4 ? "trueBranch" : "falseBranch";
    
    // Step 4: Execute chosen branch and skip the other
    setActiveNode(path);
    if (path === "trueBranch") {
      setNodeStates(prev => ({ ...prev, trueBranch: "running", falseBranch: "skipped" }));
      await sleep(1200);
      setNodeStates(prev => ({ ...prev, trueBranch: "done" }));
    } else {
      setNodeStates(prev => ({ ...prev, falseBranch: "running", trueBranch: "skipped" }));
      await sleep(1200);
      setNodeStates(prev => ({ ...prev, falseBranch: "done" }));
    }

    // Step 5: Output
    setActiveNode("output");
    setNodeStates(prev => ({ ...prev, output: "running" }));
    await sleep(1000);
    setNodeStates(prev => ({ ...prev, output: "done" }));

    setActiveNode(null);
    setSimState("finished");
  };

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen bg-[#050505] text-white pt-24 font-sans relative overflow-hidden selection:bg-accent selection:text-black"
    >
      {/* Background Orbs */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-10 w-[600px] h-[600px] bg-[#85EE00]/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 py-12">
        
        {/* Navigation & Back Button */}
        <div className="flex justify-between items-center mb-12">
          <button 
            onClick={() => navigate(-1)} 
            className="group flex items-center gap-3 text-text-secondary hover:text-accent transition-colors w-max font-sans text-xs uppercase tracking-widest font-bold bg-transparent border-0 outline-none cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Go Back
          </button>
          
          <a 
            href="https://github.com/umerkhn819-alt/Aiworkflowstudio"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/10 hover:border-accent hover:text-accent transition-all text-xs font-bold uppercase tracking-wider bg-white/[0.02] cursor-pointer"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            View Repository
          </a>
        </div>

        {/* Hero Meta Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-20">
          <div className="lg:col-span-8">
            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase block mb-4">SaaS AI Workflow Studio</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
              DRAFTMESH <span className="text-white/20">STUDIO</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
              A premium visual AI pipeline orchestrator designed to transform repetitive AI prompts and procedures into structured, reusable node-level operational flows.
            </p>
          </div>

          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12 grid grid-cols-2 gap-8 text-sm">
            <div>
              <span className="text-text-secondary uppercase tracking-widest text-[10px] block mb-2">Role</span>
              <span className="font-bold text-white">Full-Stack AI Lead</span>
            </div>
            <div>
              <span className="text-text-secondary uppercase tracking-widest text-[10px] block mb-2">Timeline</span>
              <span className="font-bold text-white">4 Weeks (2026)</span>
            </div>
            <div>
              <span className="text-text-secondary uppercase tracking-widest text-[10px] block mb-2">Platform</span>
              <span className="font-bold text-white font-sans">Vite + React 19</span>
            </div>
            <div>
              <span className="text-text-secondary uppercase tracking-widest text-[10px] block mb-2">Focus</span>
              <span className="font-bold text-accent font-sans">Node-Based UX</span>
            </div>
          </div>
        </div>

        {/* Video Showcase Section (202605061253.mp4) */}
        <section className="mb-24">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl md:text-4xl uppercase font-bold tracking-tight mb-3">
              PRODUCT DEMO & <span className="text-accent">RUNTIME IN ACTION</span>
            </h2>
            <p className="text-text-secondary text-sm max-w-lg mx-auto">
              Observe how the visual canvas handles topological node connections and delivers real-time statuses with pixel-perfect accuracy.
            </p>
          </div>

          {/* Premium Video Container */}
          <div className="relative w-full rounded-[2.5rem] overflow-hidden bg-black border border-white/10 shadow-2xl group/player transform-gpu z-10">
            {/* Ambient Background Glow matching video */}
            <div className="absolute inset-0 bg-indigo-500/5 mix-blend-color-dodge pointer-events-none z-0" />
            
            <video 
              ref={videoRef}
              src="/DraftMesh/202605061253.mp4"
              className="w-full aspect-[16/9] object-cover relative z-10 cursor-pointer"
              autoPlay
              muted={isMuted}
              loop
              playsInline
              onClick={togglePlay}
            />

            {/* Custom Control Overlay */}
            <div className="absolute inset-x-0 bottom-0 z-20 p-4 md:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between opacity-0 group-hover/player:opacity-100 transition-opacity duration-300">
              <div className="flex items-center gap-4">
                <button 
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-white text-black hover:bg-accent hover:scale-105 transition-all flex items-center justify-center shadow-lg"
                >
                  {isPlaying ? <Pause size={18} fill="black" /> : <Play size={18} className="ml-1" fill="black" />}
                </button>

                <button 
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={changeSpeed}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-bold transition-colors"
                >
                  {playbackSpeed}x Speed
                </button>
                <button 
                  onClick={triggerFullscreen}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                >
                  <Maximize size={16} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Problem vs Solution Comparison */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#85EE00]/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-10 backdrop-blur-xl hover:border-red-500/20 transition-all duration-500 group">
            <span className="text-red-500 font-sans text-xs uppercase tracking-[0.2em] font-bold block mb-4">The Challenge</span>
            <h3 className="font-display text-3xl font-black uppercase mb-6 text-white tracking-tight">Manual & Fragile AI Operations</h3>
            <p className="text-text-secondary text-base leading-relaxed mb-6">
              Most teams execute complex processes by manually copy-pasting prompts back and forth between ChatGPT and their other custom tools. This repetitive manual loop leads to:
            </p>
            <ul className="space-y-3 text-sm text-text-secondary font-sans">
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span> Highly inconsistent outputs across different content writers
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span> Zero structural repeatability or central operational logging
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-500 mt-1">•</span> Zero runtime failure visibility during automated sequences
              </li>
            </ul>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-10 backdrop-blur-xl hover:border-accent/20 transition-all duration-500 group">
            <span className="text-accent font-sans text-xs uppercase tracking-[0.2em] font-bold block mb-4">The Solution</span>
            <h3 className="font-display text-3xl font-black uppercase mb-6 text-white tracking-tight">Visual Pipeline Orchestration</h3>
            <p className="text-text-secondary text-base leading-relaxed mb-6">
              DraftMesh introduces a node-based workflow editor where sequences are visual, topologically structured, and self-contained. The platform offers teams:
            </p>
            <ul className="space-y-3 text-sm text-text-secondary font-sans">
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">✓</span> Repeatable multi-agent node chains with structured properties
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">✓</span> Edge-to-edge context-aware conditional true/false branching
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent mt-1">✓</span> Client-side lightweight sharing of workflow JSON via URL params
              </li>
            </ul>
          </div>
        </section>

        {/* INTERACTIVE WORKFLOW ENGINE SIMULATOR */}
        <section className="mb-32">
          <div className="max-w-4xl mx-auto bg-[#0d0d12] border border-white/[0.06] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-6 border-b border-white/5">
              <div>
                <span className="text-accent text-[10px] uppercase font-bold tracking-widest flex items-center gap-2 mb-2">
                  <Activity size={12} className="animate-pulse" /> Interactive Simulator
                </span>
                <h3 className="font-display text-3xl font-black uppercase text-white">Visual Engine Run</h3>
              </div>
              <button 
                onClick={startSimulation}
                disabled={simState === "running"}
                className={`flex items-center gap-3 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${
                  simState === "running" 
                    ? "bg-white/10 text-white/40 cursor-not-allowed" 
                    : "bg-accent text-black hover:bg-accent-hover hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(133,238,0,0.3)]"
                }`}
              >
                <Shuffle size={14} />
                {simState === "running" ? "Executing..." : "Simulate Flow"}
              </button>
            </div>

            {/* Simulated Node Editor Canvas */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative items-center">
              
              {/* Connector lines (abstract bg) */}
              <div className="hidden md:block absolute inset-x-8 top-1/2 h-[2px] bg-white/[0.05] -z-10" />

              {/* Node 1: Input */}
              <div className="md:col-span-3 flex flex-col items-center">
                <div className={`w-full max-w-[200px] bg-[#16161f] border rounded-2xl p-4 transition-all duration-500 ${
                  nodeStates.input === "running" ? "border-accent shadow-[0_0_20px_rgba(133,238,0,0.2)] scale-105" :
                  nodeStates.input === "done" ? "border-indigo-500/40" : "border-white/5"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Input Node</span>
                    <span className={`w-2 h-2 rounded-full ${
                      nodeStates.input === "running" ? "bg-accent animate-ping" :
                      nodeStates.input === "done" ? "bg-indigo-500" : "bg-white/20"
                    }`} />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1 font-sans">Trigger Payload</h4>
                  <p className="text-[10px] text-text-secondary font-mono bg-black/40 p-2 rounded leading-normal">
                    {"{ type: 'bulk_data' }"}
                  </p>
                </div>
              </div>

              {/* Node 2: AI Summarize */}
              <div className="md:col-span-3 flex flex-col items-center">
                <div className={`w-full max-w-[200px] bg-[#16161f] border rounded-2xl p-4 transition-all duration-500 ${
                  nodeStates.summarize === "running" ? "border-accent shadow-[0_0_20px_rgba(133,238,0,0.2)] scale-105" :
                  nodeStates.summarize === "done" ? "border-indigo-500/40" : "border-white/5"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1">
                      <Cpu size={10} /> AI Summarize
                    </span>
                    <span className={`w-2 h-2 rounded-full ${
                      nodeStates.summarize === "running" ? "bg-accent animate-ping" :
                      nodeStates.summarize === "done" ? "bg-indigo-500" : "bg-white/20"
                    }`} />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1 font-sans">Process Prompt</h4>
                  <p className="text-[10px] text-text-secondary leading-snug">
                    {nodeStates.summarize === "running" ? "Analyzing data context..." :
                     nodeStates.summarize === "done" ? "✓ Extracted 3 summary bullet points." : "Awaiting upstream input..."}
                  </p>
                </div>
              </div>

              {/* Node 3: Condition Brancher */}
              <div className="md:col-span-3 flex flex-col items-center">
                <div className={`w-full max-w-[200px] bg-[#16161f] border rounded-2xl p-4 transition-all duration-500 ${
                  nodeStates.condition === "running" ? "border-accent shadow-[0_0_20px_rgba(133,238,0,0.2)] scale-105" :
                  nodeStates.condition === "done" ? "border-indigo-500/40" : "border-white/5"
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-orange-400 uppercase tracking-widest flex items-center gap-1">
                      <GitMerge size={10} /> Condition
                    </span>
                    <span className={`w-2 h-2 rounded-full ${
                      nodeStates.condition === "running" ? "bg-accent animate-ping" :
                      nodeStates.condition === "done" ? "bg-indigo-500" : "bg-white/20"
                    }`} />
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1 font-sans">Check Length</h4>
                  <p className="text-[10px] text-text-secondary leading-snug font-mono bg-black/20 p-1 rounded">
                    words &gt; 100
                  </p>
                </div>
              </div>

              {/* Node 4: Dynamic Outputs (True or False Branches) */}
              <div className="md:col-span-3 flex flex-col gap-4">
                {/* True Node */}
                <div className={`w-full max-w-[200px] bg-[#16161f] border rounded-2xl p-3 transition-all duration-500 ${
                  nodeStates.trueBranch === "running" ? "border-accent shadow-[0_0_15px_rgba(133,238,0,0.2)]" :
                  nodeStates.trueBranch === "done" ? "border-indigo-500/40" : 
                  nodeStates.trueBranch === "skipped" ? "opacity-30 border-dashed" : "border-white/5"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-accent uppercase">IF TRUE: AI Translate</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      nodeStates.trueBranch === "running" ? "bg-accent animate-ping" :
                      nodeStates.trueBranch === "done" ? "bg-indigo-500" : "bg-white/20"
                    }`} />
                  </div>
                  <span className="text-[9px] text-text-secondary block mt-1">Translate summaries to French</span>
                </div>

                {/* False Node */}
                <div className={`w-full max-w-[200px] bg-[#16161f] border rounded-2xl p-3 transition-all duration-500 ${
                  nodeStates.falseBranch === "running" ? "border-accent shadow-[0_0_15px_rgba(133,238,0,0.2)]" :
                  nodeStates.falseBranch === "done" ? "border-indigo-500/40" : 
                  nodeStates.falseBranch === "skipped" ? "opacity-30 border-dashed" : "border-white/5"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-indigo-400 uppercase">IF FALSE: Custom Prompt</span>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      nodeStates.falseBranch === "running" ? "bg-accent animate-ping" :
                      nodeStates.falseBranch === "done" ? "bg-indigo-500" : "bg-white/20"
                    }`} />
                  </div>
                  <span className="text-[9px] text-text-secondary block mt-1">Append signature footer</span>
                </div>
              </div>

            </div>

            {/* Run Progress bar */}
            <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-text-secondary">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                <span>Simulation Status: <strong className="text-white uppercase">{simState}</strong></span>
              </div>
              <div>
                {activeNode && <span>Processing active node: <strong className="text-accent font-mono uppercase">#{activeNode}</strong></span>}
                {simState === "finished" && <span className="text-accent font-bold">✓ PIPELINE RUN COMPLETE</span>}
              </div>
            </div>
          </div>
        </section>

        {/* Technical Stack Architecture */}
        <section className="mb-24">
          <h2 className="font-display text-4xl font-bold uppercase mb-12 tracking-tight text-white">
            Architecture <span className="text-white/20">& Technology</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.02] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6">
                <Zap size={22} />
              </div>
              <h3 className="font-display text-xl font-bold uppercase mb-4 text-white">Visual Engine</h3>
              <p className="text-text-secondary leading-relaxed">
                Utilizes `@xyflow/react` (React Flow) for highly performing reactive canvases, interactive node connectors, drag-and-drop registration, and dynamic undo/redo history trees.
              </p>
            </div>

            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.02] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#85EE00]/10 text-accent flex items-center justify-center mb-6">
                <Database size={22} />
              </div>
              <h3 className="font-display text-xl font-bold uppercase mb-4 text-white">No-DB Persistence</h3>
              <p className="text-text-secondary leading-relaxed">
                Designed to run 100% standalone inside client browsers. Persists workflows and comprehensive execution histories locally in `localStorage` to bypass heavy server-side requirements.
              </p>
            </div>

            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.02] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-6">
                <Cpu size={22} />
              </div>
              <h3 className="font-display text-xl font-bold uppercase mb-4 text-white">Provider Routing</h3>
              <p className="text-text-secondary leading-relaxed">
                Connects seamlessly with backend APIs leveraging Express.js and custom model routing handlers for GPT-4o, Gemma 4, or deep local AI model mock integrations on failure.
              </p>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </motion.main>
  );
}
