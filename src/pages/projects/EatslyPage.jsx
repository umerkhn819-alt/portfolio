import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  MessageSquare, 
  Smartphone, 
  Lock, 
  Utensils, 
  Sparkles, 
  Database, 
  ChevronRight, 
  Layers, 
  Globe, 
  Flame, 
  Clock 
} from "lucide-react";
import { Footer } from "../../components/layout/Footer";

export function EatslyPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("ingredients"); // ingredients, steps

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const screenshots = [
    "/Eatsly App/WhatsApp Image 2026-05-04 at 12.23.34 AM.jpeg",
    "/Eatsly App/WhatsApp Image 2026-05-04 at 12.23.34 AM (1).jpeg",
    "/Eatsly App/WhatsApp Image 2026-05-04 at 12.23.34 AM (2).jpeg",
    "/Eatsly App/WhatsApp Image 2026-05-04 at 12.23.35 AM.jpeg",
    "/Eatsly App/WhatsApp Image 2026-05-04 at 12.23.35 AM (1).jpeg",
    "/Eatsly App/WhatsApp Image 2026-05-04 at 12.23.35 AM (2).jpeg",
    "/Eatsly App/WhatsApp Image 2026-05-04 at 12.23.35 AM (3).jpeg",
    "/Eatsly App/WhatsApp Image 2026-05-04 at 12.23.36 AM.jpeg",
    "/Eatsly App/WhatsApp Image 2026-05-04 at 12.23.36 AM (1).jpeg",
    "/Eatsly App/WhatsApp Image 2026-05-04 at 12.23.36 AM (2).jpeg",
    "/Eatsly App/WhatsApp Image 2026-05-04 at 12.43.00 AM.jpeg",
    "/Eatsly App/WhatsApp Image 2026-05-04 at 12.43.00 AM (1).jpeg"
  ];

  const recipeDetails = {
    title: "Gourmet Creamy Pumpkin Soup",
    prepTime: "15 min",
    cookTime: "25 min",
    difficulty: "Easy",
    ingredients: [
      "2 cups pureed roasted pumpkin",
      "1 cup vegetable or chicken broth",
      "1/2 cup heavy coconut milk",
      "2 garlic cloves, finely minced",
      "1/2 medium onion, diced",
      "1 tbsp olive oil",
      "1/2 tsp nutmeg and cinnamon",
      "Salt & freshly ground black pepper"
    ],
    steps: [
      "Heat olive oil in a heavy saucepan and sauté diced onions and minced garlic for 3 minutes until translucent.",
      "Add pureed roasted pumpkin and hot vegetable broth. Bring to a gentle boil, then simmer on low heat for 10 minutes.",
      "Stir in nutmeg, cinnamon, salt, and pepper. Use an immersion blender until velvety smooth.",
      "Slowly pour in coconut milk and stir well on ultra-low heat for another 2 minutes.",
      "Ladle into warm bowls, garnish with pumpkin seeds and a swirl of coconut cream, and serve hot."
    ]
  };

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen bg-[#030504] text-white pt-24 font-sans relative overflow-hidden selection:bg-accent selection:text-black"
    >
      {/* Background Orbs */}
      <div className="absolute top-12 right-1/4 w-[500px] h-[500px] bg-emerald-950/20 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 left-10 w-[600px] h-[600px] bg-[#85EE00]/5 rounded-full blur-[160px] pointer-events-none z-0" />

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
            href="https://github.com/umerkhn819-alt/Eatsly-App"
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
            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase block mb-4">Smart Culinary System</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
              EATSLY AI <span className="text-white/20">APP</span>
            </h1>
            <p className="font-sans text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
              A high-end, cross-platform mobile application utilizing AI algorithms to generate customized meal recommendations, multi-turn culinary chat dialogs, and robust cloud recipe collections.
            </p>
          </div>

          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-8 lg:pt-0 lg:pl-12 grid grid-cols-2 gap-8 text-sm">
            <div>
              <span className="text-text-secondary uppercase tracking-widest text-[10px] block mb-2">Role</span>
              <span className="font-bold text-white">Full-Stack Mobile Lead</span>
            </div>
            <div>
              <span className="text-text-secondary uppercase tracking-widest text-[10px] block mb-2">Timeline</span>
              <span className="font-bold text-white">6 Weeks (2026)</span>
            </div>
            <div>
              <span className="text-text-secondary uppercase tracking-widest text-[10px] block mb-2">Platform</span>
              <span className="font-bold text-white font-sans">React Native (Expo)</span>
            </div>
            <div>
              <span className="text-text-secondary uppercase tracking-widest text-[10px] block mb-2">Database</span>
              <span className="font-bold text-accent font-sans">MongoDB Cloud</span>
            </div>
          </div>
        </div>

        {/* Floating Mobile Screenshot Carousel Section */}
        <section className="mb-32 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/5 via-transparent to-transparent pointer-events-none z-0" />
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <h2 className="font-display text-2xl md:text-4xl uppercase font-bold tracking-tight text-white mb-3">
                MOBILE <span className="text-accent">SCREENSHOT GALLERY</span>
              </h2>
              <p className="text-text-secondary text-sm max-w-lg">
                Scroll horizontally to observe the polished React Native visual system. Every interface is styled with modern dark mode gradients and accessible touch ergonomics.
              </p>
            </div>
            <div className="text-text-secondary text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2">
              Swipe Left / Right <ChevronRight size={14} className="animate-pulse" />
            </div>
          </div>

          {/* Screenshot Slider Container */}
          <div className="w-full overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent flex gap-6 snap-x snap-mandatory relative z-10">
            {screenshots.map((src, index) => (
              <div key={index} className="flex-none snap-start snap-always w-[280px] md:w-[320px] aspect-[9/19] rounded-[2.5rem] bg-[#111613] p-3 border border-white/10 shadow-2xl hover:-translate-y-2 hover:border-emerald-500/40 transition-all duration-500 relative group overflow-hidden">
                {/* Smartphone Screen mock container */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                  <div className="w-12 h-1 bg-white/20 rounded-full" />
                </div>
                
                <div className="w-full h-full rounded-[2rem] overflow-hidden relative bg-black">
                  <img 
                    src={src} 
                    alt={`Eatsly Screen ${index + 1}`} 
                    className="w-full h-full object-cover relative z-10"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500 z-15" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE GOURMET RECIPE PREVIEW */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32">
          {/* Left Side Recipe Presentation Card */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-lg bg-white/[0.02] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl backdrop-blur-xl hover:border-accent/15 transition-all duration-500 transform-gpu relative">
              <div className="absolute top-0 right-0 p-4 bg-accent text-black font-sans text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">
                TasteAI Selection
              </div>
              
              {/* Product Card Image */}
              <div className="h-[260px] w-full relative overflow-hidden bg-black">
                <img 
                  src="/Eatsly App/Pumpkin-Soup-with-canned-pumpkin-18-1024x683.webp" 
                  alt="Pumpkin Soup recipe display" 
                  className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1210] to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <h3 className="font-display text-3xl font-black uppercase text-white tracking-tight leading-tight">
                    {recipeDetails.title}
                  </h3>
                </div>
              </div>

              {/* Recipe card body with dynamic tab selection */}
              <div className="p-8 bg-[#0e1210]">
                {/* Meta details */}
                <div className="grid grid-cols-3 gap-4 pb-6 mb-6 border-b border-white/5 text-center text-xs">
                  <div>
                    <span className="text-text-secondary uppercase text-[9px] tracking-wider block mb-1">Prep Time</span>
                    <strong className="text-white font-sans flex items-center justify-center gap-1"><Clock size={12} className="text-accent" /> {recipeDetails.prepTime}</strong>
                  </div>
                  <div>
                    <span className="text-text-secondary uppercase text-[9px] tracking-wider block mb-1">Cook Time</span>
                    <strong className="text-white font-sans flex items-center justify-center gap-1"><Utensils size={12} className="text-accent" /> {recipeDetails.cookTime}</strong>
                  </div>
                  <div>
                    <span className="text-text-secondary uppercase text-[9px] tracking-wider block mb-1">Difficulty</span>
                    <strong className="text-accent font-sans uppercase text-[10px] font-bold">{recipeDetails.difficulty}</strong>
                  </div>
                </div>

                {/* Tab select Buttons */}
                <div className="flex border-b border-white/5 gap-6 mb-6">
                  <button 
                    onClick={() => setActiveTab("ingredients")}
                    className={`pb-3 font-sans text-xs uppercase tracking-widest font-black transition-colors relative ${
                      activeTab === "ingredients" ? "text-accent" : "text-text-secondary hover:text-white"
                    }`}
                  >
                    Ingredients
                    {activeTab === "ingredients" && <motion.div layoutId="recipeTabLine" className="absolute bottom-0 inset-x-0 h-[2px] bg-accent" />}
                  </button>
                  <button 
                    onClick={() => setActiveTab("steps")}
                    className={`pb-3 font-sans text-xs uppercase tracking-widest font-black transition-colors relative ${
                      activeTab === "steps" ? "text-accent" : "text-text-secondary hover:text-white"
                    }`}
                  >
                    Instructions
                    {activeTab === "steps" && <motion.div layoutId="recipeTabLine" className="absolute bottom-0 inset-x-0 h-[2px] bg-accent" />}
                  </button>
                </div>

                {/* Animated lists */}
                <div className="min-h-[220px]">
                  <AnimatePresence mode="wait">
                    {activeTab === "ingredients" ? (
                      <motion.ul 
                        key="ingredients"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3 text-sm text-text-secondary font-sans list-inside"
                      >
                        {recipeDetails.ingredients.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-accent font-bold mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </motion.ul>
                    ) : (
                      <motion.ol 
                        key="steps"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 text-sm text-text-secondary font-sans"
                      >
                        {recipeDetails.steps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <strong className="text-accent font-mono text-xs mt-0.5 bg-accent/5 px-2 py-0.5 rounded border border-accent/15">0{idx + 1}</strong>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </motion.ol>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Product Copy */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-accent text-xs font-bold tracking-[0.2em] uppercase block mb-4">Core Technology</span>
            <h2 className="font-display text-4xl md:text-5xl font-black uppercase text-white tracking-tight mb-8">
              PREMIUM THREE-MODULE PRODUCT PILLARS
            </h2>
            <p className="text-text-secondary text-base leading-relaxed mb-10">
              Eatsly is a complete production environment comprising a high-performance cross-platform mobile client built on Expo, a comprehensive admin dashboard client, and a modular server API framework.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">🤖 AI Intelligence Hub</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Integrated OpenAI API and Spoonacular recipes API to construct personalized recipe listings based on user-input notes, cooking skill levels, and dietary goals. Provides conversational cooking tips via multi-turn chats.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-[#85EE00]/10 text-accent flex items-center justify-center flex-shrink-0">
                  <Smartphone size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">🛠 High-Fidelity Mobile UX</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Designed dynamic scrolling feeds, a recipe creation workspace, structured step forms, and social collections. Fully integrated JWT token management secured locally via Expo-Secure-Store.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center flex-shrink-0">
                  <Lock size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-2">🛡 Secure Auth & Admin Dashboard</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Strict role-based access control (RBAC). Admin panel shows real-time user activity charts, system telemetry, database status metrics, and automated system bootstrapping.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Stack Architecture */}
        <section className="mb-24">
          <h2 className="font-display text-4xl font-bold uppercase mb-12 tracking-tight text-white">
            Architecture <span className="text-white/20">& Telemetry</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.02] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                <Database size={22} />
              </div>
              <h3 className="font-display text-xl font-bold uppercase mb-4 text-white">API Framework</h3>
              <p className="text-text-secondary leading-relaxed font-sans">
                Node.js & Express.js REST API using Mongoose models for cloud storage. Designed to support zero-configuration ephemeral states using an active memory DB profile (`npm run dev:memory`).
              </p>
            </div>

            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.02] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#85EE00]/10 text-accent flex items-center justify-center mb-6">
                <Layers size={22} />
              </div>
              <h3 className="font-display text-xl font-bold uppercase mb-4 text-white">Expo Ecosystem</h3>
              <p className="text-text-secondary leading-relaxed font-sans">
                Native smartphone performance compiling to both iOS and Android. Handles complex asynchronous assets, offline recipe collections, and automatic image layout compression.
              </p>
            </div>

            <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.02] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6">
                <Globe size={22} />
              </div>
              <h3 className="font-display text-xl font-bold uppercase mb-4 text-white">CORS & Security</h3>
              <p className="text-text-secondary leading-relaxed font-sans">
                Strict CORS headers matching web domains and dashboard services. Automatically bootstraps secure administrative superuser roles upon initial server startup for fail-safe operations.
              </p>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </motion.main>
  );
}
