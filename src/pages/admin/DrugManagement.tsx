import React, { useState } from 'react';
import { Search, Plus, ChevronDown, Edit2, Trash2, Pill } from 'lucide-react';
import AddEditDrugModal from './AddEditDrugModal'; // استدعاء المودال الذكي هنا

interface Drug {
  name: string;
  scientific: string;
  price: string;
  quantity: number;
  minThreshold: number;
  concentration?: string;
}

export default function DrugManagement() {
  // الـ States الخاصة بالتحكم بالمودال والبيانات الممررة له
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

  // داتا الأدوية المطابقة تماماً لصورة الجدول المرفق image_4e3623.jpg
  const [drugsCatalog, setDrugsCatalog] = useState<Drug[]>([
    { name: 'Panadol', scientific: 'Paracetamol', price: '50 EGP', quantity: 150, minThreshold: 50 },
    { name: 'Augmentin', scientific: 'Amoxicillin + Clavulanic Acid', price: '120 EGP', quantity: 0, minThreshold: 30 },
    { name: 'Brufen', scientific: 'Ibuprofen', price: '75 EGP', quantity: 5, minThreshold: 50 },
    { name: 'Amoxil', scientific: 'Amoxicillin', price: '95 EGP', quantity: 120, minThreshold: 40 },
    { name: 'Metformin', scientific: 'Metformin HCl', price: '60 EGP', quantity: 180, minThreshold: 80 },
    { name: 'Aspirin', scientific: 'Acetylsalicylic Acid', price: '30 EGP', quantity: 15, minThreshold: 60 },
    { name: 'Lipitor', scientific: 'Atorvastatin', price: '140 EGP', quantity: 85, minThreshold: 30 },
    { name: 'Nexium', scientific: 'Esomeprazole', price: '110 EGP', quantity: 0, minThreshold: 25 },
  ]);

  // دالة حساب البادج اللوني ديناميكياً حسب الكمية والـ Threshold
  const getStockStatus = (quantity: number, minThreshold: number) => {
    if (quantity === 0) return { label: 'Out of Stock', style: 'bg-rose-50 text-rose-600 border border-rose-100/50' };
    if (quantity <= minThreshold) return { label: 'Low Stock', style: 'bg-amber-50 text-amber-600 border border-amber-100/50' };
    return { label: 'In Stock', style: 'bg-emerald-50 text-emerald-600 border border-emerald-100/50' };
  };

  // دالة تشغيل وضع الإضافة
  const handleAddClick = () => {
    setSelectedDrug(null);
    setIsModalOpen(true);
  };

  // دالة تشغيل وضع التعديل وتثبيت الداتا المختارة
  const handleEditClick = (drug: Drug) => {
    setSelectedDrug(drug);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* الـ Top Header المطور */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1b2a49]">Drug Management</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">Manage your pharmacy's drug inventory and information.</p>
        </div>
        <button 
          onClick={handleAddClick}
          className="flex items-center justify-center gap-2 bg-[#3B81B7] hover:bg-[#2c638c] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus size={16} /> Add Drug
        </button>
      </div>

      {/* شريط الفلاتر والبحث الذكي المتجاوب */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(27,42,73,0.02)] overflow-hidden">
        <div className="p-5 border-b border-slate-50 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by drug name or scientific name..." 
              className="w-full bg-[#F8FAFC] border border-transparent rounded-full py-2.5 pl-11 pr-4 text-xs font-medium text-[#1b2a49] focus:outline-none focus:bg-white focus:border-slate-200 transition-all placeholder:text-slate-400"
            />
          </div>
          
          <div className="relative w-full sm:w-auto">
            <select className="w-full sm:w-auto bg-[#F8FAFC] text-slate-600 text-xs font-bold border border-slate-100 rounded-full py-2.5 pl-4 pr-10 appearance-none focus:outline-none transition-all cursor-pointer">
              <option>All Stack Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          </div>
        </div>

        {/* الجدول الاحترافي العالي الحركية والـ Responsiveness */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none">
                <th className="py-3 px-6">Drug Name</th>
                <th className="py-3 px-6">Scientific Name</th>
                <th className="py-3 px-6">Price</th>
                <th className="py-3 px-6">Quantity</th>
                <th className="py-3 px-6">Min Threshold</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm font-medium text-[#1b2a49]">
              {drugsCatalog.map((drug, idx) => {
                const status = getStockStatus(drug.quantity, drug.minThreshold);
                return (
                  <tr key={idx} className="hover:bg-slate-50/40 transition-colors">
                    {/* الاسم التجاري مع أيقونة الكبسولة الموحدة */}
                    <td className="py-4 px-6 font-bold text-[#1b2a49]">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center text-[#3B81B7]">
                          <Pill size={13} />
                        </div>
                        {drug.name}
                      </div>
                    </td>
                    
                    {/* الاسم العلمي الفخم */}
                    <td className="py-4 px-6 text-xs text-slate-400 font-medium italic">{drug.scientific}</td>
                    
                    {/* السعر */}
                    <td className="py-4 px-6 font-bold text-slate-700">{drug.price}</td>
                    
                    {/* الكمية */}
                    <td className="py-4 px-6 font-semibold text-slate-600">{drug.quantity}</td>
                    
                    {/* الحد الأدنى للنواقص */}
                    <td className="py-4 px-6 text-slate-400 font-semibold">{drug.minThreshold}</td>
                    
                    {/* البادج اللوني المعتمد بالبكسل */}
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold inline-block ${status.style}`}>
                        {status.label}
                      </span>
                    </td>
                    
                    {/* أزرار التحكم الفعالة بالتعديل والحذف */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button 
                          onClick={() => handleEditClick(drug)}
                          className="text-slate-400 hover:text-blue-600 p-1 rounded-md transition-colors cursor-pointer" 
                          title="Edit Drug Info"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button 
                          className="text-slate-400 hover:text-rose-600 p-1 rounded-md transition-colors cursor-pointer" 
                          title="Delete From Catalog"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* الـ Pagination الموحد في التصميم التحتاني */}
        <div className="p-4 bg-white border-t border-slate-50 flex items-center justify-between text-xs font-bold text-slate-400 select-none">
          <span>Showing 1 to 8 of 8 entries</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-lg border border-slate-100 bg-slate-50/50 text-slate-400 cursor-not-allowed">Previous</button>
            <button className="px-3 py-1.5 rounded-lg bg-[#3B81B7] text-white">1</button>
            <button className="px-3 py-1.5 rounded-lg border border-slate-100 text-[#1b2a49] hover:bg-slate-50 transition-colors">2</button>
            <button className="px-3 py-1.5 rounded-lg border border-slate-100 text-[#1b2a49] hover:bg-slate-50 transition-colors">Next</button>
          </div>
        </div>

      </div>

      {/* 🌟 استدعاء الـ Modal وتلقين الداتا التعديلية أو الإضافية له */}
      <AddEditDrugModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        drugToEdit={selectedDrug}
      />

    </div>
  );
}