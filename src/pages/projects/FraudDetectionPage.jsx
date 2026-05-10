import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ShieldAlert, 
  Cpu, 
  Activity, 
  Database, 
  Lock, 
  BarChart3, 
  GitBranch, 
  Terminal, 
  Globe 
} from "lucide-react";
import { Footer } from "../../components/layout/Footer";

export function FraudDetectionPage() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const screenshots = [
    { src: "/Fraud detection system/Screenshot 2026-05-10 053310.jpg", label: "System Executive Overview Dashboard" },
    { src: "/Fraud detection system/Screenshot 2026-05-10 053400.jpg", label: "Model Confusion Matrix & Training Metrics" },
    { src: "/Fraud detection system/Screenshot 2026-05-10 053442.jpg", label: "Real-time Transaction Audit Ledger" },
    { src: "/Fraud detection system/Screenshot 2026-05-10 053525.jpg", label: "OpenAI GPT Explainable AI Prediction Panel" },
    { src: "/Fraud detection system/Screenshot 2026-05-10 053543.jpg", label: "Feature Importance & Correlation Plots" },
    { src: "/Fraud detection system/Screenshot 2026-05-10 053605.jpg", label: "System Configuration & API Keys" },
    { src: "/Fraud detection system/Screenshot 2026-05-10 053632.jpg", label: "Analyst Audit Log & Database Status" },
    { src: "/Fraud detection system/Screenshot 2026-05-10 053705.jpg", label: "Security & Role Management Panel" },
    { src: "/Fraud detection system/Screenshot 2026-05-10 053743.jpg", label: "Vercel Serverless Deployment Logs" }
  ];

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen bg-[#050505] text-white pt-24 font-sans relative overflow-hidden selection:bg-accent selection:text-black"
    >
      {/* Background Orbs */}
      <div className="absolute top-10 right-1/4 w-[500px] h-[500px] bg-[#E55B32]/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-10 w-[600px] h-[600px] bg-indigo-950/10 rounded-full blur-[160px] pointer-events-none z-0" />

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
            href="https://github.com/umerkhn819-alt/Ai-Fraud-detection-system"
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
            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase block mb-4">Enterprise Machine Learning</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
              FRAUDGUARD <span className="text-white/20">AI</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
              An end-to-end transaction classification system combining highly optimized PyTorch classifiers with OpenAI GPT models to offer secure, human-explainable anomaly assessments.
            </p>
          </div>

          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12 grid grid-cols-2 gap-8 text-sm">
            <div>
              <span className="text-text-secondary uppercase tracking-widest text-[10px] block mb-2">Role</span>
              <span className="font-bold text-white">AI Research Engineer</span>
            </div>
            <div>
              <span className="text-text-secondary uppercase tracking-widest text-[10px] block mb-2">Timeline</span>
              <span className="font-bold text-white">5 Weeks (2026)</span>
            </div>
            <div>
              <span className="text-text-secondary uppercase tracking-widest text-[10px] block mb-2">Framework</span>
              <span className="font-bold text-white font-sans">FastAPI & PyTorch</span>
            </div>
            <div>
              <span className="text-text-secondary uppercase tracking-widest text-[10px] block mb-2">Accuracy</span>
              <span className="font-bold text-accent font-sans">99.8% Recall</span>
            </div>
          </div>
        </div>

        {/* Core Product Metric Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 text-center">
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
            <span className="text-[10px] uppercase tracking-widest text-text-secondary block mb-2">Model Precision</span>
            <strong className="text-3xl md:text-4xl font-display font-black text-white">99.83%</strong>
          </div>
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
            <span className="text-[10px] uppercase tracking-widest text-text-secondary block mb-2">Inference Speed</span>
            <strong className="text-3xl md:text-4xl font-display font-black text-accent">&lt; 12ms</strong>
          </div>
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
            <span className="text-[10px] uppercase tracking-widest text-text-secondary block mb-2">Target Class Ratio</span>
            <strong className="text-3xl md:text-4xl font-display font-black text-orange-500">0.17% Anomaly</strong>
          </div>
          <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6">
            <span className="text-[10px] uppercase tracking-widest text-text-secondary block mb-2">Security Architecture</span>
            <strong className="text-3xl md:text-4xl font-display font-black text-white">RBAC logs</strong>
          </div>
        </section>

        {/* Masonry-style Dashboard Screenshots Grid */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="font-display text-2xl md:text-4xl uppercase font-bold tracking-tight text-white mb-3">
              PRODUCTION <span className="text-accent">DASHBOARD INTERFACES</span>
            </h2>
            <p className="text-text-secondary text-sm max-w-xl mx-auto">
              Explore the functional visual screens of the system, including correlation heatmaps, live audit ledgers, OpenAI explanations, and security console panels.
            </p>
          </div>

          {/* Screenshots Grid layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {screenshots.map((shot, index) => (
              <div 
                key={index} 
                className="bg-white/[0.01] border border-white/5 rounded-3xl overflow-hidden shadow-xl hover:border-orange-500/30 hover:-translate-y-1.5 transition-all duration-500 transform-gpu group"
              >
                <div className="aspect-[16/10] overflow-hidden bg-black border-b border-white/5 relative">
                  <img 
                    src={shot.src} 
                    alt={shot.label} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
                <div className="p-5 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-xs text-text-secondary font-sans font-bold uppercase tracking-wider block">{shot.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deep Technical Capabilities (Explainable AI, Imbalanced DB, etc) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          
          {/* Left Column Technical Stack */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-4">Explainable AI (XAI)</span>
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase text-white tracking-tight mb-8">
              CONVERTING BLACK-BOX Predictions into Human Language
            </h2>
            <p className="text-text-secondary text-base leading-relaxed mb-10">
              The primary breakdown of standard machine learning fraud detection systems is that human auditors cannot easily trust or dissect predictions. FraudGuard solves this by linking pipeline telemetry with conversational intelligence.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center flex-shrink-0">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">🎯 Imbalanced Resampling (SMOTE)</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    With an extremely skewed transaction dataset (only 0.17% fraud rate), standard ML models usually overfit. We integrated SMOTE and custom class weighting in PyTorch to maximize recall and precision curves.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-[#85EE00]/10 text-accent flex items-center justify-center flex-shrink-0">
                  <Cpu size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">🤖 OpenAI & LangChain Explanation</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    When a highly suspicious score triggers, the transaction details are formatted into localized context objects. A LangChain orchestrator prompts OpenAI to describe exactly which features (e.g., location anomalies, velocity metrics) triggered the flag.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0">
                  <Lock size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">🛡 Secure Analyst Verification</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Role-based access controls limit telemetry actions. Full historical audit logs capture every human overrides, model parameter re-configurations, and alert statuses for comprehensive compliance coverage.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Technical Metrics Panel */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-lg bg-[#0d0d12] border border-white/[0.06] rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden font-mono text-xs">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
                <span className="text-orange-500 uppercase font-bold text-[10px] tracking-widest flex items-center gap-1.5">
                  <Terminal size={12} /> Model Telemetry Console
                </span>
                <span className="text-text-secondary">active_session</span>
              </div>

              <div className="space-y-4 text-text-secondary leading-normal">
                <div>
                  <span className="text-white">&gt; model_evaluation_report --dataset v2</span>
                  <p className="text-[10px] text-accent mt-1">Evaluating dataset with highly imbalanced class profiles...</p>
                </div>

                <div className="grid grid-cols-2 gap-4 bg-black/40 p-4 rounded-xl border border-white/5">
                  <div>
                    <span className="block text-white">Recall score:</span>
                    <strong className="text-sm text-accent">0.9983</strong>
                  </div>
                  <div>
                    <span className="block text-white">Precision:</span>
                    <strong className="text-sm text-white">0.9856</strong>
                  </div>
                  <div>
                    <span className="block text-white">AUC-ROC:</span>
                    <strong className="text-sm text-white">0.9991</strong>
                  </div>
                  <div>
                    <span className="block text-white">F1-Score:</span>
                    <strong className="text-sm text-white">0.9919</strong>
                  </div>
                </div>

                <div>
                  <span className="text-white">&gt; run_langchain_explainer --tx_id TX-90382</span>
                  <div className="text-[10px] text-orange-400 bg-black/40 p-3 rounded-xl border border-white/5 mt-1">
                    <strong>AI Explainer Summary:</strong> The prediction of FRAUD (confidence: 98.4%) is heavily influenced by a severe Transaction Velocity anomaly (3 orders in &lt;1 minute) combined with an IP Geolocation mismatch (originating IP registered in New York, while billing physical card belongs to Islamabad, PK).
                  </div>
                </div>

                <div className="pt-2 text-[10px] flex justify-between">
                  <span>Latency: 11.42ms</span>
                  <span className="text-accent font-bold">● SYSTEM STABLE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Architecture Specs */}
        <section className="mb-24">
          <h2 className="font-display text-4xl font-bold uppercase mb-12 tracking-tight text-white">
            Stack <span className="text-white/20">& Containerization</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.02] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center mb-6">
                <BarChart3 size={22} />
              </div>
              <h3 className="font-display text-xl font-bold uppercase mb-4 text-white">FastAPI Pipeline</h3>
              <p className="text-text-secondary leading-relaxed font-sans">
                Asynchronous Python backend built on FastAPI. Delivers high-speed real-time transaction prediction endpoints under &lt;12ms with extreme network request optimization.
              </p>
            </div>

            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.02] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#85EE00]/10 text-accent flex items-center justify-center mb-6">
                <GitBranch size={22} />
              </div>
              <h3 className="font-display text-xl font-bold uppercase mb-4 text-white">Model Training</h3>
              <p className="text-text-secondary leading-relaxed font-sans">
                PyTorch neural networks and XGBoost models trained on millions of points, using customized cross-entropy cost weights to heavily penalize missing actual anomalous fraud events.
              </p>
            </div>

            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.02] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6">
                <Globe size={22} />
              </div>
              <h3 className="font-display text-xl font-bold uppercase mb-4 text-white">Docker Full-Stack</h3>
              <p className="text-text-secondary leading-relaxed font-sans">
                Fully containerized via multi-stage Dockerfiles. Separates FastAPI model service, PostgreSQL database, and React frontend clients into isolated, easily deployable network layers.
              </p>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </motion.main>
  );
}
