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
  { name: 'Panadol', value: 25000, color: '#3B81B7' },
  { name: 'Brufen', value: 18000, color: '#5B9FD7' },
  { name: 'Augmentin', value: 14000, color: '#1B2A49' },
];

const pharmacyPieData = [
  { name: 'Smart Pharmacy', value: 45, color: '#3B81B7' },
  { name: 'Al-Ezaby', value: 32, color: '#5B9FD7' },
  { name: 'Seif Pharmacy', value: 18, color: '#1B2A49' },
];

export default function AnalyticsReports() {
  
  // دالة تصدير التقارير (جاهزة للتوصيل بالباك إند)
  const handleExportReport = () => {
    console.log('Fetching financial and order logs from backend...');
    console.log('Generating Excel/PDF corporate business report Payload...');
    alert('Your business report has been compiled and downloaded successfully!');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-left relative pb-10">
      <SEOHead 
        title="Analytics & Business Reports" 
        description="Comprehensive overview of revenue trends, top-selling drugs, and client demographics." 
      />
      
      {/* 1. الترحيب والهيدر بـ الستايل الموحد والمسافة الـ 8px بالملي */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-slate-100 pb-5 select-none">
        <div>
          <h1 
            className="text-[24px] md:text-[30px] font-bold text-[#1B2A49] md:leading-[42px] tracking-[0px]"
            style={{ fontFamily: '"SF Pro Rounded", sans-serif', fontWeight: 700 }}
          >
            Analytics & Reports
          </h1>
          <p 
            className="text-[13px] md:text-[15px] font-normal text-[#7F8C8D] md:leading-[22.5px] tracking-[0px] mt-[8px]"
            style={{ fontFamily: '"SF Pro Rounded", sans-serif', fontWeight: 400 }}
          >
            View your corporate business performance statistics.
          </p>
        </div>
        
        {/* أزرار الأكشنز والتحكم مع تطبيق الـ Gradient الفخم لزر التصدير */}
        <div className="flex gap-2 h-fit">
          <button className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer">
            <Calendar size={14} className="text-slate-400" /> 
            <span>Last 6 months</span>
          </button>
          
          <button 
            onClick={handleExportReport}
            className="inline-flex items-center gap-2 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-[0_4px_12px_rgba(59,129,183,0.25)] hover:opacity-95 active:scale-95 transition-all cursor-pointer border border-transparent"
            style={{ background: 'linear-gradient(135deg, #3B81B7 0%, #5B9FD7 100%)' }}
          >
            <Download size={14} /> 
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 2. شبكة كروت الإحصائيات الأربعة (Stats Grid) */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 select-none">
        <StatCard label="Total Revenue" value="304,000" subText="EGP" valueColor="text-emerald-500" icon={<TrendingUp size={16} />} />
        <StatCard label="Orders Fulfilled" value="156" valueColor="text-blue-600" icon={<ShoppingBag size={16} />} />
        <StatCard label="Growth Rate" value="+18%" valueColor="text-amber-500" icon={<BarChart3 size={16} />} />
        <StatCard label="Avg Rating" value="4.7" valueColor="text-amber-400" icon={<Star size={16} />} />
      </section>

      {/* 3. حاوية الرسم البياني الرئيسي للمبيعات (Revenue Over Time) */}
      <section className="glass-light p-6 rounded-3xl space-y-4 text-left border border-slate-100 bg-white shadow-2xs">
        <h3 className="text-sm font-bold text-[#1b2a49]" style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}>
          Revenue Over Time
        </h3>
        <div className="h-64 w-full text-xs font-semibold">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B81B7" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#5B9FD7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#3B81B7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 4. الرسوم البيانية الفرعية المقسمة هندسياً */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        
        {/* منتجات الأعلي مبيعاً */}
        <section className="glass-light p-6 rounded-3xl space-y-4 border border-slate-100 bg-white shadow-2xs">
          <h3 className="text-sm font-bold text-[#1b2a49]" style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}>
            Top Products by Revenue
          </h3>
          <div className="h-48 w-full text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false}/>
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={38}>
                  {topProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* توزيع نسب الصيدليات الشريكة */}
        <section className="glass-light p-6 rounded-3xl space-y-4 border border-slate-100 bg-white shadow-2xs">
          <h3 className="text-sm font-bold text-[#1b2a49]" style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}>
            Orders by Pharmacy Distribution
          </h3>
          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pharmacyPieData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={55} 
                  outerRadius={75} 
                  paddingAngle={5}
                >
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