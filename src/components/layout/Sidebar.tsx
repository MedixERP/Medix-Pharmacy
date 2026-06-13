// src/components/layout/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import useAuth from '../../hooks/useAuth';
import { 
  LayoutDashboard, ShoppingBag, Users, Layers, 
  BarChart3, Settings, X, ScanQrCode, Search, 
  ArrowLeftRight, UserCheck, Activity, HeartPulse
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { user } = useAuth();
  
  // جلب الـ Role الحالية وتوحيدها لمنع أي أخطاء في الـ Matching
  const currentRole = user?.role?.trim().toUpperCase() || 'PHARMACIST';

  // 1. قائمة المورد (Supplier Menu) بالترتيب الفعلي من فيجما
  const supplierItems = [
    { path: ROUTES.SUPPLIER.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { path: ROUTES.SUPPLIER.INCOMING_ORDERS, label: 'Orders', icon: ShoppingBag },
    { path: '/supplier/pharmacies', label: 'Pharmacies', icon: Users },
    { path: '/supplier/drugs', label: 'Drugs', icon: Layers },
    { path: '/supplier/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/supplier/settings', label: 'Settings', icon: Settings },
  ];

  // 2. قائمة الصيدلي (Pharmacist Menu) بنفس الستايل والهيكل الاحترافي
  const pharmacistItems = [
    { path: ROUTES.PHARMACIST.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { path: ROUTES.PHARMACIST.SCAN_PRESCRIPTION, label: 'Scan Prescription', icon: ScanQrCode },
    { path: ROUTES.PHARMACIST.DRUG_SEARCH, label: 'Drug Search', icon: Search },
    { path: ROUTES.PHARMACIST.DRUG_ALTERNATIVES, label: 'Alternatives', icon: ArrowLeftRight },
    { path: ROUTES.PHARMACIST.PATIENT_PROFILE, label: 'Patient Profile', icon: UserCheck },
    { path: '/supplier/settings', label: 'Settings', icon: Settings },
  ];

  // 3. قائمة الأدمن (Admin Menu) المتكاملة للنظام
  const adminItems = [
    { path: ROUTES.ADMIN.DASHBOARD, label: 'Admin Dashboard', icon: LayoutDashboard },
    { path: ROUTES.ADMIN.USER_MANAGEMENT, label: 'User Management', icon: Users },
    { path: ROUTES.ADMIN.DRUG_MANAGEMENT, label: 'Drug Management', icon: Layers },
    { path: ROUTES.ADMIN.SUPPLIER_MANAGEMENT, label: 'Suppliers', icon: UserCheck },
    { path: ROUTES.ADMIN.PURCHASE_ORDERS, label: 'Purchase Orders', icon: ShoppingBag },
    { path: ROUTES.ADMIN.REPORTS, label: 'Reports', icon: BarChart3 },
  ];

  // 4. قائمة المريض (Patient Menu) المضافة حديثاً بدقة فائقة للهوية البصرية
  const patientItems = [
    { path: ROUTES.PATIENT.PROFILE, label: 'My Profile', icon: UserCheck },
    { path: ROUTES.PATIENT.PRESCRIPTION_HISTORY, label: 'Prescriptions', icon: FileTextIconPlaceholder },
    { path: ROUTES.PATIENT.CHRONIC_MEDS, label: 'Chronic Meds', icon: HeartPulse },
    { path: '/patient/vitals', label: 'Health Status', icon: Activity },
    { path: '/patient/settings', label: 'Settings', icon: Settings },
  ];

  // اختيار القائمة المناسبة ديناميكياً بناءً على الرول الحالية للمستخدم
  const getMenuItems = () => {
    switch (currentRole) {
      case 'PHARMACIST': return pharmacistItems;
      case 'SUPPLIER': return supplierItems;
      case 'ADMIN': return adminItems;
      case 'PATIENT': return patientItems;
      default: return pharmacistItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* الـ Overlay الشفاف عند فتح المنيو في الموبايل */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden cursor-pointer animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
          role="presentation"
        />
      )}

      {/* الـ Sidebar الرئيسي المطور بناءً على مقاسات وأبعاد فيجما بالملي */}
      <aside 
        className={`bg-[#1B2A49] text-slate-300 flex flex-col fixed top-15 bottom-0 left-0 z-40 
          transition-all duration-300 ease-in-out select-none border-r border-slate-800/40
          ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'} 
          md:w-20 lg:w-60`}
        aria-label="Main Sidebar Navigation"
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

        {/* قائمة اللينكات التفاعلية بالأبعاد الدقيقة المتجاوبة */}
        <nav className="space-y-2 flex-1 px-3 mt-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => {
                  // 💡 اللوجيك الذكي لربط الصفحات الفرعية بالـ Dashboard أو الصفحة الرئيسية لكل دور
                  const isMainTab = item.label.toLowerCase().includes('dashboard') || item.label.toLowerCase().includes('profile');
                  const isSubPage = window.location.pathname.endsWith('/profile') || window.location.pathname.endsWith('/notifications');
                  const shouldBeActive = isActive || (isMainTab && isSubPage);

                  return `flex items-center gap-3 px-4 rounded-[14px] text-[15px] leading-[22.5px] font-medium transition-all duration-200 group cursor-pointer
                    h-[46.5px] w-full lg:w-[224px] mx-auto justify-start
                    ${shouldBeActive 
                      ? 'bg-white/10 text-white font-bold border-2 border-[#3B81B7] shadow-lg' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-white border-2 border-transparent'
                    }`;
                }}
              >
                <div className="flex items-center justify-center min-w-[20px] md:mx-auto lg:mx-0">
                  <Icon size={18} className="transition-colors group-hover:text-white" />
                </div>
                
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

// مكوّن أيكونة بديل لـ FileText لحين استدعائها بشكل مخصص
function FileTextIconPlaceholder(props: React.ComponentProps<'svg'>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
      <path d="M10 9H8"/>
      <path d="M16 13H8"/>
      <path d="M16 17H8"/>
    </svg>
  );
}