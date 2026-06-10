'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { cn } from '../../lib/cn'; // تأكد من صحة مسار ملف الـ cn في مشروعك

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // محاكاة الاتصال بالسيرفر والـ API
    console.log({ email, password });
    setTimeout(() => setIsLoading(false), 1600);
  };

  // إعدادات الحركة لظهور العناصر بالتتالي (Stagger Effect)
  const containerVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.06 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 relative overflow-hidden select-none font-sans antialiased text-[#1B2A49]">
      
      {/* 1. الخلفية التكنولوجية المضيئة: شبكة الجريد الناعمة وبقع الألوان المبهجة */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />
      
      {/* بقع الإضاءة الحيوية خلف الكارت */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-cyan-200/50 rounded-full filter blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-blue-200/40 rounded-full filter blur-[120px] pointer-events-none" 
      />

      {/* 2. زر العودة السريع للصفحة الرئيسية */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white/60 text-slate-500 text-xs font-bold tracking-wide hover:text-[#1B2A49] hover:border-cyan-500/40 hover:bg-white shadow-sm hover:shadow transition-all duration-300 cursor-pointer backdrop-blur-md z-20"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Platform
      </button>

      {/* 3. كارت تسجيل الدخول الزجاجي المضيء الفاخر (Premium Light Glass Node) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[450px] bg-white/75 border border-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(27,42,73,0.06)] border-slate-200/60 relative z-10"
      >
        {/* الهيدر: الشعار والهوية البصرية */}
        <div className="text-center mb-7">
          <motion.div 
            variants={itemVariants}
            className="w-16 h-16 mx-auto rounded-2xl bg-white border border-slate-100 p-1.5 shadow-sm flex items-center justify-center mb-4 relative group"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 opacity-10 blur-sm group-hover:opacity-20 transition-opacity duration-300" />
            <img 
              src="/logo.jpeg" 
              alt="Medix Logo" 
              className="w-full h-full object-contain rounded-xl relative z-10"
            />
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-2xl font-black text-[#1B2A49] tracking-tight">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Medix</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-cyan-600 text-[10px] mt-1.5 font-bold uppercase tracking-[0.2em]">
            Secure Enterprise Gateway
          </motion.p>
        </div>

        {/* 4. أزرار تسجيل الدخول الاجتماعي (Social Login Row) */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
          >
            <FcGoogle className="w-4 h-4 shrink-0" />
            <span>Google ID</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
          >
            <FaFacebook className="w-4 h-4 text-[#1877F2] shrink-0" />
            <span>Facebook</span>
          </button>
        </motion.div>

        {/* فاصل خطي أنيق */}
        <motion.div variants={itemVariants} className="relative flex py-2 items-center text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
          <div className="flex-grow border-t border-slate-200/80"></div>
          <span className="flex-shrink mx-4 text-[10px]">Or Security Token</span>
          <div className="flex-grow border-t border-slate-200/80"></div>
        </motion.div>

        {/* فورم تسجيل الدخول الأساسي */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* حقل البريد الإلكتروني */}
          <motion.div variants={itemVariants} className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-600 transition-colors">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@medix-system.local"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm text-[#1B2A49] font-medium placeholder-slate-400 focus:outline-none focus:border-cyan-500/80 focus:ring-4 focus:ring-cyan-500/10 transition-all shadow-sm"
              />
            </div>
          </motion.div>

          {/* حقل كلمة المرور مع تبديل الزر البديل لـ Forgot Password */}
          <motion.div variants={itemVariants} className="space-y-1.5">
            <div className="flex items-center justify-between pl-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Password
              </label>
              {/* تم استبدال الفرجيت باسوورد بزر المساعدة الذكي والمختلف */}
              <a 
                href="#" 
                className="inline-flex items-center gap-1 text-[11px] font-bold text-cyan-600 hover:text-cyan-700 transition-colors cursor-pointer tracking-wide"
              >
                <HelpCircle className="w-3 h-3" />
                Need Access Help?
              </a>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-600 transition-colors">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3.5 bg-white border border-slate-200 rounded-xl text-sm text-[#1B2A49] font-medium placeholder-slate-400 focus:outline-none focus:border-cyan-500/80 focus:ring-4 focus:ring-cyan-500/10 transition-all shadow-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>

          {/* خيار الحفظ والبقاء متصلاً */}
          <motion.div variants={itemVariants} className="flex items-center justify-between pt-1 pl-1">
            <label className="flex items-center gap-2.5 cursor-pointer group text-slate-500 select-none">
              <input 
                type="checkbox" 
                className="w-4 h-4 rounded bg-white border-slate-300 text-cyan-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-cyan-500 transition-all" 
              />
              <span className="text-xs font-bold text-slate-600 group-hover:text-[#1B2A49] transition-colors">Remember node configuration</span>
            </label>
          </motion.div>

          {/* زر تسجيل الدخول التفاعلي الفاخر بالثيم الأساسي للمشروع */}
          <motion.div variants={itemVariants} className="pt-2">
            <motion.button
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className={cn(
                "w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white tracking-wide relative overflow-hidden",
                "bg-[#1B2A49] hover:bg-[#24375d]",
                "shadow-[0_4px_20px_rgba(27,42,73,0.15)] hover:shadow-[0_6px_25px_rgba(27,42,73,0.25)]",
                "transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer select-none disabled:opacity-60 disabled:cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                "Authenticate Account"
              )}
            </motion.button>
          </motion.div>

        </form>

        {/* ذيل الكارت: رسالة الأمان الفاخرة بالثيم المضيء */}
        <motion.div variants={itemVariants} className="mt-7 text-center border-t border-slate-200/80 pt-5">
          <p className="text-[11px] text-slate-400 font-bold leading-relaxed">
            Authorized Personnel Only. <br /> All access configurations are dynamically monitored.
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Login;