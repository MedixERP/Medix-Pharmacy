import React, { useState } from 'react';
import { Plus, Eye, Pencil, Pill } from 'lucide-react';

// بيانات وهمية للتجربة بناءً على الصورة
const MOCK_DRUGS = [
  { id: 1, name: 'Panadol', category: 'Painkiller', stock: 150, min: 50, status: 'Normal' },
  { id: 2, name: 'Augmentin', category: 'Antibiotic', stock: 0, min: 75, status: 'Out of Stock' },
  { id: 3, name: 'Voltaren', category: 'Pain Relief', stock: 8, min: 40, status: 'Low' },
  { id: 4, name: 'Nexium', category: 'Gastric', stock: 120, min: 60, status: 'Normal' },
];

export default function DrugList() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Normal', 'Low', 'Out of Stock'];

  // دالة لتحديد ألوان حالة المخزون ديناميكياً
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Normal':
        return { text: 'text-emerald-600', bg: 'bg-emerald-100/60', stockText: 'text-emerald-600' };
      case 'Out of Stock':
        return { text: 'text-red-500', bg: 'bg-red-100/60', stockText: 'text-red-600' };
      case 'Low':
        return { text: 'text-orange-500', bg: 'bg-orange-100/60', stockText: 'text-orange-500' };
      default:
        return { text: 'text-slate-600', bg: 'bg-slate-100', stockText: 'text-slate-600' };
    }
  };

  return (
    <div className="p-6 md:p-10 w-full max-w-7xl mx-auto">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#1b2a49] mb-1">Drug List</h1>
          <p className="text-slate-400 text-[15px]">Manage drugs in your pharmacy inventory</p>
        </div>
        <button className="bg-[#4a84ce] hover:bg-[#3B81B7] text-white px-5 py-2.5 rounded-[12px] font-medium flex items-center gap-2 transition-colors shadow-sm">
          <Plus size={18} />
          Add Drug
        </button>
      </div>

      {/* Filters / Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-[12px] text-[14.5px] font-medium transition-all duration-200 ${
              activeTab === tab
                ? 'bg-[#1b2a49] text-white shadow-md'
                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[20px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-slate-100 overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-[0.05em]">
              <th className="py-5 px-8 font-bold">DRUG NAME</th>
              <th className="py-5 px-6 font-bold">CATEGORY</th>
              <th className="py-5 px-6 font-bold">CURRENT STOCK</th>
              <th className="py-5 px-6 font-bold">MIN THRESHOLD</th>
              <th className="py-5 px-6 font-bold">STATUS</th>
              <th className="py-5 px-8 text-center font-bold">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DRUGS.map((drug, index) => {
              const styles = getStatusStyles(drug.status);
              return (
                <tr 
                  key={drug.id} 
                  className={`hover:bg-slate-50/50 transition-colors group ${
                    index !== MOCK_DRUGS.length - 1 ? 'border-b border-slate-50' : ''
                  }`}
                >
                  <td className="py-4 px-8 flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#f0f5ff] flex items-center justify-center text-[#4a84ce] shrink-0">
                      <Pill size={18} className="transform -rotate-45" />
                    </div>
                    <span className="font-bold text-[#1b2a49] text-[15px]">{drug.name}</span>
                  </td>
                  <td className="py-4 px-6 text-slate-400 text-[14.5px]">{drug.category}</td>
                  <td className={`py-4 px-6 text-[14.5px] font-bold ${styles.stockText}`}>
                    {drug.stock} units
                  </td>
                  <td className="py-4 px-6 text-slate-400 text-[14.5px]">{drug.min} units</td>
                  <td className="py-4 px-6">
                    <span className={`px-3.5 py-1.5 rounded-full text-[12px] font-bold tracking-wide ${styles.bg} ${styles.text}`}>
                      {drug.status}
                    </span>
                  </td>
                  <td className="py-4 px-8">
                    <div className="flex items-center justify-center gap-4 text-slate-300">
                      <button className="hover:text-[#1b2a49] transition-colors" aria-label="View Details">
                        <Eye size={18} />
                      </button>
                      <button className="hover:text-[#1b2a49] transition-colors" aria-label="Edit Drug">
                        <Pencil size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}