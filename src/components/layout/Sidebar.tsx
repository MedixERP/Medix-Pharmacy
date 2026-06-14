// src/components/layout/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import useAuth from '../../hooks/useAuth';
import { 
  LayoutDashboard, ShoppingBag, Users, Layers, 
  BarChart3, Settings, X, ScanQrCode, Search, 
  ArrowLeftRight, UserCheck 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { user } = useAuth();
  const currentRole = user?.role?.trim().toUpperCase() || 'SUPPLIER';

  const supplierItems = [
    { path: ROUTES.SUPPLIER.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { path: ROUTES.SUPPLIER.INCOMING_ORDERS, label: 'Orders', icon: ShoppingBag },
    { path: '/supplier/pharmacies', label: 'Pharmacies', icon: Users },
    { path: '/supplier/drugs', label: 'Drugs', icon: Layers },
    { path: '/supplier/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/supplier/settings', label: 'Settings', icon: Settings },
  ];

  const pharmacistItems = [
    { path: ROUTES.PHARMACIST.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { path: ROUTES.PHARMACIST.SCAN_PRESCRIPTION, label: 'Drugs', icon: ScanQrCode },
    { path: ROUTES.PHARMACIST.DRUG_SEARCH, label: 'Inventory', icon: Search },
    { path: '/supplier/settings', label: 'Settings', icon: Settings },
  ];

  const menuItems = currentRole === 'PHARMACIST' ? pharmacistItems : supplierItems;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside 
        className={`bg-[#1B2A49] text-slate-300 flex flex-col fixed top-15 bottom-0 left-0 z-40 
          transition-all duration-300 ease-in-out select-none border-r border-slate-800/40
          ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'} 
          md:w-20 lg:w-60`}
        aria-label="Sidebar Navigation"
      >
        <div className="flex justify-end p-2 md:hidden">
          <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-white rounded-xl">
            <X size={20} />
          </button>
        </div>

        <nav className="space-y-2 flex-1 px-3 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 rounded-[14px] text-[15px] font-medium transition-all duration-200 group
                  h-[46.5px] w-full lg:w-[224px] mx-auto
                  ${isActive 
                    ? 'bg-white/10 text-white font-bold border-2 border-[#3B81B7]' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center justify-center min-w-[20px]">
                  <Icon size={18} />
                </div>
                <span className="lg:block tracking-wide">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}