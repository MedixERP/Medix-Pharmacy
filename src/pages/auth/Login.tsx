'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  FlaskConical, 
  CircleDollarSign, 
  User,
  Lock,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { authStore } from '../../store/authStore'; 
import { ROUTES } from '../../routes/routes';

// تعريف أنواع الـ Roles المتاحة في التصميم
type UserRole = 'ADMIN' | 'PHARMACIST' | 'CASHIER' | 'CUSTOMER';

const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('ADMIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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

      // الـ Mock Database مع دعم الـ Roles المحددة
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
        authStore.getState().login(mockUser, 'mock-jwt-token-xyz-123');
        setIsLoading(false);

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

  const rolesConfig = [
    { id: 'ADMIN' as UserRole, label: 'Admin', icon: ShieldCheck },
    { id: 'PHARMACIST' as UserRole, label: 'Pharmacist', icon: FlaskConical },
    { id: 'CASHIER' as UserRole, label: 'Cashier', icon: CircleDollarSign },
    { id: 'CUSTOMER' as UserRole, label: 'Customer', icon: User },
  ];

  return (
    <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden select-none">
      
      {/* 1. الجزء الأيسر (اللوحة الزرقاء الإعلانية المضيئة) */}
      <div className="hidden lg:flex lg:w-[48%] bg-[#0B1E43] relative flex-col justify-between p-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#15336C_0%,transparent_60%)] opacity-70" />
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[#4285F4] rounded-full blur-[160px] opacity-15" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#00D2FF] rounded-full blur-[140px] opacity-10" />

        {/* الـ Logo العلوي مع شادو أزرق متدرج ومضيء ملائم للخلفية الداكنة */}
        <div className="relative z-10 flex items-center gap-2.5">
          <img 
            src="/logo.jpeg" 
            alt="Medix Logo" 
            className="w-8 h-8 rounded-full object-cover shadow-[0_0_15px_rgba(66,133,244,0.6)] border border-white/10"
          />
          <span className="text-white font-bold text-lg tracking-tight">medix</span>
        </div>

        {/* الشكل المركزي (الكبسولات والـ Orbit الجرافيكس) */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 my-8">
          <div className="w-72 h-72 relative flex items-center justify-center">
            <div className="absolute inset-0 border border-white/5 rounded-full" />
            <div className="absolute inset-6 border border-white/10 border-dashed rounded-full animate-[spin_100s_linear_infinite]" />
            
            <div className="w-16 h-16 bg-[#1A3A77] rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(66,133,244,0.3)] border border-white/10">
              <span className="text-white text-3xl font-light">+</span>
            </div>

            <div className="absolute top-10 left-12 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 shadow-lg">
              <div className="w-2.5 h-4 bg-[#4285F4] rounded-full transform -rotate-45" />
              <div className="w-2.5 h-4 bg-white rounded-full transform -rotate-45" />
            </div>
            <div className="absolute top-8 right-10 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 shadow-lg">
              <div className="w-2.5 h-4 bg-white rounded-full transform rotate-45" />
              <div className="w-2.5 h-4 bg-[#4285F4] rounded-full transform rotate-45" />
            </div>
            <div className="absolute bottom-12 left-6 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 shadow-lg">
              <div className="w-4 h-2 bg-[#00D2FF] rounded-full" />
              <div className="w-4 h-2 bg-white rounded-full" />
            </div>
            <div className="absolute bottom-16 right-12 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 shadow-lg">
              <div className="w-2.5 h-4 bg-white rounded-full transform -rotate-12" />
              <div className="w-2.5 h-4 bg-[#4285F4] rounded-full transform -rotate-12" />
            </div>
          </div>

          <div className="text-center max-w-sm mt-8">
            <h1 className="text-white text-2xl font-bold tracking-tight mb-3">Smart Pharmacy Management</h1>
            <p className="text-slate-400 text-sm leading-relaxed font-normal">
              Unified ERP for dispensing, inventory, billing, and patient care — powered by real-time data.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center gap-8 text-[11px] font-medium text-slate-400 border-t border-white/5 pt-6">
          <div className="flex items-center gap-1.5">
            <span className="text-[#00D2FF]">🔒</span> HIPAA Secure
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400">✓</span> FDA Compliant
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-amber-400">⚡</span> Real-time Sync
          </div>
        </div>
      </div>

      {/* 2. الجزء الأيمن (فورم تسجيل الدخول المظبوط بالمللي) */}
      <div className="w-full lg:w-[52%] flex flex-col justify-between p-8 sm:p-16 md:p-24 bg-white overflow-y-auto">
        
        {/* شعار الموبايل والتابلت المستورد من البابليك مع الشادو الأزرق النظيف */}
        <div className="lg:hidden flex items-center gap-2 mb-12">
          <img 
            src="/logo.jpeg" 
            alt="Medix Logo" 
            className="w-7 h-7 rounded-full object-cover shadow-[0_0_12px_rgba(66,133,244,0.35)]"
          />
          <span className="text-[#0B1E43] font-bold text-base tracking-tight">medix</span>
        </div>
        
        <div className="hidden lg:block h-4"></div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-[420px] mx-auto"
        >
          {/* الـ Header الأساسي مع شادو أزرق ناعم مخصص للخلفية البيضاء للـ Desktop */}
          <div className="mb-8">
            <div className="hidden lg:flex items-center gap-2.5 mb-6">
              <img 
                src="/logo.jpeg" 
                alt="Medix Logo" 
                className="w-7 h-7 rounded-full object-cover shadow-[0_0_12px_rgba(66,133,244,0.35)]"
              />
              <span className="text-[#0B1E43] font-bold text-base tracking-tight">medix</span>
            </div>
            <h2 className="text-[26px] font-bold text-[#0B1E43] tracking-tight mb-1.5">Welcome Back to Medix</h2>
            <p className="text-[14px] text-slate-400 font-normal">Manage your pharmacy smarter</p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold text-left">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* كامب الـ SIGN IN AS (أزرار اختيار الـ Role) */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#0B1E43] uppercase tracking-wider">Sign In As</label>
              <div className="grid grid-cols-4 gap-2.5">
                {rolesConfig.map((role) => {
                  const IconComponent = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={cn(
                        "flex flex-col items-center justify-center py-3 px-2 rounded-xl border transition-all duration-200 cursor-pointer",
                        isSelected 
                          ? "bg-white border-[#4285F4] shadow-[0_4px_20px_rgba(66,133,244,0.12)] text-[#4285F4]" 
                          : "bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600"
                      )}
                    >
                      <IconComponent size={18} className={isSelected ? "text-[#4285F4]" : "text-slate-400"} />
                      <span className={cn("text-[11px] font-semibold mt-1.5 tracking-tight")}>
                        {role.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* حقل الإدخال: Email Address */}
            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-[#0B1E43]">Email Address</label>
              <input 
                type="email" 
                required 
                placeholder="you@pharmacy.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full bg-[#F8FAFC] border border-slate-200/70 rounded-xl py-3.5 px-4 text-[13px] font-medium text-[#0B1E43] focus:outline-none focus:border-[#4285F4] focus:bg-white focus:shadow-[0_0_0_4px_rgba(66,133,244,0.05)] transition-all placeholder:text-slate-300" 
              />
            </div>

            {/* حقل الإدخال: Password */}
            <div className="space-y-2">
              <label className="text-[12px] font-semibold text-[#0B1E43]">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full bg-[#F8FAFC] border border-slate-200/70 rounded-xl py-3.5 pl-4 pr-11 text-[13px] font-medium text-[#0B1E43] focus:outline-none focus:border-[#4285F4] focus:bg-white focus:shadow-[0_0_0_4px_rgba(66,133,244,0.05)] transition-all placeholder:text-slate-300" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* خيارات Remember me و Forgot Password */}
            <div className="flex items-center justify-between pt-1 text-[13px]">
              <label className="flex items-center gap-2 cursor-pointer group text-slate-400 select-none">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-4 h-4 rounded border border-slate-200 bg-white peer-checked:bg-[#4285F4] peer-checked:border-[#4285F4] transition-all flex items-center justify-center">
                    {rememberMe && <Check size={10} className="text-white stroke-[3]" />}
                  </div>
                </div>
                <span className="text-slate-500 font-medium text-xs peer-checked:text-[#0B1E43]">Remember me</span>
              </label>
              
              <a href="#" className="text-xs font-medium text-slate-400 hover:text-[#4285F4] transition-colors">
                Forgot password?
              </a>
            </div>

            {/* زر الـ Submit */}
            <div className="pt-3">
              <button 
                type="submit" 
                disabled={isLoading} 
                className="w-full py-3.5 px-4 rounded-xl font-bold text-[14px] text-white bg-[#4285F4] hover:bg-[#3574DE] shadow-[0_8px_24px_rgba(66,133,244,0.25)] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Login to Dashboard</span>
                    <span className="text-base font-light">→</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-medium border-t border-slate-100 pt-6 mt-12 max-w-[420px] w-full mx-auto gap-3 sm:gap-0">
          <div>© 2026 Medix. All rights reserved</div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Support</a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;