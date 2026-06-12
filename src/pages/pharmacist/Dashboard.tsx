// src/pages/pharmacist/Dashboard.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pill, AlertTriangle, XCircle, ClipboardList, Clock, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function PharmacistDashboard() {
  const navigate = useNavigate();

  // داتا الكروت الإحصائية الأربعة العلوية بنسق الألوان الدقيق
  const stats = [
    { id: 1, title: 'Total Drugs in Inventory', value: '1,248', desc: 'All active products', color: 'text-blue-600', bgColor: 'bg-blue-50', icon: Pill },
    { id: 2, title: 'Low Stock Drugs', value: '14', desc: 'Needs reorder soon', color: 'text-amber-500', bgColor: 'bg-amber-50', icon: AlertTriangle },
    { id: 3, title: 'Out of Stock Drugs', value: '3', desc: 'Critical attention', color: 'text-red-500', bgColor: 'bg-red-50', icon: XCircle },
    { id: 4, title: 'Pending Orders', value: '7', desc: 'Awaiting supplier action', color: 'text-sky-500', bgColor: 'bg-sky-50', icon: ClipboardList },
  ];

  // داتا جدول مراقبة المخزون (Inventory Overview)
  const inventoryData = [
    { id: 'DRG-001', name: 'Panadol Extra', category: 'Analgesics', stock: 45, status: 'In Stock', statusColor: 'bg-green-50 text-green-700 border-green-200' },
    { id: 'DRG-002', name: 'Amoxicillin 500mg', category: 'Antibiotics', stock: 8, status: 'Low Stock', statusColor: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'DRG-003', name: 'Lipitor 20mg', category: 'Cardiovascular', stock: 0, status: 'Out of Stock', statusColor: 'bg-red-50 text-red-700 border-red-200' },
    { id: 'DRG-004', name: 'Metformin 850mg', category: 'Antidiabetic', stock: 120, status: 'In Stock', statusColor: 'bg-green-50 text-green-700 border-green-200' },
  ];

  // داتا الطلبيات الأخيرة الموجهة للموردين (Recent Orders)
  const recentOrders = [
    { id: 'ORD-9482', supplier: 'Eva Pharma', date: 'Today, 11:20 AM', amount: '$450.00', status: 'Pending', icon: Clock, iconColor: 'text-amber-500 bg-amber-50' },
    { id: 'ORD-9451', supplier: 'GlaxoSmithKline', date: 'Yesterday', amount: '$1,200.00', status: 'Approved', icon: CheckCircle2, iconColor: 'text-green-500 bg-green-50' },
    { id: 'ORD-9390', supplier: 'Pfizer Egypt', date: '08 Jun 2026', amount: '$850.00', status: 'Approved', icon: CheckCircle2, iconColor: 'text-green-500 bg-green-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* العناوين الأساسية للمحتوى الداخلي */}
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1b2a49] tracking-tight">Pharmacist Dashboard</h1>
        <p className="text-sm text-slate-400 font-medium">Real-time inventory levels, critical alerts, and supplier procurement tracking.</p>
      </div>

      {/* أولاً: الكروت الإحصائية الأربعة العلوية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="glass-light p-6 rounded-2xl flex flex-col justify-between min-h-[160px] border border-slate-100">
              <div className="flex items-center justify-between">
                <div className={`p-2.5 ${stat.bgColor} ${stat.color} rounded-xl`}>
                  <Icon size={20} />
                </div>
                <span className={`text-[11px] font-bold ${stat.color} px-2 py-0.5 rounded-full ${stat.bgColor}`}>
                  {stat.desc}
                </span>
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">{stat.title}</p>
                <p className="text-3xl font-black text-[#1b2a49]">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ثانياً: شاشات وجداول العرض المقسمة (Layout Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* جدول مراقبة المخزون (Inventory Overview) */}
        <div className="lg:col-span-2 glass-light rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#1b2a49]">Inventory Overview</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Quick lookup at drugs stock conditions.</p>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors">
              View All Stock <ArrowUpRight size={14} />
            </button>
          </div>

          {/* هيكل الجدول المتجاوب */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 font-semibold">Drug Name</th>
                  <th className="pb-3 font-semibold">Category</th>
                  <th className="pb-3 font-semibold">Stock Qty</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50/60">
                {inventoryData.map((drug) => (
                  <tr key={drug.id} className="group hover:bg-slate-50/40 transition-colors">
                    <td className="py-3.5">
                      <div className="font-bold text-[#1b2a49] text-sm">{drug.name}</div>
                      <div className="text-[11px] text-slate-400 font-medium mt-0.5">{drug.id}</div>
                    </td>
                    <td className="py-3.5 text-sm text-slate-500 font-medium">{drug.category}</td>
                    <td className="py-3.5 text-sm font-bold text-[#1b2a49]">{drug.stock} units</td>
                    <td className="py-3.5 text-right">
                      <span className={`inline-flex items-center text-xs font-bold px-2.5 py-1 rounded-full border ${drug.statusColor}`}>
                        {drug.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* كارت الطلبيات الأخيرة (Recent Orders) */}
        <div className="glass-light rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#1b2a49]">Recent Orders</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Orders sent to suppliers.</p>
            </div>
          </div>

          {/* قائمة عرض الأنشطة والطلبيات */}
          <div className="space-y-4">
            {recentOrders.map((order) => {
              const StatusIcon = order.icon;
              return (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50/60 transition-all border border-transparent hover:border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl shrink-0 ${order.iconColor}`}>
                      <StatusIcon size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#1b2a49]">{order.supplier}</h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium mt-0.5">
                        <span>{order.id}</span>
                        <span className="text-slate-300">•</span>
                        <span>{order.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-extrabold text-[#1b2a49]">{order.amount}</div>
                    <span className={`text-[10px] font-extrabold uppercase tracking-wide mt-0.5 block ${order.status === 'Pending' ? 'text-amber-500' : 'text-green-500'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
} // <--- القوس ده اللي كان ناقص وموقف الأوكس والـ Vite بالكامل!