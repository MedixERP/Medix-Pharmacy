// src/pages/supplier/Dashboard.tsx
import React, { useState } from 'react';
import { Eye, Package, ShoppingBag, Clock, X, Check, FileText } from 'lucide-react';
import { useSearchStore } from '../../store/searchStore';
import SEOHead from '../../components/shared/SEOHead';

const initialOrders = [
  { id: 'PO-2026-008', pharmacy: 'Al-Shifa Pharmacy', logo: 'AP', logoBg: 'bg-blue-600', date: 'Jan 31, 2026', items: 24, status: 'New', totalAmount: '4,500 EGP', itemsList: [{ name: 'Panadol 500mg', qty: 10, price: '150 EGP' }, { name: 'Brufen 400mg', qty: 14, price: '300 EGP' }] },
  { id: 'PO-2026-007', pharmacy: 'Green Cross Pharmacy', logo: 'GC', logoBg: 'bg-emerald-600', date: 'Jan 31, 2026', items: 18, status: 'New', totalAmount: '3,200 EGP', itemsList: [{ name: 'Augmentin 1g', qty: 18, price: '3,200 EGP' }] },
  { id: 'PO-2026-006', pharmacy: 'MediCare Pharmacy', logo: 'MP', logoBg: 'bg-indigo-600', date: 'Jan 30, 2026', items: 32, status: 'In Progress', totalAmount: '8,200 EGP', itemsList: [{ name: 'Nexium 40mg', qty: 32, price: '8,200 EGP' }] },
  { id: 'PO-2026-005', pharmacy: 'Noor Pharmacy', logo: 'NP', logoBg: 'bg-sky-600', date: 'Jan 30, 2026', items: 15, status: 'In Progress', totalAmount: '2,100 EGP', itemsList: [{ name: 'Voltaren Emulgel', qty: 15, price: '2,100 EGP' }] },
  { id: 'PO-2026-004', pharmacy: 'City Health Pharmacy', logo: 'CH', logoBg: 'bg-purple-600', date: 'Jan 29, 2026', items: 28, status: 'Shipped', totalAmount: '6,800 EGP', itemsList: [{ name: 'Panadol Extra', qty: 28, price: '6,800 EGP' }] },
  { id: 'PO-2026-003', pharmacy: 'Al-Amal Pharmacy', logo: 'AP', logoBg: 'bg-cyan-600', date: 'Jan 29, 2026', items: 20, status: 'In Progress', totalAmount: '3,500 EGP', itemsList: [{ name: 'Brufen 400mg', qty: 20, price: '3,500 EGP' }] },
];

