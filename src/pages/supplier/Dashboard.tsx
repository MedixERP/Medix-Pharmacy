// src/pages/supplier/Dashboard.tsx
import React, { useState } from 'react';
import { Eye, Package, X, Check, FileText } from 'lucide-react';
import { useSearchStore } from '../../store/searchStore';
import SEOHead from '../../components/shared/SEOHead';
import { DataTable } from '../../components/shared/DataTable'; // تأكدي من ضبط المسار الصحيح للـ DataTable هنا

const initialOrders = [
  { id: 'PO-2026-008', pharmacy: 'Al-Shifa Pharmacy', logo: 'AP', date: 'Jan 31, 2026', items: 24, status: 'New', totalAmount: '4,500 EGP', itemsList: [{ name: 'Panadol 500mg', qty: 10, price: '150 EGP' }, { name: 'Brufen 400mg', qty: 14, price: '300 EGP' }] },
  { id: 'PO-2026-007', pharmacy: 'Green Cross Pharmacy', logo: 'GC', date: 'Jan 31, 2026', items: 18, status: 'New', totalAmount: '3,200 EGP', itemsList: [{ name: 'Augmentin 1g', qty: 18, price: '3,200 EGP' }] },
  { id: 'PO-2026-006', pharmacy: 'MediCare Pharmacy', logo: 'MP', date: 'Jan 30, 2026', items: 32, status: 'In Progress', totalAmount: '8,200 EGP', itemsList: [{ name: 'Nexium 40mg', qty: 32, price: '8,200 EGP' }] },
  { id: 'PO-2026-005', pharmacy: 'Noor Pharmacy', logo: 'NP', date: 'Jan 30, 2026', items: 15, status: 'In Progress', totalAmount: '2,100 EGP', itemsList: [{ name: 'Voltaren Emulgel', qty: 15, price: '2,100 EGP' }] },
  { id: 'PO-2026-004', pharmacy: 'City Health Pharmacy', logo: 'CH', date: 'Jan 29, 2026', items: 28, status: 'Shipped', totalAmount: '6,800 EGP', itemsList: [{ name: 'Panadol Extra', qty: 28, price: '6,800 EGP' }] },
  { id: 'PO-2026-003', pharmacy: 'Al-Amal Pharmacy', logo: 'AP', date: 'Jan 29, 2026', items: 20, status: 'In Progress', totalAmount: '3,500 EGP', itemsList: [{ name: 'Brufen 400mg', qty: 20, price: '3,500 EGP' }] },
];

