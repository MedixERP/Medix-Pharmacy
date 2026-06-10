// src/pages/supplier/Pharmacies.tsx
import React, { useState } from 'react';
import { Search, Eye, Mail, X, Phone, MapPin, Calendar, DollarSign, ShoppingBag } from 'lucide-react';

const initialPharmacies = [
  { id: 1, name: 'Smart Pharmacy', contact: 'Ahmed Hassan', email: 'ahmed@smartpharma.com', phone: '+20 100 123 4567', orders: 45, lastOrder: 'Jan 28', status: 'Active', revenue: '125,000', memberSince: 'Jan 2024', address: '123 Main St, Cairo, Egypt' },
  { id: 2, name: 'Al-Ezaby', contact: 'Sara Ali', email: 'info@ezaby.com', phone: '+20 122 456 7890', orders: 32, lastOrder: 'Jan 27', status: 'Active', revenue: '98,000', memberSince: 'Mar 2023', address: '456 El-Thawra St, Heliopolis, Cairo' },
  { id: 3, name: 'Seif Pharmacy', contact: 'Mohamed Said', email: 'seif@pharma.com', phone: '+20 111 234 5678', orders: 18, lastOrder: 'Jan 20', status: 'Inactive', revenue: '42,500', memberSince: 'Nov 2024', address: '789 El-Bahr St, Tanta, Egypt' },
];

