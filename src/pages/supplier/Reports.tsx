// src/pages/supplier/Reports.tsx
import React from 'react';
import { Calendar, Download, TrendingUp, ShoppingBag, BarChart3, Star } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import SEOHead from '../../components/shared/SEOHead';
import { StatCard } from '../../components/ui/StatCard';

const revenueData = [
  { name: 'Jan', revenue: 45000 },
  { name: 'Feb', revenue: 52000 },
  { name: 'Mar', revenue: 48000 },
  { name: 'Apr', revenue: 61000 },
  { name: 'May', revenue: 58000 },
  { name: 'Jun', revenue: 72000 },
];

const topProducts = [
  { name: 'Panadol', value: 25000, color: '#3b82f6' },
  { name: 'Brufen', value: 18000, color: '#60a5fa' },
  { name: 'Augmentin', value: 14000, color: '#93c5fd' },
];

const pharmacyPieData = [
  { name: 'Smart Pharmacy', value: 45, color: '#2563eb' },
  { name: 'Al-Ezaby', value: 32, color: '#3b82f6' },
  { name: 'Seif Pharmacy', value: 18, color: '#10b981' },
];

export default function AnalyticsReports() {
  return (
    <div className="space-y-6">
      <SEOHead title="Analytics & Business Reports" description="Comprehensive overview of revenue trends, top-selling drugs, and client demographics." />
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-left">
        <div>
          <h1 className="text-2xl font-bold text-[#1b2a49]">Analytics & Reports</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">View your corporate business performance statistics.</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 shadow-sm hover:bg-slate-50 transition-all">
            <Calendar size={14} /> Last 6 months
          </button>
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-all">
            <Download size={14} /> Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid using Reusable Component */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value="304,000" subText="EGP" valueColor="text-emerald-500" icon={<TrendingUp size={16} />} />
        <StatCard label="Orders Fulfilled" value="156" valueColor="text-blue-600" icon={<ShoppingBag size={16} />} />
        <StatCard label="Growth Rate" value="+18%" valueColor="text-amber-500" icon={<BarChart3 size={16} />} />
        <StatCard label="Avg Rating" value="4.7" valueColor="text-amber-400" icon={<Star size={16} />} />
      </section>

      {/* Main Charts Architecture */}
      <section className="glass-light p-6 rounded-3xl space-y-4 text-left border border-white/60">
        <h3 className="text-sm font-bold text-[#1b2a49]">Revenue Over Time</h3>
        <div className="h-64 w-full text-xs">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <section className="glass-light p-6 rounded-3xl space-y-4 border border-white/60">
          <h3 className="text-sm font-bold text-[#1b2a49]">Top Products by Revenue</h3>
          <div className="h-48 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false}/>
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {topProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="glass-light p-6 rounded-3xl space-y-4 border border-white/60">
          <h3 className="text-sm font-bold text-[#1b2a49]">Orders by Pharmacy Distribution</h3>
          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pharmacyPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={4}>
                  {pharmacyPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </div>
  );
}