export default function SupplierDashboard() {
  const [orders, setOrders] = useState(initialOrders);
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const [selectedOrder, setSelectedOrder] = useState<typeof initialOrders[0] | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    if (selectedOrder?.id === id) {
      setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.pharmacy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // دالة مساعدة لتحديد ستايل الـ Status Badge بالمللي حسب درجات ألوان الفجما الصريحة
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'New':
        return 'bg-sky-100 text-cyan-600';
      case 'In Progress':
        return 'bg-yellow-50 text-amber-500';
      case 'Shipped':
        return 'bg-pink-100 text-fuchsia-700';
      default:
        return 'bg-slate-100 text-slate-600';
    }
  };

  // 💻 تعريف الـ Headers لجدول الـ Desktop
  const tableHeaders = [
    'Order ID',
    'Pharmacy Name',
    'Date',
    'Total Items',
    'Status',
    'Actions'
  ];

  // 📱 دالة بناء الكروت للشاشات الصغيرة (Mobile)
  const renderMobileCard = (order: typeof initialOrders[0]) => (
    <div 
      onClick={() => setSelectedOrder(order)}
      className="p-5 rounded-2xl bg-white border border-slate-100 shadow-2xs flex flex-col justify-between space-y-4 hover:border-blue-300 transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 text-white font-bold text-sm rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm bg-gradient-to-br from-cyan-600 to-blue-400">
          {order.logo}
        </div>
        <span className={`text-[11px] font-medium px-3 py-1 rounded-[10px] ${getStatusBadgeClass(order.status)}`}>
          {order.status}
        </span>
      </div>

      <div>
        <h4 className="font-bold text-[#1b2a49] text-base font-['SF_Pro_Rounded'] truncate">{order.pharmacy}</h4>
        <p className="text-sm text-cyan-600 font-bold mt-1 tracking-tight font-['SF_Pro_Rounded']">{order.id}</p>
      </div>

      <div className="flex items-center justify-between border-t border-slate-50 pt-3 text-xs">
        <div>
          <p className="text-gray-500 font-['SF_Pro_Rounded'] text-sm">{order.date}</p>
          <p className="text-slate-700 font-bold mt-1 font-['SF_Pro_Rounded']">📦 {order.items} items</p>
        </div>
        <button 
          type="button"
          className="w-10 h-9 rounded-[10px] text-white font-bold flex items-center justify-center bg-gradient-to-br from-cyan-600 to-blue-400 active:scale-95 transition-transform"
        >
          <Eye size={15} />
        </button>
      </div>
    </div>
  );

  // 💻 دالة بناء أسطر الجدول للشاشات الكبيرة (Desktop)
  const renderTableRow = (order: typeof initialOrders[0]) => (
    <tr 
      key={order.id} 
      onClick={() => setSelectedOrder(order)}
      className="hover:bg-slate-50/50 transition-colors duration-150 cursor-pointer h-20"
    >
      <td className="pl-6 pr-4 font-bold text-cyan-600 font-['SF_Pro_Rounded'] text-sm">
        {order.id}
      </td>
      
      <td className="pl-6 pr-4">
        <div className="inline-flex justify-start items-center gap-3 h-10">
          <div className="w-10 h-10 text-white font-bold text-sm rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-400 flex items-center justify-center shadow-sm">
            {order.logo}
          </div>
          <span className="text-slate-700 text-base font-bold font-['SF_Pro_Rounded'] tracking-normal whitespace-nowrap">
            {order.pharmacy}
          </span>
        </div>
      </td>

      <td className="pl-6 pr-4 text-gray-500 text-sm font-normal font-['SF_Pro_Rounded']">
        {order.date}
      </td>

      <td className="pl-6 pr-4 text-slate-700 text-sm font-bold font-['SF_Pro_Rounded']">
        <div className="inline-flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M7.33333 14.4869C7.53603 14.604 7.76595 14.6656 8 14.6656C8.23405 14.6656 8.46397 14.604 8.66667 14.4869L13.3333 11.8203C13.5358 11.7034 13.704 11.5353 13.821 11.3328C13.938 11.1304 13.9998 10.9007 14 10.6669V5.33359C13.9998 5.09978 13.938 4.87013 13.821 4.6677C13.704 4.46527 13.5358 4.29717 13.3333 4.18026L8.66667 1.51359C8.46397 1.39657 8.23405 1.39657 8 1.33496C7.76595 1.33496 7.53603 1.39657 7.33333 1.51359L2.66667 4.18026C2.46418 4.29717 2.29599 4.46527 2.17897 4.6677C2.06196 4.87013 2.00024 5.09978 2 5.33359V10.6669C2.00024 10.9007 2.06196 11.1304 2.17897 11.3328C2.29599 11.5353 2.46418 11.7034 2.66667 11.8203L7.33333 14.4869Z" stroke="#7F8C8D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 14.6667V8" stroke="#7F8C8D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.19336 4.6665L8.00003 7.99984L13.8067 4.6665" stroke="#7F8C8D" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{order.items} items</span>
        </div>
      </td>

      <td className="pl-6 pr-4">
        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-[10px] text-xs font-normal font-['SF_Pro_Rounded'] h-8 min-w-[70px] ${getStatusBadgeClass(order.status)}`}>
          {order.status}
        </span>
      </td>

      <td className="pr-4 text-center" onClick={(e) => e.stopPropagation()}>
        <div className="inline-flex justify-center items-center w-full">
          <button 
            type="button"
            onClick={() => setSelectedOrder(order)}
            className="w-32 h-9 inline-flex items-center justify-center gap-1.5 text-white font-bold text-xs rounded-[10px] bg-gradient-to-br from-cyan-600 to-blue-400 transition-all transform active:scale-95 shadow-xs cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="size-4">
              <path d="M1.33301 8.00016C1.33301 8.00016 3.99967 2.66683 7.99967 2.66683C11.9997 2.66683 14.6663 8.00016 14.6663 8.00016C14.6663 8.00016 11.9997 13.3335 7.99967 13.3335C3.99967 13.3335 1.33301 8.00016 1.33301 8.00016Z" stroke="white" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 9.3335C8.73638 9.3335 9.33333 8.73654 9.33333 8.00016C9.33333 7.26378 8.73638 6.66683 8 6.66683C7.26362 6.66683 6.66667 7.26378 6.66667 8.00016C6.66667 8.73654 7.26362 9.3335 8 9.3335Z" fill="white" stroke="white" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>View Details</span>
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="animate-in fade-in duration-300 text-left relative space-y-6">
      <SEOHead 
        title="Dashboard" 
        description="Eva Pharma Supplier Dashboard - Track and manage incoming pharmacy purchase orders, statistics, and fulfillment." 
      />
      
      {/* 1. الترحيب */}
      <div>
        <h1 
          className="text-[24px] md:text-[30px] font-bold text-[#1B2A49] md:leading-[42px] tracking-[0px] flex items-center gap-2 select-none"
          style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 700 }}
        >
          Welcome back, Eva Pharma! <span className="inline-block text-xl">📦</span>
        </h1>
        <p 
          className="text-[13px] md:text-[15px] font-normal text-[#7F8C8D] md:leading-[22.5px] tracking-[0px] mt-[8px]"
          style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 400 }}
        >
          Track and manage incoming orders from your pharmacy partners.
        </p>
      </div>

      {/* 2. كروت الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
        {/* كارد 1 */}
        <div className="glass-light p-6 rounded-2xl flex flex-col justify-between min-h-[145px]">
          <div className="p-2.5 bg-sky-100 text-blue-600 rounded-xl w-fit shadow-inner border border-blue-100/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M22 12H16L14 15H10L8 12H2" stroke="#3B81B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5.45 5.11L2 12V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H20C20.5304 20 21.0391 19.7893 21.4142 19.4142C21.7893 19.0391 22 18.5304 22 18V12L18.55 5.11C18.3844 4.77679 18.1292 4.49637 17.813 4.30028C17.4967 4.10419 17.1321 4.0002 16.76 4H7.24C6.86792 4.0002 6.50326 4.10419 6.18704 4.30028C5.87083 4.49637 5.61558 4.77679 5.45 5.11Z" stroke="#3B81B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div className="mt-4">
            <p className="text-[14px] leading-[21px] font-normal text-[#7F8C8D] tracking-[0px]" style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 400 }}>
              New Orders Received
            </p>
            <h3 className="text-[32px] font-bold text-cyan-600 leading-[48px] tracking-[0px] mt-1" style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 700 }}>
              {orders.filter(o => o.status === 'New').length}
            </h3>
            <span className="text-[13px] font-normal text-cyan-600 leading-[19.5px] tracking-[0px] mt-2 inline-block" style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 400 }}>
              Needs action
            </span>
          </div>
        </div>

        {/* كارد 2 */}
        <div className="glass-light p-6 rounded-2xl flex flex-col justify-between min-h-[145px]">
          <div className="p-2.5 bg-yellow-50 text-amber-500 rounded-xl w-fit shadow-inner border border-amber-100/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M14 18V6C14 5.46957 13.7893 4.96086 13.4142 4.58579C13.0391 4.21071 12.5304 4 12 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V17C2 17.2652 2.10536 17.5196 2.29289 17.7071C2.48043 17.8946 2.73478 18 3 18H5" stroke="#F39C12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M15 18H9" stroke="#F39C12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19 18H21C21.2652 18 21.5196 17.8946 21.7071 17.7071C21.8946 17.5196 22 17.2652 22 17V13.35C21.9996 13.1231 21.922 12.903 21.78 12.726L18.3 8.376C18.2065 8.25888 18.0878 8.16428 17.9528 8.0992C17.8178 8.03412 17.6699 8.00021 17.52 8H14" stroke="#F39C12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17 20C18.1046 20 19 19.1046 19 18C19 16.8954 18.1046 16 17 16C15.8954 16 15 16.8954 15 18C15 19.1046 15.8954 20 17 20Z" stroke="#F39C12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 20C8.10457 20 9 19.1046 9 18C9 16.8954 8.10457 16 7 16C5.89543 16 5 16.8954 5 18C5 19.1046 5.89543 20 7 20Z" stroke="#F39C12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div className="mt-4">
            <p className="text-[14px] leading-[21px] font-normal text-[#7F8C8D] tracking-[0px]" style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 400 }}>
              Orders In Progress
            </p>
            <h3 className="text-[32px] font-bold text-amber-500 leading-[48px] tracking-[0px] mt-1" style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 700 }}>
              {orders.filter(o => o.status === 'In Progress').length}
            </h3>
            <span className="text-[13px] font-normal text-amber-500 leading-[19.5px] tracking-[0px] mt-2 inline-block" style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 400 }}>
              Being processed
            </span>
          </div>
        </div>

        {/* كارد 3 */}
        <div className="glass-light p-6 rounded-2xl flex flex-col justify-between min-h-[145px]">
          <div className="p-2.5 bg-green-100 text-emerald-500 rounded-xl w-fit shadow-inner border border-emerald-100/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#27AE60" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 12L11 14L15 10" stroke="#27AE60" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div className="mt-4">
            <p className="text-[14px] leading-[21px] font-normal text-[#7F8C8D] tracking-[0px]" style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 400 }}>
              Completed Orders
            </p>
            <h3 className="text-[32px] font-bold text-green-500 leading-[48px] tracking-[0px] mt-1" style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 700 }}>
              {orders.filter(o => o.status === 'Shipped').length + 42}
            </h3>
            <span className="text-[13px] font-normal text-green-500 leading-[19.5px] tracking-[0px] mt-2 inline-block" style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 400 }}>
              This month
            </span>
          </div>
        </div>
      </div>

      {/* 3. حاوية الجدول الرئيسي المتكامل */}
      <div className="overflow-hidden space-y-4">
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M6 22C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V4C4 3.46957 4.21071 2.96086 4.58579 2.58579C4.96086 2.21072 5.46957 2 6 2H14C14.3166 1.99949 14.6301 2.06161 14.9225 2.18277C15.215 2.30394 15.4806 2.48176 15.704 2.706L19.292 6.294C19.5168 6.51751 19.6952 6.78335 19.8167 7.07616C19.9382 7.36898 20.0005 7.68297 20 8V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6Z" stroke="#3B81B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 2V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H20" stroke="#3B81B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 9H8" stroke="#3B81B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 13H8" stroke="#3B81B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 17H8" stroke="#3B81B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h2 className="text-[22px] font-bold text-blue-950 md:leading-[33px] tracking-[0px]" style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 700 }}>
            Incoming Purchase Orders
          </h2>
          <div className="px-6 py-5 border-b border-slate-100/80 flex items-center select-none flex-wrap gap-2">
            <span className="bg-sky-100 text-cyan-600 text-[13px] font-bold px-2.5 py-1 rounded-full border border-blue-100/50 h-fit">
              {filteredOrders.length} Orders
            </span>
          </div>
        </div>

        {/* ⚙️ استدعاء الـ DataTable المشترك وتمرير الـ Props واللوجيك بالمللي */}
        <DataTable
          data={currentOrders}
          headers={tableHeaders}
          renderRow={renderTableRow}
          renderCard={renderMobileCard}
          currentPage={currentPage}
          totalPages={totalPages}
          indexOfFirstItem={indexOfFirstItem}
          filteredCount={filteredOrders.length}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* الـ Modal تفاصيل الطلب */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            <button type="button" onClick={() => setSelectedOrder(null)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 cursor-pointer">
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center mt-2 mb-6 select-none">
              <div className="w-14 h-14 text-white flex items-center justify-center text-lg font-bold rounded-2xl shadow-md mb-2 bg-gradient-to-br from-cyan-600 to-blue-400">
                {selectedOrder.logo}
              </div>
              <h3 className="text-lg font-bold text-[#1b2a49]">{selectedOrder.pharmacy}</h3>
              <p className="text-xs text-blue-600 font-bold mt-0.5">{selectedOrder.id}</p>
            </div>

            <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 space-y-2 mb-4 text-xs font-medium text-slate-600 select-none">
              <p className="flex justify-between"><span>Order Date:</span> <span className="font-bold text-[#1b2a49]">{selectedOrder.date}</span></p>
              <p className="flex justify-between"><span>Total Items:</span> <span className="font-bold text-[#1b2a49]">{selectedOrder.items} items</span></p>
              <p className="flex justify-between"><span>Total Amount:</span> <span className="font-bold text-emerald-600 text-sm">{selectedOrder.totalAmount}</span></p>
              <p className="flex justify-between items-center"><span>Current Status:</span> 
                <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${getStatusBadgeClass(selectedOrder.status)}`}>{selectedOrder.status}</span>
              </p>
            </div>

            <div className="space-y-2 mb-6">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide px-1 select-none">Items List</p>
              <div className="border border-slate-100 rounded-xl divide-y divide-slate-100 overflow-hidden text-xs">
                {selectedOrder.itemsList.map((item, index) => (
                  <div key={index} className="p-3 bg-white flex justify-between font-semibold">
                    <span className="text-[#1b2a49]">{item.name} <span className="text-slate-400 font-normal">x{item.qty}</span></span>
                    <span className="text-slate-500">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {selectedOrder.status === 'New' ? (
                <>
                  <button type="button" onClick={() => handleStatusChange(selectedOrder.id, 'In Progress')} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"><Check size={14}/> Accept Order</button>
                  <button type="button" onClick={() => handleStatusChange(selectedOrder.id, 'Rejected')} className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer">Reject</button>
                </>
              ) : selectedOrder.status === 'In Progress' ? (
                <button type="button" onClick={() => handleStatusChange(selectedOrder.id, 'Shipped')} className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"><Package size={14}/> Ship Order Now</button>
              ) : (
                <button type="button" className="col-span-2 bg-slate-100 text-slate-600 font-bold text-xs py-3 rounded-xl cursor-not-allowed flex items-center justify-center gap-1.5"><FileText size={14}/> Order Shipped</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}