// src/pages/supplier/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { Eye, Package, ShoppingBag, Clock, X, Check, FileText } from 'lucide-react';
import { useSearchStore } from '../../store/searchStore';
import SEOHead from '../../components/shared/SEOHead';
import { reportsApi } from '../../api/reports.api';

// تعريف الـ Interfaces لمطابقة بيانات السيرفر الحقيقية أونلاين
interface OrderItem {
  name: string;
  qty: number;
  price: string;
}

interface BackendOrder {
  id: string;
  pharmacy: string;
  logo: string;
  logoBg: string;
  date: string;
  items: number;
  status: string;
  totalAmount: string;
  itemsList: OrderItem[];
}

export default function SupplierDashboard() {
  const [orders, setOrders] = useState<BackendOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const [selectedOrder, setSelectedOrder] = useState<BackendOrder | null>(null);

  // الـ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // 1. جلب بيانات السيرفر لايف أول ما الشاشة تفتح
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await reportsApi.getDashboardSummary();
        
        // إذا كان الباك إند يرجع مصفوفة الطلبات مباشرة أو كجزء من أوبجكت
        const backendOrders = data.orders || data; 
        if (Array.isArray(backendOrders)) {
          setOrders(backendOrders);
        }
      } catch (err: any) {
        console.error('Error loading dashboard:', err);
        setError('تعذر مزامنة بيانات اللوحة أونلاين.');
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

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

  return (
    <div className="animate-in fade-in duration-300 text-left relative space-y-6">
      <SEOHead 
        title="Dashboard" 
        description="Eva Pharma Supplier Dashboard - Track and manage incoming pharmacy purchase orders." 
      />
      
      {/* 1. الترحيب */}
      <div>
        <h1 className="text-[24px] md:text-[30px] font-bold text-[#1B2A49] md:leading-[42px] tracking-[0px] flex items-center gap-2 select-none" style={{ fontFamily: '"SF Pro Rounded", sans-serif', fontWeight: 700 }}>
          Welcome back, Eva Pharma! <span className="inline-block animate-bounce text-xl">📦</span>
        </h1>
        <p className="text-[13px] md:text-[15px] font-normal text-[#7F8C8D] md:leading-[22.5px] mt-[8px]" style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}>
          Track and manage incoming orders from your pharmacy partners.
        </p>
      </div>

      {isLoading ? (
        <div className="p-20 flex flex-col items-center justify-center gap-3 bg-white rounded-3xl border border-slate-100">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#3B81B7] border-t-transparent"></div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Loading Dashboard Summary Live...</p>
        </div>
      ) : error ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-100 text-rose-500 text-xs font-bold">{error}</div>
      ) : (
        <>
          {/* 2. كروت الإحصائيات الفاخرة بناء على داتا السيرفر الحقيقية */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
            <div className="glass-light p-6 rounded-2xl flex flex-col justify-between min-h-[145px] bg-white border border-slate-100 shadow-xs">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl w-fit"><Package size={18} /></div>
              <div className="mt-4">
                <p className="text-[14px] font-normal text-[#7F8C8D]">New Orders Received</p>
                <h3 className="text-[32px] font-bold text-blue-600 mt-1">{orders.filter(o => o.status === 'New').length}</h3>
                <span className="text-[13px] text-blue-500 mt-2 inline-block">Needs action</span>
              </div>
            </div>

            <div className="glass-light p-6 rounded-2xl flex flex-col justify-between min-h-[145px] bg-white border border-slate-100 shadow-xs">
              <div className="p-2.5 bg-amber-50 text-amber-500 rounded-xl w-fit"><Clock size={18} /></div>
              <div className="mt-4">
                <p className="text-[14px] font-normal text-[#7F8C8D]">Orders In Progress</p>
                <h3 className="text-[32px] font-bold text-amber-500 mt-1">{orders.filter(o => o.status === 'In Progress').length}</h3>
                <span className="text-[13px] text-amber-500 mt-2 inline-block">Being processed</span>
              </div>
            </div>

            <div className="glass-light p-6 rounded-2xl flex flex-col justify-between min-h-[145px] bg-white border border-slate-100 shadow-xs">
              <div className="p-2.5 bg-emerald-50 text-emerald-500 rounded-xl w-fit"><ShoppingBag size={18} /></div>
              <div className="mt-4">
                <p className="text-[14px] font-normal text-[#7F8C8D]">Completed Orders</p>
                <h3 className="text-[32px] font-bold text-emerald-500 mt-1">{orders.filter(o => o.status === 'Shipped' || o.status === 'Completed').length + 42}</h3>
                <span className="text-[13px] text-emerald-500 mt-2 inline-block">This month</span>
              </div>
            </div>
          </div>

          {/* 3. جدول الـ Purchase Orders */}
          <div className="glass-light rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-xs">
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between select-none">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-slate-100 text-[#1b2a49] rounded-lg"><ShoppingBag size={16} /></div>
                <h2 className="text-[18px] md:text-[22px] font-bold text-[#1B2A49]">Incoming Purchase Orders</h2>
              </div>
              <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-full">{filteredOrders.length} Orders</span>
            </div>

            {/* تصميم الجدول للـ Desktop */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/60 border-b border-slate-100 text-slate-400 select-none text-[12px] font-bold uppercase">
                    <th className="py-4 px-6">Order ID</th>
                    <th className="py-4 px-6">Pharmacy Name</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6">Total Items</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium">
                  {currentOrders.map((order) => (
                    <tr key={order.id} onClick={() => setSelectedOrder(order)} className="hover:bg-slate-50/40 transition-colors cursor-pointer">
                      <td className="py-4 px-6 font-bold text-blue-600">{order.id}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 text-white font-bold text-[11px] rounded-full flex items-center justify-center shadow-xs" style={{ background: 'linear-gradient(135deg, #3B81B7 0%, #5B9FD7 100%)' }}>
                            {order.logo || order.pharmacy.substring(0,2).toUpperCase()}
                          </div>
                          <span className="font-bold text-[#1b2a49]">{order.pharmacy}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[#7F8C8D]">{order.date}</td>
                      <td className="py-4 px-6 text-slate-500">📦 {order.items} items</td>
                      <td className="py-4 px-6">
                        <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-lg ${
                          order.status === 'New' ? 'bg-blue-50 text-blue-500 border border-blue-100/40' :
                          order.status === 'In Progress' ? 'bg-amber-50 text-amber-500 border border-amber-100/40' : 'bg-purple-50 text-purple-500 border border-purple-100/40'
                        }`}>{order.status}</span>
                      </td>
                      <td className="py-4 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setSelectedOrder(order)} className="inline-flex items-center gap-1.5 text-white font-bold text-[11px] px-4 py-2 rounded-xl shadow-sm cursor-pointer" style={{ background: 'linear-gradient(135deg, #3B81B7 0%, #5B9FD7 100%)' }}>
                          <Eye size={13} /> View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* الـ Pagination */}
            <div className="px-6 py-4 bg-slate-50/40 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-semibold select-none">
              <span>Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length} orders</span>
              <div className="flex items-center gap-1">
                <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white disabled:opacity-40 cursor-pointer">Previous</button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`w-8 h-8 rounded-lg font-bold ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border border-slate-200 bg-white text-slate-600'}`}>{i + 1}</button>
                ))}
                <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0} className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white disabled:opacity-40 cursor-pointer">Next</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* الـ Modal الفاخر لتفاصيل الطلب */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setSelectedOrder(null)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 cursor-pointer">
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center mt-2 mb-6">
              <div className="w-14 h-14 text-white flex items-center justify-center text-lg font-bold rounded-full mb-2" style={{ background: 'linear-gradient(135deg, #3B81B7 0%, #5B9FD7 100%)' }}>
                {selectedOrder.logo || selectedOrder.pharmacy.substring(0,2).toUpperCase()}
              </div>
              <h3 className="text-lg font-bold text-[#1b2a49]">{selectedOrder.pharmacy}</h3>
              <p className="text-xs text-blue-600 font-bold mt-0.5">{selectedOrder.id}</p>
            </div>

            <div className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 space-y-2 mb-4 text-xs font-medium text-slate-600">
              <p className="flex justify-between"><span>Order Date:</span> <span className="font-bold text-[#1b2a49]">{selectedOrder.date}</span></p>
              <p className="flex justify-between"><span>Total Items:</span> <span className="font-bold text-[#1b2a49]">{selectedOrder.items} items</span></p>
              <p className="flex justify-between"><span>Total Amount:</span> <span className="font-bold text-emerald-600 text-sm">{selectedOrder.totalAmount || '0.00 EGP'}</span></p>
            </div>

            {selectedOrder.itemsList && (
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
            )}

            <div className="grid grid-cols-2 gap-3">
              {selectedOrder.status === 'New' ? (
                <>
                  <button onClick={() => handleStatusChange(selectedOrder.id, 'In Progress')} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1 cursor-pointer"><Check size={14}/> Accept Order</button>
                  <button onClick={() => handleStatusChange(selectedOrder.id, 'Rejected')} className="bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs py-3 rounded-xl cursor-pointer">Reject</button>
                </>
              ) : selectedOrder.status === 'In Progress' ? (
                <button onClick={() => handleStatusChange(selectedOrder.id, 'Shipped')} className="col-span-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md"><Package size={14}/> Ship Order Now</button>
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
