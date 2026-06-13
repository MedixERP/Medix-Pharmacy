// src/pages/supplier/AddProduct.tsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, FileImage, X } from 'lucide-react';
import SEOHead from '../../components/shared/SEOHead';
import { FormInput, FormSelect } from '../../components/ui/FormElements';

export default function AddProduct() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State لحفظ المدخلات وملف الصورة حركياً وجاهز للإرسال للباك إند
  const [formData, setFormData] = useState({
    name: '',
    scientificName: '',
    category: 'Painkiller',
    price: '',
    stock: '',
    minStock: '',
    description: ''
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  // هندلة اختيار الصورة حركياً
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert('File size exceeds 2MB. Please choose a smaller image.');
        return;
      }
      setImageFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // تجهيز الـ Payload الكامل لبعثه للباك إند كـ FormData لدعم رفع الصور الحقيقية
    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('scientificName', formData.scientificName);
    payload.append('category', formData.category);
    payload.append('price', formData.price);
    payload.append('stock', formData.stock);
    payload.append('minStock', formData.minStock);
    payload.append('description', formData.description);
    if (imageFile) {
      payload.append('productImage', imageFile);
    }

    console.log('Sending Pure Data Payload to Backend API:', formData);
    console.log('Sending Multipart Image to Backend API:', imageFile?.name);
    
    // هنا عند الربط: await axios.post('/api/products', payload);
    
    alert('Product added successfully to catalog!');
    navigate('/supplier/drugs');
  };

  return (
    <div className="w-full text-left relative select-none animate-in fade-in duration-300">
      <SEOHead title="Add New Product" description="Insert new medicine records into your warehouse inventory system." />
      
      {/* 1. زرار الـ Go Back بالأبعاد الدقيقة والخط المخصص واللون #3B81B7 */}
      <div className="mt-[26px] mx-[26px]">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer"
          style={{ 
            fontFamily: 'SF Pro Rounded, sans-serif', 
            fontWeight: 400, 
            fontSize: '15px', 
            lineHeight: '22.5px', 
            letterSpacing: '0px',
            color: '#3B81B7'
          }}
        >
          <ArrowLeft size={16} /> Back to Drags Catalog
        </button>
      </div>

      {/* 2. الـ Container الداخلي المتباعد بـ الأبعاد x و y المطلوبة بالملي من فيجما */}
      <div className="bg-white rounded-3xl mt-[8px] mb-[81px] mx-[61px] p-8 border border-slate-100 shadow-sm space-y-6">
        
        {/* العناوين والمسافة الـ 16px بالظبط بين التيتل والبرجراف المساعد */}
        <div>
          <h1 
            className="text-[#1b2a49]"
            style={{ 
              fontFamily: 'SF Pro Rounded, sans-serif', 
              fontWeight: 700, 
              fontSize: '40px', 
              lineHeight: '60px', 
              letterSpacing: '0px' 
            }}
          >
            Add New Product
          </h1>
          <p 
            className="text-slate-400 mt-[16px]"
            style={{ 
              fontFamily: 'SF Pro Rounded, sans-serif', 
              fontWeight: 400, 
              fontSize: '16px', 
              lineHeight: '24px', 
              letterSpacing: '0px' 
            }}
          >
            Fill in the product information to add it to your catalog.
          </p>
        </div>

        {/* نموذج الإدخال المتكامل المتجاوب */}
        <form className="space-y-6 pt-2" onSubmit={handleSubmit}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Product Name" required placeholder="Enter product name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <FormInput label="Scientific Name" required placeholder="Enter scientific name" value={formData.scientificName} onChange={e => setFormData({...formData, scientificName: e.target.value})} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormSelect label="Category" required options={['Painkiller', 'Antibiotic', 'Anti-inflammatory', 'Gastric', 'Pain Relief']} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
            <FormInput label="Unit Price (EGP)" required type="number" placeholder="Enter price (EGP)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Available Stock" required type="number" placeholder="Enter quantity" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} />
            <FormInput label="Minimum Stock Level" required type="number" placeholder="Enter minimum quantity" subLabel="Alert triggers when stock falls below this level" value={formData.minStock} onChange={e => setFormData({...formData, minStock: e.target.value})} />
          </div>

          {/* 📁 منطقة رفع الملفات التفاعلية والشغالة حركياً */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#1b2a49]">Product Image <span className="text-slate-400 font-medium">(Optional)</span></label>
            
            {/* حقل إدخال مخفي لتشغيل الـ Ref والرفع بضغطة زرار */}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              accept="image/jpeg,image/png" 
              className="hidden" 
            />

            {!imageFile ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-200 hover:border-blue-400 transition-colors rounded-2xl p-8 text-center bg-[#f8fafc]/50 flex flex-col items-center justify-center cursor-pointer group"
              >
                <Upload size={28} className="text-slate-400 group-hover:text-blue-500 transition-colors mb-2" />
                <p className="text-xs font-bold text-[#1b2a49]">Click to upload <span className="text-slate-400 font-medium">or drag and drop</span></p>
                <p className="text-[10px] text-slate-400 font-medium mt-1">Recommended: 500x500px, Max 2MB</p>
                <p className="text-[10px] text-slate-400 font-medium">Accepted: JPG, PNG</p>
              </div>
            ) : (
              <div className="border border-slate-200 rounded-2xl p-4 bg-blue-50/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><FileImage size={20} /></div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-[#1b2a49] max-w-[200px] sm:max-w-xs truncate">{imageFile.name}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{(imageFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={() => setImageFile(null)}
                  className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#1b2a49]">Description <span className="text-slate-400 font-medium">(Optional)</span></label>
            <textarea rows={3} placeholder="Enter product description..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-blue-400 transition-all shadow-2xs font-medium placeholder:text-slate-300"></textarea>
          </div>

          {/* البتون الاحترافي للحفظ بالـ Linear Gradient المتكامل للشاشات التفاعلية */}
          <button 
            type="submit" 
            className="w-full py-4 text-white font-bold text-xs rounded-xl transition-all transform active:scale-[0.99] shadow-md hover:opacity-95 cursor-pointer block"
            style={{ background: 'linear-gradient(135deg, #3B81B7 0%, #5B9FD7 100%)' }}
          >
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
}