'use client';

import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';

interface AddDrugModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDrug?: (drugData: any) => void;
}

const AddDrugModal: React.FC<AddDrugModalProps> = ({ isOpen, onClose, onAddDrug }) => {
  // 1. تعريف الـ States لكل الحقول لإدارتها وربطها بالباك إند
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
    
    const newDrug = {
      id: `PO-${Date.now().toString().slice(-3)}`, // توليد ID وهمي مؤقت
      pharmacy: drugName,
      category,
      supplier,
      price: `${price} EGP`,
      items: Number(quantity),
      minThreshold: Number(minThreshold),
      date: expiryDate,
      status: 'New',
      description
    };

    if (onAddDrug) onAddDrug(newDrug);
    
    // إعادة تهيئة الفورم بعد الحفظ وقفل المودال
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setDrugName('');
    setCategory('');
    setSupplier('');
    setPrice('');
    setQuantity('');
    setMinThreshold('');
    setExpiryDate('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      
      {/* الحاوية الأساسية للمودال مع الشادو الأزرق المضيء المأخوذ من الفجما بالمللي */}
      <div 
        className="w-full max-w-[711px] bg-white rounded-2xl shadow-[0px_20px_40px_rgba(59,129,183,0.30)] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        
        {/* هيدر المودال: العنوان وزر القفل */}
        <div className="w-full h-16 px-8 bg-white border-b border-gray-200 flex justify-between items-center select-none">
          <h2 className="text-slate-700 text-xl font-bold font-['SF_Pro_Rounded'] tracking-tight">
            Add New Drug
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-[10px] flex justify-center items-center text-gray-400 hover:text-gray-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* فورم إدخال البيانات */}
        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5 overflow-y-auto max-h-[calc(100vh-100px)]">
          
          {/* 1. حقل: Drug Name */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 text-sm font-bold font-['SF_Pro_Rounded'] flex items-center gap-1">
              Drug Name <span className="text-red-500 font-['Arimo']">*</span>
            </label>
            <input 
              type="text"
              required
              placeholder="e.g., Panadol"
              value={drugName}
              onChange={(e) => setDrugName(e.target.value)}
              className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-[10px] text-neutral-800 text-base font-normal font-['SF_Pro_Rounded'] focus:outline-none focus:border-cyan-600 focus:bg-white transition-all placeholder:text-neutral-950/40"
            />
          </div>

          {/* 2. حقول الـ Dropdowns (Category & Supplier) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* كامب: Category */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-700 text-sm font-bold font-['SF_Pro_Rounded'] flex items-center gap-1">
                Category <span className="text-red-500 font-['Arimo']">*</span>
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-[10px] text-neutral-800 text-base font-normal font-['SF_Pro_Rounded'] focus:outline-none focus:border-cyan-600 focus:bg-white transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled hidden>Select Category</option>
                <option value="Painkiller">Painkiller</option>
                <option value="Antibiotic">Antibiotic</option>
                <option value="Anti-inflammatory">Anti-inflammatory</option>
                <option value="Vitamin">Vitamin</option>
                <option value="Gastric">Gastric</option>
              </select>
            </div>

            {/* كامب: Supplier */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-700 text-sm font-bold font-['SF_Pro_Rounded'] flex items-center gap-1">
                Supplier <span className="text-red-500 font-['Arimo']">*</span>
              </label>
              <select
                required
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-[10px] text-neutral-800 text-base font-normal font-['SF_Pro_Rounded'] focus:outline-none focus:border-cyan-600 focus:bg-white transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled hidden>Select Supplier</option>
                <option value="Eva Pharma">Eva Pharma</option>
                <option value="Spimaco">Spimaco</option>
                <option value="GlaxoSmithKline">GlaxoSmithKline</option>
                <option value="Novartis">Novartis</option>
                <option value="AstraZeneca">AstraZeneca</option>
              </select>
            </div>
          </div>

          {/* 3. حقول الأرقام الثلاثية (Price, Quantity, Threshold) مقسمة بالتساوي كمجموعة مرنة */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* حقل: Price */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-700 text-sm font-bold font-['SF_Pro_Rounded'] flex items-center gap-1">
                Price (EGP) <span className="text-red-500 font-['Arimo']">*</span>
              </label>
              <input 
                type="number"
                step="0.01"
                required
                placeholder="0.00"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-[10px] text-neutral-800 text-base font-normal font-['SF_Pro_Rounded'] focus:outline-none focus:border-cyan-600 focus:bg-white transition-all placeholder:text-neutral-950/40"
              />
            </div>

            {/* حقل: Quantity */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-700 text-sm font-bold font-['SF_Pro_Rounded'] flex items-center gap-1">
                Quantity <span className="text-red-500 font-['Arimo']">*</span>
              </label>
              <input 
                type="number"
                required
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-[10px] text-neutral-800 text-base font-normal font-['SF_Pro_Rounded'] focus:outline-none focus:border-cyan-600 focus:bg-white transition-all placeholder:text-neutral-950/40"
              />
            </div>

            {/* حقل: Min Threshold */}
            <div className="flex flex-col gap-2">
              <label className="text-slate-700 text-sm font-bold font-['SF_Pro_Rounded'] flex items-center gap-1">
                Min Threshold <span className="text-red-500 font-['Arimo']">*</span>
              </label>
              <input 
                type="number"
                required
                placeholder="0"
                value={minThreshold}
                onChange={(e) => setMinThreshold(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-[10px] text-neutral-800 text-base font-normal font-['SF_Pro_Rounded'] focus:outline-none focus:border-cyan-600 focus:bg-white transition-all placeholder:text-neutral-950/40"
              />
            </div>
          </div>

          {/* 4. حقل: Expiry Date مجهز كحقل تاريخ حقيقي ومرن */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 text-sm font-bold font-['SF_Pro_Rounded'] flex items-center gap-1">
              Expiry Date <span className="text-red-500 font-['Arimo']">*</span>
            </label>
            <div className="relative">
              <input 
                type="text"
                required
                placeholder="MM/YYYY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-[10px] text-neutral-800 text-base font-normal font-['SF_Pro_Rounded'] focus:outline-none focus:border-cyan-600 focus:bg-white transition-all placeholder:text-neutral-950/40"
              />
              <Calendar size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* 5. حقل: Description واخد حجم الـ الارتفاع المظبوط من الفجما */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 text-sm font-bold font-['SF_Pro_Rounded']">
              Description
            </label>
            <textarea 
              placeholder="Enter drug description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-24 px-4 py-3 bg-gray-50 border border-gray-200 rounded-[10px] text-neutral-800 text-base font-normal font-['SF_Pro_Rounded'] leading-6 focus:outline-none focus:border-cyan-600 focus:bg-white transition-all placeholder:text-neutral-950/40 resize-none"
            />
          </div>

          {/* 6. أزرار التحكم السفلية المدمجة بالـ الـ Shadow والـ Gradient الصريح */}
          <div className="flex justify-end items-center gap-3 pt-4 border-t border-gray-100 mt-2 select-none">
            <button
              type="button"
              onClick={() => { resetForm(); onClose(); }}
              className="w-24 h-11 bg-white border border-gray-200 rounded-2xl shadow-[0px_1px_1px_rgba(0,0,0,0.1)] text-gray-500 text-sm font-bold font-['SF_Pro_Rounded'] hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-28 h-11 text-white text-sm font-bold font-['SF_Pro_Rounded'] rounded-2xl shadow-[0px_4px_12px_rgba(59,129,183,0.35)] bg-gradient-to-br from-cyan-600 to-blue-400 hover:opacity-95 transition-opacity transform active:scale-98 transition-transform cursor-pointer"
            >
              Add Drug
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddDrugModal;