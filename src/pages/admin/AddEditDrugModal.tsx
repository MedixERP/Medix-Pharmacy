import React, { useState, useEffect } from 'react';
import { X, Pill, DollarSign, Layers } from 'lucide-react';

interface DrugData {
  name: string;
  scientific: string;
  concentration: string;
  price: string;
  quantity: number;
  minThreshold: number;
}

interface AddEditDrugModalProps {
  isOpen: boolean;
  onClose: () => void;
  drugToEdit: DrugData | null; // لو قيمته null يعني الحالة "إضافة دواء جديد"
}

export default function AddEditDrugModal({ isOpen, onClose, drugToEdit }: AddEditDrugModalProps) {
  const isEditMode = !!drugToEdit;

  // الحقول الديناميكية المتوافقة مع الفيجما
  const [formData, setFormData] = useState({
    name: '',
    scientific: '',
    concentration: '',
    price: '',
    quantity: '',
    minThreshold: ''
  });

  // ملء البيانات تلقائياً في حالة التعديل
  useEffect(() => {
    if (drugToEdit) {
      setFormData({
        name: drugToEdit.name,
        scientific: drugToEdit.scientific,
        concentration: drugToEdit.concentration || '500mg',
        price: drugToEdit.price.replace(' EGP', ''),
        quantity: String(drugToEdit.quantity),
        minThreshold: String(drugToEdit.minThreshold)
      });
    } else {
      setFormData({
        name: '',
        scientific: '',
        concentration: '',
        price: '',
        quantity: '',
        minThreshold: ''
      });
    }
  }, [drugToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isEditMode ? 'Updating Drug Data:' : 'Saving New Drug:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1B2A49]/30 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* البوكس الرئيسي الاحترافي مع زوايا دائرية 24px ومقاومة الـ Responsiveness */}
      <div className="bg-white rounded-[24px] w-full max-w-[680px] shadow-[0_20px_50px_rgba(27,42,73,0.12)] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* Header المودال بالخطوط الموحدة للبراند */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between select-none">
          <div>
            <h2 className="text-xl font-bold text-[#1b2a49]">
              {isEditMode ? 'Edit Drug' : 'Add New Drug'}
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              {isEditMode ? 'Update drug information and inventory details.' : 'Fill in the drug information to add it to the inventory.'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* الفورم ومساحة الإدخال */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Row 1: Drug Name & Scientific Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1b2a49]">Drug Name <span className="text-rose-500">*</span></label>
              <input 
                type="text"
                required
                placeholder="Enter drug name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-[#F8FAFC] border border-slate-100 focus:border-slate-200 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium text-[#1b2a49] focus:outline-none transition-all placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1b2a49]">Scientific Name <span className="text-rose-500">*</span></label>
              <input 
                type="text"
                required
                placeholder="Enter scientific name"
                value={formData.scientific}
                onChange={(e) => setFormData({...formData, scientific: e.target.value})}
                className="w-full bg-[#F8FAFC] border border-slate-100 focus:border-slate-200 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium text-[#1b2a49] focus:outline-none transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Row 2: Concentration & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1b2a49]">Concentration <span className="text-rose-500">*</span></label>
              <input 
                type="text"
                required
                placeholder="e.g., 500mg, 10ml"
                value={formData.concentration}
                onChange={(e) => setFormData({...formData, concentration: e.target.value})}
                className="w-full bg-[#F8FAFC] border border-slate-100 focus:border-slate-200 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium text-[#1b2a49] focus:outline-none transition-all placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1b2a49]">Price <span className="text-rose-500">*</span></label>
              <div className="relative">
                <input 
                  type="number"
                  required
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full bg-[#F8FAFC] border border-slate-100 focus:border-slate-200 focus:bg-white rounded-xl py-3 pl-4 pr-12 text-sm font-medium text-[#1b2a49] focus:outline-none transition-all placeholder:text-slate-400"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">EGP</span>
              </div>
            </div>
          </div>

          {/* Row 3: Quantity & Minimum Quantity (Threshold) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1b2a49]">Quantity <span className="text-rose-500">*</span></label>
              <input 
                type="number"
                required
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                className="w-full bg-[#F8FAFC] border border-slate-100 focus:border-slate-200 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium text-[#1b2a49] focus:outline-none transition-all placeholder:text-slate-400"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1b2a49]">Minimum Quantity (Threshold) <span className="text-rose-500">*</span></label>
              <input 
                type="number"
                required
                placeholder="Enter minimum quantity"
                value={formData.minThreshold}
                onChange={(e) => setFormData({...formData, minThreshold: e.target.value})}
                className="w-full bg-[#F8FAFC] border border-slate-100 focus:border-slate-200 focus:bg-white rounded-xl py-3 px-4 text-sm font-medium text-[#1b2a49] focus:outline-none transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

        </form>

        {/* Footer المودال مدعوماً بزر الحذف الأحمر المتوهج في حالة التعديل فقط كالتصميم */}
        <div className="p-4 border-t border-slate-50 bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            {isEditMode && (
              <button 
                type="button"
                onClick={() => { console.log('Drug Deleted'); onClose(); }}
                className="w-full sm:w-auto bg-[#E74C3C] hover:bg-[#c0392b] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-[0_4px_12px_rgba(231,76,60,0.2)] transition-all cursor-pointer"
              >
                Delete Drug
              </button>
            )}
          </div>
          
          <div className="flex items-center justify-end gap-3 w-full sm:w-auto">
            <button 
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#3B81B7] hover:bg-[#2c638c] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              {isEditMode ? 'Save Drug' : 'Save Drug'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}