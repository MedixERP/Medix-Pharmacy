import React, { useState } from 'react';
import { Search, ChevronDown, Calendar, Eye, Plus, ArrowLeft, ShoppingBag, Truck } from 'lucide-react';

interface Order {
  id: string;
  supplier: string;
  date: string;
  itemsCount: string;
  status: 'Delivered' | 'Shipped' | 'Approved' | 'Pending';
}

export default function PurchaseOrders() {
  // تتبع ما إذا كنا في شاشة عرض الجدول أم شاشة إنشاء طلب جديد
  const [isCreating, setIsCreating] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState('');

  // داتا الجدول المطابقة لـ image_4e3e3f.jpg
  const ordersList: Order[] = [
    { id: 'PO-2026-001', supplier: 'Eva Pharma', date: 'Jan 28, 2026', itemsCount: '5 items', status: 'Delivered' },
    { id: 'PO-2026-002', supplier: 'Spimaco', date: 'Jan 29, 2026', itemsCount: '3 items', status: 'Shipped' },
    { id: 'PO-2026-003', supplier: 'GlaxoSmithKline', date: 'Jan 30, 2026', itemsCount: '8 items', status: 'Approved' },
    { id: 'PO-2026-004', supplier: 'Pfizer', date: 'Jan 30, 2026', itemsCount: '4 items', status: 'Pending' },
    { id: 'PO-2026-005', supplier: 'Eva Pharma', date: 'Jan 27, 2026', itemsCount: '6 items', status: 'Delivered' },
    { id: 'PO-2026-006', supplier: 'Novartis', date: 'Jan 29, 2026', itemsCount: '2 items', status: 'Approved' },
  ];

  const getStatusStyle = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
      case 'Shipped': return 'bg-purple-50 text-purple-600 border border-purple-100';
      case 'Approved': return 'bg-blue-50 text-blue-600 border border-blue-100';
      case 'Pending': return 'bg-amber-50 text-amber-600 border border-amber-100';
    }
  };

  // 1️⃣ الشاشة الأولى: شاشة إنشاء طلب جديد (Create Purchase Order) المطابقة لـ image_4e412b.jpg
  if (isCreating) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        {/* زر العودة الذكي لخلفية القائمة */}
        <button 
          onClick={() => setIsCreating(false)}
          className="flex items-center gap-2 text-slate-400 hover:text-[#1b2a49] text-xs font-bold transition-colors cursor-pointer select-none"
        >
          <ArrowLeft size={16} /> Back to Drug List
        </button>

        <div>
          <h1 className="text-2xl font-bold text-[#1b2a49]">Create Purchase Order</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">Create a new purchase order for your pharmacy inventory.</p>
        </div>

        {/* تقسيم الشاشة إلى قسمين كالتصميم الفعلي */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* الجانب الأيسر: المدخلات واختيار الأدوية */}
          <div className="lg:col-span-2 space-y-6">
            {/* كارت المورد */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(27,42,73,0.01)] space-y-3">
              <label className="text-xs font-bold text-[#1b2a49]">Select Supplier <span className="text-rose-500">*</span></label>
              <div className="relative">
                <select 
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-slate-100 rounded-xl py-3 px-4 text-sm font-medium text-[#1b2a49] appearance-none focus:outline-none focus:bg-white focus:border-slate-200 transition-all cursor-pointer"
                >
                  <option value="">Choose a Supplier....</option>
                  <option value="Eva Pharma">Eva Pharma</option>
                  <option value="Spimaco">Spimaco</option>
                  <option value="GlaxoSmithKline">GlaxoSmithKline</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>

            {/* كارت البحث عن الأدوية لإضافتها للفاتورة */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(27,42,73,0.01)] space-y-3">
              <label className="text-xs font-bold text-[#1b2a49]">Add Medicines</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search for drugs to add..." 
                  className="w-full bg-[#F8FAFC] border border-slate-100 focus:border-slate-200 focus:bg-white rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-[#1b2a49] focus:outline-none transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* كارت استعراض الأدوية المضافة (فارغ حالياً كالتصميم) */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(27,42,73,0.01)] overflow-hidden">
              <div className="p-4 border-b border-slate-50">
                <h3 className="text-xs font-bold text-[#1b2a49]">Order Items</h3>
              </div>
              <div className="p-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag size={20} />
                </div>
                <p className="text-xs text-slate-400 font-medium">No items added yet. Search and add medicines above.</p>
              </div>
            </div>
          </div>

          {/* الجانب الأيمن: ملخص الفاتورة وإرسال الطلب (Order Summary) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(27,42,73,0.01)] space-y-5">
            <h3 className="text-sm font-bold text-[#1b2a49]">Order Summary</h3>
            
            <div className="space-y-4 text-xs font-semibold text-slate-400 border-b border-slate-100 pb-4">
              <div className="flex justify-between">
                <span>Supplier</span>
                <span className="text-[#1b2a49] font-bold">{selectedSupplier || 'Not selected'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Items</span>
                <span className="text-xl font-black text-[#1b2a49]">0</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Total Units</span>
                <span className="text-xl font-black text-[#1b2a49]">0</span>
              </div>
            </div>

            <button 
              disabled={!selectedSupplier}
              className={`w-full py-3 rounded-xl text-xs font-bold text-center shadow-xs transition-all tracking-wide font-medium
                ${selectedSupplier 
                  ? 'bg-[#3B81B7] hover:bg-[#2c638c] text-white cursor-pointer' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
            >
              Submit Order
            </button>
            {!selectedSupplier && (
              <p className="text-[10px] text-center text-slate-400 font-medium">Please select a supplier</p>
            )}
          </div>

        </div>
      </div>
    );
  }

  // 2️⃣ الشاشة الثانية: شاشة استعراض الجدول الرئيسي (جدول الـ 8 عناصر) المطابقة لـ image_4e3e3f.jpg
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* التوب هيدر وزر الإضافة */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1b2a49]">Purchase Orders</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">Manage and track all pharmacy purchase orders.</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center justify-center gap-2 bg-[#3B81B7] hover:bg-[#2c638c] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xs transition-all cursor-pointer self-start sm:self-auto select-none"
        >
          <Plus size={16} /> Create Order
        </button>
      </div>

      {/* شريط الفلاتر والتوقيت الزمني من الفيجما */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Status</span>
          <div className="relative">
            <select className="w-full bg-white border border-slate-100 rounded-xl py-2.5 px-4 text-xs font-bold text-slate-500 appearance-none focus:outline-none cursor-pointer shadow-2xs">
              <option>All Status</option>
              <option>Delivered</option>
              <option>Shipped</option>
              <option>Approved</option>
              <option>Pending</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          </div>
        </div>

        <div className="sm:col-span-2 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Date Range</span>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input type="text" placeholder="MM/DD/YYYY" className="w-full bg-white border border-slate-100 rounded-xl py-2.5 px-4 pl-10 text-xs font-medium text-slate-600 focus:outline-none shadow-2xs" />
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            </div>
            <span className="text-xs text-slate-400 font-bold select-none">to</span>
            <div className="relative flex-1">
              <input type="text" placeholder="MM/DD/YYYY" className="w-full bg-white border border-slate-100 rounded-xl py-2.5 px-4 pl-10 text-xs font-medium text-slate-600 focus:outline-none shadow-2xs" />
              <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* كروت الإحصائيات الأربعة السفلية للفواتير */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400">Total Orders</span>
          <div className="text-xl font-black text-[#1b2a49]">8</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400">Pending</span>
          <div className="text-xl font-black text-amber-500">2</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400">Shipped</span>
          <div className="text-xl font-black text-purple-600">2</div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400">Delivered</span>
          <div className="text-xl font-black text-emerald-600">2</div>
        </div>
      </div>

      {/* جدول البيانات الكامل المطابق لـ الفيجما */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(27,42,73,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none">
                <th className="py-3 px-6">Order ID</th>
                <th className="py-3 px-6">Supplier Name</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Items Count</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm font-medium text-[#1b2a49]">
              {ordersList.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/40 transition-colors">
                  <td className="py-4 px-6 font-bold text-[#3B81B7] font-mono">{order.id}</td>
                  <td className="py-4 px-6 font-bold">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-[#3B81B7]">
                        <Truck size={13} />
                      </div>
                      {order.supplier}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-400 font-bold">{order.date}</td>
                  <td className="py-4 px-6 text-xs text-slate-500 font-semibold">{order.itemsCount}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-bold inline-block ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="inline-flex items-center gap-1 text-xs font-bold text-[#3B81B7] hover:text-[#2c638c] transition-colors cursor-pointer">
                      <Eye size={14} /> View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* الترقيم السفلي الموحد */}
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

    </div>
  );
}