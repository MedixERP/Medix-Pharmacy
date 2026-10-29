// src/pages/supplier/Reports.tsx
import React from 'react';
import { Calendar, Download } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from 'recharts';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'; // استيراد مكتبة الـ Excel
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
  { name: 'Panadol', value: 25000, color: '#0093B7' }, 
  { name: 'Brufen', value: 18000, color: '#22C55E' },  
  { name: 'Augmentin', value: 14000, color: '#F59E0B' }, 
  { name: 'Voltaren', value: 11000, color: '#94A3B8' },  
  { name: 'Nexium', value: 9000, color: '#64748B' },     
];

const pharmacyPieData = [
  { name: 'Smart Pharmacy', value: 45, color: '#0093B7' },
  { name: 'Al-Ezaby', value: 32, color: '#22C55E' },
  { name: 'Seif Pharmacy', value: 23, color: '#F59E0B' },
];

export default function AnalyticsReports() {
  
  // دالة تصدير وتحميل ملف Excel حقيقي مطور
  const handleExportReport = () => {
    Swal.fire({
      title: 'Generating Excel Report...',
      text: 'Please wait while we compile the sheets.',
      icon: 'info',
      allowOutsideClick: false,
      showConfirmButton: false,
      timer: 1500,
      willOpen: () => {
        Swal.showLoading();
      }
    }).then(() => {
      // 1. إنشاء كتاب عمل جديد (Workbook)
      const workbook = XLSX.utils.book_new();

      // 2. تحويل بيانات الأرباح إلى شيت Excel
      const revenueSheetData = revenueData.map(item => ({
        'Month': item.name,
        'Revenue (EGP)': item.revenue
      }));
      const worksheet1 = XLSX.utils.json_to_sheet(revenueSheetData);
      XLSX.utils.book_append_sheet(workbook, worksheet1, 'Revenue Overview');

      // 3. تحويل بيانات المنتجات الأكثر مبيعاً إلى شيت Excel ثانٍ
      const productsSheetData = topProducts.map(item => ({
        'Product Name': item.name,
        'Total Sales (EGP)': item.value
      }));
      const worksheet2 = XLSX.utils.json_to_sheet(productsSheetData);
      XLSX.utils.book_append_sheet(workbook, worksheet2, 'Top Products');

      // 4. تحميل وتحفيظ ملف الـ Excel في جهاز المستخدم فوراُ
      XLSX.writeFile(workbook, 'PharmaDash_Business_Report.xlsx');

      // 5. إشعار النجاح النهائي
      Swal.fire({
        title: 'Downloaded!',
        text: 'Your Excel business report has been downloaded successfully.',
        icon: 'success',
        confirmButtonColor: '#0093B7'
      });
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-left relative pb-10 px-4 md:px-0">
      <SEOHead 
        title="Analytics & Business Reports" 
        description="Comprehensive overview of revenue trends, top-selling drugs, and client demographics." 
      />
      
      {/* 1. الترحيب والهيدر المنسق والمطابق للفيجما بالظبط */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-slate-100 pb-5 select-none">
        <div>
          <h1 
            className="text-[24px] md:text-[30px] font-bold text-[#1B2A49] md:leading-[42px] tracking-[0px]"
            style={{ fontFamily: '"SF Pro Rounded", sans-serif', fontWeight: 700 }}
          >
            Reports & Analytics
          </h1>
          <p 
            className="text-[13px] md:text-[15px] font-normal text-[#7F8C8D] md:leading-[22.5px] tracking-[0px] mt-[8px]"
            style={{ fontFamily: '"SF Pro Rounded", sans-serif', fontWeight: 400 }}
          >
            View insights and generate reports
          </p>
        </div>
        
        {/* أزرار التحكم المتجاوبة */}
        <div className="flex gap-2 h-fit w-full sm:w-auto">
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition-all cursor-pointer">
            <Calendar size={14} className="text-slate-400" /> 
            <span>Last 6 months</span>
          </button>
          
          <button 
            onClick={handleExportReport}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-[0_4px_12px_rgba(59,129,183,0.25)] hover:opacity-95 active:scale-95 transition-all cursor-pointer border border-transparent"
            style={{ background: 'linear-gradient(135deg, #0093B7 0%, #3B81B7 100%)' }}
          >
            <Download size={14} /> 
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* 2. شبكة كروت الإحصائيات الأربعة (تم إزالة الـ Icons لتكون سادة تماماً مثل الفيجما) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 select-none">
        <StatCard label="Total Revenue" value="304,000" subText="EGP" valueColor="text-green-500" />
        <StatCard label="Orders Fulfilled" value="156" valueColor="text-cyan-600" />
        <StatCard label="Growth Rate" value="+18%" valueColor="text-amber-500" />
        <StatCard label="Avg Rating" value="4.7" subText="/5.0" valueColor="text-amber-500" />
      </section>

      {/* 3. حاوية الرسم البياني الرئيسي للمبيعات (Revenue Over Time) */}
      <section className="glass-light p-6 rounded-2xl space-y-4 text-left border border-slate-100 bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)]">
        <h3 className="text-xl font-bold text-slate-700" style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}>
          Revenue Over Time
        </h3>
        <div className="h-64 w-full text-xs font-semibold">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0093B7" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3B81B7" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ stroke: '#0093B7', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="revenue" stroke="#0093B7" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" className="cursor-pointer" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 4. الرسوم البيانية الفرعية المقسمة هندسياً مع تفعيل cursor-pointer على الأعمدة */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        
        {/* منتجات الأعلي مبيعاً */}
        <section className="glass-light p-6 rounded-2xl space-y-4 border border-slate-100 bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)]">
          <h3 className="text-xl font-bold text-slate-700" style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}>
            Top Products by Revenue
          </h3>
          <div className="h-56 w-full text-xs font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false}/>
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={38}>
                  {topProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} className="cursor-pointer hover:opacity-85 transition-opacity" />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* توزيع نسب الصيدليات الشريكة */}
        <section className="glass-light p-6 rounded-2xl space-y-4 border border-slate-100 bg-white shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)]">
          <h3 className="text-xl font-bold text-slate-700" style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}>
            Orders by Pharmacy
          </h3>
          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pharmacyPieData} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  innerRadius={60} 
                  outerRadius={80} 
                  paddingAngle={4}
                >
                  {pharmacyPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} className="cursor-pointer hover:opacity-85 transition-opacity" />
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