export default function Pharmacies() {
  const [pharmacies] = useState(initialPharmacies);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState<typeof initialPharmacies[0] | null>(null);

  const filteredPharmacies = pharmacies.filter(p => {
    const matchesFilter = filter === 'All' || p.status === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.contact.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#1b2a49]">Pharmacist Accounts</h1>
        <p className="text-xs text-slate-400 font-medium mt-1">Pharmacies you supply to</p>
      </div>

      {/* شريط البحث والـ Filter */}
      <div className="space-y-4">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search pharmacy by name, contact..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-200/80 rounded-xl py-3 pl-11 pr-4 text-sm text-[#1b2a49] placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-all shadow-sm"
          />
        </div>

        <div className="flex gap-2">
          {['All', 'Active', 'Inactive'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                filter === tab ? 'bg-[#1b2a49] text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {tab} ({tab === 'All' ? pharmacies.length : pharmacies.filter(p => p.status === tab).length})
            </button>
          ))}
        </div>
      </div>

      {/* الجدول */}
      <div className="glass-light rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-4 px-6">Pharmacy Name</th>
              <th className="py-4 px-6">Contact Person</th>
              <th className="py-4 px-6">Email</th>
              <th className="py-4 px-6">Phone</th>
              <th className="py-4 px-6">Total Orders</th>
              <th className="py-4 px-6">Last Order</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredPharmacies.map((pharmacy) => (
              <tr key={pharmacy.id} className="hover:bg-slate-50/30 transition-all">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shadow-sm">
                      🏥
                    </div>
                    <span className="font-bold text-[#1b2a49]">{pharmacy.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 font-semibold text-slate-600">{pharmacy.contact}</td>
                <td className="py-4 px-6 text-slate-400 font-medium">{pharmacy.email}</td>
                <td className="py-4 px-6 text-slate-500 font-medium">{pharmacy.phone}</td>
                <td className="py-4 px-6 font-bold text-[#1b2a49]">{pharmacy.orders} orders</td>
                <td className="py-4 px-6 text-slate-400 font-semibold">{pharmacy.lastOrder}</td>
                <td className="py-4 px-6">
                  <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-lg ${
                    pharmacy.status === 'Active' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {pharmacy.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-3 text-slate-400">
                    <button onClick={() => setSelectedPharmacy(pharmacy)} className="hover:text-blue-600 transition-colors">
                      <Eye size={18} />
                    </button>
                    <a href={`mailto:${pharmacy.email}`} className="hover:text-blue-600 transition-colors">
                      <Mail size={18} />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* الـ Modal الفاخر لتفاصيل الصيدلية (Smart Pharmacy) */}
      {selectedPharmacy && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedPharmacy(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 transition-all"
            >
              <X size={18} />
            </button>

            {/* Profile Header */}
            <div className="flex flex-col items-center text-center mt-2 mb-6">
              <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-md mb-3">
                {selectedPharmacy.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h3 className="text-lg font-bold text-[#1b2a49]">{selectedPharmacy.name}</h3>
              <span className="mt-1 inline-block text-xs font-bold px-2 py-0.5 bg-emerald-50 text-emerald-500 rounded-md">
                ✓ {selectedPharmacy.status}
              </span>
            </div>

            {/* Contact Information Box */}
            <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-4 space-y-3 mb-6">
              <h4 className="text-xs font-bold text-[#1b2a49] flex items-center gap-2 tracking-wide uppercase opacity-70">
                <Mail size={14} className="text-blue-500" /> Contact Information
              </h4>
              <div className="text-xs space-y-2 text-slate-600 font-medium">
                <p><span className="text-slate-400">Contact Person:</span> {selectedPharmacy.contact}</p>
                <p><span className="text-slate-400">Email:</span> {selectedPharmacy.email}</p>
                <p><span className="text-slate-400">Phone:</span> {selectedPharmacy.phone}</p>
                <p><span className="text-slate-400">Address:</span> {selectedPharmacy.address}</p>
              </div>
            </div>

            {/* Order Statistics Grid */}
            <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-4 space-y-3 mb-6">
              <h4 className="text-xs font-bold text-[#1b2a49] flex items-center gap-2 tracking-wide uppercase opacity-70">
                📊 Order Statistics
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-xl font-extrabold text-[#1b2a49]">{selectedPharmacy.orders}</span>
                  <p className="text-[10px] font-bold text-slate-400 mt-0.5">Total Orders</p>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-xs font-extrabold text-purple-600 break-words block py-1">{selectedPharmacy.revenue} EGP</span>
                  <p className="text-[10px] font-bold text-slate-400 mt-0.5">Revenue</p>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm">
                  <span className="text-[11px] font-extrabold text-blue-600 block py-1">{selectedPharmacy.memberSince}</span>
                  <p className="text-[10px] font-bold text-slate-400 mt-0.5">Member Since</p>
                </div>
              </div>
              <div className="text-xs text-slate-500 font-medium pt-1 flex justify-between px-1">
                <span>Last Order: <b>{selectedPharmacy.lastOrder}, 2026</b></span>
                <span>Avg Value: <b>2,778 EGP</b></span>
              </div>
            </div>

            {/* Recent Orders List */}
            <div className="space-y-2 mb-6">
              <h4 className="text-xs font-bold text-[#1b2a49] tracking-wide uppercase opacity-70 px-1">Recent Orders (Last 2)</h4>
              <div className="border border-slate-100 rounded-xl divide-y divide-slate-100 overflow-hidden text-xs">
                <div className="p-3 bg-white flex justify-between items-center">
                  <div>
                    <p className="font-bold text-[#1b2a49]">Order #PO-001</p>
                    <span className="text-slate-400 text-[10px]">Jan 28</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#1b2a49]">4,500 EGP</p>
                    <span className="text-emerald-500 font-bold text-[10px]">Delivered</span>
                  </div>
                </div>
                <div className="p-3 bg-white flex justify-between items-center">
                  <div>
                    <p className="font-bold text-[#1b2a49]">Order #PO-012</p>
                    <span className="text-slate-400 text-[10px]">Jan 15</span>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#1b2a49]">3,200 EGP</p>
                    <span className="text-blue-500 font-bold text-[10px]">Confirmed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md">
                View All Orders
              </button>
              <button onClick={() => setSelectedPharmacy(null)} className="w-full py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs rounded-xl transition-all">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}