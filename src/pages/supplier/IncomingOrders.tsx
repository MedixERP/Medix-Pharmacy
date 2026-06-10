// src/pages/supplier/IncomingOrders.tsx
import React, { useState } from 'react';
import { Check, X, Truck, Eye, FileText } from 'lucide-react';
import SEOHead from '../../components/shared/SEOHead';

const initialOrders = [
  { id: 'PO-2024-001', pharmacy: 'Smart Pharmacy', date: 'Jan 28', items: 3, amount: '4,500 EGP', status: 'New' },
  { id: 'PO-2024-002', pharmacy: 'Al-Ezaby', date: 'Jan 27', items: 5, amount: '8,200 EGP', status: 'Confirmed' },
  { id: 'PO-2024-003', pharmacy: 'Seif', date: 'Jan 26', items: 2, amount: '3,100 EGP', status: 'Shipped' },
  { id: 'PO-2024-004', pharmacy: 'Noor Pharmacy', date: 'Jan 25', items: 4, amount: '6,800 EGP', status: 'Delivered' },
  { id: 'PO-2024-005', pharmacy: 'City Health', date: 'Jan 24', items: 6, amount: '9,500 EGP', status: 'New' },
];

export default function IncomingOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [activeTab, setActiveTab] = useState('All');

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

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-left relative">
      {/* 1. الـ SEO المتكامل والمطوّر للصفحة */}
      <SEOHead 
        title="Purchase Orders" 
        description="Review, filter, accept, and track all incoming pharmacy purchase orders on the PharmaDash Supplier network." 
      />

      {/* 2. الهيدر والـ Subtitle بـ الستايل المطلوب ومسافة الـ 8px بالملي */}
      <div>
        <h1 
          className="text-[24px] md:text-[30px] font-bold text-[#1B2A49] md:leading-[42px] tracking-[0px] flex items-center gap-2 select-none"
          style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 700 }}
        >
          Purchase Orders
        </h1>
        <p 
          className="text-[13px] md:text-[15px] font-normal text-[#7F8C8D] md:leading-[22.5px] tracking-[0px] mt-[8px]"
          style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 400 }}
        >
          Manage incoming orders from pharmacies
        </p>
      </div>

      {/* 3. الـ Filter Tabs المودرن الصافية تماماً مثل فيجما مع الـ Responsive */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1 select-none scrollbar-none">
        {tabs.map(tab => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.name 
                ? 'bg-[#1b2a49] text-white shadow-sm' 
                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
            }`}
            style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif' }}
          >
            {tab.name} ({tab.count})
          </button>
        ))}
      </div>

      {/* 4. جدول التحكم الفاخر مدمج داخله تفاصيل الاستايل والـ Responsive للباك والموبايل */}
      <div className="glass-light rounded-2xl overflow-hidden border border-white/60 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/60 border-b border-slate-100/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Pharmacy Name</th>
                <th className="py-4 px-6">Order Date</th>
                <th className="py-4 px-6">Items</th>
                <th className="py-4 px-6">Total Amount</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/60 text-xs font-medium">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/40 transition-colors duration-150">
                  <td className="py-4 px-6 font-bold text-blue-600 tracking-tight">{order.id}</td>
                  <td className="py-4 px-6 font-bold text-[#1b2a49] whitespace-nowrap">{order.pharmacy}</td>
                  <td className="py-4 px-6 text-slate-400 font-semibold whitespace-nowrap">{order.date}</td>
                  <td className="py-4 px-6 text-slate-500 font-semibold whitespace-nowrap">📦 {order.items} items</td>
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
                            onClick={() => handleStatusChange(order.id, 'Confirmed')}
                            className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-bold text-[11px] px-3 py-1.5 rounded-lg transition-all active:scale-95 cursor-pointer"
                          >
                            Accept
                          </button>
                          <button 
                            onClick={() => handleStatusChange(order.id, 'Rejected')}
                            className="bg-rose-50 hover:bg-rose-100 text-rose-500 font-bold text-[11px] px-3 py-1.5 rounded-lg transition-all active:scale-95 cursor-pointer"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {order.status === 'Confirmed' && (
                        <button 
                          onClick={() => handleStatusChange(order.id, 'Shipped')}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-4 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                        >
                          <Truck size={13} /> Ship Now
                        </button>
                      )}
                      {order.status === 'Shipped' && (
                        <button className="border border-slate-300 hover:border-slate-400 text-slate-600 font-bold text-[11px] px-4 py-1.5 rounded-lg transition-all active:scale-95 cursor-pointer whitespace-nowrap">
                          Track
                        </button>
                      )}
                      {order.status === 'Delivered' && (
                        <button className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-[11px] px-4 py-1.5 rounded-lg flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer whitespace-nowrap">
                          <FileText size={13} /> View Receipt
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}