import React, { useState } from 'react';
import { AlertTriangle, XCircle, ShoppingBag, Pill } from 'lucide-react';
import SEOHead from '../../components/shared/SEOHead';
import CreateOrderModal from './CreateOrderModal'; 

export default function InventoryMonitoring() {
  // الـ States المسؤولة عن التحكم بالـ Modal ديناميكياً
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState('');

  // الموك داتا المطابقة للفيجما بالمللي
  const lowStockDrugs = [
    { name: 'Brufen', current: '5 units', required: '50 units' },
    { name: 'Aspirin', current: '15 units', required: '60 units' },
    { id: 'l3', name: 'Voltaren', current: '8 units', required: '40 units' },
    { id: 'l4', name: 'Metformin', current: '20 units', required: '80 units' },
    { id: 'l5', name: 'Lisinopril', current: '12 units', required: '60 units' },
  ];

  const outOfStockDrugs = [
    { name: 'Augmentin', current: '0 units', required: '75 units' },
    { name: 'Zithromax', current: '0 units', required: '50 units' },
    { name: 'Nexium', current: '0 units', required: '60 units' },
    { name: 'Lipitor', current: '0 units', required: '40 units' },
  ];

  // دالة فتح الـ Modal وتثبيت اسم الدواء المضغوط عليه
  const handleOpenOrderModal = (drugName: string) => {
    setSelectedDrug(drugName);
    setIsModalOpen(true);
  };

  return (
    // 🟢 الالتزام بالمسافات الموحدة تماماً: 30px من الأعلى و 25px من الجوانب
    <div className="animate-in fade-in duration-300 text-left relative pt-[2px] px-[2px] space-y-8">
      <SEOHead 
        title="Inventory Monitoring" 
        description="Medix Platform Inventory Monitoring - Track low stock levels, out-of-stock items, and create immediate supply replenishment orders." 
      />
      
      {/* 1. Header Section */}
      <div className="select-none">
        <h1 className="text-[24px] md:text-[30px] font-bold text-blue-950 font-['SF_Pro_Rounded'] leading-10">Inventory Monitoring</h1>
        <p className="text-sm md:text-base font-normal text-gray-500 font-['SF_Pro_Rounded'] leading-6 mt-1">
          Monitor low stock and out of stock items that require immediate attention.
        </p>
      </div>

      {/* 2. Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
        {/* Low Stock Drugs Summary Card */}
        <div className="bg-white p-6 rounded-2xl border-l-[4px] border-l-amber-500 border border-slate-100 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] flex items-center justify-between min-h-[120px]">
          <div className="space-y-1">
            <span className="text-sm font-normal text-gray-500 font-['SF_Pro_Rounded']">Low Stock Drugs</span>
            <div className="text-3xl font-bold text-amber-500 font-['SF_Pro_Rounded'] leading-[48px]">5</div>
          </div>
          <div className="w-14 h-14 bg-yellow-50 text-amber-500 rounded-2xl flex items-center justify-center shadow-xs">
            <AlertTriangle size={28} />
          </div>
        </div>

        {/* Out of Stock Drugs Summary Card */}
        <div className="bg-white p-6 rounded-2xl border-l-[4px] border-l-rose-500 border border-slate-100 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] flex items-center justify-between min-h-[120px]">
          <div className="space-y-1">
            <span className="text-sm font-normal text-gray-500 font-['SF_Pro_Rounded']">Out of Stock Drugs</span>
            <div className="text-3xl font-bold text-red-500 font-['SF_Pro_Rounded'] leading-[48px]">4</div>
          </div>
          <div className="w-14 h-14 bg-pink-100 text-red-500 rounded-2xl flex items-center justify-center shadow-xs">
            <XCircle size={28} />
          </div>
        </div>
      </div>

      {/* 3. Low Stock Drugs Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 select-none">
          <div className="w-10 h-10 bg-yellow-50 text-amber-500 rounded-2xl flex items-center justify-center shadow-2xs">
            <AlertTriangle size={20} />
          </div>
          <h2 className="text-xl font-bold text-blue-950 font-['SF_Pro_Rounded'] leading-8">Low Stock Drugs</h2>
          <span className="bg-yellow-50 text-amber-500 text-xs font-bold px-3 py-1 rounded-full font-['SF_Pro_Rounded']">5 Items</span>
        </div>

        {/* 💻 جدول الديسكتاب للنواقص */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-orange-50/60 border-b border-amber-500/20 text-[11px] font-bold text-amber-500 uppercase tracking-wider h-12">
                  <th className="py-3 px-6 font-['SF_Pro_Rounded']">Drug Name</th>
                  <th className="py-3 px-6 font-['SF_Pro_Rounded']">Current Quantity</th>
                  <th className="py-3 px-6 font-['SF_Pro_Rounded']">Minimum Required</th>
                  <th className="py-3 px-6 text-center font-['SF_Pro_Rounded']">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/70 text-sm font-normal text-slate-700">
                {lowStockDrugs.map((drug, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors h-20">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-50 border border-amber-100/50 rounded-2xl flex items-center justify-center text-amber-500 shadow-2xs">
                          <Pill size={18} />
                        </div>
                        <span className="text-slate-700 text-base font-bold font-['SF_Pro_Rounded']">{drug.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1.5 rounded-[10px] text-xs font-bold bg-yellow-50 text-amber-500 font-['SF_Pro_Rounded']">
                        {drug.current}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-sm font-normal font-['SF_Pro_Rounded']">
                      {drug.required}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button 
                        type="button"
                        onClick={() => handleOpenOrderModal(drug.name)}
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-[0px_4px_12px_0px_rgba(243,156,18,0.30)] text-white text-xs font-bold font-['SF_Pro_Rounded'] px-5 py-2.5 transition-all transform active:scale-95 cursor-pointer w-36 h-10 mx-auto"
                      >
                        <ShoppingBag size={14} /> Create Order
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 4. Out of Stock Drugs Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-3 select-none">
          <div className="w-10 h-10 bg-pink-100 text-red-500 rounded-2xl flex items-center justify-center shadow-2xs">
            <XCircle size={20} />
          </div>
          <h2 className="text-xl font-bold text-blue-950 font-['SF_Pro_Rounded'] leading-8">Out of Stock Drugs</h2>
          <span className="bg-pink-100 text-red-500 text-xs font-bold px-3 py-1 rounded-full font-['SF_Pro_Rounded']">4 Items</span>
        </div>

        {/* 💻 جدول الديسكتاب للمنتهية تماماً */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-50/60 border-b border-red-500/20 text-[11px] font-bold text-red-500 uppercase tracking-wider h-12">
                  <th className="py-3 px-6 font-['SF_Pro_Rounded']">Drug Name</th>
                  <th className="py-3 px-6 font-['SF_Pro_Rounded']">Current Quantity</th>
                  <th className="py-3 px-6 font-['SF_Pro_Rounded']">Minimum Required</th>
                  <th className="py-3 px-6 text-center font-['SF_Pro_Rounded']">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/70 text-sm font-normal text-slate-700">
                {outOfStockDrugs.map((drug, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors h-20">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pink-100 border border-rose-100/30 rounded-2xl flex items-center justify-center text-red-500 shadow-2xs">
                          <Pill size={18} />
                        </div>
                        <span className="text-slate-700 text-base font-bold font-['SF_Pro_Rounded']">{drug.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1.5 rounded-[10px] text-xs font-bold bg-pink-100 text-red-500 font-['SF_Pro_Rounded']">
                        {drug.current}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500 text-sm font-normal font-['SF_Pro_Rounded']">
                      {drug.required}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button 
                        type="button"
                        onClick={() => handleOpenOrderModal(drug.name)}
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-br from-red-500 to-orange-700 rounded-2xl shadow-[0px_4px_12px_0px_rgba(231,76,60,0.30)] text-white text-xs font-bold font-['SF_Pro_Rounded'] px-5 py-2.5 transition-all transform active:scale-95 cursor-pointer w-36 h-10 mx-auto"
                      >
                        <ShoppingBag size={14} /> Create Order
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* الـ Modal الذكي لإنشاء أمر الشراء الدوائي الجديد */}
      <CreateOrderModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialDrugName={selectedDrug}
      />
    </div>
  );
}