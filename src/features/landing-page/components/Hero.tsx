'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiLogIn } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

interface AnimBtnProps {
  children: React.ReactNode;
  primary?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

const AnimatedBorderButton: React.FC<AnimBtnProps> = ({ children, primary = false, icon, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 
        rounded-full font-bold text-sm tracking-wide cursor-pointer select-none 
        overflow-hidden transition-all duration-300 z-10
        ${primary 
          ? 'bg-[#1B2A49] hover:bg-[#24375d] text-white shadow-sm hover:shadow-md' 
          : 'bg-white hover:bg-[#f8fafc] text-[#1B2A49] border border-slate-200 shadow-sm hover:shadow-md'
        }
      `}
    >
      <motion.div 
        initial={{ left: "-100%" }}
        animate={isHovered ? { left: "100%" } : { left: "-100%" }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
        className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 pointer-events-none z-20"
      />

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>

      {icon && (
        <motion.span 
          className="relative z-10 text-current shrink-0 flex items-center justify-center"
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {icon}
        </motion.span>
      )}
    </button>
  );
};

const TiltCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative cursor-pointer select-none">
      {children}
    </div>
  );
};

const Blob: React.FC<{ className: string; delay?: number }> = ({ className, delay = 0 }) => (
  <motion.div
    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.45, 0.3] }}
    transition={{ duration: 8, repeat: Infinity, delay, ease: 'easeInOut' }}
    className={`absolute rounded-full filter blur-3xl pointer-events-none ${className}`}
  />
);

const Hero: React.FC = () => {
  const navigate = useNavigate(); // تفعيل الـ Navigation للتحويل بين الصفحات

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#f1f5f9] via-[#f8fafc] to-[#ffffff]">
      <Blob className="top-1/4 left-1/12 w-96 h-96 bg-blue-200/50" />
      <Blob className="top-1/3 right-1/12 w-96 h-96 bg-cyan-200/40" delay={2} />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10 w-full">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-blue-50 text-blue-800 text-xs font-bold tracking-wide border border-blue-100">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            Enterprise Pharmacy Solution
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1B2A49] leading-[1.15] mb-6 tracking-tight">
            The Intelligent <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Pharmacy Ecosystem
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-500 mb-10 max-w-xl leading-relaxed">
            Modernizing and automating pharmacy operations using Web, Mobile, and Artificial Intelligence. Step into the future of healthcare management.
          </p>

          <div className="flex flex-wrap gap-5 items-center">
            {/* ربط زر الـ Register */}
            <AnimatedBorderButton 
              primary 
              icon={<FiArrowRight size={16} />} 
              onClick={() => navigate('/register')}
            >
              Register Pharmacy
            </AnimatedBorderButton>
            
            {/* ربط زر الـ Sign In */}
            <AnimatedBorderButton 
              icon={<FiLogIn size={16} />} 
              onClick={() => navigate('/login')}
            >
              Sign In
            </AnimatedBorderButton>
          </div>
        </motion.div>

        {/* Right Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <TiltCard>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-[2.5rem] blur-2xl opacity-10 pointer-events-none" />
            
            <div className="relative w-full aspect-[4/3] rounded-2xl shadow-xl overflow-hidden border border-slate-200/80 bg-white flex flex-col">
              
              {/* شريط المتصفح العلوي */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-100 bg-white shrink-0">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                <div className="ml-4 flex-1 h-5 rounded-full bg-slate-50 border border-slate-100 max-w-[180px]" />
              </div>

              {/* منطقة الصورة اللوجو الموحد */}
              <div className="relative flex-1 h-full w-full overflow-hidden rounded-b-xl group bg-slate-50">
                <img
                  src="/logo.jpeg" 
                  alt="Medix Brand Logo"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-slate-100/20 via-transparent to-transparent pointer-events-none" />

                {/* الـ Hover Effect للـ Live Demo */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-20 opacity-0 group-hover:opacity-100 bg-[#1B2A49]/10 backdrop-blur-[3px] transition-all duration-300">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-full bg-[#1B2A49] shadow-lg flex items-center justify-center border border-white/20 cursor-pointer"
                  >
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                  <p className="font-bold text-white text-[11px] tracking-widest uppercase drop-shadow-md">VIEW LIVE DEMO</p>
                </div>
              </div>

            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;