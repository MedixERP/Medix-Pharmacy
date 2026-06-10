// src/pages/supplier/Drugs.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit3, Trash2, Pill } from 'lucide-react';
import SEOHead from '../../components/shared/SEOHead';

const initialDrugs = [
  { id: 1, name: 'Panadol', category: 'Painkiller', price: '10.00 EGP', stock: 5000, status: 'Available' },
  { id: 2, name: 'Brufen', category: 'Anti-inflammatory', price: '17.50 EGP', stock: 3200, status: 'Available' },
  { id: 3, name: 'Augmentin', category: 'Antibiotic', price: '42.00 EGP', stock: 0, status: 'Out of Stock' },
];

export default function DrugsCatalog() {
  const [drugs, setDrugs] = useState(initialDrugs);
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate();

  // أكشن الحذف الحقيقي في الـ UI
  const handleDeleteProduct = (id: number) => {
    if(window.confirm('Are you sure you want to delete this product from catalog?')) {
      setDrugs(prev => prev.filter(d => d.id !== id));
      // هنا مستقبلاً: await drugsApi.deleteProduct(id);
    }
  };

  const filteredDrugs = drugs.filter(d => filter === 'All' || d.status === filter);

  return (
    <div className="space-y-6">
      <SEOHead title="Drugs Catalog" description="Manage pharmaceutical products, stock entries, and prices." />
      
      <div className="flex justify-between items-center text-left">
        <div>
          <h1 className="text-2xl font-bold text-[#1b2a49]">Drugs Catalog</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">Your available products and inventory levels.</p>
        </div>
        <button 
          onClick={() => navigate('/supplier/drugs/add')}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {['All', 'Available', 'Out of Stock'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              filter === tab ? 'bg-[#1b2a49] text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="glass-light rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              <th className="py-4 px-6">Product Name</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Unit Price</th>
              <th className="py-4 px-6">Available Stock</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {filteredDrugs.map((drug) => (
              <tr key={drug.id} className="hover:bg-slate-50/30 transition-all font-medium">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Pill size={16} className="text-blue-500" />
                    <span className="font-bold text-[#1b2a49]">{drug.name}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-slate-400 font-semibold">{drug.category}</td>
                <td className="py-4 px-6 font-bold text-emerald-600">{drug.price}</td>
                <td className="py-4 px-6 text-[#1b2a49] font-bold">{drug.stock.toLocaleString()} units</td>
                <td className="py-4 px-6">
                  <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-lg ${
                    drug.status === 'Available' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'
                  }`}>
                    {drug.status}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => navigate(`/supplier/drugs/edit/${drug.id}`)}
                      className="text-slate-400 hover:text-blue-600 p-1.5 rounded-xl hover:bg-slate-50 transition-all inline-flex"
                    >
                      <Edit3 size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteProduct(drug.id)}
                      className="text-slate-400 hover:text-rose-600 p-1.5 rounded-xl hover:bg-slate-50 transition-all inline-flex"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}