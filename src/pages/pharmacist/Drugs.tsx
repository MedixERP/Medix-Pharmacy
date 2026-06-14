// src/pages/pharmacist/Drugs.tsx
import React, { useState } from 'react';
import { Eye, Edit3, Plus, Layers, X } from 'lucide-react';

const MOCK_DRUGS = [
  { id: 1, name: 'Panadol', category: 'Painkiller', stock: 150, threshold: 50, status: 'NORMAL' },
  { id: 2, name: 'Augmentin', category: 'Antibiotic', stock: 0, threshold: 75, status: 'OUT_OF_STOCK' },
  { id: 3, name: 'Voltaren', category: 'Pain Relief', stock: 8, threshold: 40, status: 'LOW' },
  { id: 4, name: 'Nexium', category: 'Gastric', stock: 120, threshold: 60, status: 'NORMAL' },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'NORMAL': return 'bg-emerald-50 text-emerald-600';
    case 'LOW': return 'bg-amber-50 text-amber-600';
    case 'OUT_OF_STOCK': return 'bg-rose-50 text-rose-600';
    default: return 'bg-slate-50 text-slate-600';
  }
};

export default function Drugs() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1b2a49]">Drug List</h1>
          <p className="text-sm text-slate-400 mt-1">Manage drugs in your pharmacy inventory</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#3B81B7] text-white px-6 py-2.5 rounded-2xl shadow-lg hover:bg-[#2e6d9e] transition-all"
        >
          <Plus size={20} /> <span className="font-bold">Add Drug</span>
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(27,42,73,0.05)] overflow-hidden border border-slate-100">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="py-4 px-8 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Drug Name</th>
              <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Category</th>
              <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Stock</th>
              <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Threshold</th>
              <th className="py-4 px-6 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-center text-[11px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {MOCK_DRUGS.map((drug) => (
              <tr key={drug.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-5 px-8 flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#3B81B7]">
                    <Layers size={18} />
                  </div>
                  <span className="font-bold text-[#1b2a49]">{drug.name}</span>
                </td>
                <td className="py-5 px-6 text-slate-500">{drug.category}</td>
                <td className="py-5 px-6 font-bold" style={{ color: drug.stock <= drug.threshold ? '#e11d48' : '#059669' }}>
                  {drug.stock} units
                </td>
                <td className="py-5 px-6 text-slate-500">{drug.threshold} units</td>
                <td className="py-5 px-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusStyles(drug.status)}`}>
                    {drug.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-5 px-6 text-center">
                  <div className="flex justify-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-blue-600"><Eye size={16} /></button>
                    <button className="p-2 text-slate-400 hover:text-blue-600"><Edit3 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Drug Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-[711px] bg-white rounded-2xl shadow-[0px_20px_40px_0px_rgba(59,129,183,0.30)] p-8 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-700">Add New Drug</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-red-500"><X size={24} /></button>
            </div>
            {/* هنا يمكنك إضافة حقول النموذج الخاصة بك */}
            <div className="space-y-4">
              <input className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200" placeholder="Drug Name" />
              <div className="grid grid-cols-2 gap-4">
                <input className="p-3 bg-gray-50 rounded-xl border border-gray-200" placeholder="Category" />
                <input className="p-3 bg-gray-50 rounded-xl border border-gray-200" placeholder="Supplier" />
              </div>
              {/* بقية الحقول */}
              <div className="flex justify-end gap-3 mt-8">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 font-bold text-gray-500">Cancel</button>
                <button className="px-6 py-2.5 bg-[#3B81B7] text-white rounded-2xl font-bold">Add Drug</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}