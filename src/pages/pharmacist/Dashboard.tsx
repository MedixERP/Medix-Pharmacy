// src/pages/pharmacist/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Pill, AlertTriangle, XCircle, Clock, Plus, ClipboardList, ShoppingCart, Edit2 } from 'lucide-react';

export default function PharmacistDashboard() {
  const navigate = useNavigate();

  const stats = [
    { id: 1, title: 'Total Drugs in Inventory', value: '248', desc: 'All products', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: Pill },
    { id: 2, title: 'Low Stock Drugs', value: '12', desc: 'Needs attention', color: 'text-amber-500', bgColor: 'bg-amber-50', icon: AlertTriangle },
    { id: 3, title: 'Out of Stock Drugs', value: '5', desc: 'Critical', color: 'text-red-500', bgColor: 'bg-red-50', icon: XCircle },
    { id: 4, title: 'Pending Purchase Orders', value: '8', desc: 'In progress', color: 'text-sky-500', bgColor: 'bg-sky-50', icon: ClipboardList },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* بنر التنبيهات العاجل */}
      <div className="bg-[#FFF5F5] border-l-4 border-[#E74C3C] p-4 rounded-r-2xl flex items-start gap-3">
        <AlertCircle className="text-[#E74C3C] shrink-0 mt-0.5" size={20} />
        <div>
          <h5 className="text-xs font-extrabold text-[#E74C3C] uppercase tracking-wider">Urgent:</h5>
          <p className="text-sm font-semibold text-[#1b2a49] mt-0.5">3 drugs out of stock | 5 drugs expiring this week</p>
        </div>
      </div>

      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1b2a49] tracking-tight">Pharmacist Dashboard</h1>
        <p className="text-sm text-slate-400 font-medium">Welcome back! Manage your drugs and scan prescriptions seamlessly.</p>
      </div>

      {/* الكروت الإحصائية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="glass-light p-6 rounded-2xl flex flex-col justify-between min-h-[160px] hover:scale-[1.01] transition-all">
              <div className="flex items-center justify-between">
                <div className={`p-2.5 ${stat.bgColor} ${stat.color} rounded-xl`}><Icon size={20} /></div>
                <span className={`text-[11px] font-bold ${stat.color} px-2 py-0.5 rounded-full ${stat.bgColor}`}>{stat.desc}</span>
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase">{stat.title}</p>
                <p className="text-3xl font-black text-[#1b2a49]">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* الإجراءات السريعة - Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-[#1b2a49]">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button onClick={() => navigate('/pharmacist/search')} className="glass-light p-6 rounded-2xl flex items-center gap-4 text-left hover:border-blue-400 hover:shadow-xs transition-all group cursor-pointer w-full">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all"><Pill size={24} /></div>
            <div>
              <h4 className="font-bold text-[#1b2a49] group-hover:text-blue-600">Manage Drugs</h4>
              <p className="text-xs text-slate-400 font-medium mt-1">Add, edit, or remove drugs</p>
            </div>
          </button>

          <button onClick={() => navigate('/pharmacist/search')} className="glass-light p-6 rounded-2xl flex items-center gap-4 text-left hover:border-amber-400 hover:shadow-xs transition-all group cursor-pointer w-full">
            <div className="p-4 bg-amber-50 text-amber-500 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-all"><ClipboardList size={24} /></div>
            <div>
              <h4 className="font-bold text-[#1b2a49] group-hover:text-amber-500">Check Inventory</h4>
              <p className="text-xs text-slate-400 font-medium mt-1">Monitor stock levels</p>
            </div>
          </button>

          <button onClick={() => navigate('/pharmacist/scan')} className="glass-light p-6 rounded-2xl flex items-center gap-4 text-left hover:border-indigo-400 hover:shadow-xs transition-all group cursor-pointer w-full">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all"><ShoppingCart size={24} /></div>
            <div>
              <h4 className="font-bold text-[#1b2a49] group-hover:text-indigo-600">Scan Prescription</h4>
              <p className="text-xs text-slate-400 font-medium mt-1">Process new patient orders</p>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
}