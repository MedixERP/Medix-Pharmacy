import React, { useState } from 'react';
import { X, Search, ChevronDown, ClipboardList } from 'lucide-react';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDrugName?: string;
}

export default function CreateOrderModal({ isOpen, onClose, initialDrugName }: CreateOrderModalProps) {
  const [notes, setNotes] = useState('');
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Container الرئيسي المطابق لأبعاد الفيجما والزوايا الدائرية الفخمة */}
      <div className="bg-white rounded-[24px] w-full max-w-[620px] shadow-[0_20px_50px_rgba(27,42,73,0.15)] overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Header الـ Modal */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between select-none">
          <h2 className="text-xl font-bold text-[#1b2a49]">Create Purchase Order</h2>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* محتوى الـ Modal القابل للتمرير */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Step 1: Select Drugs */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-[#1b2a49] uppercase tracking-wider">Step 1: Select Drugs</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                placeholder="Search drug..." 
                className="w-full bg-[#F8FAFC] border border-slate-100 focus:border-slate-200 focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-[#1b2a49] focus:outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            {/* الأدوية المختارة مسبقاً بناءً على ضغطة الزر الفعالة من الجدول */}
            <div className="space-y-2 mt-3">
              <span className="text-[11px] font-bold text-slate-400 block">Selected (2):</span>
              
              <div className="flex items-center justify-between p-3.5 bg-blue-50/50 border border-blue-100/40 rounded-xl">
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[#3B81B7] border-slate-300 rounded focus:ring-[#3B81B7]" />
                  <span className="text-sm font-bold text-[#1b2a49]">{initialDrugName || 'Panadol'} - 200 units</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-blue-50/50 border border-blue-100/40 rounded-xl">
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4 text-[#3B81B7] border-slate-300 rounded focus:ring-[#3B81B7]" />
                  <span className="text-sm font-bold text-[#1b2a49]">Brufen - 100 units</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Select Supplier */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-[#1b2a49] uppercase tracking-wider">Step 2: Select Supplier</label>
            <div className="relative">
              <select className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl py-3 px-4 text-sm font-medium text-[#1b2a49] appearance-none focus:outline-none focus:bg-white focus:border-slate-200 transition-all cursor-pointer">
                <option value="">Choose a Supplier....</option>
                <option value="amoun">Amoun Pharmaceutical</option>
                <option value="eva">Eva Pharma</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Step 3: Order Notes */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-[#1b2a49] uppercase tracking-wider">Step 3: Order Notes (Optional)</label>
            <textarea 
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter order notes..." 
              className="w-full bg-[#F8FAFC] border border-slate-100 focus:border-slate-200 focus:bg-white rounded-xl p-4 text-sm font-medium text-[#1b2a49] focus:outline-none transition-all placeholder:text-slate-400 resize-none"
            />
          </div>

          {/* Order Summary Card المنسق بالألوان الدقيقة للفواتير */}
          <div className="bg-[#F8FAFC] border border-slate-100 rounded-2xl p-5 space-y-3.5">
            <h4 className="text-xs font-bold text-[#1b2a49] flex items-center gap-2 select-none">
              <ClipboardList size={14} className="text-slate-400" /> Order Summary
            </h4>
            
            <div className="space-y-2 text-xs font-semibold text-slate-500">
              <div className="flex justify-between">
                <span>{initialDrugName || 'Panadol'} × 200</span>
                <span className="font-bold text-[#1b2a49]">4,000 EGP</span>
              </div>
              <div className="flex justify-between">
                <span>Brufen × 100</span>
                <span className="font-bold text-[#1b2a49]">3,500 EGP</span>
              </div>
            </div>

            <div className="border-t border-slate-200/60 pt-3 flex justify-between items-center">
              <span className="text-xs font-bold text-[#1b2a49]">Total:</span>
              <span className="text-base font-black text-emerald-600">7,500 EGP</span>
            </div>
          </div>

        </div>

        {/* Footer الـ Modal وأزرار التحكم */}
        <div className="p-4 border-t border-slate-50 bg-[#F8FAFC] flex items-center justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              console.log("Order Submitted Successfully");
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl bg-[#3B81B7] hover:bg-[#2c638c] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
          >
            Submit Order
          </button>
        </div>

      </div>
    </div>
  );
}