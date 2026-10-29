// src/pages/supplier/Notifications.tsx
import React, { useState } from 'react';
import { Check, Settings, X } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';

export default function Notifications() {
  const notifications = useNotificationStore((state) => state.notifications);
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const markAllAsRead = useNotificationStore((state) => state.markAllAsRead);
  const [filter, setFilter] = useState('All');

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'Unread') return n.unread;
    if (filter === 'Orders') return n.type.startsWith('order');
    if (filter === 'System') return n.type === 'system';
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-left animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#1b2a49]">Notifications</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">Stay updated with corporate order alerts.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={markAllAsRead} className="inline-flex items-center gap-1.5 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-all cursor-pointer">
            <Check size={14} /> Mark all as read
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        {['All', 'Unread', 'Orders', 'System'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              filter === tab ? 'bg-[#1b2a49] text-white shadow-sm' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredNotifs.map((n) => (
          <div 
            key={n.id} 
            onClick={() => markAsRead(n.id)}
            className={`bg-white border border-slate-100 border-l-4 ${n.color} rounded-2xl p-5 flex justify-between items-start shadow-sm hover:shadow-md transition-all relative cursor-pointer`}
          >
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-lg shadow-inner">{n.icon}</div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#1b2a49]">{n.title}</h4>
                <p className="text-xs text-slate-500 font-medium max-w-xl">{n.desc}</p>
                <p className="text-[10px] text-slate-400 font-semibold pt-1">{n.time}</p>
              </div>
            </div>
            {n.unread && <span className="w-2 h-2 bg-blue-600 rounded-full absolute right-5 top-6"></span>}
          </div>
        ))}
      </div>
    </div>
  );
}