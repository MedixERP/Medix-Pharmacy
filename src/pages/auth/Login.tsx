'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  FlaskConical, 
  User,
  Truck,
  Check,
  X,
  Mail,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { authStore } from '../../store/authStore'; 
import { ROUTES } from '../../routes/routes';
import ForgotPasswordModal from './ForgotPasswordModal';

// ================= إعدادات الأنواع والأدوار =================
type UserRole = 'ADMIN' | 'SUPPLIER' | 'PHARMACIST' | 'CASHIER' | 'CUSTOMER';
type RecoveryStep = 'EMAIL' | 'OTP' | 'RESET';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ================= 1. مكون مودال نسيت كلمة المرور المستقل التابع للثيم =================
export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<RecoveryStep>('EMAIL');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const validEmails = ['admin@medix.com', 'supplier@medix.com', 'pharmacist@medix.com', 'cashier@medix.com', 'patient@medix.com'];
      if (validEmails.includes(email.trim().toLowerCase())) {
        setIsLoading(false);
        setStep('OTP');
        console.log("Mock OTP sent to email: 2026");
      } else {
        setIsLoading(false);
        setError('This email address is not registered in our system.');
      }
    }, 1000);
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const enteredOtp = otp.join('');
      if (enteredOtp === '2026') {
        setIsLoading(false);
        setStep('RESET');
      } else {
        setIsLoading(false);
        setError('Invalid OTP code. Please try again (Hint: Use 2026).');
      }
    }, 1000);
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setIsLoading(false);
      setError('Passwords do not match.');
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Your password has been reset successfully!');
      setTimeout(() => {
        setStep('EMAIL');
        setEmail('');
        setOtp(['', '', '', '']);
        setNewPassword('');
        setConfirmPassword('');
        setSuccessMessage('');
        onClose();
      }, 2000);
    }, 1200);
  };

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value !== '' && element.nextElementSibling) {
      (element.nextElementSibling as HTMLInputElement).focus();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0B1E43]/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative bg-white w-full max-w-[440px] rounded-2xl shadow-[0_20px_50px_rgba(11,30,67,0.15)] border border-slate-100 overflow-hidden p-6 md:p-8 z-10"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {successMessage ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="size-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-4 shadow-[0_4px_12px_rgba(16,185,129,0.15)] animate-bounce">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-bold text-blue-950 font-['Inter'] mb-2">Success!</h3>
                <p className="text-slate-500 text-sm font-['Inter'] px-4">{successMessage}</p>
              </div>
            ) : (
              <>
                {step === 'EMAIL' && (
                  <form onSubmit={handleEmailSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-2xl font-bold text-blue-950 font-['Inter'] tracking-tight mb-1.5">Reset Password</h3>
                      <p className="text-sm text-slate-400 font-['Inter']">Enter your email to receive a verification OTP code.</p>
                    </div>

                    {error && <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold">{error}</div>}

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-600 font-['Inter']">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input
                          type="email"
                          required
                          placeholder="you@pharmacy.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-gray-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm font-normal text-blue-950 focus:outline-none focus:border-cyan-600 focus:bg-white transition-all placeholder:text-gray-400 font-['Inter']"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-br from-cyan-600 to-blue-500 hover:opacity-95 shadow-[0px_8px_24px_0px_rgba(59,129,183,0.30)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isLoading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : 'Send OTP'}
                    </button>
                  </form>
                )}

                {step === 'OTP' && (
                  <form onSubmit={handleOtpSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-2xl font-bold text-blue-950 font-['Inter'] tracking-tight mb-1.5">Verify Identity</h3>
                      <p className="text-sm text-slate-400 font-['Inter']">We sent a 4-digit code to <span className="text-blue-950 font-semibold">{email}</span></p>
                    </div>

                    {error && <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold">{error}</div>}

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-600 font-['Inter'] block text-center mb-3">Enter 4-Digit Code</label>
                      <div className="flex justify-center gap-3">
                        {otp.map((data, index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={data}
                            onChange={(e) => handleOtpChange(e.target, index)}
                            onFocus={(e) => e.target.select()}
                            className="size-14 text-center bg-gray-50 border border-slate-200 focus:border-cyan-600 focus:bg-white text-xl font-bold text-blue-950 rounded-xl focus:outline-none transition-all font-['Inter']"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 text-xs">
                      <button type="button" onClick={() => setStep('EMAIL')} className="text-slate-400 hover:text-cyan-600 font-medium cursor-pointer">Change Email</button>
                      <button type="button" className="text-cyan-600 font-semibold hover:underline cursor-pointer">Resend Code</button>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-br from-cyan-600 to-blue-500 hover:opacity-95 shadow-[0px_8px_24px_0px_rgba(59,129,183,0.30)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isLoading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : 'Verify Code'}
                    </button>
                  </form>
                )}

                {step === 'RESET' && (
                  <form onSubmit={handleResetSubmit} className="space-y-5">
                    <div>
                      <h3 className="text-2xl font-bold text-blue-950 font-['Inter'] tracking-tight mb-1.5">New Password</h3>
                      <p className="text-sm text-slate-400 font-['Inter']">Please choose a complex password to protect your account portal.</p>
                    </div>

                    {error && <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold">{error}</div>}

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-600 font-['Inter']">New Password</label>
                        <div className="relative">
                          <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input
                            type="password"
                            required
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-gray-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm font-normal text-blue-950 focus:outline-none focus:border-cyan-600 focus:bg-white transition-all placeholder:text-gray-400 font-['Inter']"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-600 font-['Inter']">Confirm New Password</label>
                        <div className="relative">
                          <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input
                            type="password"
                            required
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-gray-50 border border-slate-200 rounded-xl py-3.5 pl-11 pr-4 text-sm font-normal text-blue-950 focus:outline-none focus:border-cyan-600 focus:bg-white transition-all placeholder:text-gray-400 font-['Inter']"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-br from-cyan-600 to-blue-500 hover:opacity-95 shadow-[0px_8px_24px_0px_rgba(59,129,183,0.30)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isLoading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : 'Save & Update'}
                    </button>
                  </form>
                )}
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// ================= 2. المكون الأساسي لصفحة تسجيل الدخول كاملة =================
const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('ADMIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isForgotOpen, setIsForgotOpen] = useState(false); // التحكم في المودال هنا
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const lowerEmail = email.trim().toLowerCase();
      let mockUser = null;

      if (lowerEmail === 'admin@medix.com' && password === 'Admin@2026') {
        mockUser = { id: 'adm_01', name: 'Medix System Admin', email: 'admin@medix.com', role: 'ADMIN' };
      } else if (lowerEmail === 'supplier@medix.com' && password === 'Supplier@2026') {
        mockUser = { id: 'sup_01', name: 'Eva Pharma (Supplier)', email: 'supplier@medix.com', role: 'SUPPLIER' };
      } else if (lowerEmail === 'pharmacist@medix.com' && password === 'Pharmacist@2026') {
        mockUser = { id: 'user_01', name: 'Nouran Hammad (Pharmacist)', email: 'pharmacist@medix.com', role: 'PHARMACIST' };
      } else if (lowerEmail === 'cashier@medix.com' && password === 'Cashier@2026') {
        mockUser = { id: 'cash_01', name: 'Medix Cashier Office', email: 'cashier@medix.com', role: 'CASHIER' };
      } else if (lowerEmail === 'patient@medix.com' && password === 'Patient@2026') {
        mockUser = { id: 'pat_01', name: 'Patient Account', email: 'patient@medix.com', role: 'CUSTOMER' };
      }

      if (mockUser) {
        authStore.getState().login(mockUser, 'mock-jwt-token-xyz-123');
        setIsLoading(false);

        if (mockUser.role === 'ADMIN') navigate(ROUTES.ADMIN.DASHBOARD, { replace: true });
        else if (mockUser.role === 'SUPPLIER') navigate(ROUTES.SUPPLIER.DASHBOARD, { replace: true });
        else if (mockUser.role === 'PHARMACIST') navigate(ROUTES.PHARMACIST.DASHBOARD, { replace: true });
        else if (mockUser.role === 'CUSTOMER') navigate(ROUTES.PATIENT.PROFILE, { replace: true });
      } else {
        setIsLoading(false);
        setError('Invalid core credentials. Please check your email or password.');
      }
    }, 1200);
  };

  const rolesConfig = [
    { id: 'ADMIN' as UserRole, label: 'Admin', icon: ShieldCheck },
    { id: 'SUPPLIER' as UserRole, label: 'Supplier', icon: Truck },
    { id: 'PHARMACIST' as UserRole, label: 'Pharmacist', icon: FlaskConical },
    { id: 'CUSTOMER' as UserRole, label: 'Customer', icon: User },
  ];

  return (
    <div className="min-h-screen w-full flex bg-white font-sans overflow-hidden select-none">
      
      {/* الجانب الأيسر: تصميم النيون الحركي المرن للفيجما */}
      <div className="hidden lg:flex lg:w-[48%] bg-[#0B1E43] relative flex-col justify-between p-16 overflow-hidden">
        <div className="absolute top-[-60px] right-[-60px] size-[400px] bg-radial from-cyan-600/15 to-transparent to-70% rounded-full blur-2xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#15336C_0%,transparent_60%)] opacity-70" />
        
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="size-10 bg-gradient-to-tr from-cyan-600/25 to-blue-500/50 rounded-2xl shadow-[0px_6px_20px_0px_rgba(59,129,183,0.35)] flex justify-center items-center border border-white/10 p-1">
            <img src="/logo.jpeg" alt="Medix Logo" className="w-full h-full object-cover rounded-xl" />
          </div>
          <span className="text-white font-bold text-xl font-['Inter'] tracking-tight">medix</span>
        </div>

        {/* كود عرض كبسولات الأدوية واللوحة الحركية التفاعلية */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 my-8 scale-95 md:scale-100 transition-transform">
          <div className="w-80 h-80 relative flex items-center justify-center">
            <div className="absolute inset-0 border border-cyan-500/10 rounded-full" />
            <div className="absolute inset-6 border border-white/10 border-dashed rounded-full animate-[spin_180s_linear_infinite]" />
            <div className="absolute inset-20 border border-cyan-400/10 rounded-full" />
            
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent rotate-45" />
            <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent -rotate-45" />
            
            <div className="absolute size-24 bg-cyan-500/25 blur-xl rounded-full animate-pulse" />
            <div className="relative size-16 flex items-center justify-center z-10">
              <div className="absolute w-12 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-sm opacity-80" />
              <div className="absolute w-4 h-12 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-sm opacity-80" />
              <div className="absolute size-4 bg-white/40 blur-[2px] rounded-sm" />
            </div>

            {/* الكبسولات الموزعة على الأطراف */}
            <div className="absolute top-10 left-10 rotate-[-30deg] flex items-center bg-slate-900/40 p-0.5 rounded-full border border-white/5 shadow-lg">
              <div className="w-5 h-3.5 bg-blue-500 rounded-l-full" />
              <div className="w-5 h-3.5 bg-blue-50 rounded-r-full" />
            </div>
            <div className="absolute top-10 right-10 rotate-[30deg] flex items-center bg-slate-900/40 p-0.5 rounded-full border border-white/5 shadow-lg">
              <div className="w-5 h-3.5 bg-blue-600 rounded-l-full" />
              <div className="w-5 h-3.5 bg-cyan-200 rounded-r-full" />
            </div>
            <div className="absolute bottom-14 left-8 rotate-[40deg] flex items-center bg-slate-900/40 p-0.5 rounded-full border border-white/5 shadow-lg">
              <div className="w-5 h-3.5 bg-blue-500/80 rounded-l-full" />
              <div className="w-5 h-3.5 bg-slate-300 rounded-r-full" />
            </div>
            <div className="absolute bottom-14 right-8 rotate-[-40deg] flex items-center bg-slate-900/40 p-0.5 rounded-full border border-white/5 shadow-lg">
              <div className="w-5 h-3.5 bg-cyan-500 rounded-l-full" />
              <div className="w-5 h-3.5 bg-white rounded-r-full" />
            </div>
          </div>

          <div className="text-center max-w-sm mt-8">
            <h1 className="text-white text-2xl font-bold font-['Inter'] tracking-tight mb-3">Smart Pharmacy Management</h1>
            <p className="text-slate-400 text-sm leading-relaxed font-normal font-['Inter']">
              Unified ERP for dispensing, inventory, billing, and supplier care — powered by real-time data.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-center gap-8 text-[11px] font-medium text-slate-400 border-t border-white/5 pt-6">
          <div className="flex items-center gap-1.5"><span className="text-[#00D2FF]">🔒</span> HIPAA Secure</div>
          <div className="flex items-center gap-1.5"><span className="text-emerald-400">✓</span> FDA Compliant</div>
          <div className="flex items-center gap-1.5"><span className="text-amber-400">⚡</span> Real-time Sync</div>
        </div>
      </div>

      {/* الجانب الأيمن: استمارة تسجيل الدخول المستجيبة */}
      <div className="w-full lg:w-[52%] flex flex-col justify-between p-6 sm:p-12 md:p-20 bg-white overflow-y-auto">
        <div className="lg:hidden flex items-center gap-2 mb-8">
          <div className="size-9 bg-gradient-to-tr from-cyan-600/25 to-blue-500/50 rounded-xl flex justify-center items-center p-1">
            <img src="/logo.jpeg" alt="Medix Logo" className="w-full h-full object-cover rounded-lg" />
          </div>
          <span className="text-[#0B1E43] font-bold text-lg font-['Inter'] tracking-tight">medix</span>
        </div>
        
        <div className="hidden lg:block h-4"></div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="w-full max-w-[420px] mx-auto my-auto"
        >
          <div className="mb-7">
            <h2 className="text-3xl font-bold text-blue-950 font-['Inter'] tracking-tight mb-1.5">Welcome Back to Medix</h2>
            <p className="text-sm text-slate-400 font-normal font-['Inter']">Manage your pharmacy smarter</p>
          </div>

          {error && <div className="mb-5 p-3.5 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold text-left">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-tight font-['Inter']">Sign in as</label>
              <div className="grid grid-cols-4 gap-2">
                {rolesConfig.map((role) => {
                  const IconComponent = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={cn(
                        "flex flex-col items-center justify-center py-3 px-1 rounded-xl transition-all duration-200 cursor-pointer min-h-[64px]",
                        isSelected 
                          ? "bg-gradient-to-br from-cyan-600/10 to-cyan-600/5 shadow-[0px_4px_14px_0px_rgba(59,129,183,0.18)] border-2 border-cyan-600 text-blue-950 font-semibold" 
                          : "bg-gray-50 border border-slate-200 text-slate-500 hover:border-slate-300 font-medium"
                      )}
                    >
                      <IconComponent size={18} className={isSelected ? "text-cyan-600" : "text-slate-400"} />
                      <span className="text-[11px] mt-1.5 tracking-tight font-['Inter']">{role.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 font-['Inter']">Email Address</label>
              <input 
                type="email" 
                required 
                placeholder="you@pharmacy.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="w-full bg-gray-50 border border-slate-200 rounded-xl py-3 px-4 text-sm font-normal text-blue-950 focus:outline-none focus:border-cyan-600 focus:bg-white transition-all placeholder:text-gray-400 font-['Inter']" 
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 font-['Inter']">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required 
                  placeholder="Enter your password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full bg-gray-50 border border-slate-200 rounded-xl py-3 pl-4 pr-11 text-sm font-normal text-blue-950 focus:outline-none focus:border-cyan-600 focus:bg-white transition-all placeholder:text-gray-400 font-['Inter']" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer group select-none">
                <div className="relative">
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="sr-only peer" />
                  <div className="w-4 h-4 rounded border-2 border-slate-300 bg-white peer-checked:bg-cyan-600 peer-checked:border-cyan-600 transition-all flex items-center justify-center">
                    {rememberMe && <Check size={10} className="text-white stroke-[3]" />}
                  </div>
                </div>
                <span className="text-slate-500 font-normal text-sm font-['Inter']">Remember me</span>
              </label>
              
              {/* تفعيل فتح المودال التفاعلي عند الضغط هنا */}
              <button 
                type="button"
                onClick={() => setIsForgotOpen(true)}
                className="text-sm font-medium text-slate-400 hover:text-cyan-600 transition-colors font-['Inter'] cursor-pointer"
              >
                Forgot password?
              </button>
            </div>

            <div className="pt-3">
              <button 
                type="submit" 
                disabled={isLoading} 
                className="w-full py-3.5 px-4 rounded-xl font-semibold text-base text-white bg-gradient-to-br from-cyan-600 to-blue-500 hover:opacity-95 shadow-[0px_8px_24px_0px_rgba(59,129,183,0.30)] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
              >
                {isLoading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <> <span className="font-['Inter']">Login to Dashboard</span> <span className="text-lg font-light">→</span> </>}
              </button>
            </div>
          </form>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 font-normal border-t border-slate-100 pt-5 mt-8 max-w-[420px] w-full mx-auto gap-3 sm:gap-0 font-['Inter']">
          <div>© 2026 Medix · All rights reserved</div>
          <div className="flex items-center gap-4 text-gray-400 font-medium">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Support</a>
          </div>
        </div>
      </div>

      {/* استدعاء المودال وربطه بالحالة التفاعلية */}
      <ForgotPasswordModal isOpen={isForgotOpen} onClose={() => setIsForgotOpen(false)} />
    </div>
  );
};

export default Login;