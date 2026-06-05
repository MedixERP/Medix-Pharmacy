import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-500 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <a href="#home" className="flex items-center gap-2.5 cursor-pointer group">
          {/* تم استبدال الـ div المربع باللوجو الرسمي النظيف الخاص بكِ من الـ public */}
          <img 
            src="/logo.jpg" 
            alt="Medix Logo" 
            className="w-9 h-9 object-contain shadow-sm group-hover:scale-105 group-hover:shadow-cyan-500/10 transition-all duration-300 rounded-xl"
          />
          <span className="font-bold text-xl text-[#1B2A49] tracking-tight">Medix</span>
        </a>

        {/* Center Links */}
        <ul className="hidden md:flex items-center gap-8 text-[14px] font-semibold text-slate-600">
          {[
            { href: '#home', label: 'Home' },
            { href: '#core-features', label: 'Core Features' },
            { href: '#ai-capabilities', label: 'AI Capabilities' },
            { href: '#project-scope', label: 'Project Scope' },
          ].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative text-slate-600 hover:text-[#1B2A49] transition-colors duration-200 after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-cyan-500 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button className="text-[#1B2A49] text-sm font-bold cursor-pointer hover:bg-slate-100 px-4 py-2 rounded-full transition-all duration-200">
            Login
          </button>
          <button className="bg-[#1B2A49] hover:bg-[#24375d] text-white text-sm px-5 py-2 rounded-full font-bold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5">
            Register
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;