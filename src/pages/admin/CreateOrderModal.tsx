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
    // الخلفية المعتمة والشفافة مع تأثير البلوو الناعم المطابق تماماً للفيجما
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* البوكس الرئيسي الاحترافي المعتمد على زوايا دائرية 2xl (16px) وظلال الفيجما الصريحة */}
      <div className="bg-white rounded-2xl w-full max-w-[620px] shadow-[0px_20px_40px_0px_rgba(59,129,183,0.30)] overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        
        {/* هيدر الـ Modal (Create Purchase Order) مع الـ border السفلي الرمادي الخفيف كالتصميم الفعلي */}
        <div className="h-16 px-6 border-b border-gray-200 flex items-center justify-between select-none shrink-0">
          <h2 
            className="text-xl font-bold text-slate-700 font-['SF_Pro_Rounded'] leading-8"
          >
            Create Purchase Order
          </h2>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 text-gray-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl transition-all cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* محتوى الاستمارة القابل للتمرير المرن على شاشات الموبايل */}
        <div className="p-6 overflow-y-auto space-y-6 text-left">
          
          {/* Step 1: Select Drugs */}
          <div className="space-y-3">
            <label className="text-base font-bold text-slate-700 font-['SF_Pro_Rounded'] leading-6 block select-none">
              Step 1: Select Drugs
            </label>
            <div className="relative h-12">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search drug..." 
                className="w-full h-12 bg-gray-50 border border-gray-200 rounded-[10px] py-3 pl-12 pr-4 text-base font-normal text-slate-800 font-['SF_Pro_Rounded'] focus:outline-none focus:border-cyan-600 focus:bg-white transition-all placeholder:text-gray-400"
              />
            </div>

            {/* الحاوية الهيكلية للأدوية المنتقاة بالتفصيل اللوني الأزرق الفخم للـ bg-sky-100 */}
            <div className="space-y-3 p-4 rounded-[10px] border border-gray-200">
              <span className="text-sm font-normal text-gray-500 font-['SF_Pro_Rounded'] leading-5 block select-none">
                Selected (2):
              </span>
              
              <div className="flex items-center gap-3 h-11 px-3 bg-sky-100 rounded-[10px]">
                <input 
                  type="checkbox" 
                  defaultChecked 
                  className="w-4 h-4 text-blue-950 border-gray-300 rounded focus:ring-blue-950 accent-blue-950 cursor-pointer" 
                />
                <span className="text-sm font-normal text-slate-700 font-['SF_Pro_Rounded'] leading-5">
                  {initialDrugName || 'Panadol'} - 200 units
                </span>
              </div>

              <div className="flex items-center gap-3 h-11 px-3 bg-sky-100 rounded-[10px]">
                <input 
                  type="checkbox" 
                  defaultChecked 
                  className="w-4 h-4 text-blue-950 border-gray-300 rounded focus:ring-blue-950 accent-blue-950 cursor-pointer" 
                />
                <span className="text-sm font-normal text-slate-700 font-['SF_Pro_Rounded'] leading-5">
                  Brufen - 100 units
                </span>
              </div>
            </div>
          </div>

          {/* Step 2: Select Supplier */}
          <div className="space-y-3">
            <label className="text-base font-bold text-slate-700 font-['SF_Pro_Rounded'] leading-6 block select-none">
              Step 2: Select Supplier
            </label>
            <div className="relative h-12">
              <select className="w-full h-12 bg-white border border-gray-200 rounded-2xl py-2 pl-4 pr-10 text-sm font-medium text-gray-500 font-['SF_Pro_Rounded'] appearance-none focus:outline-none focus:border-cyan-600 transition-all cursor-pointer">
                <option value="">Choose a Supplier....</option>
                <option value="amoun">Amoun Pharmaceutical</option>
                <option value="eva">Eva Pharma</option>
                <option value="novartis">Novartis</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Step 3: Order Notes */}
          <div className="space-y-3">
            <label className="text-base font-bold text-slate-700 font-['SF_Pro_Rounded'] leading-6 block select-none">
              Step 3: Order Notes (Optional)
            </label>
            <textarea 
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter order notes..." 
              className="w-full bg-gray-50 border border-gray-200 rounded-[10px] p-4 text-base font-normal text-slate-800 font-['SF_Pro_Rounded'] leading-6 focus:outline-none focus:border-cyan-600 focus:bg-white transition-all placeholder:text-gray-400 resize-none shadow-2xs"
            />
          </div>

          {/* 📋 ملخص الفاتورة والحسابات المالية (Order Summary) المعتمد بلونه الرمادي والخط العريض للمجموع */}
          <div className="bg-slate-100 rounded-2xl p-5 space-y-3">
            <h4 className="text-base font-bold text-slate-700 font-['SF_Pro_Rounded'] leading-6 select-none flex items-center gap-2">
              📋 Order Summary
            </h4>
            
            <div className="space-y-2 text-sm font-normal text-gray-500 font-['SF_Pro_Rounded'] leading-5">
              <div className="flex justify-between items-center">
                <span>{initialDrugName || 'Panadol'} × 200</span>
                <span className="font-bold text-slate-700">4,000 EGP</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Brufen × 100</span>
                <span className="font-bold text-slate-700 font-['Arimo']">3,500 EGP</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-3 flex justify-between items-center select-none">
              <span className="text-base font-bold text-slate-700 font-['SF_Pro_Rounded'] leading-6">Total:</span>
              <span className="text-lg font-bold text-emerald-600 font-['SF_Pro_Rounded'] leading-7">7,500 EGP</span>
            </div>
          </div>

        </div>

        {/* فوتر الاستمارة المدمج بأزرار إرسال الحفظ والإلغاء بالتدرج المعتمد */}
        <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-end gap-3 shrink-0 select-none">
          <button 
            type="button"
            onClick={onClose}
            className="w-24 h-11 bg-white border border-gray-200 rounded-2xl text-sm font-bold text-gray-500 font-['SF_Pro_Rounded'] leading-5 shadow-[0px_1px_1px_0px_rgba(0,0,0,0.25)] hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button 
            type="button"
            onClick={() => {
              console.log("Order Submitted Successfully");
              onClose();
            }}
            className="w-32 h-11 bg-gradient-to-br from-cyan-600 to-blue-400 rounded-2xl shadow-[0px_3px_8px_0px_rgba(59,129,183,0.30)] text-white text-sm font-bold font-['SF_Pro_Rounded'] leading-5 transition-all transform active:scale-95 cursor-pointer"
          >
            Submit Order
          </button>
        </div>

      </div>
    </div>
  );
}