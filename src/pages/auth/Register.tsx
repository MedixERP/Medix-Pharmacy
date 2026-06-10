'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Building2, User, Phone, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { cn } from '../../lib/cn'; // تأكد من صحة مسار ملف الـ cn في مشروعك

const Register: React.FC = () => {
  const [pharmacyName, setPharmacyName] = useState('');
  const [managerName, setManagerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // محاكاة إرسال البيانات للـ API وإنشاء العقدة الجديدة
    console.log({ pharmacyName, managerName, email, phone, password });
    setTimeout(() => {
      setIsLoading(false);
      // توجيه المستخدم تلقائيًا للـ Login بعد نجاح التسجيل
      navigate('/login');
    }, 1800);
  };

  // إعدادات Framer Motion للحركة المتدفقة
  const containerVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-6 relative overflow-hidden select-none font-sans antialiased text-[#1B2A49]">
      
      {/* 1. الخلفية التكنولوجية المضيئة المتناسقة مع الـ Hero والـ Login */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />
      
      {/* بقع الضوء السائلة (Glow Blobs) */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.55, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-cyan-200/50 rounded-full filter blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-200/40 rounded-full filter blur-[120px] pointer-events-none" 
      />

      {/* 2. زر العودة السريع للـ Landing Page */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-white/60 text-slate-500 text-xs font-bold tracking-wide hover:text-[#1B2A49] hover:border-cyan-500/40 hover:bg-white shadow-sm hover:shadow transition-all duration-300 cursor-pointer backdrop-blur-md z-20"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Platform
      </button>

      {/* 3. كارت التسجيل الزجاجي المضيء العريض (Premium Registration Node) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-[540px] bg-white/75 border border-slate-200/60 backdrop-blur-2xl rounded-[2.5rem] p-8 sm:p-10 shadow-[0_20px_50px_rgba(27,42,73,0.05)] relative z-10"
      >
        {/* الهيدر: الشعار وعنوان تأسيس العقدة */}
        <div className="text-center mb-6">
          <motion.div 
            variants={itemVariants}
            className="w-14 h-14 mx-auto rounded-2xl bg-white border border-slate-100 p-1.5 shadow-sm flex items-center justify-center mb-4 relative group"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-500 to-cyan-400 opacity-10 blur-sm group-hover:opacity-20 transition-opacity duration-300" />
            <img 
              src="/logo.jpeg" 
              alt="Medix Logo" 
              className="w-full h-full object-contain rounded-xl relative z-10"
            />
          </motion.div>
          
          <motion.h2 variants={itemVariants} className="text-2xl font-black text-[#1B2A49] tracking-tight">
            Register New <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Pharmacy</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-cyan-600 text-[10px] mt-1.5 font-bold uppercase tracking-[0.2em]">
            Deploy Your Smart Clinical Ecosystem
          </motion.p>
        </div>

        {/* 4. أزرار التسجيل السريع عبر وسائل التواصل الاجتماعي */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-5">
          <button
            type="button"
            className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
          >
            <FcGoogle className="w-4 h-4 shrink-0" />
            <span>Google Workspace</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 shadow-sm text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all duration-200 cursor-pointer"
          >
            <FaFacebook className="w-4 h-4 text-[#1877F2] shrink-0" />
            <span>Facebook Sync</span>
          </button>
        </motion.div>

        {/* فاصل خطي أنيق */}
        <motion.div variants={itemVariants} className="relative flex py-2 items-center text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
          <div className="flex-grow border-t border-slate-200/80"></div>
          <span className="flex-shrink mx-4 text-[9px] tracking-[0.1em]">Or Structural Data</span>
          <div className="flex-grow border-t border-slate-200/80"></div>
        </motion.div>

        {/* فورم التسجيل المطور */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="grid sm:grid-cols-2 gap-4">
            {/* اسم الصيدلية */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">
                Pharmacy / Branch Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-600 transition-colors">
                  <Building2 className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={pharmacyName}
                  onChange={(e) => setPharmacyName(e.target.value)}
                  placeholder="Medix Pharmacy HQ"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-[#1B2A49] font-medium placeholder-slate-400 focus:outline-none focus:border-cyan-500/80 focus:ring-4 focus:ring-cyan-500/10 transition-all shadow-sm"
                />
              </div>
            </motion.div>

            {/* اسم المدير المسؤول */}
            <motion.div variants={itemVariants} className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">
                Pharmacist / Manager
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-600 transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={managerName}
                  onChange={(e) => setManagerName(e.target.value)}
                  placeholder="Dr. Alexander"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-[#1B2A49] font-medium placeholder-slate-400 focus:outline-none focus:border-cyan-500/80 focus:ring-4 focus:ring-cyan-500/10 transition-all shadow-sm"
                />
              </div>
            </motion.div>
          </div>

          {/* البريد الإلكتروني */}
          <motion.div variants={itemVariants} className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">
              Corporate Email Address
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
                placeholder="branch@medix-system.local"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm text-[#1B2A49] font-medium placeholder-slate-400 focus:outline-none focus:border-cyan-500/80 focus:ring-4 focus:ring-cyan-500/10 transition-all shadow-sm"
              />
            </div>
          </motion.div>

          {/* رقم الهاتف التوثيقي */}
          <motion.div variants={itemVariants} className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">
              Secure Hotline / Phone
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-cyan-600 transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+20 100 123 4567"
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-sm text-[#1B2A49] font-medium placeholder-slate-400 focus:outline-none focus:border-cyan-500/80 focus:ring-4 focus:ring-cyan-500/10 transition-all shadow-sm"
              />
            </div>
          </motion.div>

          {/* كلمة المرور وحمايتها */}
          <motion.div variants={itemVariants} className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pl-1">
              Create Secure Password
            </label>
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

          {/* الموافقة على الشروط والسياسات الطبية للمنظومة */}
          <motion.div variants={itemVariants} className="flex items-start gap-2.5 pt-1 pl-1">
            <input 
              type="checkbox" 
              required
              id="terms"
              className="w-4 h-4 mt-0.5 rounded bg-white border-slate-300 text-cyan-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-cyan-500 transition-all" 
            />
            <label htmlFor="terms" className="text-xs font-semibold text-slate-500 leading-relaxed cursor-pointer select-none">
              I agree to the <span className="text-cyan-600 hover:underline">Clinical Data Regulations</span> and authorize Medix to orchestrate local inventory nodes.
            </label>
          </motion.div>

          {/* زر التثبيت وإنشاء المنظومة */}
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
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Initialize Workspace Node
                </span>
              )}
            </motion.button>
          </motion.div>

        </form>

        {/* ذيل الكارت: رابط التحويل السريع لصفحة الـ Login إذا كان لديه حساب بالفعل */}
        <motion.div variants={itemVariants} className="mt-6 text-center border-t border-slate-200/80 pt-4">
          <p className="text-xs font-bold text-slate-500">
            Already running a node?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="text-cyan-600 hover:text-cyan-700 hover:underline cursor-pointer transition-colors font-extrabold"
            >
              Sign In Instead
            </button>
          </p>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Register;