// src/components/layout/Sidebar.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import useAuth from '../../hooks/useAuth';
import { 
  LayoutDashboard, ShoppingBag, Users, Layers, 
  BarChart3, Settings, X, ScanQrCode, Search, 
  ArrowLeftRight, UserCheck, Activity, HeartPulse, FileText
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// =========================================================================
// 🎨 أيقونات الفيجما الـ SVGs المخصصة للمورد لضمان مطابقة التصميم 100%
// =========================================================================

const SupplierDashboardIcon = ({ size = 20, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
    <g clipPath="url(#clip0_58_272)">
      <path d="M12.5 17.5V10.8333C12.5 10.6123 12.4122 10.4004 12.2559 10.2441C12.0996 10.0878 11.8877 10 11.6667 10H8.33333C8.11232 10 7.90036 10.0878 7.74408 10.2441C7.5878 10.4004 7.5 10.6123 7.5 10.8333V17.5" stroke="currentColor" strokeWidth="2.08333" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2.5 8.33357C2.49994 8.09113 2.55278 7.85159 2.65482 7.63167C2.75687 7.41175 2.90566 7.21673 3.09083 7.06024L8.92417 2.06024C9.22499 1.80599 9.60613 1.6665 10 1.6665C10.3939 1.6665 10.775 1.80599 11.0758 2.06024L16.9092 7.06024C17.0943 7.21673 17.2431 7.41175 17.3452 7.63167C17.4472 7.85159 17.5001 8.09113 17.5 8.33357V15.8336C17.5 16.2756 17.3244 16.6995 17.0118 17.0121C16.6993 17.3246 16.2754 17.5002 15.8333 17.5002H4.16667C3.72464 17.5002 3.30072 17.3246 2.98816 17.0121C2.67559 16.6995 2.5 16.2756 2.5 15.8336V8.33357Z" stroke="currentColor" strokeWidth="2.08333" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_58_272">
        <rect width="20" height="20" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const SupplierOrdersIcon = ({ size = 20, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
    <path d="M6.66634 18.3332C7.12658 18.3332 7.49967 17.9601 7.49967 17.4998C7.49967 17.0396 7.12658 16.6665 6.66634 16.6665C6.2061 16.6665 5.83301 17.0396 5.83301 17.4998C5.83301 17.9601 6.2061 18.3332 6.66634 18.3332Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.8333 18.3332C16.2936 18.3332 16.6667 17.9601 16.6667 17.4998C16.6667 17.0396 16.2936 16.6665 15.8333 16.6665C15.3731 16.6665 15 17.0396 15 17.4998C15 17.9601 15.3731 18.3332 15.8333 18.3332Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1.70801 1.7085H3.37467L5.59134 12.0585C5.67266 12.4375 5.88357 12.7764 6.18777 13.0167C6.49197 13.257 6.87043 13.3838 7.25801 13.3752H15.408C15.7873 13.3745 16.1551 13.2446 16.4505 13.0067C16.746 12.7688 16.9515 12.4373 17.033 12.0668L18.408 5.87516H4.26634" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SupplierPharmaciesIcon = ({ size = 20, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
    <path d="M13.3337 17.5V15.8333C13.3337 14.9493 12.9825 14.1014 12.3573 13.4763C11.7322 12.8512 10.8844 12.5 10.0003 12.5H5.00033C4.11627 12.5 3.26842 12.8512 2.6433 13.4763C2.01818 14.1014 1.66699 14.9493 1.66699 15.8333V17.5" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.333 2.60645C14.0478 2.79175 14.6808 3.20917 15.1327 3.79316C15.5846 4.37716 15.8298 5.09469 15.8298 5.83311C15.8298 6.57154 15.5846 7.28906 15.1327 7.87306C14.6808 8.45706 14.0478 8.87447 13.333 9.05978" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.333 17.5001V15.8334C18.3325 15.0948 18.0866 14.3774 17.6341 13.7937C17.1817 13.2099 16.5481 12.793 15.833 12.6084" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.50033 9.16667C9.34127 9.16667 10.8337 7.67428 10.8337 5.83333C10.8337 3.99238 9.34127 2.5 7.50033 2.5C5.65938 2.5 4.16699 3.99238 4.16699 5.83333C4.16699 7.67428 5.65938 9.16667 7.50033 9.16667Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SupplierDrugsIcon = ({ size = 20, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
    <path d="M9.16667 18.1084C9.42003 18.2547 9.70744 18.3317 10 18.3317C10.2926 18.3317 10.58 18.2547 10.8333 18.1084L16.6667 14.7751C16.9198 14.6289 17.13 14.4188 17.2763 14.1658C17.4225 13.9127 17.4997 13.6257 17.5 13.3334V6.66675C17.4997 6.37448 17.4225 6.08742 17.2763 5.83438C17.13 5.58134 16.9198 5.37122 16.6667 5.22508L10.8333 1.89175C10.58 1.74547 10.2926 1.66846 10 1.66846C9.70744 1.66846 9.42003 1.74547 9.16667 1.89175L3.33333 5.22508C3.08022 5.37122 2.86998 5.58134 2.72372 5.83438C2.57745 6.08742 2.5003 6.37448 2.5 6.66675V13.3334C2.5003 13.6257 2.57745 13.9127 2.72372 14.1658C2.86998 14.4188 3.08022 14.6289 3.33333 14.7751L9.16667 18.1084Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 18.3333V10" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.74121 5.8335L9.99954 10.0002L17.2579 5.8335" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.25 3.55811L13.75 7.84977" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SupplierAnalyticsIcon = ({ size = 20, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
    <path d="M2.5 2.5V15.8333C2.5 16.2754 2.67559 16.6993 2.98816 17.0118C3.30072 17.3244 3.72464 17.5 4.16667 17.5H17.5" stroke="currentColor" strokeWidth="2.08333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 14.1667V7.5" stroke="currentColor" strokeWidth="2.08333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10.833 14.1665V4.1665" stroke="currentColor" strokeWidth="2.08333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.66699 14.1665V11.6665" stroke="currentColor" strokeWidth="2.08333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SupplierSettingsIcon = ({ size = 20, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20" fill="none" {...props}>
    <path d="M8.05893 3.44663C8.10485 2.96358 8.32921 2.515 8.68818 2.18853C9.04716 1.86206 9.51495 1.68115 10.0002 1.68115C10.4854 1.68115 10.9532 1.86206 11.3122 2.18853C11.6712 2.515 11.8955 2.96358 11.9414 3.44663C11.969 3.75868 12.0714 4.05948 12.2399 4.32358C12.4084 4.58768 12.638 4.8073 12.9093 4.96386C13.1807 5.12042 13.4857 5.2093 13.7987 5.22298C14.1116 5.23666 14.4233 5.17474 14.7073 5.04246C15.1482 4.84228 15.6478 4.81331 16.1089 4.9612C16.57 5.10909 16.9596 5.42326 17.2019 5.84255C17.4441 6.26185 17.5217 6.75627 17.4195 7.22961C17.3173 7.70294 17.0426 8.12131 16.6489 8.4033C16.3926 8.58317 16.1833 8.82214 16.0389 9.09998C15.8944 9.37783 15.819 9.68639 15.819 9.99955C15.819 10.3127 15.8944 10.6213 16.0389 10.8991C16.1833 11.177 16.3926 11.4159 16.6489 11.5958C17.0426 11.8778 17.3173 12.2962 17.4195 12.7695C17.5217 13.2428 17.4441 13.7372 17.2019 14.1565C16.9596 14.5758 16.57 14.89 16.1089 15.0379C15.6478 15.1858 15.1482 15.1568 14.7073 14.9566C14.4233 14.8244 14.1116 14.7624 13.7987 14.7761C13.4857 14.7898 13.1807 14.8787 12.9093 15.0352C12.638 15.1918 12.4084 15.4114 12.2399 15.6755C12.0714 15.9396 11.969 16.2404 11.9414 16.5525C11.8955 17.0355 11.6712 17.4841 11.3122 17.8106C10.9532 18.137 10.4854 18.3179 10.0002 18.3179C9.51495 18.3179 9.04716 18.137 8.68818 17.8106C8.32921 17.4841 8.10485 17.0355 8.05893 16.5525C8.03138 16.2403 7.92901 15.9394 7.76049 15.6752C7.59196 15.411 7.36224 15.1913 7.09079 15.0347C6.81934 14.8782 6.51416 14.7893 6.20108 14.7757C5.88801 14.7621 5.57627 14.8242 5.29227 14.9566C4.85134 15.1568 4.3517 15.1858 3.8906 15.0379C3.42949 14.89 3.03991 14.5758 2.79767 14.1565C2.55543 13.7372 2.47786 13.2428 2.58007 12.7695C2.68227 12.2962 2.95693 11.8778 3.3506 11.5958C3.60695 11.4159 3.81621 11.177 3.96067 10.8991C4.10514 10.6213 4.18056 10.3127 4.18056 9.99955C4.18056 9.68639 4.10514 9.37783 3.96067 9.09998C3.81621 8.82214 3.60695 8.58317 3.3506 8.4033C2.95749 8.12117 2.68331 7.70296 2.58135 7.22995C2.47939 6.75694 2.55694 6.26291 2.79892 5.84389C3.0409 5.42487 3.43003 5.11078 3.89067 4.96266C4.35132 4.81455 4.85059 4.84299 5.29143 5.04246C5.5754 5.17474 5.88705 5.23666 6.20002 5.22298C6.51298 5.2093 6.81804 5.12042 7.08938 4.96386C7.36072 4.8073 7.59034 4.58768 7.75882 4.32358C7.9273 4.05948 8.02967 3.75868 8.05727 3.44663" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z" stroke="currentColor" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const { user } = useAuth();
  const currentRole = user?.role?.trim().toUpperCase() || 'SUPPLIER';

  // 1. قائمة المورد (Supplier Menu) بالـ SVGs الأصلية
  const supplierItems = [
    { path: ROUTES.SUPPLIER.DASHBOARD, label: 'Dashboard', icon: SupplierDashboardIcon },
    { path: ROUTES.SUPPLIER.INCOMING_ORDERS, label: 'Orders', icon: SupplierOrdersIcon },
    { path: '/supplier/pharmacies', label: 'Pharmacies', icon: SupplierPharmaciesIcon },
    { path: '/supplier/drugs', label: 'Drugs', icon: SupplierDrugsIcon },
    { path: '/supplier/analytics', label: 'Analytics', icon: SupplierAnalyticsIcon },
    { path: '/supplier/settings', label: 'Settings', icon: SupplierSettingsIcon },
  ];

  // 2. قائمة الصيدلي (Pharmacist Menu)
  const pharmacistItems = [
    { path: ROUTES.PHARMACIST.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { path: ROUTES.PHARMACIST.SCAN_PRESCRIPTION, label: 'Drugs', icon: ScanQrCode },
    { path: ROUTES.PHARMACIST.DRUG_SEARCH, label: 'Inventory', icon: Search },
    { path: '/supplier/settings', label: 'Settings', icon: Settings },
  ];

  // 3. قائمة الأدمن (Admin Menu)
  const adminItems = [
    { path: ROUTES.ADMIN.DASHBOARD, label: 'Admin Dashboard', icon: LayoutDashboard },
    { path: ROUTES.ADMIN.USER_MANAGEMENT, label: 'User Management', icon: Users },
    { path: ROUTES.ADMIN.DRUG_MANAGEMENT, label: 'Drug Management', icon: Layers },
    { path: ROUTES.ADMIN.SUPPLIER_MANAGEMENT, label: 'Suppliers', icon: UserCheck },
    { path: ROUTES.ADMIN.PURCHASE_ORDERS, label: 'Purchase Orders', icon: ShoppingBag },
    { path: ROUTES.ADMIN.REPORTS, label: 'Reports', icon: BarChart3 },
  ];

  // 4. قائمة المريض (Patient Menu)
  const patientItems = [
    { path: ROUTES.PATIENT.PROFILE, label: 'My Profile', icon: UserCheck },
    { path: ROUTES.PATIENT.PRESCRIPTION_HISTORY, label: 'Prescriptions', icon: FileText },
    { path: ROUTES.PATIENT.CHRONIC_MEDS, label: 'Chronic Meds', icon: HeartPulse },
    { path: '/patient/vitals', label: 'Health Status', icon: Activity },
    { path: '/patient/settings', label: 'Settings', icon: Settings },
  ];

  // اختيار القائمة المناسبة ديناميكياً بناءً على الرول
  const getMenuItems = () => {
    switch (currentRole) {
      case 'PHARMACIST': return pharmacistItems;
      case 'SUPPLIER': return supplierItems;
      case 'ADMIN': return adminItems;
      case 'PATIENT': return patientItems;
      default: return supplierItems;
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

      {/* الـ Sidebar الرئيسي الموحد بالأبعاد الدقيقة المتجاوبة من الفيجما */}
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
            type="button"
            onClick={() => setIsOpen(false)} 
            className="p-2 text-slate-400 hover:text-white rounded-xl cursor-pointer"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* قائمة اللينكات التفاعلية المنسقة بالمللي وبوردر الفيجما الهوياتي الأزرق */}
        <nav className="space-y-2 flex-1 px-3 mt-4">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => {
                  // اللوجيك الذكي لربط الصفحات الفرعية بالـ Dashboard أو الصفحة الرئيسية لكل دور
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
                {/* رسم الأيقونة بشكل موحد وديناميكي لدعم الـ currentColor والتغيرات الحركية */}
                <div className="flex items-center justify-center min-w-[20px] md:mx-auto lg:mx-0">
                  <IconComponent size={18} className="transition-colors group-hover:text-white text-inherit" />
                </div>
                
                {/* التعامل الاحترافي مع النصوص عند تغيير عرض الشاشات */}
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