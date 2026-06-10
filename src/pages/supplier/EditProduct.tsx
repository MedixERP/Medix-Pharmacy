// src/pages/supplier/EditProduct.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, FileText } from 'lucide-react';

export default function EditProduct() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors">
        <ArrowLeft size={14} /> Back to Drugs Catalog
      </button>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1b2a49]">Edit Product</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">Update product information in your catalog.</p>
        </div>

        {/* Product Information Dashboard Badge */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex flex-col sm:flex-row sm:justify-between text-xs text-[#1b2a49] font-medium gap-2">
          <div className="space-y-1">
            <p className="flex items-center gap-1.5"><FileText size={14} className="text-blue-500" /><b>Product Information</b></p>
            <p className="text-slate-500">Added: <b>Jan 15, 2024</b></p>
            <p className="text-slate-500">Total orders received: <b>145</b></p>
          </div>
          <div className="sm:text-right flex flex-col justify-end">
            <p className="text-slate-500">Last updated: <b>Jan 28, 2026 by Ahmed Mostafa</b></p>
            <p className="text-slate-500">Total quantity sold: <b>12,500 units</b></p>
          </div>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1b2a49]">Product Name <span className="text-rose-500">*</span></label>
              <input type="text" defaultValue="Panadol" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 transition-all"/>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1b2a49]">Scientific Name <span className="text-rose-500">*</span></label>
              <input type="text" defaultValue="Acetaminophen" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 transition-all"/>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1b2a49]">Category <span className="text-rose-500">*</span></label>
              <select defaultValue="Painkiller" className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 bg-white transition-all">
                <option>Painkiller</option>
                <option>Antibiotic</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1b2a49]">Unit Price (EGP) <span className="text-rose-500">*</span></label>
              <input type="number" defaultValue={20} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 transition-all"/>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1b2a49]">Available Stock <span className="text-rose-500">*</span></label>
              <input type="number" defaultValue={5000} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 transition-all"/>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#1b2a49]">Minimum Stock Level <span className="text-rose-500">*</span></label>
              <input type="number" defaultValue={500} className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 transition-all"/>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1b2a49]">Product Image <span className="text-slate-400 font-medium">(Optional)</span></label>
            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center bg-[#f8fafc]/50 flex flex-col items-center justify-center cursor-pointer">
              <Upload size={24} className="text-slate-400 mb-2" />
              <p className="text-xs font-bold text-[#1b2a49]">Click to change image</p>
            </div>
          </div>

          <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}