// src/pages/supplier/Notifications.tsx
import React, { useState } from 'react';
import { Bell, Check, Settings, Truck, CheckCircle2, ShieldAlert, ChevronRight } from 'lucide-react';
import SEOHead from '../../components/shared/SEOHead';

const initialNotifications = [
  { id: 1, title: 'New Order Received', desc: 'Smart Pharmacy ordered 3 items Order #PO-2024-001 • 4,500 EGP', time: '30 min ago', category: 'Orders', unread: true, type: 'new', icon: 🔔, iconBg: 'bg-amber-50 text-amber-500 border-amber-200' },
  { id: 2, title: 'Order Needs Shipping', desc: 'Order #PO-2024-002 confirmed. Ready to ship to Al-Ezaby Pharmacy.', time: '2 hours ago', category: 'Orders', unread: true, type: 'shipping', icon: 📦, iconBg: 'bg-blue-50 text-blue-500 border-blue-200' },
  { id: 3, title: 'Order Delivered', desc: 'Order #PO-2024-003 delivered successfully to Seif Pharmacy.', time: '1 day ago', category: 'Orders', unread: false, type: 'delivered', icon:  border-emerald-200' },
  { id: 4, title: 'System Announcement', desc: 'New feature: Real-time tracking now available for all pending corporate orders.', time: '2 days ago', category: 'System', unread: false, type: 'system', icon: ⚙️, iconBg: 'bg-slate-50 text-slate-500 border-slate-200' },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState('All');

  // زر القراءة الفورية لجميع الإشعارات حركياً
  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleToggleRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: !n.unread } : n));
  };

  // الفلترة الذكية للتابات المخصصة كالفورم
  const filteredNotifs = notifications.filter(n => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Unread') return n.unread;
    return n.category === activeTab;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-left relative max-w-[1600px] mx-auto pb-10 select-none">
      <SEOHead title="Notifications Hub" description="Stay updated with incoming pharmacy purchase orders and stock alerts." />

      {/* الهيدر وزرار الـ Mark All Read */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#1b2a49] tracking-tight" style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}>
            Notifications
          </h1>
          <p className="text-sm text-slate-400 mt-1" style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}>
            Stay updated with order alerts
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={handleMarkAllRead}
            className="inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-[#1b2a49] px-4 py-2 rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer"
          >
            <Check size={13} /> Mark all as read
          </button>
          <button className="p-2 border border-slate-200 bg-white hover:bg-slate-50 rounded-xl text-slate-500 shadow-2xs transition-all cursor-pointer">
            <Settings size={15} />
          </button>
        </div>
      </div>

      {/* الـ Filter Tabs المتوافقة مع الفيجما */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-none">
        {[
          { name: 'All', count: notifications.length },
          { name: 'Unread', count: notifications.filter(n => n.unread).length },
          { name: 'Orders', count: notifications.filter(n => n.category === 'Orders').length },
          { name: 'System', count: notifications.filter(n => n.category === 'System').length }
        ].map(tab => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.name 
                ? 'bg-[#1b2a49] text-white shadow-sm' 
                : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'
            }`}
            style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}
          >
            {tab.name} ({tab.count})
          </button>
        ))}
      </div>

      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1 pt-2">Today</p>

      {/* القائمة الكرتونية الفاخرة للإشعارات */}
      <div className="space-y-4">
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((n) => (
            <div 
              key={n.id}
              onClick={() => handleToggleRead(n.id)}
              className={`p-5 rounded-2xl bg-white border flex flex-col sm:flex-row sm:items-start justify-between gap-4 transition-all hover:shadow-2xs cursor-pointer relative ${
                n.unread ? 'border-l-4 border-l-blue-500 border-slate-100' : 'border-slate-100/70 opacity-85'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* الأيقونة الكرتونية الملونة حسب الحالة */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold border shrink-0 text-lg shadow-3xs ${n.iconBg}`}>
                  {n.icon}
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="text-sm font-extrabold text-[#1b2a49] tracking-wide">{n.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold max-w-2xl">{n.desc}</p>
                  <p className="text-[10px] text-slate-400 font-bold" style={{ fontFamily: 'SF Pro Rounded' }}>{n.time}</p>
                  
                  {/* الأزرار التفاعلية الفورية المباشرة لكل إشعار كما بالصورة */}
                  <div className="pt-2">
                    {n.type === 'new' && (
                      <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-4 py-1.5 rounded-lg transition-all shadow-3xs cursor-pointer">
                        Accept Order
                      </button>
                    )}
                    {n.type === 'shipping' && (
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-5 py-1.5 rounded-lg shadow-3xs transition-all cursor-pointer">
                        Ship Now
                      </button>
                    )}
                    {n.type === 'delivered' && (
                      <button className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[11px] px-4 py-1.5 rounded-lg transition-all cursor-pointer">
                        View Receipt
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* نقطة الإشعار الأزرق غير المقروء */}
              {n.unread && (
                <span className="w-2 h-2 bg-blue-600 rounded-full absolute top-6 right-6"></span>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-10 text-center text-xs font-bold text-slate-400">
            🎉 Clear skies! No notifications found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}   