export default function SupplierDashboard() {
  const [orders, setOrders] = useState(initialOrders);
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const [selectedOrder, setSelectedOrder] = useState<typeof initialOrders[0] | null>(null);

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

  return (
    <div className=" animate-in fade-in duration-300 text-left relative">
      {/* دمج الـ SEO المتكامل للملف */}
      <SEOHead 
        title="Dashboard" 
        description="Eva Pharma Supplier Dashboard - Track and manage incoming pharmacy purchase orders, statistics, and fulfillment." 
      />
      
      {/* 1. الترحيب (Header & Subtitle بناءً على ستايل فيجما بالملي) */}
      <div>
        <h1 
          className="text-[24px] md:text-[30px] font-bold text-[#1B2A49] md:leading-[42px] tracking-[0px] flex items-center gap-2 select-none"
          style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 700 }}
        >
          Welcome back, Eva Pharma! <span className="inline-block animate-bounce text-xl">📦</span>
        </h1>
        <p 
          className="text-[13px] md:text-[15px] font-normal text-[#7F8C8D] md:leading-[22.5px] tracking-[0px] mt-[8px]"
          style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 400 }}
        >
          Track and manage incoming orders from your pharmacy partners.
        </p>
      </div>

      {/* 2. كروت الإحصائيات الفاخرة المحدثة بـ Typography فيجما الثابت */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
        
        {/* كارد 1 */}
        <div className="glass-light p-6 rounded-2xl flex flex-col justify-between min-h-[145px]">
          <div className="p-2.5 bg-blue-50/60 text-blue-600 rounded-xl w-fit shadow-inner border border-blue-100/20"><Package size={18} /></div>
          <div className="mt-4">
            <p 
              className="text-[14px] leading-[21px] font-normal text-[#7F8C8D] tracking-[0px]"
              style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 400 }}
            >
              New Orders Received
            </p>
            <h3 
              className="text-[32px] font-bold text-blue-600 leading-[48px] tracking-[0px] mt-1"
              style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 700 }}
            >
              {orders.filter(o => o.status === 'New').length}
            </h3>
            <span 
              className="text-[13px] font-normal text-blue-500 leading-[19.5px] tracking-[0px] mt-2 inline-block"
              style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 400 }}
            >
              Needs action
            </span>
          </div>
        </div>

        {/* كارد 2 */}
        <div className="glass-light p-6 rounded-2xl flex flex-col justify-between min-h-[145px]">
          <div className="p-2.5 bg-amber-50/60 text-amber-500 rounded-xl w-fit shadow-inner border border-amber-100/20"><Clock size={18} /></div>
          <div className="mt-4">
            <p 
              className="text-[14px] leading-[21px] font-normal text-[#7F8C8D] tracking-[0px]"
              style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 400 }}
            >
              Orders In Progress
            </p>
            <h3 
              className="text-[32px] font-bold text-amber-500 leading-[48px] tracking-[0px] mt-1"
              style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 700 }}
            >
              {orders.filter(o => o.status === 'In Progress').length}
            </h3>
            <span 
              className="text-[13px] font-normal text-amber-500 leading-[19.5px] tracking-[0px] mt-2 inline-block"
              style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 400 }}
            >
              Being processed
            </span>
          </div>
        </div>

        {/* كارد 3 */}
        <div className="glass-light p-6 rounded-2xl flex flex-col justify-between min-h-[145px]">
          <div className="p-2.5 bg-emerald-50/60 text-emerald-500 rounded-xl w-fit shadow-inner border border-emerald-100/20"><ShoppingBag size={18} /></div>
          <div className="mt-4">
            <p 
              className="text-[14px] leading-[21px] font-normal text-[#7F8C8D] tracking-[0px]"
              style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 400 }}
            >
              Shipped / Completed
            </p>
            <h3 
              className="text-[32px] font-bold text-emerald-500 leading-[48px] tracking-[0px] mt-1"
              style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 700 }}
            >
              {orders.filter(o => o.status === 'Shipped').length + 42}
            </h3>
            <span 
              className="text-[13px] font-normal text-emerald-500 leading-[19.5px] tracking-[0px] mt-2 inline-block"
              style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 400 }}
            >
              This month
            </span>
          </div>
        </div>
      </div>

      {/* 3. الجدول والـ Actions (تم تحديث عنوان الجدول بـ الستايل المطلوب) */}
      <div className="glass-light rounded-2xl overflow-hidden border border-white/60 shadow-sm">
        <div className="px-6 py-5 border-b border-slate-100/80 flex items-center justify-between bg-white/40 select-none flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-slate-100 text-[#1b2a49] rounded-lg">
              <ShoppingBag size={16} />
            </div>
            <h2 
              className="text-[18px] md:text-[22px] font-bold text-[#1B2A49] md:leading-[33px] tracking-[0px]"
              style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 700 }}
            >
              Incoming Purchase Orders
            </h2>
          </div>
          <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-blue-100/50 h-fit">
            {filteredOrders.length} Orders
          </span>
        </div>

        {/* الـ Table الـ Responsive بالكامل */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-100/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Pharmacy Name</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Total Items</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60 text-xs font-medium">
              {filteredOrders.map((order) => (
                <tr 
                  key={order.id} 
                  onClick={() => setSelectedOrder(order)}
                  className="hover:bg-slate-50/40 transition-colors duration-150 cursor-pointer"
                >
                  <td className="py-4 px-6 font-bold text-blue-600 tracking-tight">{order.id}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 ${order.logoBg} text-white font-bold text-[10px] rounded-full flex items-center justify-center flex-shrink-0`}>{order.logo}</div>
                      <span className="font-bold text-[#1b2a49] whitespace-nowrap">{order.pharmacy}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-400 font-semibold whitespace-nowrap">{order.date}</td>
                  <td className="py-4 px-6 text-slate-500 font-semibold whitespace-nowrap">📦 {order.items} items</td>
                  <td className="py-4 px-6">
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-lg ${
                      order.status === 'New' ? 'bg-blue-50 text-blue-500 border border-blue-100/40' :
                      order.status === 'In Progress' ? 'bg-amber-50 text-amber-500 border border-amber-100/40' :
                      'bg-purple-50 text-purple-500 border border-purple-100/40'
                    }`}>{order.status}</span>
                  </td>
                  <td className="py-4 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
                    >
                      <Eye size={13} />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* الـ Pagination */}
        <div className="px-6 py-4 bg-slate-50/40 border-t border-slate-100/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-semibold select-none">
          <span>Showing 1 to {filteredOrders.length} of {orders.length} orders</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-300 transition-all text-slate-400 cursor-not-allowed" disabled>
              Previous
            </button>
            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold shadow-sm cursor-pointer">1</button>
            <button className="w-8 h-8 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all cursor-pointer">2</button>
            <button className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all cursor-pointer">
              Next
            </button>
          </div>
        </div>

      </div>

      {/* الـ Modal الفاخر لتفاصيل الطلب */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setSelectedOrder(null)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 cursor-pointer">
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center mt-2 mb-6">
              <div className={`w-14 h-14 ${selectedOrder.logoBg} text-white flex items-center justify-center text-lg font-bold rounded-full shadow-md mb-2`}>{selectedOrder.logo}</div>
              <h3 className="text-lg font-bold text-[#1b2a49]">{selectedOrder.pharmacy}</h3>
              <p className="text-xs text-blue-600 font-bold mt-0.5">{selectedOrder.id}</p>
            </div>

            <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 space-y-2 mb-4 text-xs font-medium text-slate-600">
              <p className="flex justify-between"><span>Order Date:</span> <span className="font-bold text-[#1b2a49]">{selectedOrder.date}</span></p>
              <p className="flex justify-between"><span>Total Items:</span> <span className="font-bold text-[#1b2a49]">{selectedOrder.items} items</span></p>
              <p className="flex justify-between"><span>Total Amount:</span> <span className="font-bold text-emerald-600 text-sm">{selectedOrder.totalAmount}</span></p>
              <p className="flex justify-between items-center"><span>Current Status:</span> 
                <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${selectedOrder.status === 'New' ? 'bg-blue-50 text-blue-500' : 'bg-amber-50 text-amber-500'}`}>{selectedOrder.status}</span>
              </p>
            </div>

            <div className="space-y-2 mb-6">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wide px-1">Items List</p>
              <div className="border border-slate-100 rounded-xl divide-y divide-slate-100 overflow-hidden text-xs">
                {selectedOrder.itemsList.map((item, index) => (
                  <div key={index} className="p-3 bg-white flex justify-between font-semibold">
                    <span className="text-[#1b2a49]">{item.name} <span className="text-slate-400 font-normal">x{item.qty}</span></span>
                    <span className="text-slate-500">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* أزرار التحكم الفورية */}
            <div className="grid grid-cols-2 gap-3">
              {selectedOrder.status === 'New' ? (
                <>
                  <button onClick={() => handleStatusChange(selectedOrder.id, 'In Progress')} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"><Check size={14}/> Accept Order</button>
                  <button onClick={() => handleStatusChange(selectedOrder.id, 'Rejected')} className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs py-3 rounded-xl transition-all cursor-pointer">Reject</button>
                </>
              ) : selectedOrder.status === 'In Progress' ? (
                <button onClick={() => handleStatusChange(selectedOrder.id, 'Shipped')} className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"><Package size={14}/> Ship Order Now</button>
              ) : (
                <button className="col-span-2 bg-slate-100 text-slate-600 font-bold text-xs py-3 rounded-xl cursor-not-allowed flex items-center justify-center gap-1.5"><FileText size={14}/> Order Shipped</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}