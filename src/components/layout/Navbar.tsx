// src/components/layout/Navbar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, X, Menu } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useSearchStore } from '../../store/searchStore';
import { useNotificationStore } from '../../store/notificationStore';

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function Navbar({ sidebarOpen, setSidebarOpen }: NavbarProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
  const clearSearch = useSearchStore((state) => state.clearSearch);
  
  // جلب الإشعارات الحقيقية من الـ Store
  const notifications = useNotificationStore((state) => state.notifications);
  const hasUnread = notifications.some(n => n.unread);

  return (
    <header 
      className="h-15 bg-white border-b border-slate-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50 w-full select-none shadow-[0_10px_30px_rgba(27,42,73,0.05)] relative"
      role="banner"
    >
      
      {/* ================= اليسار: زر المنيو + اللوجو الفعلي المطور ================= */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-[#1b2a49] hover:bg-slate-50 rounded-xl md:hidden cursor-pointer transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded={sidebarOpen}
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-3">
          {/* حاوية اللوجو الدائرية مع الـ Shadow الأزرق النيون الفاخر من الفيجما */}
          <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center border border-slate-100 overflow-hidden shadow-[0_0_20px_rgba(91,159,215,0.35)] flex-shrink-0 select-none pointer-events-none p-1">
            <img 
              src="/authlogo.png" 
              alt="Medix Logo" 
              className="w-full h-full object-contain"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          
          {/* اسم المشروع الاحترافي المطابق للفيجما */}
          <span 
            className="text-xl font-black text-[#1b2a49] tracking-tight hidden sm:block"
            style={{ fontFamily: '"SF Pro Rounded", sans-serif', fontWeight: 700 }}
          >
            PharmaDash
          </span>
        </div>
      </div>

      {/* ================= المنتصف: شريط البحث الذكي (الشاشات الكبيرة) ================= */}
      <div className="hidden md:flex items-center relative w-full max-w-md mx-8">
        <label htmlFor="navbar-search" className="sr-only">Search drugs, orders or pharmacies</label>
        <Search className="absolute left-4 text-slate-400 pointer-events-none" size={18} />
        <input 
          id="navbar-search"
          type="text" 
          placeholder="Search items, orders, logs..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#F8FAFC] text-[#1b2a49] text-sm font-medium pl-11 pr-10 py-2.5 rounded-full border border-transparent focus:outline-none focus:bg-white focus:border-slate-200 transition-all placeholder:text-slate-400"
        />
        {searchQuery && (
          <button 
            onClick={clearSearch} 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer p-0.5 rounded-full hover:bg-slate-200 transition-colors"
            aria-label="Clear search input"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* ================= اليمين: الإشعارات + البحث للموبايل + حساب المستخدم الديناميكي ================= */}
      <div className="flex items-center gap-4 relative">
        
        {/* زر البحث للموبايل */}
        <button 
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          className="p-2.5 text-slate-500 hover:text-[#1b2a49] rounded-xl hover:bg-slate-50 md:hidden cursor-pointer transition-all"
          aria-label="Toggle mobile search"
        >
          <Search size={20} />
        </button>

        {/* 🔔 زر الجرس المطور حركياً مع الـ Dot الحمراء الذكية */}
        <div className="relative">
          <button 
            onClick={() => {
  if (user?.role?.trim().toUpperCase() === 'ADMIN') {
    navigate('/admin/notifications');
  } else {
    navigate('/supplier/notifications');
  }
}}
            className="p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl relative cursor-pointer transition-all"
            aria-label="View system notifications"
          >
            <Bell size={20} />
            {hasUnread && (
              <span 
                className="absolute top-2 right-2 w-2 h-2 rounded-full border border-white shadow-2xs"
                style={{ backgroundColor: '#E74C3C' }}
              />
            )}
          </button>
        </div>

        {/* كارت البروفايل المتكامل والذكي للفيجما مع تفعيل الـ cursor-pointer */}
        <div 
          onClick={() => navigate('/supplier/profile')}
          className="flex items-center gap-3 cursor-pointer group p-1 rounded-xl sm:rounded-full md:rounded-xl hover:bg-slate-50/50 transition-colors"
          role="button"
          aria-label="View user profile settings"
        >
          {/* دائرة الأفتار بالـ Linear Gradient الفخم الموحد لملف السايدبار */}
          <div 
            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center font-bold text-[#1b2a49] bg-slate-100 select-none group-hover:border-blue-400/60 transition-all flex-shrink-0"
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          
          {/* التكست المنسق بالخطوط الاحترافية الموحدة */}
          <div className="hidden sm:block text-left select-none">
            <h4 
              className="text-[14px] font-bold text-[#1b2a49] tracking-wide group-hover:text-blue-600 transition-colors capitalize"
              style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif' }}
            >
              {user?.name || 'medix user'}
            </h4>
            <p 
              className="text-[11px] font-bold text-blue-600 uppercase tracking-wide mt-0.5"
              style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif' }}
            >
              {user?.role || 'ACCOUNT'}
            </p>
          </div>
        </div>

      </div>

      {/* ================= بار البحث للموبايل المتناسق ================= */}
      {mobileSearchOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white border-b border-slate-100 p-3 md:hidden animate-in slide-in-from-top duration-200 z-40">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F5F7FA] border border-transparent rounded-full py-2 pl-10 pr-10 text-sm text-[#1b2a49] focus:outline-none focus:bg-white focus:border-slate-200 transition-all"
            />
            {searchQuery && (
              <button onClick={clearSearch} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}