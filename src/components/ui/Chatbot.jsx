import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

const PRECONFIGURED_QA = [
  {
    q: "What is your tech stack?",
    a: "I specialize in Full-Stack development (React, Node.js, PostgreSQL) and AI/ML Engineering (PyTorch, LangChain, AWS Bedrock). I build intelligent web and mobile apps end-to-end."
  },
  {
    q: "Are you available for work?",
    a: "Yes! I am currently available for new roles, internships, and freelance projects. Let's build something amazing together."
  },
  {
    q: "How do you integrate AI?",
    a: "I train custom ML models using Scikit-Learn/PyTorch and integrate Large Language Models (LLMs) via OpenAI API & LangChain using RAG architectures to make apps conversational and predictive."
  }
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hi! I'm Umer's AI assistant. How can I help you?" }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleAsk = (qa) => {
    setMessages(prev => [...prev, { type: 'user', text: qa.q }]);
    
    // Simulate typing delay
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: qa.a }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-[100] w-16 h-16 bg-accent rounded-full flex items-center justify-center text-black shadow-[0_0_30px_rgba(133,238,0,0.4)] hover:scale-110 transition-transform ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Bot size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-[101] w-[350px] sm:w-[400px] h-[500px] bg-background-dark border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-black">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg leading-tight">Umer AI</h3>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-accent">Online</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={i} 
                  className={`flex gap-3 max-w-[85%] ${msg.type === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === 'user' ? 'bg-white/10 text-white' : 'bg-accent text-black'}`}>
                    {msg.type === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm font-sans leading-relaxed ${msg.type === 'user' ? 'bg-white/10 text-white rounded-tr-none' : 'bg-accent/10 border border-accent/20 text-white rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions Area */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <p className="font-sans text-[10px] uppercase tracking-widest text-text-secondary mb-3">Ask a question:</p>
              <div className="flex flex-col gap-2">
                {PRECONFIGURED_QA.map((qa, i) => (
                  <button
                    key={i}
                    onClick={() => handleAsk(qa)}
                    className="text-left px-4 py-2 rounded-xl border border-white/10 bg-background-dark hover:bg-white/10 hover:border-white/30 transition-all font-sans text-xs text-white"
                  >
                    {qa.q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
