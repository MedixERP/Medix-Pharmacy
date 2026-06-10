// src/pages/supplier/AddProduct.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import SEOHead from '../../components/shared/SEOHead';
import { FormInput, FormSelect } from '../../components/ui/FormElements';

export default function AddProduct() {
  const navigate = useNavigate();
  
  // State لحفظ المدخلات حركياً
  const [formData, setFormData] = useState({
    name: '',
    scientificName: '',
    category: 'Painkiller',
    price: '',
    stock: '',
    minStock: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending Payload to Backend API:', formData);
    // هنا: await inventoryApi.addProduct(formData);
    alert('Product added successfully to catalog!');
    navigate('/supplier/drugs');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 text-left">
      <SEOHead title="Add New Product" description="Insert new medicine records into your warehouse inventory system." />
      
      <button 
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Drugs Catalog
      </button>

      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1b2a49]">Add New Product</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">Fill in the product information to add it to your catalog.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput label="Product Name" required placeholder="Enter product name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <FormInput label="Scientific Name" required placeholder="Enter scientific name" value={formData.scientificName} onChange={e => setFormData({...formData, scientificName: e.target.value})} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormSelect label="Category" required options={['Painkiller', 'Antibiotic', 'Anti-inflammatory', 'Gastric']} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
            <FormInput label="Unit Price (EGP)" required type="number" placeholder="Enter price (EGP)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput label="Available Stock" required type="number" placeholder="Enter quantity" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
            <FormInput label="Minimum Stock Level" required type="number" placeholder="Enter minimum quantity" subLabel="Alert triggers when stock falls below this level" value={formData.minStock} onChange={e => setFormData({...formData, minStock: e.target.value})} />
          </div>

          {/* Image Upload Area */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1b2a49]">Product Image <span className="text-slate-400 font-medium">(Optional)</span></label>
            <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 transition-colors rounded-2xl p-8 text-center bg-[#f8fafc]/50 flex flex-col items-center justify-center cursor-pointer group">
              <Upload size={28} className="text-slate-400 group-hover:text-blue-500 transition-colors mb-2" />
              <p className="text-xs font-bold text-[#1b2a49]">Click to upload <span className="text-slate-400 font-medium">or drag and drop</span></p>
              <p className="text-[10px] text-slate-400 font-medium mt-1">Recommended: 500x500px, Max 2MB (JPG, PNG)</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1b2a49]">Description <span className="text-slate-400 font-medium">(Optional)</span></label>
            <textarea rows={3} placeholder="Enter product description..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-500 transition-all shadow-sm"></textarea>
          </div>

          <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.99]">
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
}