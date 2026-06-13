// src/pages/supplier/Drugs.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pill, Edit2, Search, SlidersHorizontal, Trash2 } from 'lucide-react';
import SEOHead from '../../components/shared/SEOHead';

// داتا الأدوية المتطابقة مع الصورة وجاهزة للباك إند
const initialDrugs = [
  { id: 'DRG-001', name: 'Panadol', category: 'Painkiller', price: '10.00 EGP', stock: 5000, status: 'Available' },
  { id: 'DRG-002', name: 'Brufen', category: 'Anti-inflammatory', price: '17.50 EGP', stock: 3200, status: 'Available' },
  { id: 'DRG-003', name: 'Augmentin', category: 'Antibiotic', price: '42.00 EGP', stock: 0, status: 'Out of Stock' },
  { id: 'DRG-004', name: 'Voltaren', category: 'Pain Relief', price: '25.00 EGP', stock: 1500, status: 'Available' },
  { id: 'DRG-005', name: 'Nexium', category: 'Gastric', price: '38.00 EGP', stock: 2100, status: 'Available' },
];

export default function DrugsCatalog() {
  const navigate = useNavigate();
  const [drugs, setOrders] = useState(initialDrugs);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { name: 'All', count: drugs.length },
    { name: 'Available', count: drugs.filter(d => d.status === 'Available').length },
    { name: 'Out of Stock', count: drugs.filter(d => d.status === 'Out of Stock').length },
  ];

  // دالة الحذف التجريبية (أكشن جاهز للباك إند)
  const handleDeleteDrug = (id: string) => {
    if(window.confirm('Are you sure you want to remove this drug from catalog?')) {
      setOrders(prev => prev.filter(d => d.id !== id));
    }
  };

  // معالجة الفلترة والبحث معاً ديناميكياً
  const filteredDrugs = drugs.filter(d => {
    const matchesTab = activeTab === 'All' || d.status === activeTab;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-left relative pb-10">
      <SEOHead 
        title="Drugs Catalog" 
        description="Manage your available pharmaceutical products, pricing, and stock levels." 
      />

      {/* ================= 1. الهيدر والوصف وزر الإضافة بالـ Gradient المخصص ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 select-none">
        <div>
          <h1 
            className="text-[24px] md:text-[30px] font-bold text-[#1B2A49] md:leading-[42px] tracking-[0px]"
            style={{ fontFamily: '"SF Pro Rounded", sans-serif', fontWeight: 700 }}
          >
            Drags Catalog
          </h1>
          <p 
            className="text-[13px] md:text-[15px] font-normal text-[#7F8C8D] md:leading-[22.5px] tracking-[0px] mt-[8px]"
            style={{ fontFamily: '"SF Pro Rounded", sans-serif', fontWeight: 400 }}
          >
            Your available products
          </p>
        </div>

        {/* زرار الإضافة الفاخر المتطابق مع لون الـ Linear Gradient المطلوب بالملي */}
        <button
          onClick={() => navigate('/supplier/drugs/add')}
          className="flex items-center justify-center gap-2 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all transform active:scale-95 shadow-[0_4px_15px_rgba(59,129,183,0.3)] hover:opacity-95 cursor-pointer h-fit whitespace-nowrap"
          style={{ background: 'linear-gradient(135deg, #3B81B7 0%, #5B9FD7 100%)' }}
        >
          <Plus size={16} />
          <span>Add Product</span>
        </button>
      </div>

      {/* ================= 2. أدوات التحكم (البحث الذكي + الفلاتر التبويبية) ================= */}
      <div className="space-y-4">
        {/* شريط البحث المطور المدمج */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
          <input 
            type="text" 
            placeholder="Search drugs by name, category, or ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200/80 rounded-xl py-2.5 pl-11 pr-4 text-sm text-[#1b2a49] placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-all shadow-2xs font-medium"
          />
        </div>

        {/* أزرار الفلترة التبويبية المتطابقة مع الصورة */}
        <div className="flex gap-2 overflow-x-auto pb-1 select-none scrollbar-none">
          {tabs.map(tab => (
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
              {tab.name} {tab.count > 0 && `(${tab.count})`}
            </button>
          ))}
        </div>
      </div>

      {/* ================= 3. الحاوية المتجاوبة (الجدول / الكروت الكرتونية) ================= */}
      <div className="glass-light rounded-2xl overflow-hidden border border-white/60 shadow-sm bg-white">
        
        {/* 📱 أ: كروت الموبايل والتابلت (تظهر تلقائياً في الشاشات الصغيرة وتختفي في الـ Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 md:hidden select-none">
          {filteredDrugs.length > 0 ? (
            filteredDrugs.map((drug) => (
              <div 
                key={drug.id}
                className="p-5 rounded-2xl bg-white border border-slate-100 shadow-2xs flex flex-col justify-between space-y-4 hover:border-blue-200 transition-all"
              >
                <div className="flex items-center justify-between">
                  {/* أيكون كرتوني دائري واخذ الـ Linear Gradient المطلوبة وبنسبة 50% */}
                  <div 
                    className="w-10 h-10 text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-xs"
                    style={{ background: 'linear-gradient(135deg, #3B81B7 0%, #5B9FD7 100%)' }}
                  >
                    <Pill size={16} />
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
                    drug.status === 'Available' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100/40' : 'bg-rose-50 text-rose-500 border border-rose-100/40'
                  }`}>{drug.status}</span>
                </div>

                <div>
                  <h4 className="font-bold text-[#1b2a49] text-base truncate">{drug.name}</h4>
                  <p className="text-xs text-slate-400 font-semibold mt-0.5">{drug.category}</p>
                  <p className="text-[11px] text-blue-600 font-bold mt-1 tracking-tight">{drug.id}</p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-50 pt-3 text-xs">
                  <div>
                    <p className="text-[#7F8C8D]" style={{ fontFamily: 'SF Pro Rounded', fontWeight: 400, fontSize: '13px' }}>Price: <b className="text-emerald-600 font-bold">{drug.price}</b></p>
                    <p className="text-slate-500 font-bold mt-0.5">📦 Stock: {drug.stock.toLocaleString()} units</p>
                  </div>
                  
                  {/* أزرار التحكم بالكارد */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => navigate(`/supplier/drugs/edit/${drug.id}`)}
                      className="p-2.5 bg-slate-50 text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-slate-100 rounded-xl transition-all"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      onClick={() => handleDeleteDrug(drug.id)}
                      className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-10 text-center text-xs font-bold text-slate-400">No drugs found matching your criteria.</div>
          )}
        </div>

        {/* 💻 ب: تصميم الجدول الاحترافي المطابق للصورة تماماً (مخفي في الموبايل والتابلت) */}
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-left border-collapse">
            <thead>
              {/* تنسيق هيدر الجدول بالخلفية الرمادية #7F8C8D والـ Typography المطلوبة بالملي */}
              <tr 
                className="border-b border-slate-200 text-white select-none"
                style={{
                  background: '#7F8C8D',
                  fontFamily: 'SF Pro Rounded',
                  fontWeight: 700,
                  fontSize: '13px',
                  lineHeight: '20px',
                  letterSpacing: '0px',
                  textTransform: 'uppercase'
                }}
              >
                <th className="py-4 px-6 font-bold">Product Name</th>
                <th className="py-4 px-6 font-bold">Category</th>
                <th className="py-4 px-6 font-bold">Unit Price</th>
                <th className="py-4 px-6 font-bold">Available Stock</th>
                <th className="py-4 px-6 font-bold">Status</th>
                <th className="py-4 px-6 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60 text-xs font-medium">
              {filteredDrugs.length > 0 ? (
                filteredDrugs.map((drug) => (
                  <tr key={drug.id} className="hover:bg-slate-50/40 transition-colors duration-150">
                    
                    {/* اسم المنتج + الأيكون الأزرق الفاتح المدور المحاكي للرسمة */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-blue-500 flex items-center justify-center shrink-0 shadow-2xs">
                          <Pill size={14} />
                        </div>
                        <div>
                          <span className="font-bold text-[#1b2a49] text-[14px] block">{drug.name}</span>
                          <span className="text-[10px] text-slate-400 font-semibold tracking-wide block mt-0.5">{drug.id}</span>
                        </div>
                      </div>
                    </td>

                    {/* الفئة المحددة بدقة واللون الرمادي الخاص بها */}
                    <td className="py-4 px-6 text-[#7F8C8D]" style={{ fontFamily: 'SF Pro Rounded', fontWeight: 400, fontSize: '14px', lineHeight: '21px' }}>
                      {drug.category}
                    </td>

                    {/* سعر الوحدة باللون الأخضر البولد والخط المتناسق كالصورة */}
                    <td className="py-4 px-6 font-bold text-emerald-600 text-[14px]">
                      {drug.price}
                    </td>

                    {/* المخزون المتاح بوحدات واضحة */}
                    <td className="py-4 px-6 text-[#1b2a49] font-bold text-[13px]">
                      {drug.stock.toLocaleString()} units
                    </td>

                    {/* البادج الملون للحالات حسب التوفر */}
                    <td className="py-4 px-6">
                      <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-lg ${
                        drug.status === 'Available' ? 'bg-emerald-50 text-emerald-500 border border-emerald-100/40' : 'bg-rose-50 text-rose-500 border border-rose-100/40'
                      }`}>{drug.status}</span>
                    </td>

                    {/* الأكشنز: زرار التعديل الصغير والأنيق جداً كالصورة، مع إضافة زرار الحذف للحماية */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => navigate(`/supplier/drugs/edit/${drug.id}`)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button 
                          onClick={() => handleDeleteDrug(drug.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-xs font-bold text-slate-400 select-none">No pharmaceutical products found matching criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}