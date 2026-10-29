'use client';

import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface AddDrugModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDrug: (drugData: any) => void;
}

const AddDrugModal: React.FC<AddDrugModalProps> = ({ isOpen, onClose, onAddDrug }) => {
  const [drugName, setDrugName] = useState('');
  const [category, setCategory] = useState('');
  const [supplier, setSupplier] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [minThreshold, setMinThreshold] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // بناء الكائن الجديد ليتوافق مع أعمام الجدول
    const newDrug = {
      id: Date.now(), // ID فريد ديناميكي
      name: drugName,
      category: category,
      stock: Number(quantity) || 0,
      threshold: Number(minThreshold) || 0,
      status: Number(quantity) === 0 ? 'OUT_OF_STOCK' : (Number(quantity) <= Number(minThreshold) ? 'LOW' : 'NORMAL')
    };

    onAddDrug(newDrug);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setDrugName(''); setCategory(''); setSupplier(''); setPrice('');
    setQuantity(''); setMinThreshold(''); setExpiryDate(''); setDescription('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[9999] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-[0px_20px_40px_rgba(59,129,183,0.25)] flex flex-col my-auto max-h-[95vh] overflow-y-auto">
        
        {/* الهيدر */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white rounded-t-2xl">
          <h2 className="text-[#1e293b] text-lg font-bold font-['SF_Pro_Rounded']">Add New Drug</h2>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1">
            <X size={20} />
          </button>
        </div>

        {/* حقول الإدخال كاملة */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Name */}
          <div className="space-y-1">
            <label className="text-slate-700 text-xs font-bold font-['SF_Pro_Rounded']">Drug Name <span className="text-red-500">*</span></label>
            <input type="text" required placeholder="e.g., Panadol" value={drugName} onChange={(e) => setDrugName(e.target.value)}
              className="w-full h-10 px-3 bg-[#f8fafc] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-cyan-600 focus:bg-white transition-all text-slate-800" />
          </div>

          {/* Category & Supplier */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-slate-700 text-xs font-bold font-['SF_Pro_Rounded']">Category <span className="text-red-500">*</span></label>
              <div className="relative">
                <select required value={category} onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-10 px-3 bg-[#f8fafc] border border-gray-200 rounded-xl text-xs appearance-none cursor-pointer focus:outline-none focus:border-cyan-600 focus:bg-white transition-all text-slate-700">
                  <option value="" disabled hidden>Select Category</option>
                  <option value="Painkiller">Painkiller</option>
                  <option value="Antibiotic">Antibiotic</option>
                  <option value="Pain Relief">Pain Relief</option>
                  <option value="Vitamin">Vitamin</option>
                  <option value="Gastric">Gastric</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-slate-700 text-xs font-bold font-['SF_Pro_Rounded']">Supplier <span className="text-red-500">*</span></label>
              <div className="relative">
                <select required value={supplier} onChange={(e) => setSupplier(e.target.value)}
                  className="w-full h-10 px-3 bg-[#f8fafc] border border-gray-200 rounded-xl text-xs appearance-none cursor-pointer focus:outline-none focus:border-cyan-600 focus:bg-white transition-all text-slate-700">
                  <option value="" disabled hidden>Select supplier</option>
                  <option value="Eva Pharma">Eva Pharma</option>
                  <option value="Novartis">Novartis</option>
                  <option value="Spimaco">Spimaco</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Price, Quantity, Threshold */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-slate-700 text-[11px] font-bold font-['SF_Pro_Rounded'] whitespace-nowrap">Price (EGP) <span className="text-red-500">*</span></label>
              <input type="number" step="0.01" required placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)}
                className="w-full h-10 px-3 bg-[#f8fafc] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-cyan-600 focus:bg-white transition-all text-slate-800" />
            </div>
            <div className="space-y-1">
              <label className="text-slate-700 text-[11px] font-bold font-['SF_Pro_Rounded']">Quantity <span className="text-red-500">*</span></label>
              <input type="number" required placeholder="0" value={quantity} onChange={(e) => setQuantity(e.target.value)}
                className="w-full h-10 px-3 bg-[#f8fafc] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-cyan-600 focus:bg-white transition-all text-slate-800" />
            </div>
            <div className="space-y-1">
              <label className="text-slate-700 text-[11px] font-bold font-['SF_Pro_Rounded'] whitespace-nowrap">Min Threshold <span className="text-red-500">*</span></label>
              <input type="number" required placeholder="0" value={minThreshold} onChange={(e) => setMinThreshold(e.target.value)}
                className="w-full h-10 px-3 bg-[#f8fafc] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-cyan-600 focus:bg-white transition-all text-slate-800" />
            </div>
          </div>

          {/* Expiry Date */}
          <div className="space-y-1">
            <label className="text-slate-700 text-xs font-bold font-['SF_Pro_Rounded']">Expiry Date <span className="text-red-500">*</span></label>
            <input type="text" required placeholder="MM/YYYY" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full h-10 px-3 bg-[#f8fafc] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-cyan-600 focus:bg-white transition-all text-slate-800" />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-slate-700 text-xs font-bold font-['SF_Pro_Rounded']">Description</label>
            <textarea placeholder="Enter drug description..." value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full h-16 px-3 py-2 bg-[#f8fafc] border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-cyan-600 focus:bg-white transition-all resize-none text-slate-800" />
          </div>

          {/* الأزرار */}
          <div className="flex justify-end items-center gap-2 pt-3 border-t border-gray-100 bg-white">
            <button type="button" onClick={onClose} className="px-4 h-9 bg-white border border-gray-200 rounded-xl text-gray-500 text-xs font-bold hover:bg-gray-50 transition-colors cursor-pointer">
              Cancel
            </button>
            <button type="submit" className="px-5 h-9 text-white text-xs font-bold rounded-xl shadow-md bg-gradient-to-br from-cyan-600 to-blue-400 hover:opacity-90 active:scale-95 transition-all cursor-pointer">
              Add Drug
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddDrugModal;