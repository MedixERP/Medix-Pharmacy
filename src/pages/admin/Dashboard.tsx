import React from 'react';
import { Users, Truck, Layers, ShoppingBag, AlertTriangle, ShieldAlert, ArrowUpRight } from 'lucide-react';

export default function AdminDashboard() {
  const cards = [
    { title: 'Active Users', count: '15', sub: '↑ 3 this week', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Suppliers', count: '12', sub: '9 active', icon: Truck, color: 'text-amber-500', bg: 'bg-amber-50' },
    { title: 'Drugs in System', count: '250', sub: '12 low stock', icon: Layers, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Active Orders', count: '23', sub: '5 pending', icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const activities = [
    { type: 'Drug Added', name: 'Panadol Extra', date: '2026-01-30, 10:30 AM', color: 'bg-emerald-50 text-emerald-700' },
    { type: 'Order Completed', name: 'Order #1024', date: '2026-01-30, 09:15 AM', color: 'bg-blue-50 text-blue-700' },
    { type: 'Low Stock Alert', name: 'Brufen 600mg', date: '2026-01-29, 05:45 PM', color: 'bg-amber-50 text-amber-700' },
    { type: 'Drug Updated', name: 'Augmentin 1g', date: '2026-01-29, 03:20 PM', color: 'bg-indigo-50 text-indigo-700' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Alerts Section */}
      <div className="space-y-3">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-2xl rounded-l-md flex items-center gap-3 shadow-xs">
          <AlertTriangle className="text-amber-600 flex-shrink-0" size={20} />
          <div>
            <span className="font-bold text-amber-800 uppercase text-xs block">WARNING:</span>
            <span className="text-sm text-amber-700 font-medium">12 drugs low stock in global system.</span>
          </div>
        </div>
        <div className="bg-rose-50 border-l-4 border-rose-500 p-4 rounded-r-2xl rounded-l-md flex items-center gap-3 shadow-xs">
          <ShieldAlert className="text-rose-600 flex-shrink-0" size={20} />
          <div>
            <span className="font-bold text-rose-800 uppercase text-xs block">CRITICAL:</span>
            <span className="text-sm text-rose-700 font-medium">3 users inactive for 30+ days. Action required.</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1b2a49]">Welcome back, System Admin! 👋</h1>
        <p className="text-xs text-slate-400 font-medium mt-1">Here's what's happening across your platform today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(27,42,73,0.02)] flex flex-col justify-between min-h-[140px]">
              <div className="flex items-start justify-between">
                <div className={`p-3 rounded-xl ${card.bg} ${card.color}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-2xl font-black text-[#1b2a49]">{card.count}</span>
                <h3 className="text-xs font-bold text-slate-400 mt-0.5">{card.title}</h3>
                <p className="text-[11px] font-bold text-emerald-600 mt-2 flex items-center gap-0.5">{card.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(27,42,73,0.02)] overflow-hidden">
        <div className="p-5 border-b border-slate-50">
          <h2 className="text-base font-bold text-[#1b2a49]">Recent System Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-slate-100 text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                <th className="py-3 px-6">Activity Type</th>
                <th className="py-3 px-6">Drug / User / Order Name</th>
                <th className="py-3 px-6">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm font-medium text-[#1b2a49]">
              {activities.map((act, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${act.color}`}>{act.type}</span>
                  </td>
                  <td className="py-4 px-6 font-bold">{act.name}</td>
                  <td className="py-4 px-6 text-slate-400 text-xs">{act.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}