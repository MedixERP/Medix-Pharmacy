import React, { useState } from 'react';
import { AlertTriangle, XCircle, ShoppingBag, Pill } from 'lucide-react';
import CreateOrderModal from './CreateOrderModal'; // 🌟 استدعاء المكون الجديد هنا

export default function InventoryMonitoring() {
  // الـ States المسؤولة عن التحكم بالـ Modal ديناميكياً
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState('');

  const lowStockDrugs = [
    { name: 'Brufen', current: '5 units', required: '50 units' },
    { name: 'Aspirin', current: '15 units', required: '60 units' },
    { name: 'Voltaren', current: '8 units', required: '40 units' },
    { name: 'Metformin', current: '20 units', required: '80 units' },
    { name: 'Lisinopril', current: '12 units', required: '60 units' },
  ];

  const outOfStockDrugs = [
    { name: 'Augmentin', current: '0 units', required: '75 units' },
  ];

  // دالة فتح الـ Modal وتثبيت اسم الدواء المضغوط عليه
  const handleOpenOrderModal = (drugName: string) => {
    setSelectedDrug(drugName);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header Section */}
      <div>
        <h1 className="text-2xl font-bold text-[#1b2a49]">Inventory Monitoring</h1>
        <p className="text-xs text-slate-400 font-medium mt-1">
          Monitor low stock and out of stock items that require immediate attention.
        </p>
      </div>

      {/* 2. Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border-l-[4px] border-l-amber-500 border border-slate-100 shadow-[0_10px_30px_rgba(27,42,73,0.01)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">Low Stock Drugs</span>
            <div className="text-3xl font-black text-amber-500">5</div>
          </div>
          <div className="p-3 bg-amber-50 text-amber-500 rounded-xl"><AlertTriangle size={24} /></div>
        </div>

        <div className="bg-white p-6 rounded-2xl border-l-[4px] border-l-rose-500 border border-slate-100 shadow-[0_10px_30px_rgba(27,42,73,0.01)] flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400">Out of Stock Drugs</span>
            <div className="text-3xl font-black text-rose-500">4</div>
          </div>
          <div className="p-3 bg-rose-50 text-rose-500 rounded-xl"><XCircle size={24} /></div>
        </div>
      </div>

      {/* 3. Low Stock Drugs Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-amber-50 text-amber-500 rounded-lg"><AlertTriangle size={16} /></div>
          <h2 className="text-base font-bold text-[#1b2a49]">Low Stock Drugs</h2>
          <span className="bg-amber-50 text-amber-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">5 Items</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(27,42,73,0.02)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FFFBF7] border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-6">Drug Name</th>
                  <th className="py-3 px-6">Current Quantity</th>
                  <th className="py-3 px-6">Minimum Required</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm font-medium text-[#1b2a49]">
                {lowStockDrugs.map((drug, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500"><Pill size={14} /></div>
                      <span className="font-bold text-[#1b2a49]">{drug.name}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-700">{drug.current}</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-400 font-semibold">{drug.required}</td>
                    <td className="py-4 px-6 text-center">
                      <button 
                        onClick={() => handleOpenOrderModal(drug.name)} // تشغيل الـ Modal عند الضغط
                        className="inline-flex items-center gap-1.5 bg-[#D3792B] hover:bg-[#b9641f] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
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
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-rose-50 text-rose-500 rounded-lg"><XCircle size={16} /></div>
          <h2 className="text-base font-bold text-[#1b2a49]">Out of Stock Drugs</h2>
          <span className="bg-rose-50 text-rose-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full">4 Items</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(27,42,73,0.02)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FFF5F5] border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-6">Drug Name</th>
                  <th className="py-3 px-6">Current Quantity</th>
                  <th className="py-3 px-6">Minimum Required</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm font-medium text-[#1b2a49]">
                {outOfStockDrugs.map((drug, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500"><Pill size={14} /></div>
                      <span className="font-bold text-[#1b2a49]">{drug.name}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-rose-50 text-rose-700">{drug.current}</span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-400 font-semibold">{drug.required}</td>
                    <td className="py-4 px-6 text-center">
                      <button 
                        onClick={() => handleOpenOrderModal(drug.name)} // تشغيل الـ Modal عند الضغط
                        className="inline-flex items-center gap-1.5 bg-[#E74C3C] hover:bg-[#c0392b] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
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

      {/* 🌟 استدعاء الـ Modal وتمرير الخصائص والـ state له ليعمل بسلاسة */}
      <CreateOrderModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialDrugName={selectedDrug}
      />

    </div>
  );
}