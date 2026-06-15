// src/pages/supplier/IncomingOrders.tsx
import React, { useState } from 'react';
import { Check, Truck, FileText } from 'lucide-react';
import SEOHead from '../../components/shared/SEOHead';
import { DataTable } from '../../components/shared/DataTable'; // تأكدي من صحة المسار للمكون لديكِ

const initialOrders = [
  { id: 'PO-2026-001', pharmacy: 'Smart Pharmacy', logo: 'SP', date: 'Jan 28, 2026', items: 3, amount: '4,500 EGP', status: 'New' },
  { id: 'PO-2026-002', pharmacy: 'Al-Ezaby Pharmacy', logo: 'AE', date: 'Jan 27, 2026', items: 5, amount: '8,200 EGP', status: 'Confirmed' },
  { id: 'PO-2026-003', pharmacy: 'Seif Pharmacy', logo: 'SF', date: 'Jan 26, 2026', items: 2, amount: '3,100 EGP', status: 'Shipped' },
  { id: 'PO-2026-004', pharmacy: 'Noor Pharmacy', logo: 'NP', date: 'Jan 25, 2026', items: 4, amount: '6,800 EGP', status: 'Delivered' },
  { id: 'PO-2026-005', pharmacy: 'City Health Pharmacy', logo: 'CH', date: 'Jan 24, 2026', items: 6, amount: '9,500 EGP', status: 'New' },
  { id: 'PO-2026-006', pharmacy: 'Care Pharmacy', logo: 'CP', date: 'Jan 24, 2026', items: 8, amount: '12,400 EGP', status: 'Confirmed' },
  { id: 'PO-2026-007', pharmacy: 'Al-Shifa Pharmacy', logo: 'AS', date: 'Jan 23, 2026', items: 12, amount: '18,100 EGP', status: 'New' },
  { id: 'PO-2026-008', pharmacy: 'Alpha Pharmacy', logo: 'AP', date: 'Jan 22, 2026', items: 3, amount: '2,900 EGP', status: 'Shipped' },
  { id: 'PO-2026-009', pharmacy: 'Delta Pharmacy', logo: 'DP', date: 'Jan 21, 2026', items: 7, amount: '7,300 EGP', status: 'Delivered' },
  { id: 'PO-2026-010', pharmacy: 'Giza Pharmacy', logo: 'GP', date: 'Jan 20, 2026', items: 5, amount: '5,500 EGP', status: 'New' },
  { id: 'PO-2026-011', pharmacy: 'Alex Pharmacy', logo: 'AX', date: 'Jan 19, 2026', items: 10, amount: '14,200 EGP', status: 'Confirmed' },
  { id: 'PO-2026-012', pharmacy: 'Horizon Pharmacy', logo: 'HP', date: 'Jan 18, 2026', items: 4, amount: '6,100 EGP', status: 'Shipped' },
];

