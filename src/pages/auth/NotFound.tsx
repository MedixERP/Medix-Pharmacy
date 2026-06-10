// src/pages/auth/NotFound.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6 text-center">
      {/* الـ Badge العلوي */}
      <span className="bg-red-50 text-red-500 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4 animate-pulse">
        Error 404
      </span>

      {/* المحتوى الرئيسي */}
      <h1 className="text-7xl font-extrabold text-[#1b2a49] tracking-tight mb-2">404</h1>
      <h2 className="text-xl font-bold text-[#1b2a49] mb-4">Page Not Found</h2>
      <p className="text-sm text-slate-400 font-medium max-w-md mb-8 leading-relaxed">
        Oops! The page you are looking for doesn't exist or has been moved. Let's get you back on track.
      </p>

      {/* أزرار العودة والتحكم */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button 
          onClick={() => navigate(-1)} 
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-sm"
        >
          <ArrowLeft size={16} />
          Go Back
        </button>
        
        <button 
          onClick={() => navigate('/')} 
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1b2a49] hover:bg-[#1b2a49]/90 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
        >
          <Home size={16} />
          Back to Home
        </button>
      </div>
    </div>
  );
}