import { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Download, 
  Eye, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  FileText, 
  Terminal, 
  Layers,
  Globe
} from "lucide-react";
import { Footer } from "../components/layout/Footer";

export function CVPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen bg-[#050505] text-white pt-24 font-sans relative overflow-hidden selection:bg-accent selection:text-black"
    >
      {/* Background Orbs */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-emerald-950/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-10 w-[600px] h-[600px] bg-[#85EE00]/5 rounded-full blur-[160px] pointer-events-none z-0" />

      <div className="max-w-[1500px] mx-auto px-6 md:px-12 relative z-10 py-12">
        
        {/* Navigation / Actions Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 pb-8 border-b border-white/5">
          <div>
            <button 
              onClick={() => navigate(-1)} 
              className="group flex items-center gap-3 text-text-secondary hover:text-accent transition-colors w-max font-sans text-xs uppercase tracking-widest font-bold bg-transparent border-0 outline-none cursor-pointer mb-2"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
            <h1 className="font-display text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              Professional <span className="text-accent">Curriculum Vitae</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-4">
            <a 
              href="/Umer_Khan_CV.pdf" 
              download 
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-black hover:bg-white transition-all text-xs font-bold uppercase tracking-widest"
            >
              <Download size={14} /> Download PDF
            </a>
            <a 
              href="/Umer_Khan_CV.docx" 
              download 
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 hover:border-white text-white transition-all text-xs font-bold uppercase tracking-widest"
            >
              <FileText size={14} /> Download DOCX
            </a>
          </div>
        </div>

        {/* Double-Impact CV Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Clean Responsive HTML CV Display */}
          <div className="lg:col-span-6 space-y-10">
            
            {/* Header Bio block */}
            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
              <h2 className="font-display text-4xl font-black uppercase text-white mb-2 tracking-tight">Umer Khan</h2>
              <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-6">AI/ML Engineer & Full Stack Developer</span>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-text-secondary">
                <div className="flex items-center gap-3">
                  <Mail size={14} className="text-accent" />
                  <a href="mailto:umerkhn819@gmail.com" className="hover:text-white transition-colors">umerkhn819@gmail.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-accent" />
                  <a href="tel:+923181412819" className="hover:text-white transition-colors">+92 318 1412819</a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={14} className="text-accent" />
                  <span>Islamabad, PK</span>
                </div>
                <div className="flex items-center gap-3">
                  <Layers size={14} className="text-accent" />
                  <span>Available for Contract & Full-time</span>
                </div>
                <div className="flex items-center gap-3 md:col-span-2 border-t border-white/5 pt-3 mt-1">
                  <Globe size={14} className="text-accent" />
                  <a href="https://portfolio-seven-delta-add137j6se.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors text-accent font-semibold truncate">portfolio-seven-delta-add137j6se.vercel.app</a>
                </div>
              </div>
            </div>

            {/* Professional Education */}
            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8">
              <h3 className="font-display text-xl font-bold uppercase text-white mb-6 flex items-center gap-3 border-b border-white/5 pb-3">
                <GraduationCap className="text-accent" size={20} /> Academic Credentials
              </h3>
              <div>
                <span className="text-[10px] text-accent uppercase tracking-widest font-bold block mb-1">2024 — Expected Jan 2028</span>
                <h4 className="text-white font-bold text-base mb-1">Bachelor of Science in Computer Science</h4>
                <p className="text-sm text-text-secondary">Air University, Islamabad</p>
              </div>
            </div>

            {/* Certifications and Specs */}
            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8">
              <h3 className="font-display text-xl font-bold uppercase text-white mb-6 flex items-center gap-3 border-b border-white/5 pb-3">
                <Award className="text-accent" size={20} /> Professional Licenses
              </h3>
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] text-accent uppercase tracking-widest font-bold block mb-1">AWS Certified</span>
                  <h4 className="text-white font-bold text-base mb-1">AWS Certified AI Practitioner</h4>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    Validated credentials on AWS Bedrock model environments, Retrieval-Augmented Generation (RAG) orchestration, prompt tuning, and secure enterprise GenAI deployments.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Skills Map */}
            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8">
              <h3 className="font-display text-xl font-bold uppercase text-white mb-6 flex items-center gap-3 border-b border-white/5 pb-3">
                <Terminal className="text-accent" size={20} /> Core Expertise
              </h3>
              <div className="grid grid-cols-2 gap-6 text-xs">
                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider mb-3">AI & ML Pipelines</h4>
                  <ul className="space-y-2 text-text-secondary">
                    <li>• PyTorch & XGBoost</li>
                    <li>• OpenAI / LLM Engineering</li>
                    <li>• LangChain Orchestration</li>
                    <li>• SMOTE Resampling</li>
                    <li>• Time-Series Forecasting</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider mb-3">Full-Stack Mobile & Web</h4>
                  <ul className="space-y-2 text-text-secondary">
                    <li>• React Native & Expo</li>
                    <li>• React.js & Next.js</li>
                    <li>• FastAPI & Node.js Express</li>
                    <li>• Tailwind CSS & Framer Motion</li>
                    <li>• PostgreSQL & MongoDB</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Key Production Products */}
            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-8">
              <h3 className="font-display text-xl font-bold uppercase text-white mb-6 flex items-center gap-3 border-b border-white/5 pb-3">
                <Briefcase className="text-accent" size={20} /> Selected Highlight Products
              </h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-bold text-base">DraftMesh AI Studio</h4>
                  <p className="text-xs text-text-secondary leading-relaxed mt-1">
                    Visual AI pipeline architecture utilizing custom React Flow maps. Allows users to construct, connect, and observe logical state progressions across multi-agent processes.
                  </p>
                </div>
                <div className="border-t border-white/5 pt-4">
                  <h4 className="text-white font-bold text-base">Eatsly AI Mobile Client</h4>
                  <p className="text-xs text-text-secondary leading-relaxed mt-1">
                    An Expo cross-platform mobile app featuring personalized multi-turn culinary consultation powered by Spoonacular and OpenAI API, with JWT storage persistence.
                  </p>
                </div>
                <div className="border-t border-white/5 pt-4">
                  <h4 className="text-white font-bold text-base">FraudGuard ML Classifier</h4>
                  <p className="text-xs text-text-secondary leading-relaxed mt-1">
                    An end-to-end analytical prediction engine trained on highly imbalanced transaction matrices (0.17% fraud profile), utilizing FastAPI, PyTorch, and explainable AI responses.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive High-Contrast Digital CV Sheet */}
          <div className="lg:col-span-6 lg:sticky lg:top-32">
            <div className="bg-white/[0.01] border border-white/5 rounded-3xl p-4 shadow-2xl relative overflow-hidden flex flex-col mb-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-4 px-2">
                <span className="text-text-secondary text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <Eye size={14} className="text-accent" /> High-Fidelity Paper Resume
                </span>
                <span className="text-[10px] text-accent font-mono bg-accent/10 px-2.5 py-1 rounded">Umer_Khan_CV.pdf Layout</span>
              </div>
              
              {/* Styled Interactive Digital Sheet */}
              <div className="w-full rounded-2xl overflow-hidden bg-white text-[#111111] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative max-h-[750px] overflow-y-auto font-sans text-left selection:bg-accent selection:text-black">
                
                {/* Document Header */}
                <div className="text-center border-b-2 border-[#111111] pb-6 mb-6">
                  <h2 className="font-display text-4xl font-black uppercase tracking-tight text-[#111111] mb-1">Umer Khan</h2>
                  <p className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#555555] mb-4">AI/ML Engineer & Full Stack Developer</p>
                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] text-[#555555]">
                    <span className="flex items-center gap-1">Email: <a href="mailto:umerkhn819@gmail.com" className="hover:underline text-[#111111] font-semibold">umerkhn819@gmail.com</a></span>
                    <span className="flex items-center gap-1">Phone: <a href="tel:+923181412819" className="hover:underline text-[#111111] font-semibold">+92 318 1412819</a></span>
                    <span className="flex items-center gap-1">Location: Islamabad, PK</span>
                    <span className="flex items-center gap-1">Portfolio: <a href="https://portfolio-seven-delta-add137j6se.vercel.app/" target="_blank" rel="noreferrer" className="hover:underline text-[#111111] font-bold">portfolio-seven-delta-add137j6se.vercel.app</a></span>
                  </div>
                </div>

                {/* Summary */}
                <div className="mb-6">
                  <h3 className="text-xs uppercase tracking-wider font-black text-[#111111] border-b border-[#cccccc] pb-1 mb-2">Professional Summary</h3>
                  <p className="text-[11px] text-[#333333] leading-relaxed">
                    Highly analytical and results-driven AI/ML Engineer and Full-Stack Developer with a strong foundation in designing, training, and deploying intelligent software systems. Expert in constructing production-grade Machine Learning pipelines, working with complex deep learning architectures, and engineering high-fidelity, interactive user interfaces across web and mobile platforms.
                  </p>
                </div>

                {/* Education */}
                <div className="mb-6">
                  <h3 className="text-xs uppercase tracking-wider font-black text-[#111111] border-b border-[#cccccc] pb-1 mb-2">Education</h3>
                  <div className="flex justify-between items-start text-[11px]">
                    <div>
                      <h4 className="font-bold text-[#111111]">Bachelor of Science in Computer Science</h4>
                      <p className="text-[#555555] italic">Air University, Islamabad</p>
                    </div>
                    <span className="font-mono text-[#555555] text-[10px]">2024 — Expected Jan 2028</span>
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-6">
                  <h3 className="text-xs uppercase tracking-wider font-black text-[#111111] border-b border-[#cccccc] pb-1 mb-2">Licenses & Certifications</h3>
                  <div className="flex justify-between items-start text-[11px]">
                    <div>
                      <h4 className="font-bold text-[#111111]">AWS Certified AI Practitioner</h4>
                      <p className="text-[#555555] italic">Generative AI on AWS Bedrock & RAG</p>
                    </div>
                    <span className="font-mono text-[#555555] text-[10px]">AWS Certified</span>
                  </div>
                </div>

                {/* Projects */}
                <div className="mb-6">
                  <h3 className="text-xs uppercase tracking-wider font-black text-[#111111] border-b border-[#cccccc] pb-1 mb-3">Key Technical Projects</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-[#111111] text-[11px]">DraftMesh AI Studio</h4>
                        <span className="text-[9px] text-[#555555] font-mono">React Flow, TypeScript, Zustand</span>
                      </div>
                      <p className="text-[10px] text-[#333333] leading-relaxed mt-1">
                        Designed and built a visual multi-agent workflow studio with topologically sorted execution graphs, live conditional routing, and responsive local/cloud state synchronization.
                      </p>
                    </div>

                    <div className="border-t border-[#eeeeee] pt-3">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-[#111111] text-[11px]">FraudGuard AI Pipeline</h4>
                        <span className="text-[9px] text-[#555555] font-mono">PyTorch, FastAPI, OpenAI API</span>
                      </div>
                      <p className="text-[10px] text-[#333333] leading-relaxed mt-1">
                        Architected an end-to-end anomaly classifier handling extreme data imbalance (0.17% rate) using PyTorch deep networks. Integrated OpenAI-powered Explainable AI logs providing instant textual predictions inside analyst portals.
                      </p>
                    </div>

                    <div className="border-t border-[#eeeeee] pt-3">
                      <div className="flex justify-between items-baseline">
                        <h4 className="font-bold text-[#111111] text-[11px]">Eatsly Mobile Assistant</h4>
                        <span className="text-[9px] text-[#555555] font-mono">React Native (Expo), Node.js, JWT</span>
                      </div>
                      <p className="text-[10px] text-[#333333] leading-relaxed mt-1">
                        Developed a dual-platform recipe suggestions app incorporating Spoonacular and OpenAI multi-turn chat consulting. Implemented JWT sessions and Expo secure keychain stores.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Technical Skills */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-black text-[#111111] border-b border-[#cccccc] pb-1 mb-2">Technical Skills</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-[10px]">
                    <div>
                      <span className="font-bold text-[#111111]">Core Languages:</span>
                      <span className="text-[#333333] ml-1">Python, JavaScript, TypeScript, SQL, HTML5/CSS3</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#111111]">ML Libraries:</span>
                      <span className="text-[#333333] ml-1">PyTorch, Scikit-Learn, Pandas, NumPy, XGBoost</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#111111]">Web/Mobile:</span>
                      <span className="text-[#333333] ml-1">React, React Native, Expo, FastAPI, Node.js, Express</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#111111]">Databases & Devops:</span>
                      <span className="text-[#333333] ml-1">PostgreSQL, MongoDB (Mongoose), Docker, Redis, Git</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="text-center pt-4 text-xs text-text-secondary font-sans leading-relaxed">
                Want to download the physical document? 
                <a 
                  href="/Umer_Khan_CV.pdf" 
                  download 
                  className="text-accent font-bold ml-1 hover:underline inline-flex items-center gap-1"
                >
                  Download PDF CV
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
      <Footer />
    </motion.main>
  );
}
