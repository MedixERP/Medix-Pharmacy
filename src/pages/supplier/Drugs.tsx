// src/pages/supplier/Drugs.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2 } from 'lucide-react';
import SEOHead from '../../components/shared/SEOHead';
import { DataTable } from '../../components/shared/DataTable'; // تأكدي من صحة مسار الـ DataTable المشترك في مشروعك

// داتا الأدوية والمنتجات المتطابقة مع الفيجما والصورة الصريحة لـ PharmaDash
const initialDrugs = [
  { id: 'D-001', name: 'Panadol', category: 'Painkiller', price: '10.00 EGP', stock: '5,000 units', status: 'Available' },
  { id: 'D-002', name: 'Brufen', category: 'Anti-inflammatory', price: '17.50 EGP', stock: '3,200 units', status: 'Available' },
  { id: 'D-003', name: 'Augmentin', category: 'Antibiotic', price: '42.00 EGP', stock: '0 units', status: 'Out of Stock' },
  { id: 'D-004', name: 'Voltaren', category: 'Pain Relief', price: '25.00 EGP', stock: '1,500 units', status: 'Available' },
  { id: 'D-005', name: 'Nexium', category: 'Gastric', price: '38.00 EGP', stock: '2,100 units', status: 'Available' },
];

export default function DrugsCatalog() {
  const navigate = useNavigate();
  const [drugs] = useState(initialDrugs);
  const [filter, setFilter] = useState('All');

  // إعدادات الـ Pagination المحلية الخاصة بالـ DataTable المشترك
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // الفلترة بناءً على التبويبات المحددة في الفيجما (All, Available, Out of Stock)
  const filteredDrugs = drugs.filter(d => {
    if (filter === 'All') return true;
    return d.status === filter;
  });

  // حسابات الـ Pagination الدقيقة لتمريرها للمكون
  const totalPages = Math.ceil(filteredDrugs.length / itemsPerPage);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentDrugs = filteredDrugs.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  // عناوين أعمدة الجدول المتطابقة تماماً مع الـ Table Header الخاص بالفيجما
  const tableHeaders = [
    'Product Name',
    'Category',
    'Unit Price',
    'Available Stock',
    'Status',
    'Actions'
  ];

  // 📱 أ: بناء كارت الموبايل المتجاوب والأنيق لكتالوج الأدوية
  const renderMobileCard = (drug: typeof initialDrugs[0]) => (
    <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-2xs flex flex-col justify-between space-y-4 hover:border-blue-200 transition-all">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 bg-sky-100 rounded-2xl flex justify-center items-center shadow-inner">
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <g clip-path="url(#clip0_58_42)">
    <path d="M8.74984 17.0832L17.0832 8.74984C17.4726 8.36823 17.7825 7.91322 17.9949 7.41111C18.2074 6.90899 18.3182 6.36975 18.3209 5.82454C18.3237 5.27934 18.2183 4.739 18.0109 4.23477C17.8036 3.73054 17.4983 3.27242 17.1128 2.8869C16.7273 2.50137 16.2691 2.1961 15.7649 1.98873C15.2607 1.78136 14.7203 1.67601 14.1751 1.67876C13.6299 1.68152 13.0907 1.79232 12.5886 2.00478C12.0865 2.21723 11.6314 2.52711 11.2498 2.91651L2.91651 11.2498C2.52711 11.6314 2.21723 12.0865 2.00478 12.5886C1.79232 13.0907 1.68152 13.6299 1.67876 14.1751C1.67601 14.7203 1.78136 15.2607 1.98873 15.7649C2.1961 16.2691 2.50137 16.7273 2.8869 17.1128C3.27242 17.4983 3.73054 17.8036 4.23477 18.0109C4.739 18.2183 5.27934 18.3237 5.82454 18.3209C6.36975 18.3182 6.90899 18.2074 7.41111 17.9949C7.91322 17.7825 8.36823 17.4726 8.74984 17.0832Z" stroke="#3B81B7" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.08301 7.0835L12.9163 12.9168" stroke="#3B81B7" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_58_42">
      <rect width="20" height="20" fill="white"/>
    </clipPath>
  </defs>
</svg>
        </div>
        <span className={`text-[11px] font-bold px-3 py-1.5 rounded-[10px] inline-flex justify-center items-center ${
          drug.status === 'Available' ? 'bg-green-100 text-green-500' : 'bg-pink-100 text-red-500'
        }`}>
          {drug.status}
        </span>
      </div>

      <div>
        <h4 className="font-bold text-[#1b2a49] text-base font-['SF_Pro_Rounded']">{drug.name}</h4>
        <p className="text-xs text-slate-400 font-normal font-['SF_Pro_Rounded'] mt-0.5">Category: {drug.category}</p>
      </div>

      <div className="flex items-center justify-between border-t border-slate-50 pt-3 text-xs">
        <div>
          <p className="text-slate-700 font-bold font-['SF_Pro_Rounded']">📦 Stock: {drug.stock}</p>
          <p className="text-green-500 font-bold text-sm font-['SF_Pro_Rounded'] mt-1">{drug.price}</p>
        </div>
        
        <button 
          type="button"
          onClick={() => navigate(`/supplier/drugs/edit/${drug.id}`)}
          className="p-2.5 bg-slate-50 text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-100 rounded-xl transition-all cursor-pointer"
        >
          <Edit2 size={14} />
        </button>
      </div>
    </div>
  );

  // 💻 ب: بناء أسطر الجدول لـ الديسكتوب بمسافات وأيقونات الفيجما المحددة (h-20)
  const renderTableRow = (drug: typeof initialDrugs[0]) => (
    <tr key={drug.id} className="hover:bg-slate-50/40 transition-colors duration-150 h-20">
      {/* Product Name مع حاوية أيقونة الكبسولة الزرقاء بالمللي */}
      <td className="pl-6 pr-4">
        <div className="inline-flex justify-start items-center gap-3 h-10">
          <div className="w-10 h-10 bg-sky-100 rounded-2xl flex justify-center items-center shadow-xs">
            {/* أيقونة الكبسولة الدقيقة من الفيجما */}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-cyan-600 stroke-[2.5]">
              <path d="m10.5 7.5 6 6M7.5 10.5l6 6M6.5 12.5a5.657 5.657 0 1 1 8-8l3 3a5.657 5.657 0 1 1-8 8Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="text-slate-700 text-base font-bold font-['SF_Pro_Rounded'] leading-6 whitespace-nowrap">
            {drug.name}
          </span>
        </div>
      </td>

      {/* Category */}
      <td className="pl-6 pr-4 text-gray-500 text-sm font-normal font-['SF_Pro_Rounded'] leading-5 whitespace-nowrap">
        {drug.category}
      </td>

      {/* Unit Price */}
      <td className="pl-[27px] pr-4 text-green-500 text-sm font-bold font-['SF_Pro_Rounded'] leading-5 whitespace-nowrap">
        {drug.price}
      </td>

      {/* Available Stock */}
      <td className="pl-[45.06px] pr-4 text-slate-700 text-sm font-bold font-['SF_Pro_Rounded'] leading-5 whitespace-nowrap">
        {drug.stock}
      </td>

      {/* Status Badge */}
      <td className="pl-[30px] pr-4">
        <span className={`h-7 px-3 py-1.5 rounded-[10px] inline-flex justify-center items-center text-xs font-normal font-['SF_Pro_Rounded'] leading-5 whitespace-nowrap ${
          drug.status === 'Available' ? 'bg-green-100 text-green-500' : 'bg-pink-100 text-red-500'
        }`}>
          {drug.status}
        </span>
      </td>

      {/* Actions (زر التعديل الـ Edit الأنيق والمتناسق) */}
      <td className="text-center pr-4">
        <div className="inline-flex justify-center items-center w-full h-9">
          <button 
            type="button"
            onClick={() => navigate(`/supplier/drugs/edit/${drug.id}`)}
            className="w-9 h-9 rounded-[10px] flex justify-center items-center text-slate-500 hover:text-cyan-600 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <Edit2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-left relative pb-10">
      <SEOHead 
        title="Drugs Catalog" 
        description="Manage your available pharmaceutical products, pricing, and stock levels." 
      />

      {/* ================= 1. الهيدر وزر الإضافة بالـ Gradients للفيجما ================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 select-none">
        <div>
          <h1 
            className="text-[24px] md:text-[30px] font-bold text-blue-950 md:leading-[42px] tracking-[0px]"
            style={{ fontFamily: '"SF Pro Rounded", sans-serif', fontWeight: 700 }}
          >
            Drags Catalog
          </h1>
          <p 
            className="text-[13px] md:text-[15px] font-normal text-gray-500 md:leading-[22.5px] tracking-[0px] mt-1"
            style={{ fontFamily: '"SF Pro Rounded", sans-serif', fontWeight: 400 }}
          >
            Your available products
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/supplier/drugs/add')}
          className="flex items-center justify-center gap-2 text-white font-bold text-sm w-40 h-11 rounded-2xl transition-all transform active:scale-95 shadow-[0px_4px_12px_0px_rgba(59,129,183,0.30)] hover:opacity-95 cursor-pointer whitespace-nowrap"
          style={{ background: 'linear-gradient(135deg, #0093B7 0%, #3B81B7 100%)', fontFamily: '"SF Pro Rounded", sans-serif' }}
        >
          <Plus size={16} className="stroke-[2.5]" />
          <span>Add Product</span>
        </button>
      </div>

      {/* ================= 2. الفلاتر التبويبية المحدثة بالـ Badges وتأثير الـ Click الحركي ================= */}
      <div className="flex gap-4 select-none overflow-x-auto pb-2 scrollbar-none">
        {['All', 'Available', 'Out of Stock'].map((tab) => {
          const count = tab === 'All' ? drugs.length : drugs.filter(d => d.status === tab).length;
          const isSelected = filter === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setFilter(tab);
                setCurrentPage(1); // إعادة التصفير تلقائياً عند النقل
              }}
              className={`h-10 px-5 text-sm font-bold rounded-[10px] flex items-center gap-2.5 transition-all duration-200 transform active:scale-95 cursor-pointer whitespace-nowrap ${
                isSelected 
                  ? 'bg-blue-950 text-white shadow-[0px_4px_8px_-2px_rgba(29,71,103,0.30)] border border-transparent' 
                  : 'bg-white text-gray-500 border border-slate-200/40 hover:bg-slate-50/80 hover:text-blue-950'
              }`}
              style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}
            >
              <span>{tab}</span>
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold transition-colors duration-200 ${
                isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-gray-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ================= 3. استدعاء الـ DataTable المشترك الحامي لـ استيل الجدول والأبعاد الموحدة ================= */}
      <DataTable
        data={currentDrugs}
        headers={tableHeaders}
        renderRow={renderTableRow}
        renderCard={renderMobileCard}
        currentPage={currentPage}
        totalPages={totalPages}
        indexOfFirstItem={indexOfFirstItem}
        filteredCount={filteredDrugs.length}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}