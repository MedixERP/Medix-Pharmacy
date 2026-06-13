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
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
  const clearSearch = useSearchStore((state) => state.clearSearch);
  
  const notifications = useNotificationStore((state) => state.notifications);
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const markAllAsRead = useNotificationStore((state) => state.markAllAsRead);
  const hasUnread = notifications.some(n => n.unread);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setNotifDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      <div className="flex items-center gap-2 sm:gap-4 relative" ref={dropdownRef}>
        
        {/* زر البحث للموبايل */}
        <button 
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
          className="p-2 text-slate-500 hover:text-[#1b2a49] rounded-xl hover:bg-slate-50 md:hidden cursor-pointer transition-all"
          aria-label="Toggle mobile search"
        >
          <Search size={20} />
        </button>

        {/* زر الإشعارات */}
        <div className="relative">
          <button 
            onClick={() => setNotifDropdownOpen(!notifDropdownOpen)} 
            className={`p-2 text-slate-500 hover:text-[#1b2a49] transition-all rounded-xl hover:bg-slate-50 cursor-pointer ${notifDropdownOpen ? 'bg-slate-50 text-[#1b2a49]' : ''}`}
            aria-label="View system notifications"
            aria-expanded={notifDropdownOpen}
          >
            <Bell size={20} />
            {hasUnread && (
              <span 
                className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full border-2 border-white shadow-2xs"
                style={{ backgroundColor: '#E74C3C' }}
              />
            )}
          </button>

          {/* قائمة الإشعارات الـ Dropdown */}
          {notifDropdownOpen && (
            <div className="fixed sm:absolute top-20 sm:top-auto right-4 sm:right-0 left-4 sm:left-auto mt-3 w-auto sm:w-96 max-w-[calc(100vw-32px)] sm:max-w-none bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_rgba(27,42,73,0.12)] border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-3 duration-200">
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-bold text-sm text-[#1b2a49]">Recent Notifications</h3>
                {hasUnread && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Check size={12} /> Mark all read
                  </button>
                )}
              </div>

              <div className="divide-y divide-slate-50 max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <div 
                      key={n.id}
                      onClick={() => markAsRead(n.id)}
                      className={`p-4 flex gap-3 hover:bg-slate-50/60 transition-colors cursor-pointer relative ${n.unread ? 'bg-blue-50/20' : ''}`}
                    >
                      <div className="text-base p-1.5 bg-slate-100 rounded-xl h-fit shadow-xs">{n.icon}</div>
                      <div className="space-y-0.5 text-left pr-4">
                        <h4 className="text-xs font-bold text-[#1b2a49]">{n.title}</h4>
                        <p className="text-[11px] text-slate-500 leading-normal font-medium">{n.desc}</p>
                        <p className="text-[9px] text-slate-400 font-semibold pt-0.5">{n.time}</p>
                      </div>
                      {n.unread && (
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full absolute right-4 top-5"></span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-slate-400 font-bold">
                    🎉 Clear skies! No notifications found.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* كارت البروفايل المتكامل والذكي */}
        <div 
          onClick={() => navigate(user?.role?.trim().toUpperCase() === 'SUPPLIER' ? '/supplier/settings' : '/settings')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group p-1 rounded-xl sm:rounded-full md:rounded-xl hover:bg-slate-50/50 transition-colors"
          role="button"
          aria-label="View user profile settings"
        >
          {/* دائرة الأفتار */}
      <div 
  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#1B2A49] to-[#5B9FD7] border border-blue-200/30 flex items-center justify-center text-white font-black text-xs sm:text-sm shadow-sm select-none group-hover:border-blue-400/60 transition-all flex-shrink-0"
>
  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
</div>
          
          {/* التكست يظهر في التابلت واللابتوب (md) ويختفي في الموبايل */}
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
