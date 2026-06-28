import React, { useState } from 'react';
import { Bell, AlertTriangle, XCircle, Truck, CheckCircle2, Settings, Check } from 'lucide-react';

interface AdminNotification {
  id: number;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  type: 'low_stock' | 'out_of_stock' | 'shipping' | 'approved' | 'new_supplier';
}

export default function AdminNotifications() {
  // البيانات المطابقة تماماً للتصميم الفعلي الظاهر في الفيجما image_4ea286.jpg
  const [notifications, setNotifications] = useState<AdminNotification[]>([
    { id: 1, title: 'Low stock alert: Brufen has only 5 units remaining', desc: 'System baseline inventory threshold infraction encountered.', time: '10 minutes ago', unread: true, type: 'low_stock' },
    { id: 2, title: 'Out of stock: Augmentin is currently out of stock', desc: 'Critical global stock depletion for primary antibiotic formula.', time: '25 minutes ago', unread: true, type: 'out_of_stock' },
    { id: 3, title: 'Purchase Order PO-2026-008 has been shipped by Amoun Pharmaceutical', desc: 'Logistics cargo transit update logged into data tables.', time: '1 hour ago', unread: true, type: 'shipping' },
    { id: 4, title: 'Purchase Order PO-2026-007 has been approved', desc: 'Escrow clearance granted. Financial ledger records synchronized.', time: '2 hours ago', unread: false, type: 'approved' },
    { id: 5, title: 'New supplier Novartis has been added to the system', desc: 'Corporate pharmacy provider profile created and pending license audit.', time: '3 hours ago', unread: false, type: 'new_supplier' },
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleToggleRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: !n.unread } : n));
  };

  const getIconStyle = (type: AdminNotification['type']) => {
    switch (type) {
      case 'low_stock': return { icon: <AlertTriangle size={18} />, bg: 'bg-amber-50 text-amber-500 border-amber-100' };
      case 'out_of_stock': return { icon: <XCircle size={18} />, bg: 'bg-rose-50 text-rose-500 border-rose-100' };
      case 'shipping': return { icon: <Truck size={18} />, bg: 'bg-purple-50 text-purple-500 border-purple-100' };
      case 'approved': return { icon: <CheckCircle2 size={18} />, bg: 'bg-emerald-50 text-emerald-600 border-emerald-100' };
      case 'new_supplier': return { icon: <Bell size={18} />, bg: 'bg-blue-50 text-blue-500 border-blue-100' };
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* هيدر الصفحة الرئيسي */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100/60 pb-5 select-none">
        <div>
          <h1 className="text-2xl font-bold text-[#1b2a49]">Notifications</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">Stay updated with all your pharmacy activities and alerts.</p>
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {unreadCount > 0 && (
            <span className="bg-blue-50 text-blue-600 text-[11px] font-black px-3 py-1.5 rounded-xl border border-blue-100 shadow-2xs">
              • {unreadCount} unread
            </span>
          )}
          <button 
            onClick={handleMarkAllRead}
            className="flex items-center gap-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-[#1b2a49] px-4 py-2 rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer"
          >
            <Check size={14} /> Mark all as read
          </button>
        </div>
      </div>

      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest select-none">Today</p>

      {/* حاوية الإشعارات الكرتونية العريضة المريحة للبصر */}
      <div className="space-y-3">
        {notifications.map((n) => {
          const style = getIconStyle(n.type);
          return (
            <div 
              key={n.id}
              onClick={() => handleToggleRead(n.id)}
              className={`p-4 rounded-2xl bg-white border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-[0_10px_30px_rgba(27,42,73,0.02)] cursor-pointer relative
                ${n.unread ? 'border-slate-100 shadow-2xs' : 'border-slate-100/60 opacity-75'}`}
            >
              <div className="flex items-center gap-4">
                {/* الأيقونة المستديرة الهوياتية */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 ${style.bg}`}>
                  {style.icon}
                </div>
                <div className="space-y-0.5 text-left">
                  <h4 className="text-sm font-bold text-[#1b2a49] leading-tight">{n.title}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">{n.time} • <span className="text-slate-300 font-normal">{n.desc}</span></p>
                </div>
              </div>

              {/* نقطة المتابعة الزرقاء الجانبية لإرشاد المشرف */}
              {n.unread && (
                <span className="w-2 h-2 bg-blue-500 rounded-full sm:static absolute top-5 right-5" />
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}