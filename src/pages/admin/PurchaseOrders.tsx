import React, { useState } from 'react';
import { Search, ChevronDown, Calendar, Eye, Plus, Truck, X } from 'lucide-react';
import SEOHead from '../../components/shared/SEOHead';
import { DataTable } from '../../components/shared/DataTable';
import CreateOrder from './CreateOrder'; // استدعاء مكون صفحة الإنشاء الكاملة المتطابقة مع image_7ffa91.jpg

interface Order {
  id: string;
  supplier: string;
  date: string;
  itemsCount: string;
  status: 'Delivered' | 'Shipped' | 'Approved' | 'Pending';
  itemsList?: { name: string; qty: number; price: string }[];
}

export default function PurchaseOrders() {
  // تتبع ما إذا كنا في شاشة عرض الجدول أم شاشة إنشاء طلب جديد كصفحة كاملة
  const [isCreating, setIsCreating] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // فلاتر البحث والتواريخ
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // الداتا الرسمية النظيفة والمطابقة للفيجما
  const cleanOrders: Order[] = [
    { id: 'PO-2026-001', supplier: 'Eva Pharma', date: 'Jan 28, 2026', itemsCount: '5 items', status: 'Delivered', itemsList: [{ name: 'Panadol 500mg', qty: 3, price: '150 EGP' }, { name: 'Brufen 400mg', qty: 2, price: '100 EGP' }] },
    { id: 'PO-2026-002', supplier: 'Spimaco', date: 'Jan 29, 2026', itemsCount: '3 items', status: 'Shipped', itemsList: [{ name: 'Augmentin 1g', qty: 3, price: '320 EGP' }] },
    { id: 'PO-2026-003', supplier: 'GlaxoSmithKline', date: 'Jan 30, 2026', itemsCount: '8 items', status: 'Approved', itemsList: [{ name: 'Nexium 40mg', qty: 8, price: '820 EGP' }] },
    { id: 'PO-2026-004', supplier: 'Pfizer', date: 'Jan 30, 2026', itemsCount: '4 items', status: 'Pending', itemsList: [{ name: 'Voltaren Emulgel', qty: 4, price: '210 EGP' }] },
    { id: 'PO-2026-005', supplier: 'Eva Pharma', date: 'Jan 27, 2026', itemsCount: '6 items', status: 'Delivered', itemsList: [{ name: 'Panadol Extra', qty: 6, price: '600 EGP' }] },
    { id: 'PO-2026-006', supplier: 'Novartis', date: 'Jan 29, 2026', itemsCount: '2 items', status: 'Approved', itemsList: [{ name: 'Brufen 400mg', qty: 2, price: '200 EGP' }] },
  ];

  const getStatusStyle = (status: Order['status']) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
      case 'Shipped': return 'bg-purple-50 text-purple-600 border border-purple-100';
      case 'Approved': return 'bg-blue-50 text-blue-600 border border-blue-100';
      case 'Pending': return 'bg-amber-50 text-amber-600 border border-amber-100';
    }
  };

  const handleOpenDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentOrders = cleanOrders.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);
  const totalPages = Math.ceil(cleanOrders.length / itemsPerPage);

  const tableHeaders = ['Order ID', 'Supplier Name', 'Date', 'Items Count', 'Status', 'Action'];

  // 💻 بناء أسطر الجدول لـ Desktop View
  const renderTableRow = (order: Order) => (
    <tr key={order.id} className="hover:bg-slate-50/40 transition-colors h-20">
      <td className="py-4 px-6 font-bold text-cyan-600 font-['SF_Pro_Rounded']">{order.id}</td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-sky-100 rounded-2xl flex items-center justify-center text-cyan-600 shadow-2xs">
            <Truck size={18} />
          </div>
          <span className="text-slate-700 text-base font-bold font-['SF_Pro_Rounded']">{order.supplier}</span>
        </div>
      </td>
      <td className="py-4 px-6 text-sm text-gray-500 font-normal font-['SF_Pro_Rounded']">{order.date}</td>
      <td className="py-4 px-6 text-sm text-slate-700 font-normal font-['SF_Pro_Rounded']">{order.itemsCount}</td>
      <td className="py-4 px-6">
        <span className={`px-2.5 py-1 rounded-[10px] text-[11px] font-bold inline-block ${getStatusStyle(order.status)}`}>
          {order.status}
        </span>
      </td>
      <td className="py-4 px-6 text-center">
        <button 
          type="button"
          onClick={() => handleOpenDetails(order)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-600 hover:text-blue-800 transition-colors cursor-pointer font-['SF_Pro_Rounded']"
        >
          <Eye size={15} /> View Details
        </button>
      </td>
    </tr>
  );

  // 📱 بناء كروت العرض للـ Mobile View
  const renderMobileCard = (order: Order) => (
    <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-2xs flex flex-col space-y-3">
      <div className="flex items-center justify-between">
        <span className="font-bold text-cyan-600 text-sm font-mono">{order.id}</span>
        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-[8px] ${getStatusStyle(order.status)}`}>
          {order.status}
        </span>
      </div>
      <div className="flex items-center gap-2.5 pt-1">
        <div className="w-9 h-9 bg-sky-100 rounded-xl flex items-center justify-center text-cyan-600"><Truck size={16} /></div>
        <h4 className="font-bold text-blue-950 text-base font-['SF_Pro_Rounded']">{order.supplier}</h4>
      </div>
      <div className="flex justify-between items-center pt-2 border-t border-slate-50 text-xs text-gray-500 font-['SF_Pro_Rounded']">
        <div>
          <p>{order.date}</p>
          <p className="font-bold text-slate-700 mt-0.5">{order.itemsCount}</p>
        </div>
        <button 
          type="button"
          onClick={() => handleOpenDetails(order)}
          className="flex items-center gap-1 bg-sky-50 text-cyan-600 px-3 py-1.5 rounded-xl text-xs font-bold"
        >
          <Eye size={12} /> View
        </button>
      </div>
    </div>
  );

  // 🌟 التحويل والتحكم الذكي بالـ View: لو تم تفعيل الإنشاء يعرض صفحة الفورم الكاملة الفردية فوراً (CreateOrder)
  if (isCreating) {
    return (
      <CreateOrder onBack={() => setIsCreating(false)} />
    );
  }

  return (
    // ضبط المسافات الهامشية الموحدة للمشروع بالبكسل الصريح: 30px من فوق و 25px من الجوانب
    <div className="animate-in fade-in duration-300 text-left relative pt-[2px] px-[2px] space-y-6">
      <SEOHead 
        title="Purchase Orders" 
        description="Medix Purchase Orders Management - Track procurement status, system invoices, dates, and baseline inventory supplier data inputs." 
      />

      {/* التوب هيدر العلوي وزر الإضافة */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
        <div>
          <h1 className="text-[24px] md:text-[30px] font-bold text-blue-950 font-['SF_Pro_Rounded'] leading-10">Purchase Orders</h1>
          <p className="text-sm md:text-base font-normal text-gray-500 font-['SF_Pro_Rounded'] leading-6 mt-1">Manage and track all pharmacy purchase orders.</p>
        </div>
        <button 
          type="button"
          onClick={() => setIsCreating(true)} // فتح صفحة الفورم الكاملة الفخمة المتجاوبة
          className="flex items-center justify-center gap-2 bg-gradient-to-br from-cyan-600 to-blue-400 rounded-2xl shadow-[0px_4px_12px_0px_rgba(59,129,183,0.30)] text-white text-sm font-bold font-['SF_Pro_Rounded'] px-5 py-2.5 transition-all transform active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={18} /> Create Order
        </button>
      </div>

      {/* شريط الفلاتر والتاريخ المتطابق تماماً مع الفيجما */}
      <div className="flex flex-col md:flex-row gap-5 items-end bg-white p-5 rounded-2xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] border border-slate-50/50">
        <div className="flex flex-col gap-2 w-full md:w-44">
          <label className="text-xs font-normal text-gray-500 font-['SF_Pro_Rounded'] leading-5 select-none">Status</label>
          <div className="relative w-full">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-white text-gray-500 text-sm font-normal font-['SF_Pro_Rounded'] border border-gray-200 rounded-2xl py-2 pl-4 pr-10 appearance-none focus:outline-none focus:border-cyan-600 transition-all cursor-pointer h-11"
            >
              <option>All Status</option>
              <option>Delivered</option>
              <option>Shipped</option>
              <option>Approved</option>
              <option>Pending</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
          </div>
        </div>

        {/* حقول اختيار التاريخ التفاعلية */}
        <div className="flex-1 flex flex-col gap-2 w-full">
          <label className="text-xs font-normal text-gray-500 font-['SF_Pro_Rounded'] leading-5 select-none">Date Range</label>
          <div className="flex items-center gap-3 w-full">
            <div className="relative flex-1 h-11">
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full h-11 bg-white border border-gray-200 rounded-2xl px-4 pr-10 text-sm font-normal text-gray-600 focus:outline-none focus:border-cyan-600 transition-all font-['SF_Pro_Rounded'] shadow-2xs" 
              />
              <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
            <span className="text-sm font-normal text-gray-500 font-['SF_Pro_Rounded'] select-none">to</span>
            <div className="relative flex-1 h-11">
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full h-11 bg-white border border-gray-200 rounded-2xl px-4 pr-10 text-sm font-normal text-gray-600 focus:outline-none focus:border-cyan-600 transition-all font-['SF_Pro_Rounded'] shadow-2xs" 
              />
              <Calendar className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* كروت الإحصائيات الأربعة للمجموع التلخيصي للفواتير */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 select-none">
        <div className="bg-white px-5 py-5 rounded-2xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] border border-slate-100/50 flex flex-col gap-2 min-h-[96px]">
          <span className="text-xs font-normal text-gray-500 font-['SF_Pro_Rounded']">Total Orders</span>
          <div className="text-[28px] font-bold text-slate-700 font-['SF_Pro_Rounded'] leading-9">8</div>
        </div>
        <div className="bg-white px-5 py-5 rounded-2xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] border border-slate-100/50 flex flex-col gap-2 min-h-[96px]">
          <span className="text-xs font-normal text-gray-500 font-['SF_Pro_Rounded']">Pending</span>
          <div className="text-[28px] font-bold text-amber-500 font-['SF_Pro_Rounded'] leading-9">2</div>
        </div>
        <div className="bg-white px-5 py-5 rounded-2xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] border border-slate-100/50 flex flex-col gap-2 min-h-[96px]">
          <span className="text-xs font-normal text-gray-500 font-['SF_Pro_Rounded']">Shipped</span>
          <div className="text-[28px] font-bold text-fuchsia-700 font-['SF_Pro_Rounded'] leading-9">2</div>
        </div>
        <div className="bg-white px-5 py-5 rounded-2xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] border border-slate-100/50 flex flex-col gap-2 min-h-[96px]">
          <span className="text-xs font-normal text-gray-500 font-['SF_Pro_Rounded']">Delivered</span>
          <div className="text-[28px] font-bold text-green-500 font-['SF_Pro_Rounded'] leading-9">2</div>
        </div>
      </div>

      {/* استدعاء المكون الموحد DataTable وتلقينه الإعدادات كاملة */}
      <DataTable
        data={currentOrders}
        headers={tableHeaders}
        renderRow={renderTableRow}
        renderCard={renderMobileCard}
        currentPage={currentPage}
        totalPages={totalPages}
        indexOfFirstItem={indexOfFirstItem}
        filteredCount={cleanOrders.length}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* 🌟 مودال استعراض تفاصيل الفاتورة الفخم والريسبنسيف */}
      {isDetailsOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-200">
            <button 
              type="button" 
              onClick={() => setIsDetailsOpen(false)} 
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center mt-2 mb-6 select-none">
              <div className="w-14 h-14 bg-sky-100 text-cyan-600 flex items-center justify-center rounded-2xl shadow-md mb-2">
                <Truck size={28} />
              </div>
              <h3 className="text-lg font-bold text-blue-950 font-['SF_Pro_Rounded']">{selectedOrder.supplier}</h3>
              <p className="text-xs text-cyan-600 font-bold mt-0.5 font-mono">{selectedOrder.id}</p>
            </div>

            <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 space-y-2 mb-4 text-xs font-medium text-slate-600 select-none font-['SF_Pro_Rounded']">
              <p className="flex justify-between"><span>Order Date:</span> <span className="font-bold text-blue-950">{selectedOrder.date}</span></p>
              <p className="flex justify-between"><span>Total Items:</span> <span className="font-bold text-blue-950">{selectedOrder.itemsCount}</span></p>
              <p className="flex justify-between items-center"><span>Current Status:</span> 
                <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${getStatusStyle(selectedOrder.status)}`}>{selectedOrder.status}</span>
              </p>
            </div>

            {/* عرض محتويات وعناصر الفاتورة الإنشائية الحية */}
            <div className="space-y-2 mb-4">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide px-1 select-none font-['SF_Pro_Rounded']">Items List</p>
              <div className="border border-slate-100 rounded-xl divide-y divide-slate-100 overflow-hidden text-xs max-h-36 overflow-y-auto">
                {(selectedOrder.itemsList || [{ name: 'Panadol 500mg', qty: 5, price: '4,000 EGP' }]).map((item, index) => (
                  <div key={index} className="p-3 bg-white flex justify-between font-semibold font-['SF_Pro_Rounded']">
                    <span className="text-slate-700">{item.name} <span className="text-slate-400 font-normal">x{item.qty}</span></span>
                    <span className="text-slate-500">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <button 
              type="button" 
              onClick={() => setIsDetailsOpen(false)} 
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm py-3 rounded-xl transition-all cursor-pointer font-['SF_Pro_Rounded']"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}