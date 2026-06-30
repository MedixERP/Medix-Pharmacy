import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../../components/shared/SEOHead';

interface DrugData {
  id: string;
  name: string;
  scientific: string;
  concentration: string;
  price: string;
  quantity: number;
  minThreshold: number;
}

interface AddEditDrugProps {
  drugToEdit: DrugData | null; // لو قيمته null يعني الحالة "Add New Drug" تلقائياً
  onBack: () => void;         // الدالة المسؤولة عن الرجوع لجدول الأدوية
}

export default function AddEditDrug({ drugToEdit, onBack }: AddEditDrugProps) {
  const isEditMode = !!drugToEdit;

  // الحقول المتوافقة تماماً مع الفيجما
  const [formData, setFormData] = useState({
    name: '',
    scientific: '',
    concentration: '',
    price: '',
    quantity: '',
    minThreshold: ''
  });

  // ملء البيانات تلقائياً في حالة التعديل من الجدول
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
  }, [drugToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(isEditMode ? 'Updating Drug Data:' : 'Saving New Drug:', formData);
    onBack(); // العودة للجدول بعد الحفظ
  };

  return (
    // الصفحة كلها بقت flex column في النص (items-center) عشان الفورم يفضل في سنتر الشاشة
    // والمسافات الموحدة لسه زي ما هي: 30px من فوق و 25px من الجوانب
    <div className="animate-in fade-in duration-300 text-left relative pt-[30px] px-[25px] space-y-4 flex flex-col items-center">
      <SEOHead 
        title={isEditMode ? "Edit Drug" : "Add New Drug"} 
        description="Medix Drug Inventory Form - Modify catalog pricing, concentrations, and baseline notification thresholds." 
      />

      {/* ⬅️ زر العودة لجدول الأدوية - بنفس عرض الفورم (896px) عشان يبان متراكب فوق الفورم في النص، مش لاصق في الحيط */}
      <div className="w-full max-w-[896px]">
        <button 
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-950 text-base font-normal font-['SF_Pro_Rounded'] leading-5 transition-colors cursor-pointer select-none"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          <span>Back to Drug List</span>
        </button>
      </div>

      {/* 📦 حاوية الفورم الرئيسية المصممة بـ shadow وتحديداً rounded-2xl كالتصميم الفعلي - دلوقتي في نص الصفحة افقياً */}
      <div className="w-full max-w-[896px] bg-white rounded-2xl shadow-[0px_4px_16px_0px_rgba(59,129,183,0.15)] border border-slate-100 overflow-hidden flex flex-col">
        
        {/* هيدر نص البيانات الداخلي للفورم */}
        <div className="p-8 pb-4 flex flex-col gap-2 select-none">
          <h2 
            className="text-blue-950 text-3xl font-bold leading-10"
            style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}
          >
            {isEditMode ? 'Edit Drug' : 'Add New Drug'}
          </h2>
          <p 
            className="text-gray-500 text-base font-normal leading-6"
            style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}
          >
            {isEditMode ? 'Update drug information and inventory details.' : 'Fill in the drug information to add it to the inventory.'}
          </p>
        </div>

        {/* نموذج الإدخال الهيكلي */}
        <form onSubmit={handleSubmit} className="p-8 pt-4 space-y-6">
          
          {/* Row 1: Drug Name & Scientific Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 font-['SF_Pro_Rounded'] flex items-center gap-1 select-none">
                Drug Name <span className="text-red-500 font-bold">*</span>
              </label>
              <input 
                type="text"
                required
                placeholder="Enter drug name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-2xl text-base font-normal text-slate-700 font-['SF_Pro_Rounded'] focus:outline-none focus:border-cyan-600 transition-all placeholder:text-gray-400/80 shadow-2xs"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 font-['SF_Pro_Rounded'] flex items-center gap-1 select-none">
                Scientific Name <span className="text-red-500 font-bold">*</span>
              </label>
              <input 
                type="text"
                required
                placeholder="Enter scientific name"
                value={formData.scientific}
                onChange={(e) => setFormData({...formData, scientific: e.target.value})}
                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-2xl text-base font-normal text-slate-700 font-['SF_Pro_Rounded'] focus:outline-none focus:border-cyan-600 transition-all placeholder:text-gray-400/80 shadow-2xs"
              />
            </div>
          </div>

          {/* Row 2: Concentration & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 font-['SF_Pro_Rounded'] flex items-center gap-1 select-none">
                Concentration <span className="text-red-500 font-bold">*</span>
              </label>
              <input 
                type="text"
                required
                placeholder="e.g., 500mg, 10ml"
                value={formData.concentration}
                onChange={(e) => setFormData({...formData, concentration: e.target.value})}
                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-2xl text-base font-normal text-slate-700 font-['SF_Pro_Rounded'] focus:outline-none focus:border-cyan-600 transition-all placeholder:text-gray-400/80 shadow-2xs"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 font-['SF_Pro_Rounded'] flex items-center gap-1 select-none">
                Price <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="relative">
                <input 
                  type="number"
                  required
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full h-12 px-4 bg-white border border-gray-200 rounded-2xl text-base font-normal text-slate-700 font-['SF_Pro_Rounded'] focus:outline-none focus:border-cyan-600 transition-all placeholder:text-gray-400/80 pr-14 shadow-2xs"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-base font-normal text-gray-400 pointer-events-none select-none font-['SF_Pro_Rounded']">EGP</span>
              </div>
            </div>
          </div>

          {/* Row 3: Quantity & Minimum Quantity (Threshold) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 font-['SF_Pro_Rounded'] flex items-center gap-1 select-none">
                Quantity <span className="text-red-500 font-bold">*</span>
              </label>
              <input 
                type="number"
                required
                placeholder="Enter quantity"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-2xl text-base font-normal text-slate-700 font-['SF_Pro_Rounded'] focus:outline-none focus:border-cyan-600 transition-all placeholder:text-gray-400/80 shadow-2xs"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 font-['SF_Pro_Rounded'] flex items-center gap-1 select-none">
                Minimum Quantity (Threshold) <span className="text-red-500 font-bold">*</span>
              </label>
              <input 
                type="number"
                required
                placeholder="Enter minimum quantity"
                value={formData.minThreshold}
                onChange={(e) => setFormData({...formData, minThreshold: e.target.value})}
                className="w-full h-12 px-4 bg-white border border-gray-200 rounded-2xl text-base font-normal text-slate-700 font-['SF_Pro_Rounded'] focus:outline-none focus:border-cyan-600 transition-all placeholder:text-gray-400/80 shadow-2xs"
              />
            </div>
          </div>

          {/* 🛠️ أسفل الفورم المطور بالأزرار المطابقة لكل حالة بالبكسل الصريح من التبويب الصوري */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {isEditMode ? (
                <button 
                  type="button"
                  onClick={() => { console.log('Drug Deleted'); onBack(); }}
                  className="w-full sm:w-auto bg-[#E74C3C] hover:bg-red-600 text-white font-bold text-base px-5 py-2.5 rounded-2xl shadow-[0px_4px_12px_0px_rgba(231,76,60,0.3)] transition-all cursor-pointer active:scale-95 font-['SF_Pro_Rounded']"
                >
                  Delete Drug
                </button>
              ) : (
                <div className="hidden sm:block" /> // الحفاظ على التوازن البصري عند الإضافة فقط
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-end">
              {isEditMode && (
                <button 
                  type="button"
                  onClick={onBack}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-2xl border border-gray-200 text-base font-normal text-gray-500 bg-white hover:bg-slate-50 transition-colors cursor-pointer font-['SF_Pro_Rounded']"
                >
                  Cancel
                </button>
              )}
              <button 
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-br from-cyan-600 to-blue-400 text-white text-base font-bold px-5 py-2.5 rounded-2xl shadow-[0px_4px_12px_0px_rgba(59,129,183,0.30)] transition-all transform active:scale-95 cursor-pointer font-['SF_Pro_Rounded']"
              >
                Save Drug
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}