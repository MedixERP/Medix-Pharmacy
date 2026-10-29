import React, { useState } from 'react';
import { AlertTriangle, XCircle, Truck, CheckCircle2, Bell, Check } from 'lucide-react';
import SEOHead from '../../components/shared/SEOHead';

interface AdminNotification {
  id: number;
  title: string;
  time: string;
  unread: boolean;
  type: 'low_stock' | 'out_of_stock' | 'shipping' | 'approved' | 'new_supplier';
  dateGroup: 'Today' | 'Yesterday'; // تحديد المجموعة الزمنية للإشعار
}

export default function AdminNotifications() {
  // البيانات المطابقة تماماً للتصميم الفعلي والملف المرجعي image_7274a2.png شاملة أمس واليوم
  const [notifications, setNotifications] = useState<AdminNotification[]>([
    { id: 1, title: 'Low stock alert: Brufen has only 5 units remaining', time: '10 minutes ago', unread: true, type: 'low_stock', dateGroup: 'Today' },
    { id: 2, title: 'Out of stock: Augmentin is currently out of stock', time: '25 minutes ago', unread: true, type: 'out_of_stock', dateGroup: 'Today' },
    { id: 3, title: 'Purchase Order PO-2026-008 has been shipped by Amoun Pharmaceutical', time: '1 hour ago', unread: true, type: 'shipping', dateGroup: 'Today' },
    { id: 4, title: 'Purchase Order PO-2026-007 has been approved', time: '2 hours ago', unread: false, type: 'approved', dateGroup: 'Today' },
    { id: 5, title: 'New supplier Novartis has been added to the system', time: '3 hours ago', unread: false, type: 'new_supplier', dateGroup: 'Today' },
    // 🟢 الموك داتا الخاصة بأمس (Yesterday) من الفيجما بالمللي
    { id: 6, title: 'Purchase Order PO-2026-006 has been delivered successfully', time: 'Yesterday at 5:30 PM', unread: false, type: 'approved', dateGroup: 'Yesterday' },
    { id: 7, title: 'Purchase Order PO-2026-005 has been shipped by Eva Pharma', time: 'Yesterday at 2:15 PM', unread: false, type: 'shipping', dateGroup: 'Yesterday' }
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleToggleRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: !n.unread } : n));
  };

  // استخراج الألوان الصريحة والأيقونات من البلجن والفيجما
  const getIconStyle = (type: AdminNotification['type']) => {
    switch (type) {
      case 'low_stock': 
        return { icon: <AlertTriangle size={24} />, bg: 'bg-yellow-50 text-amber-500' };
      case 'out_of_stock': 
        return { icon: <XCircle size={24} />, bg: 'bg-pink-100 text-red-500' };
      case 'shipping': 
        return { icon: <Truck size={24} />, bg: 'bg-pink-100 text-fuchsia-700' };
      case 'approved': 
        return { icon: <CheckCircle2 size={24} />, bg: 'bg-green-100 text-green-500' };
      case 'new_supplier': 
        return { icon: <Bell size={24} />, bg: 'bg-sky-100 text-cyan-600' };
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  // فصل الإشعارات لمجموعات (Today / Yesterday)
  const todayNotifications = notifications.filter(n => n.dateGroup === 'Today');
  const yesterdayNotifications = notifications.filter(n => n.dateGroup === 'Yesterday');

  return (
    // نفس المسافات الثابتة الموحدة: 30px من فوق و 25px من الجوانب
    <div className="animate-in fade-in duration-300 text-left relative pt-[2px] px-[2px] space-y-6">
      <SEOHead 
        title="Notifications" 
        description="Medix Platform Notifications - Stay updated with global pharmacy network updates, inventory alerts, and approvals." 
      />
      
      {/* هيدر الصفحة الرئيسي */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100/80 pb-5 select-none">
        <div>
          <h1 
            className="text-[24px] md:text-[30px] font-bold text-blue-950"
            style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}
          >
            Notifications
          </h1>
          <p 
            className="text-xs md:text-sm text-gray-500 mt-1 font-normal"
            style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}
          >
            Stay updated with all your pharmacy activities and alerts.
          </p>
        </div>
        
        {/* أزرار التحكم الجانبية العلوية */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          {unreadCount > 0 && (
            <span 
              className="bg-sky-100 text-cyan-600 text-xs md:text-sm font-bold px-3 py-1.5 rounded-full border border-blue-100/50"
              style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}
            >
              • {unreadCount} unread
            </span>
          )}
          <button 
            type="button"
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-blue-950 px-4 py-2 rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer active:scale-95"
            style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}
          >
            <Check size={14} /> Mark all as read
          </button>
        </div>
      </div>

      {/* 📅 مجموعة إشعارات اليوم (Today Group) */}
      <div className="space-y-4">
        <h2 
          className="text-blue-950 text-lg font-bold leading-7 select-none"
          style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}
        >
          Today
        </h2>
        <div className="space-y-3">
          {todayNotifications.map((n) => {
            const style = getIconStyle(n.type);
            return (
              <div 
                key={n.id}
                onClick={() => handleToggleRead(n.id)}
                className={`w-full min-h-[80px] p-4 md:p-5 rounded-2xl border transition-all duration-150 flex items-center justify-between gap-4 relative shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] cursor-pointer select-none
                  ${n.unread 
                    ? 'bg-indigo-50 border-slate-100 hover:border-blue-300' 
                    : 'bg-white border-slate-100/80 hover:border-slate-300'
                  }`}
              >
                <div className="flex items-center gap-4 w-full pr-6 sm:pr-8">
                  <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${style.bg}`}>
                    {style.icon}
                  </div>
                  <div className="flex flex-col gap-1 w-full text-left">
                    <h4 className="text-sm md:text-base font-normal text-slate-700 leading-6" style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}>
                      {n.title}
                    </h4>
                    <p className="text-xs text-gray-500 font-normal leading-5" style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}>
                      {n.time}
                    </p>
                  </div>
                </div>
                {n.unread && (
                  <span className="size-2.5 bg-cyan-600 rounded-full absolute right-5 md:right-7 top-1/2 -translate-y-1/2 shrink-0 animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 📅 مجموعة إشعارات أمس (Yesterday Group) */}
      <div className="space-y-4 pt-2">
        <h2 
          className="text-blue-950 text-lg font-bold leading-7 select-none"
          style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}
        >
          Yesterday
        </h2>
        <div className="space-y-3">
          {yesterdayNotifications.map((n) => {
            const style = getIconStyle(n.type);
            return (
              <div 
                key={n.id}
                onClick={() => handleToggleRead(n.id)}
                className={`w-full min-h-[80px] p-4 md:p-5 rounded-2xl border transition-all duration-150 flex items-center justify-between gap-4 relative shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] cursor-pointer select-none
                  ${n.unread 
                    ? 'bg-indigo-50 border-slate-100 hover:border-blue-300' 
                    : 'bg-white border-slate-100/80 hover:border-slate-300'
                  }`}
              >
                <div className="flex items-center gap-4 w-full pr-6 sm:pr-8">
                  <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${style.bg}`}>
                    {style.icon}
                  </div>
                  <div className="flex flex-col gap-1 w-full text-left">
                    <h4 className="text-sm md:text-base font-normal text-slate-700 leading-6" style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}>
                      {n.title}
                    </h4>
                    <p className="text-xs text-gray-500 font-normal leading-5" style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}>
                      {n.time}
                    </p>
                  </div>
                </div>
                {n.unread && (
                  <span className="size-2.5 bg-cyan-600 rounded-full absolute right-5 md:right-7 top-1/2 -translate-y-1/2 shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}