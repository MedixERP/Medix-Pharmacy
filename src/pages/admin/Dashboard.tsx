import React from 'react';
import { Users, AlertTriangle, ShieldAlert } from 'lucide-react';
import SEOHead from '../../components/shared/SEOHead';

// 1. تحويل أيقونة الموردين من البلجن إلى Component
const SuppliersIcon = ({ size = 28 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 28 28" fill="none">
    <path d="M11.6665 14H16.3332" stroke="#F57C00" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.6665 9.3335H16.3332" stroke="#F57C00" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.3332 24.4998V20.9998C16.3332 20.381 16.0873 19.7875 15.6498 19.3499C15.2122 18.9123 14.6187 18.6665 13.9998 18.6665C13.381 18.6665 12.7875 18.9123 12.3499 19.3499C11.9123 19.7875 11.6665 20.381 11.6665 20.9998V24.4998" stroke="#F57C00" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7.00016 11.6665H4.66683C4.04799 11.6665 3.4545 11.9123 3.01691 12.3499C2.57933 12.7875 2.3335 13.381 2.3335 13.9998V22.1665C2.3335 22.7853 2.57933 23.3788 3.01691 23.8164C3.4545 24.254 4.04799 24.4998 4.66683 24.4998H23.3335C23.9523 24.4998 24.5458 24.254 24.9834 23.8164C25.421 23.3788 25.6668 22.7853 25.6668 22.1665V10.4998C25.6668 9.881 25.421 9.28751 24.9834 8.84992C24.5458 8.41234 23.9523 8.1665 23.3335 8.1665H21.0002" stroke="#F57C00" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M7 24.5V5.83333C7 5.21449 7.24583 4.621 7.68342 4.18342C8.121 3.74583 8.71449 3.5 9.33333 3.5H18.6667C19.2855 3.5 19.879 3.74583 20.3166 4.18342C20.7542 4.621 21 5.21449 21 5.83333V24.5" stroke="#F57C00" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 2. تحويل أيقونة الأدوية من البلجن إلى Component
const DrugsIcon = ({ size = 28 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 28 28" fill="none">
    <path d="M12.2502 23.9168L23.9168 12.2502C24.462 11.7159 24.8958 11.0789 25.1933 10.3759C25.4907 9.67298 25.6458 8.91804 25.6497 8.15475C25.6535 7.39147 25.506 6.635 25.2157 5.92907C24.9254 5.22314 24.498 4.58177 23.9583 4.04204C23.4186 3.50232 22.7772 3.07494 22.0713 2.78462C21.3653 2.4943 20.6089 2.3468 19.8456 2.35066C19.0823 2.35451 18.3274 2.50964 17.6244 2.80708C16.9214 3.10451 16.2844 3.53835 15.7502 4.0835L4.0835 15.7502C3.53835 16.2844 3.10451 16.9214 2.80708 17.6244C2.50964 18.3274 2.35451 19.0823 2.35066 19.8456C2.3468 20.6089 2.4943 21.3653 2.78462 22.0713C3.07494 22.7772 3.50232 23.4186 4.04204 23.9583C4.58177 24.498 5.22314 24.9254 5.92907 25.2157C6.635 25.506 7.39147 25.6535 8.15475 25.6497C8.91804 25.6458 9.67298 25.4907 10.3759 25.1933C11.0789 24.8958 11.7159 24.462 12.2502 23.9168Z" stroke="#388E3C" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.9165 9.9165L18.0832 18.0832" stroke="#388E3C" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 3. تحويل أيقونة الطلبات من البلجن إلى Component
const OrdersIcon = ({ size = 28 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 28 28" fill="none">
    <path d="M9.33317 25.6668C9.9775 25.6668 10.4998 25.1445 10.4998 24.5002C10.4998 23.8558 9.9775 23.3335 9.33317 23.3335C8.68884 23.3335 8.1665 23.8558 8.1665 24.5002C8.1665 25.1445 8.68884 25.6668 9.33317 25.6668Z" stroke="#9B59B6" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M22.1667 25.6668C22.811 25.6668 23.3333 25.1445 23.3333 24.5002C23.3333 23.8558 22.811 23.3335 22.1667 23.3335C21.5223 23.3335 21 23.8558 21 24.5002C21 25.1445 21.5223 25.6668 22.1667 25.6668Z" stroke="#9B59B6" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.3916 2.3916H4.72494L7.82827 16.8816C7.94211 17.4123 8.23738 17.8867 8.66326 18.2231C9.08915 18.5595 9.61899 18.737 10.1616 18.7249H21.5716C22.1026 18.7241 22.6175 18.5421 23.0311 18.2091C23.4448 17.876 23.7324 17.4119 23.8466 16.8933L25.7716 8.22493H5.97327" stroke="#9B59B6" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function AdminDashboard() {
  const cards = [
    { 
      title: 'Active Users', 
      count: '15', 
      sub: '↑ 3 this week', 
      subColor: 'text-green-500',
      icon: Users, 
      color: 'text-sky-600', 
      bg: 'bg-sky-100' 
    },
    { 
      title: 'Suppliers', 
      count: '12', 
      sub: '9 active', 
      subColor: 'text-gray-500',
      icon: SuppliersIcon, 
      color: 'text-orange-500', 
      bg: 'bg-yellow-50' 
    },
    { 
      title: 'Drugs in System', 
      count: '250', 
      sub: '12 low stock', 
      subColor: 'text-amber-500',
      icon: DrugsIcon, 
      color: 'text-green-700', 
      bg: 'bg-green-100' 
    },
    { 
      title: 'Active Orders', 
      count: '23', 
      sub: '5 pending', 
      subColor: 'text-amber-500',
      icon: OrdersIcon, 
      color: 'text-fuchsia-700', 
      bg: 'bg-pink-100' 
    },
  ];

  const activities = [
    { type: 'Drug Added', name: 'Panadol Extra', date: '2026-01-30, 10:30 AM', color: 'bg-green-500/10 text-green-500' },
    { type: 'Order Completed', name: 'Order #1024', date: '2026-01-30, 09:15 AM', color: 'bg-green-500/10 text-green-500' },
    { type: 'Low Stock Alert', name: 'Brufen 600mg', date: '2026-01-29, 05:45 PM', color: 'bg-amber-500/10 text-amber-500' },
    { type: 'Drug Updated', name: 'Augmentin 1g', date: '2026-01-29, 03:20 PM', color: 'bg-cyan-600/10 text-cyan-600' },
    { type: 'Order Placed', name: 'Order #1023', date: '2026-01-29, 02:10 PM', color: 'bg-cyan-600/10 text-cyan-600' },
    { type: 'Drug Deleted', name: 'Aspirin 500mg', date: '2026-01-29, 11:30 AM', color: 'bg-red-500/10 text-red-500' },
  ];

  return (
    // 🟢 التعديل هنا بالمللي: pt-[30px] لضبط 30px من فوق، و px-[25px] لضبط 25px هوامش جانبية (اليمين واليسار) لتوحيد الأبعاد تماماً
    <div className="animate-in fade-in duration-300 text-left relative pt-[2px] px-[2px] space-y-6">
      <SEOHead 
        title="Admin Dashboard" 
        description="Medix System Administration Dashboard - Manage users, suppliers, global inventory, and system health statistics." 
      />

      {/* 1. قسم التنبيهات (Alerts Section) */}
      <div className="space-y-3">
        {/* Warning Alert */}
        <div className="bg-yellow-50 border-l-4 border-amber-500 p-4 rounded-2xl flex items-center gap-3 shadow-xs">
          <AlertTriangle className="text-amber-500 flex-shrink-0" size={24} />
          <div className="flex flex-col">
            <span className="font-bold text-amber-500 text-base font-['SF_Pro_Rounded'] leading-6">WARNING:</span>
            <span className="text-sm text-slate-700 font-normal font-['SF_Pro_Rounded'] leading-5">12 drugs low stock</span>
          </div>
        </div>

        {/* Critical Alert */}
        <div className="bg-pink-100 border-l-4 border-red-500 p-4 rounded-2xl flex items-center gap-3 shadow-xs">
          <ShieldAlert className="text-red-500 flex-shrink-0" size={24} />
          <div className="flex flex-col">
            <span className="font-bold text-red-500 text-base font-['SF_Pro_Rounded'] leading-6">CRITICAL:</span>
            <span className="text-sm text-slate-700 font-normal font-['SF_Pro_Rounded'] leading-5">3 users inactive for 30+ days</span>
          </div>
        </div>
      </div>

      {/* 2. الترحيب بالـ Admin */}
      <div>
        <h1 
          className="text-[24px] md:text-[30px] font-bold text-blue-950 md:leading-[40px] tracking-[0px] select-none"
          style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif' }}
        >
          Welcome back, Sara! 👋
        </h1>
        <p 
          className="text-[14px] md:text-[16px] font-normal text-gray-500 md:leading-[24px] tracking-[0px] mt-[8px]"
          style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif' }}
        >
          Welcome back! Here's what's happening with your pharmacy today.
        </p>
      </div>

      {/* 3. كروت الإحصائيات (Stats Grid) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div 
              key={idx} 
              className="bg-white p-6 rounded-2xl shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] border border-slate-100/50 flex flex-col justify-between min-h-[190px] hover:border-cyan-500/30 transition-all"
            >
              <div className={`p-3.5 ${card.bg} ${card.color} rounded-2xl w-fit shadow-xs`}>
                <Icon size={24} />
              </div>
              <div className="mt-4 space-y-1">
                <h3 
                  className={`text-[32px] font-bold ${card.color} leading-[48px]`}
                  style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}
                >
                  {card.count}
                </h3>
                <p 
                  className="text-sm font-normal text-gray-500 leading-5"
                  style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}
                >
                  {card.title}
                </p>
                <p 
                  className={`text-xs font-normal ${card.subColor} Mediterranean-sub leading-5 pt-1`}
                  style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}
                >
                  {card.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. حاوية الأنشطة الأخيرة (Recent Activity) */}
      <div className="bg-white rounded-2xl px-6 py-6 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] border border-slate-100/40 space-y-5">
        <div className="flex items-center justify-between border-b border-slate-50 pb-3">
          <h2 
            className="text-xl font-bold text-blue-950 leading-8"
            style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}
          >
            Recent Activity
          </h2>
        </div>

        {/* 💻 جدول الشاشات الكبيرة (Desktop View) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-tight h-11">
                <th className="pb-3 px-4 font-['SF_Pro_Rounded']">Activity Type</th>
                <th className="pb-3 px-4 font-['SF_Pro_Rounded']">Drug / Order Name</th>
                <th className="pb-3 px-4 font-['SF_Pro_Rounded']">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/70 text-sm font-normal text-slate-700">
              {activities.map((act, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors h-16">
                  <td className="px-4">
                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-[10px] text-xs font-normal font-['SF_Pro_Rounded'] h-8 ${act.color}`}>
                      {act.type}
                    </span>
                  </td>
                  <td className="px-4 font-['SF_Pro_Rounded'] text-slate-700 font-medium">
                    {act.name}
                  </td>
                  <td className="px-4 font-['SF_Pro_Rounded'] text-gray-500">
                    {act.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📱 كروت الشاشات الصغيرة (Mobile View) */}
        <div className="block md:hidden space-y-4">
          {activities.map((act, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 space-y-3 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-[8px] text-[11px] font-medium font-['SF_Pro_Rounded'] ${act.color}`}>
                  {act.type}
                </span>
                <span className="text-[11px] text-gray-400 font-['SF_Pro_Rounded']">
                  {act.date.split(',')[1] || act.date}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <h4 className="font-bold text-slate-700 text-sm font-['SF_Pro_Rounded']">{act.name}</h4>
                <p className="text-[11px] text-gray-400 font-['SF_Pro_Rounded']">{act.date.split(',')[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}