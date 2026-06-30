'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, ShieldCheck, KeyRound, CheckCircle2 } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type RecoveryStep = 'EMAIL' | 'OTP' | 'RESET';

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<RecoveryStep>('EMAIL');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 1. Backend Simulation: التحقق من وجود الإيميل وإرسال الـ OTP
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const validEmails = ['admin@medix.com', 'supplier@medix.com', 'pharmacist@medix.com', 'cashier@medix.com', 'patient@medix.com'];
      if (validEmails.includes(email.trim().toLowerCase())) {
        setIsLoading(false);
        setStep('OTP');
        // هنا الكود الوهمي المرسل هو '2026' للمحاكاة
        console.log("Mock OTP sent to email: 2026");
      } else {
        setIsLoading(false);
        setError('This email address is not registered in our system.');
      }
    }, 1000);
  };

  // 2. Backend Simulation: التحقق من صحة كود الـ OTP
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

  // 3. Backend Simulation: تغيير كلمة المرور وحفظها
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
        // إعادة تهيئة المودال وإغلاقه بعد النجاح
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

  // إدارة حركة التركيز التلقائي بين حقول الـ OTP
  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // الانتقال للحقل التالي تلقائياً
    if (element.value !== '' && element.nextElementSibling) {
      (element.nextElementSibling as HTMLInputElement).focus();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          {/* الخلفية المعتمة المضببة (Glassmorphism Overlay) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0B1E43]/40 backdrop-blur-sm"
          />

          {/* جسم المودال المنبثق */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative bg-white w-full max-w-[440px] rounded-2xl shadow-[0_20px_50px_rgba(11,30,67,0.15)] border border-slate-100 overflow-hidden p-6 md:p-8 z-10"
          >
            {/* زر الإغلاق العلوي */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* رسالة النجاح النهائية */}
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
                {/* 1. خطوة إدخال البريد الإلكتروني */}
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

                {/* 2. خطوة التحقق من الـ OTP */}
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
                      <button type="button" onClick={() => console.log('Resent')} className="text-cyan-600 font-semibold hover:underline cursor-pointer">Resend Code</button>
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

                {/* 3. خطوة تعيين كلمة المرور الجديدة */}
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