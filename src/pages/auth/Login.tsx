'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { authStore } from '../../store/authStore'; // تأكدي من صحة مسار الـ store عندك
import { ROUTES } from '../../routes/routes';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const lowerEmail = email.trim().toLowerCase();
      let mockUser = null;

      // قاعدة البيانات الوهمية للمستخدمين الأربعة
      if (lowerEmail === 'pharmacist@medix.com' && password === 'Pharmacist@2026') {
        mockUser = { id: 'user_01', name: 'Nouran Hammad (Pharmacist)', email: 'pharmacist@medix.com', role: 'PHARMACIST' };
      } else if (lowerEmail === 'supplier@medix.com' && password === 'Supplier@2026') {
        mockUser = { id: 'sup_01', name: 'Eva Pharma (Supplier)', email: 'supplier@medix.com', role: 'SUPPLIER' };
      } else if (lowerEmail === 'admin@medix.com' && password === 'Admin@2026') {
        mockUser = { id: 'adm_01', name: 'Medix System Admin', email: 'admin@medix.com', role: 'ADMIN' };
      } else if (lowerEmail === 'patient@medix.com' && password === 'Patient@2026') {
        mockUser = { id: 'pat_01', name: 'Patient Account', email: 'patient@medix.com', role: 'PATIENT' };
      }

      if (mockUser) {
        // عمل تسجل دخول حقيقي في الـ Global State للسيستم
        authStore.getState().login(mockUser, 'mock-jwt-token-xyz-123');
        setIsLoading(false);

        // التوجيه التلقائي للمسار المخصص لكل رول لمنع الـ 404
        if (mockUser.role === 'PHARMACIST') navigate(ROUTES.PHARMACIST.DASHBOARD, { replace: true });
        else if (mockUser.role === 'SUPPLIER') navigate(ROUTES.SUPPLIER.DASHBOARD, { replace: true });
        else if (mockUser.role === 'ADMIN') navigate(ROUTES.ADMIN.DASHBOARD, { replace: true });
        else if (mockUser.role === 'PATIENT') navigate(ROUTES.PATIENT.PROFILE, { replace: true });
      } else {
        setIsLoading(false);
        setError('Invalid core credentials. Please check your email or password.');
      }
    }, 1200);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-md bg-white border border-slate-100/80 rounded-3xl p-8 shadow-[0_20px_70px_rgba(27,42,73,0.06)] relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-xl font-black text-[#1B2A49] tracking-tight">Medix Gateway</h2>
          <p className="text-xs font-bold text-slate-400 mt-1.5 uppercase tracking-wider">Production Node Authentication</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-bold text-left">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-[#1B2A49] uppercase tracking-wider pl-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="email" required placeholder="name@medix.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#F8FAFC] border border-slate-200/60 rounded-xl py-3.5 pl-11 pr-4 text-xs font-semibold text-[#1B2A49] focus:outline-none focus:border-[#1B2A49] focus:bg-white transition-all placeholder:text-slate-400" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[11px] font-black text-[#1B2A49] uppercase tracking-wider pl-1">Security Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type={showPassword ? 'text' : 'password'} required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#F8FAFC] border border-slate-200/60 rounded-xl py-3.5 pl-11 pr-12 text-xs font-semibold text-[#1B2A49] focus:outline-none focus:border-[#1B2A49] focus:bg-white transition-all placeholder:text-slate-400" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" disabled={isLoading} className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-[#1B2A49] hover:bg-[#24375d] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60">
              {isLoading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : "Authenticate Account"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;