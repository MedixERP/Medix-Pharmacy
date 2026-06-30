import React, { useState } from 'react';
import { ArrowLeft, Search, ChevronDown, ShoppingBag, Plus, Trash2 } from 'lucide-react';
import SEOHead from '../../components/shared/SEOHead';

interface DrugItem {
  id: string;
  name: string;
  scientific: string;
  price: number;
}

interface SelectedItem extends DrugItem {
  qty: number;
}

interface CreateOrderProps {
  onBack: () => void; // دالة العودة لشاشة جدول طلبات الشراء الرئيسية
}

export default function CreateOrder({ onBack }: CreateOrderProps) {
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  // موك داتا للأدوية المتاحة للبحث عنها وإضافتها
  const availableDrugs: DrugItem[] = [
    { id: '1', name: 'Panadol Extra', scientific: 'Paracetamol', price: 20 },
    { id: '2', name: 'Brufen 600mg', scientific: 'Ibuprofen', price: 35 },
    { id: '3', name: 'Augmentin 1g', scientific: 'Amoxicillin', price: 106 },
    { id: '4', name: 'Metformin HCl', scientific: 'Metformin', price: 30 },
  ];

  // تصفية الأدوية بناءً على جملة البحث
  const filteredDrugs = availableDrugs.filter(drug =>
    drug.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    drug.scientific.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // إضافة دواء إلى الفاتورة
  const handleAddDrug = (drug: DrugItem) => {
    setSelectedItems(prev => {
      const exists = prev.find(item => item.id === drug.id);
      if (exists) {
        return prev.map(item => item.id === drug.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...drug, qty: 1 }];
    });
    setSearchQuery(''); // تفريغ الخانة بعد الإضافة
  };

  // تعديل الكمية داخل الفاتورة
  const handleQtyChange = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
      return;
    }
    setSelectedItems(prev => prev.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  // حذف دواء من الفاتورة
  const handleRemoveItem = (id: string) => {
    setSelectedItems(prev => prev.filter(item => item.id !== id));
  };

  // العمليات الحسابية لملخص الطلب (Order Summary)
  const totalItems = selectedItems.length;
  const totalUnits = selectedItems.reduce((acc, item) => acc + item.qty, 0);
  const totalAmount = selectedItems.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSupplier) return;
    console.log('Submitting Purchase Order:', {
      supplier: selectedSupplier,
      items: selectedItems,
      totalAmount
    });
    onBack(); // العودة للجدول بعد الحفظ بنجاح
  };

  return (
    <div className="animate-in fade-in duration-300 text-left relative pt-[30px] px-[25px] space-y-4">
      <SEOHead 
        title="Create Purchase Order" 
        description="Medix Supply Chain - Generate a new comprehensive pharmacy purchase order and synchronize wholesale ledger items." 
      />

      {/* ⬅️ زر العودة الذكي المطابق للفيجما الفعلي في image_7ffa91.jpg */}
      <button 
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-950 text-base font-normal font-['SF_Pro_Rounded'] leading-5 transition-colors cursor-pointer select-none"
      >
        <ArrowLeft size={18} strokeWidth={2.5} />
        <span>Back to Drug List</span>
      </button>

      {/* 📦 الحاوية البيضاء الرئيسية العريضة المحددة بالظلال والـ Outline المعتمد */}
      <div className="w-full max-w-[992px] bg-white rounded-2xl shadow-[0px_4px_16px_0px_rgba(59,129,183,0.30)] border border-slate-100 p-7 flex flex-col gap-8">
        
        {/* هيدر العناوين العلوي المدمج داخل الكارد */}
        <div className="flex flex-col gap-2 select-none">
          <h2 className="text-blue-950 text-3xl font-bold font-['SF_Pro_Rounded'] leading-10">
            Create Purchase Order
          </h2>
          <p className="text-gray-500 text-base font-normal font-['SF_Pro_Rounded'] leading-6">
            Create a new purchase order for your pharmacy inventory.
          </p>
        </div>

        {/* تقسيم المحتوى إلى عمودين متناسقين هندسياً للمتصفح والموبايل */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
          
          {/* الجانب الأيمن والأعرض: المدخلات والبحث واختيار الأدوية */}
          <div className="lg:col-span-2 space-y-6 w-full">
            
            {/* 1. قائمة اختيار المورد الصريحة بالـ Asterisk الأحمر */}
            <div className="bg-white p-6 rounded-2xl border border-gray-300/70 flex flex-col gap-3">
              <label className="text-slate-700 text-base font-bold font-['SF_Pro_Rounded'] flex items-center gap-1 select-none">
                Select Supplier <span className="text-red-500 font-bold">*</span>
              </label>
              <div className="relative h-12">
                <select 
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  className="w-full h-12 bg-white border border-gray-200 rounded-2xl py-2 pl-4 pr-10 text-sm font-medium text-gray-500 font-['SF_Pro_Rounded'] appearance-none focus:outline-none focus:border-cyan-600 transition-all cursor-pointer shadow-2xs"
                >
                  <option value="">Choose a Supplier....</option>
                  <option value="Eva Pharma">Eva Pharma</option>
                  <option value="Spimaco">Spimaco</option>
                  <option value="GlaxoSmithKline">GlaxoSmithKline</option>
                  <option value="Novartis">Novartis</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
            </div>

            {/* 2. حاوية البحث وإضافة الأدوية الذكية */}
            <div className="bg-white p-6 rounded-2xl border border-gray-300/70 flex flex-col gap-4 relative">
              <h3 className="text-blue-950 text-lg font-bold font-['SF_Pro_Rounded'] leading-7 select-none">
                Add Medicines
              </h3>
              <div className="relative h-12">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for drugs to add..." 
                  className="w-full h-12 bg-white border border-gray-200 rounded-2xl py-2.5 pl-12 pr-4 text-sm font-normal text-slate-700 font-['SF_Pro_Rounded'] focus:outline-none focus:border-cyan-600 transition-all placeholder:text-gray-400"
                />
              </div>

              {/* القائمة المنسدلة الديناميكية النظيفة لنتائج البحث الفوري */}
              {searchQuery && (
                <div className="absolute left-6 right-6 top-24 bg-white border border-gray-200 rounded-xl shadow-xl max-h-48 overflow-y-auto z-10 divide-y divide-slate-100">
                  {filteredDrugs.length > 0 ? (
                    filteredDrugs.map(drug => (
                      <button
                        key={drug.id}
                        type="button"
                        onClick={() => handleAddDrug(drug)}
                        className="w-full p-3 text-left hover:bg-slate-50 flex items-center justify-between text-sm font-['SF_Pro_Rounded'] transition-colors"
                      >
                        <div>
                          <p className="font-bold text-slate-700">{drug.name}</p>
                          <p className="text-xs text-gray-400">{drug.scientific}</p>
                        </div>
                        <span className="text-xs bg-sky-100 text-cyan-600 px-2.5 py-1 rounded-lg font-bold flex items-center gap-1">
                          <Plus size={12} /> {drug.price} EGP
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="p-4 text-xs text-center text-gray-400 font-['SF_Pro_Rounded']">No drugs found matching criteria.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* الجانب الأيسر: كارد ملخص الطلب (Order Summary) المعتمد هندسياً بالبكسل */}
          <div className="bg-white p-6 rounded-2xl border border-gray-300 w-full flex flex-col justify-between min-h-[380px]">
            <div className="space-y-6 w-full">
              <h3 className="text-blue-950 text-xl font-bold font-['SF_Pro_Rounded'] leading-8 border-b border-gray-100 pb-3 select-none">
                Order Summary
              </h3>
              
              <div className="flex flex-col gap-4 text-sm font-['SF_Pro_Rounded'] w-full">
                <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                  <span className="text-gray-500 font-normal">Supplier</span>
                  <span className="font-bold text-slate-700 max-w-[140px] truncate">
                    {selectedSupplier || 'Not selected'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                  <span className="text-gray-500 font-normal">Total Items</span>
                  <span className="text-2xl font-bold text-cyan-600 leading-9">{totalItems}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500 font-normal">Total Units</span>
                  <span className="text-lg font-bold text-slate-700 leading-7">{totalUnits}</span>
                </div>
              </div>
            </div>

            {/* الأزرار ونصوص التوجيه التحذيرية التحتانية للكارد الجانبي */}
            <div className="pt-6 space-y-3 w-full">
              <button 
                type="button"
                disabled={!selectedSupplier || selectedItems.length === 0}
                onClick={handleSubmit}
                className={`w-full h-12 text-center text-base font-bold font-['SF_Pro_Rounded'] leading-6 rounded-2xl transition-all transform active:scale-95 shadow-md
                  ${(selectedSupplier && selectedItems.length > 0)
                    ? 'bg-gradient-to-br from-cyan-600 to-blue-400 text-white shadow-[0px_4px_12px_0px_rgba(59,129,183,0.30)] cursor-pointer' 
                    : 'bg-gray-400 text-white opacity-50 cursor-not-allowed shadow-none'
                  }`}
              >
                Submit Order
              </button>
              {!selectedSupplier ? (
                <p className="text-center text-gray-500 text-xs font-normal font-['SF_Pro_Rounded'] leading-4 select-none">
                  Please select a supplier
                </p>
              ) : selectedItems.length === 0 ? (
                <p className="text-center text-amber-500 text-xs font-normal font-['SF_Pro_Rounded'] leading-4 select-none">
                  Please add at least one medicine
                </p>
              ) : (
                <p className="text-center text-emerald-600 text-xs font-bold font-['SF_Pro_Rounded'] leading-4 select-none">
                  Est. Total: <span className="text-sm font-black">{totalAmount.toLocaleString()} EGP</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 3. ديف استعراض وعرض العناصر المضافة للفاتورة في الأسفل (Order Items) */}
        <div className="w-full bg-white rounded-2xl border border-gray-300 flex flex-col overflow-hidden min-h-[280px]">
          <div className="p-6 border-b border-gray-200 select-none text-left w-full">
            <h3 className="text-blue-950 text-lg font-bold font-['SF_Pro_Rounded'] leading-7">
              Order Items
            </h3>
          </div>

          {selectedItems.length > 0 ? (
            // عرض جدول الأدوية المضافة للفاتورة بروعة تامة
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse font-['SF_Pro_Rounded']">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-gray-400 uppercase tracking-wider h-11">
                    <th className="py-2 px-6">Medicine Name</th>
                    <th className="py-2 px-6">Price Per Unit</th>
                    <th className="py-2 px-6 text-center">Quantity</th>
                    <th className="py-2 px-6">Total Cost</th>
                    <th className="py-2 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700 font-medium">
                  {selectedItems.map(item => (
                    <tr key={item.id} className="h-16 hover:bg-slate-50/40 transition-colors">
                      <td className="px-6 font-bold text-slate-800">{item.name}</td>
                      <td className="px-6 text-gray-500">{item.price} EGP</td>
                      <td className="px-6 text-center">
                        <div className="inline-flex items-center gap-2 bg-slate-100 px-2 py-1 rounded-xl">
                          <button type="button" onClick={() => handleQtyChange(item.id, item.qty - 1)} className="font-bold text-gray-500 hover:text-blue-950 px-1 text-base">-</button>
                          <span className="min-w-[24px] font-black text-slate-800">{item.qty}</span>
                          <button type="button" onClick={() => handleQtyChange(item.id, item.qty + 1)} className="font-bold text-gray-500 hover:text-blue-950 px-1 text-base">+</button>
                        </div>
                      </td>
                      <td className="px-6 font-bold text-slate-700">{(item.price * item.qty).toLocaleString()} EGP</td>
                      <td className="px-6 text-center">
                        <button type="button" onClick={() => handleRemoveItem(item.id)} className="text-gray-400 hover:text-red-500 p-1 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            // عرض الحالة الفارغة الافتراضية للفيجما بالمللي
            <div className="p-12 flex flex-col items-center justify-center text-center space-y-4 flex-1">
              <div className="size-16 bg-slate-100 rounded-2xl flex items-center justify-center text-gray-500 shadow-2xs">
                <ShoppingBag size={32} strokeWidth={1.5} />
              </div>
              <p className="text-gray-500 text-base font-normal font-['SF_Pro_Rounded'] leading-6 select-none max-w-sm">
                No items added yet. Search and add medicines above.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}