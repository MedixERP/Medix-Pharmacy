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
  
  // تحويل الـ Role لحروف كبيرة لتفادي أي أخطاء في المقارنة
  const currentRole = user?.role?.trim().toUpperCase() || 'SUPPLIER';

  // 1. قائمة المورد الأصلي (Supplier Menu) - كلام supplier كما هو بدون أي تعديل في الستايل
  const supplierItems = [
    { path: ROUTES.SUPPLIER.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { path: ROUTES.SUPPLIER.INCOMING_ORDERS, label: 'Orders', icon: ShoppingBag },
    { path: '/supplier/pharmacies', label: 'Pharmacies', icon: Users },
    { path: '/supplier/drugs', label: 'Drugs', icon: Layers },
    { path: '/supplier/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/supplier/settings', label: 'Settings', icon: Settings },
  ];

  // 2. قائمة الصيدلي المضافة والجديدة (Pharmacist Menu) - بنفس الستايل والأبعاد المعتمدة
  const pharmacistItems = [
    { path: ROUTES.PHARMACIST.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { path: ROUTES.PHARMACIST.SCAN_PRESCRIPTION, label: 'Scan Prescription', icon: ScanQrCode },
    { path: ROUTES.PHARMACIST.DRUG_SEARCH, label: 'Drug Search', icon: Search },
    { path: ROUTES.PHARMACIST.DRUG_ALTERNATIVES, label: 'Alternatives', icon: ArrowLeftRight },
    { path: ROUTES.PHARMACIST.PATIENT_PROFILE, label: 'Patient Profile', icon: UserCheck },
    { path: '/supplier/settings', label: 'Settings', icon: Settings },
  ];

  // اختيار القائمة المناسبة بناءً على الرول الحالية للمستخدم
  const menuItems = currentRole === 'PHARMACIST' ? pharmacistItems : supplierItems;

  return (
    <>
      {/* الـ Overlay الشفاف عند فتح المنيو في الموبايل */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden cursor-pointer"
          onClick={() => setIsOpen(false)}
          role="presentation"
        />
      )}

      {/* الـ Sidebar الرئيسي المطور بناءً على مقاسات وأبعاد فيجما */}
      <aside 
        className={`bg-[#1B2A49] text-slate-300 flex flex-col fixed top-15 bottom-0 left-0 z-40 
          transition-all duration-300 ease-in-out select-none border-r border-slate-800/40
          ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'} 
<<<<<<< HEAD
          md:w-20 lg:w-64`}
        aria-label="Main Sidebar Navigation"
=======
          md:w-20 lg:w-60`}
        aria-label="Supplier Sidebar Navigation"
>>>>>>> 74d16c641bfcec9ad4123934492975463754f00e
      >
        {/* زر إغلاق السايدبار في الموبايل */}
        <div className="flex justify-end p-2 md:hidden">
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-xl cursor-pointer"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* قائمة اللينكات التفاعلية بالأبعاد الدقيقة */}
        <nav className="space-y-2 flex-1 px-3 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 rounded-[14px] text-[15px] leading-[22.5px] font-medium transition-all duration-200 group cursor-pointer
                  h-[46.5px] w-full lg:w-[224px] mx-auto justify-start
                  ${isActive 
                    ? 'bg-white/10 text-white font-bold border-2 border-[#3B81B7] shadow-lg' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white border-2 border-transparent'
                  }`
                }
              >
                {/* الأيقونة */}
                <div className="flex items-center justify-center min-w-[20px] md:mx-auto lg:mx-0">
                  <Icon size={18} className="transition-colors group-hover:text-white" />
                </div>
                
                {/* النصوص المدمجة والمتجاوبة */}
                <span className="hidden lg:block md:hidden tracking-wide whitespace-nowrap">{item.label}</span>
                <span className="block md:hidden tracking-wide whitespace-nowrap">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}