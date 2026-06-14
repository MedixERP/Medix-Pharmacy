// src/components/layout/Navbar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Menu } from 'lucide-react';
import useAuth from '../../hooks/useAuth';
import { useSearchStore } from '../../store/searchStore';

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

  return (
    <header 
      className="h-20 bg-white border-b border-slate-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-50 w-full select-none shadow-[0_10px_30px_rgba(27,42,73,0.05)] relative"
      role="banner"
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-[#1b2a49] hover:bg-slate-50 rounded-xl md:hidden cursor-pointer"
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>
        
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-sky-400 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-blue-200">
            M
          </div>
          <span className="text-xl font-black text-[#1b2a49] tracking-tight">
            Medix<span className="text-blue-600">.</span>
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center relative w-full max-w-md mx-8">
        <Search className="absolute left-4 text-slate-400 pointer-events-none" size={18} />
        <input 
          type="text" 
          placeholder="Search items, orders, logs..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#F8FAFC] text-[#1b2a49] text-sm font-medium pl-11 pr-4 py-2.5 rounded-full border border-transparent focus:outline-none focus:bg-white focus:border-slate-200 transition-all placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl relative cursor-pointer">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center font-bold text-[#1b2a49]">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="hidden sm:block text-left">
            <h4 className="text-[14px] font-bold text-[#1b2a49]">{user?.name || 'User'}</h4>
            <p className="text-[11px] font-bold text-blue-600 uppercase">{user?.role || 'ACCOUNT'}</p>
          </div>
        </div>
      </div>
    </header>
  );
}