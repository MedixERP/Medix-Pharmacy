// src/components/layout/Navbar.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, X, Menu, Check } from 'lucide-react';
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
      className="h-15 bg-white border-b border-slate-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50 w-full select-none
        shadow-[0_10px_30px_rgba(27,42,73,0.05)] relative"
      role="banner"
    >
      
      {/* ================= اليسار: زر المنيو + اللوجو الفعلي المطور ================= */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-600 hover:text-[#1b2a49] rounded-xl hover:bg-slate-50 md:hidden cursor-pointer transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded={sidebarOpen}
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-3">
          {/* الحاوية المدورة الشبيهة بالتصميم مع الـ Shadow الأزرق النيون الفاخر */}
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
          
          {/* اسم المشروع الاحترافي */}
          <span className="text-lg sm:text-xl font-bold text-[#1b2a49] tracking-tight hidden sm:block">
            PharmaDash
          </span>
        </div>
      </div>

      {/* ================= المنتصف: شريط البحث الذكي (الشاشات الكبيرة) ================= */}
      <div className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md mx-4 hidden md:block">
        <label htmlFor="navbar-search" className="sr-only">Search drugs, orders or pharmacies</label>
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
        <input 
          id="navbar-search"
          type="text" 
          placeholder="Search items, orders, logs..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#F5F7FA] border border-transparent rounded-full py-2 sm:py-2.5 pl-11 pr-10 text-xs sm:text-sm text-[#1b2a49] placeholder-slate-400/90 focus:outline-none focus:bg-white focus:border-slate-200 transition-all font-medium shadow-2xs"
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
      <div className="flex items-center gap-2 sm:gap-4 relative">
        
        {/* زر البحث للموبايل */}
        <button 
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          className="p-2 text-slate-500 hover:text-[#1b2a49] rounded-xl hover:bg-slate-50 md:hidden cursor-pointer transition-all"
          aria-label="Toggle mobile search"
        >
          <Search size={20} />
        </button>

        {/* 🔔 زر الجرس المطور حركياً يوجه لصفحة الإشعارات الجديدة فوراً بضغطة واحدة */}
        <div className="relative">
          <button 
            onClick={() => navigate('/supplier/notifications')} 
            className="p-2 text-slate-500 hover:text-[#1b2a49] transition-all rounded-xl hover:bg-slate-50 cursor-pointer"
            aria-label="View system notifications"
          >
            <Bell size={20} />
            {hasUnread && (
              <span 
                className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full border-2 border-white shadow-2xs"
                style={{ backgroundColor: '#E74C3C' }}
              />
            )}
          </button>
        </div>

        {/* كارت البروفايل المتكامل والذكي يوجه لصفحة الـ Company Profile الجديدة عند الضغط عليه */}
        <div 
          onClick={() => navigate('/supplier/profile')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group p-1 rounded-xl sm:rounded-full md:rounded-xl hover:bg-slate-50/50 transition-colors"
          role="button"
          aria-label="View user profile settings"
        >
          {/* دائرة الأفتار بالـ Linear Gradient الفخم */}
          <div 
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#1B2A49] to-[#5B9FD7] border border-blue-200/30 flex items-center justify-center text-white font-black text-xs sm:text-sm shadow-sm select-none group-hover:border-blue-400/60 transition-all flex-shrink-0"
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          
          {/* التكست المنسق بنظام الـ Capitalize والخطوط الاحترافية */}
          <div className="text-left hidden md:block select-none">
            <h4 
              className="text-[14px] leading-[21px] font-bold text-[#1b2a49] tracking-wide group-hover:text-blue-600 transition-colors capitalize"
              style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif' }}
            >
              {user?.name || 'medix user'}
            </h4>
            <p 
              className="text-[12px] leading-[18px] font-normal text-slate-400 tracking-wide mt-0.5 capitalize"
              style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif' }}
            >
              {user?.role ? `${user.role.toLowerCase()} account` : 'user portal'}
            </p>
          </div>
        </div>

      </div>

      {/* ================= بار البحث للموبايل ================= */}
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