export default function IncomingOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState('All');
  
  // الـ Pagination للتحكم بالتنقل المربوط بالـ DataTable الحالية
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const tabs = [
    { name: 'All', count: orders.length },
    { name: 'New', count: orders.filter(o => o.status === 'New').length },
    { name: 'Confirmed', count: orders.filter(o => o.status === 'Confirmed').length },
    { name: 'Shipped', count: orders.filter(o => o.status === 'Shipped').length },
    { name: 'Delivered', count: orders.filter(o => o.status === 'Delivered').length },
  ];

  const handleStatusChange = (id: string, newStatus: string) => {
    setOrders(prev => prev.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  const filteredOrders = activeTab === 'All' ? orders : orders.filter(o => o.status === activeTab);
  
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    setCurrentPage(1);
  };

  // 💻 أسماء الـ Headers لجدول الديسكتوب
  const tableHeaders = [
    'Order ID',
    'Pharmacy Name',
    'Order Date',
    'Items',
    'Total Amount',
    'Status',
    'Actions'
  ];

  // 📱 بناء كارت الموبايل المظبوط بالمللي لـ Incoming Purchase Orders
  const renderMobileCard = (order: typeof initialOrders[0]) => (
    <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-2xs flex flex-col justify-between space-y-4 hover:border-blue-200 transition-all">
      <div className="flex items-center justify-between">
        <div 
          className="w-10 h-10 text-white font-bold text-xs rounded-full flex items-center justify-center flex-shrink-0 shadow-xs"
          style={{ background: 'linear-gradient(135deg, #3B81B7 0%, #5B9FD7 100%)' }}
        >
          {order.logo}
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
          order.status === 'New' ? 'bg-amber-50 text-amber-500 border border-amber-100/40' :
          order.status === 'Confirmed' ? 'bg-blue-50 text-blue-500 border border-blue-100/40' :
          order.status === 'Shipped' ? 'bg-purple-50 text-purple-500 border border-purple-100/40' :
          'bg-emerald-50 text-emerald-500 border border-emerald-100/40'
        }`}>{order.status}</span>
      </div>

      <div>
        <h4 className="font-bold text-[#1b2a49] text-sm truncate">{order.pharmacy}</h4>
        <p className="text-[11px] text-blue-600 font-bold mt-1 tracking-tight">{order.id}</p>
      </div>

      <div className="flex items-center justify-between border-t border-slate-50 pt-3 text-xs">
        <div>
          <p className="text-[#7F8C8D]" style={{ fontFamily: 'SF Pro Rounded', fontWeight: 400, fontSize: '14px' }}>{order.date}</p>
          <p className="text-slate-400 font-medium mt-0.5"> {order.items} items</p>
          <p className="font-bold text-emerald-600 mt-1">{order.amount}</p>
        </div>
        
        <div className="flex gap-1.5">
          {order.status === 'New' && (
            <button 
              type="button"
              onClick={() => handleStatusChange(order.id, 'Confirmed')}
              className="p-2 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-bold"
            >
              <Check size={14} />
            </button>
          )}
          {order.status === 'Confirmed' && (
            <button 
              type="button"
              onClick={() => handleStatusChange(order.id, 'Shipped')}
              className="p-2 bg-cyan-600 text-white rounded-lg text-xs font-bold shadow-xs"
            >
              <Truck size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // 💻 بناء الـ Row للديسكتوب بدون أفاتار (الاسم بولد صريح) وبنفس تأثير الـ Badges
  const renderTableRow = (order: typeof initialOrders[0]) => (
    <tr key={order.id} className="hover:bg-slate-50/40 transition-colors duration-150">
      <td className="py-4 px-6 font-bold text-cyan-600 tracking-tight">{order.id}</td>
      
      <td className="py-4 px-6">
        <span className="font-bold text-[#1b2a49] whitespace-nowrap text-[13px]">
          {order.pharmacy}
        </span>
      </td>
      
      <td 
        className="py-4 px-6 text-[#7F8C8D]"
        style={{ fontFamily: 'SF Pro Rounded', fontWeight: 400, fontSize: '14px', lineHeight: '21px' }}
      >
        {order.date}
      </td>

      <td className="py-4 px-6 text-slate-500 font-semibold whitespace-nowrap"> {order.items} items</td>
      <td className="py-4 px-6 font-bold text-emerald-600 whitespace-nowrap">{order.amount}</td>
      <td className="py-4 px-6">
        <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-lg ${
          order.status === 'New' ? 'bg-amber-50 text-amber-500 border border-amber-100/40' :
          order.status === 'Confirmed' ? 'bg-blue-50 text-blue-500 border border-blue-100/40' :
          order.status === 'Shipped' ? 'bg-purple-50 text-purple-500 border border-purple-100/40' :
          'bg-emerald-50 text-emerald-500 border border-emerald-100/40'
        }`}>{order.status}</span>
      </td>
      <td className="py-4 px-6 text-center">
        <div className="flex items-center justify-center gap-2">
          {order.status === 'New' && (
            <>
              <button 
                type="button"
                onClick={() => handleStatusChange(order.id, 'Confirmed')}
                className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-bold text-[11px] px-3 py-1.5 rounded-lg transition-all active:scale-95 cursor-pointer"
              >
                Accept
              </button>
              <button 
                type="button"
                onClick={() => handleStatusChange(order.id, 'Rejected')}
                className="bg-rose-50 hover:bg-rose-100 text-rose-500 font-bold text-[11px] px-3 py-1.5 rounded-lg transition-all active:scale-95 cursor-pointer"
              >
                Reject
              </button>
            </>
          )}
          {order.status === 'Confirmed' && (
            <button 
              type="button"
              onClick={() => handleStatusChange(order.id, 'Shipped')}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-[11px] px-4 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <Truck size={13} /> Ship Now
            </button>
          )}
          {order.status === 'Shipped' && (
            <button type="button" className="border border-slate-300 hover:border-slate-400 text-slate-600 font-bold text-[11px] px-4 py-1.5 rounded-lg transition-all active:scale-95 cursor-pointer whitespace-nowrap">
              Track
            </button>
          )}
          {order.status === 'Delivered' && (
            <button type="button" className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[11px] px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer whitespace-nowrap">
              <FileText size={13} /> View Receipt
            </button>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-left relative pb-10">
      <SEOHead 
        title="Purchase Orders" 
        description="Review, filter, accept, and track all incoming pharmacy purchase orders." 
      />

      {/* 1. العنوان والوصف */}
      <div>
        <h1 
          className="text-[24px] md:text-[30px] font-bold text-[#1B2A49] md:leading-[42px] tracking-[0px] select-none"
          style={{ fontFamily: '"SF Pro Rounded", sans-serif', fontWeight: 700 }}
        >
          Purchase Orders
        </h1>
        <p 
          className="text-[13px] md:text-[15px] font-normal text-[#7F8C8D] md:leading-[22.5px] tracking-[0px] mt-[8px]"
          style={{ fontFamily: '"SF Pro Rounded", sans-serif', fontWeight: 400 }}
        >
          Manage incoming orders from pharmacies
        </p>
      </div>

      {/* 2. الفلاتر التبويبية */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 select-none scrollbar-none">
        {tabs.map(tab => (
          <button
            key={tab.name}
            type="button"
            onClick={() => handleTabChange(tab.name)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.name 
                ? 'bg-[#1b2a49] text-white shadow-sm' 
                : 'bg-white text-slate-500 border border-slate-100 hover:bg-slate-50'
            }`}
            style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}
          >
            {tab.name} {tab.count > 0 && `(${tab.count})`}
          </button>
        ))}
      </div>

      {/* 3. استدعاء الـ DataTable المشترك وتمرير محتوى الترويسة الأنيق */}
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
  );
}