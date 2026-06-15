import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, FileImage, X, Trash2, FileText } from 'lucide-react';
import { MdError } from "react-icons/md"; // استيراد الأيقونة المطلوبة
import Swal from 'sweetalert2';
import SEOHead from '../../components/shared/SEOHead';
import { FormInput, FormSelect } from '../../components/ui/FormElements';

// داتا وهمية لمحاكاة جلب المنتج عند التعديل
const mockDrugsCatalog = [
  { id: 'D-001', name: 'Panadol', scientificName: 'Acetaminophen', category: 'Painkiller', price: '10.00', stock: '5000', minStock: '500', description: 'Enter product description...', addedDate: 'Jan 15, 2024', lastUpdated: 'Jan 28, 2026 by Ahmed Mostafa', totalOrders: 145, totalSold: '12,500' },
];

export default function AddEditProduct() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); 
  const isEditMode = Boolean(id);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State الموحد لحفظ البيانات والمدخلات حركياً
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
  const [imagePreview, setImagePreview] = useState<string | null>(null); 
  const [infoBoxData, setInfoBoxData] = useState<typeof mockDrugsCatalog[0] | null>(null);
  
  // State لحفظ الأخطاء وعمل الـ Validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  // جلب البيانات وملء الحقول تلقائياً إذا كان في مود الـ Edit
  useEffect(() => {
    if (isEditMode && id) {
      const drugToEdit = mockDrugsCatalog.find(d => d.id === id) || mockDrugsCatalog[0];
      if (drugToEdit) {
        setFormData({
          name: drugToEdit.name,
          scientificName: drugToEdit.scientificName,
          category: drugToEdit.category,
          price: drugToEdit.price,
          stock: drugToEdit.stock,
          minStock: drugToEdit.minStock,
          description: drugToEdit.description
        });
        setInfoBoxData(drugToEdit);
      }
    }
  }, [id, isEditMode]);

  // تنظيف الـ Preview URL عند إلغاء الصورة لمنع تسريب الذاكرة
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  // هندلة رفع الصورة مع التأكد من الحجم وعمل Preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        Swal.fire({
          title: 'Error!',
          text: 'File size exceeds 2MB. Please choose a smaller image.',
          icon: 'error',
          confirmButtonColor: '#0093B7'
        });
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  // إزالة الصورة المعاينة
  const handleRemoveImage = () => {
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  // حذف الدواء بالكامل من الكاتالوج باستخدام SweetAlert2
  const handleDeleteProduct = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this drug from your catalog!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Deleting Product ID:', id);
        Swal.fire({
          title: 'Deleted!',
          text: 'Product has been deleted successfully.',
          icon: 'success',
          confirmButtonColor: '#0093B7'
        }).then(() => {
          navigate('/supplier/drugs');
        });
      }
    });
  };

  // دالة الـ Validation للتحقق من الحقول المطلوبة
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Product Name is required';
    if (!formData.scientificName.trim()) newErrors.scientificName = 'Scientific Name is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.price.trim()) newErrors.price = 'Unit Price is required';
    if (!formData.stock.trim()) newErrors.stock = 'Available Stock is required';
    if (!formData.minStock.trim()) newErrors.minStock = 'Minimum Stock Level is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // حفظ أو تحديث البيانات للباك إند
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill in all the required fields marked in red.',
        icon: 'error',
        confirmButtonColor: '#0093B7'
      });
      return;
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => payload.append(key, value));
    if (imageFile) payload.append('productImage', imageFile);

    console.log(`Sending Payload to Backend [${isEditMode ? 'UPDATE' : 'CREATE'}]:`, formData);
    
    Swal.fire({
      title: 'Success!',
      text: isEditMode ? 'Product updated successfully!' : 'Product added successfully to catalog!',
      icon: 'success',
      confirmButtonColor: '#0093B7'
    }).then(() => {
      navigate('/supplier/drugs');
    });
  };

  return (
    <div className="w-full text-left relative select-none animate-in fade-in duration-300 px-4 md:px-0">
      <SEOHead 
        title={isEditMode ? "Edit Product" : "Add New Product"} 
        description="Insert or update medicine records in your warehouse inventory system." 
      />
      
      {/* 1. زرار العودة الموحد متجاوب */}
      <div className="my-[26px]">
        <button 
          onClick={() => navigate('/supplier/drugs')}
          className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer text-[#3B81B7]"
          style={{ fontFamily: 'SF Pro Rounded, sans-serif', fontWeight: 400, fontSize: '15px' }}
        >
          <ArrowLeft size={16} /> Back to Drugs Catalog
        </button>
      </div>

      {/* 2. حاوية النموذج الكبيرة متجاوبة */}
      <div className="bg-white rounded-3xl mt-[8px] mb-[81px] mx-0 md:mx-[61px] p-6 md:p-8 border border-slate-200 shadow-[0px_4px_12px_0px_rgba(59,129,183,0.30)] space-y-7">
        
        {/* العناوين والـ Description */}
        <div className="space-y-3">
          <h1 
            className="text-blue-950 font-bold text-3xl md:text-4xl leading-[48px] md:leading-[60px]"
            style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}
          >
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p 
            className="text-gray-500 text-sm md:text-base leading-6"
            style={{ fontFamily: 'SF Pro Rounded, sans-serif' }}
          >
            {isEditMode ? 'Update product information in your catalog.' : 'Fill in the product information to add it to your catalog.'}
          </p>
        </div>

        {/* كارد معلومات وتفاصيل المنتج في مود الـ Edit */}
        {isEditMode && infoBoxData && (
          <div className="w-full p-5 bg-sky-100/70 rounded-2xl border-l-4 border-cyan-600 flex gap-3 animate-in slide-in-from-top-4 duration-300">
            <div className="text-cyan-600 mt-0.5 flex-shrink-0">
              <FileText size={20} />
            </div>
            <div className="space-y-3 w-full">
              <h3 className="text-zinc-600 text-base font-bold font-['SF_Pro_Rounded'] leading-6">Product Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 text-sm font-['SF_Pro_Rounded']">
                <p className="text-gray-500">Added: <span className="text-zinc-600 font-bold">{infoBoxData.addedDate}</span></p>
                <p className="text-gray-500">Last updated: <span className="text-zinc-600 font-bold">{infoBoxData.lastUpdated}</span></p>
                <p className="text-gray-500">Total orders received: <span className="text-zinc-600 font-bold">{infoBoxData.totalOrders}</span></p>
                <p className="text-gray-500">Total quantity sold: <span className="text-zinc-600 font-bold">{infoBoxData.totalSold} units</span></p>
              </div>
            </div>
          </div>
        )}

        {/* الـ Form الرئيسي */}
        <form className="space-y-6 pt-2" onSubmit={handleSubmit}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <FormInput label="Product Name" required placeholder="Enter product name" value={formData.name} onChange={e => { setFormData({...formData, name: e.target.value}); if(errors.name) setErrors({...errors, name: ''}); }} className={errors.name ? 'border-red-500 focus:border-red-500 bg-red-50/10' : ''} />
              {errors.name && (
                <p className="text-red-500 text-xs font-['SF_Pro_Rounded'] mt-1 font-semibold flex items-center gap-1">
                  <MdError className="text-red-500 text-sm" /> {errors.name}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <FormInput label="Scientific Name" required placeholder="Enter scientific name" value={formData.scientificName} onChange={e => { setFormData({...formData, scientificName: e.target.value}); if(errors.scientificName) setErrors({...errors, scientificName: ''}); }} className={errors.scientificName ? 'border-red-500 focus:border-red-500 bg-red-50/10' : ''} />
              {errors.scientificName && (
                <p className="text-red-500 text-xs font-['SF_Pro_Rounded'] mt-1 font-semibold flex items-center gap-1">
                  <MdError className="text-red-500 text-sm" /> {errors.scientificName}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <FormSelect label="Category" required options={['Painkiller', 'Antibiotic', 'Anti-inflammatory', 'Gastric', 'Pain Relief']} value={formData.category} onChange={e => { setFormData({...formData, category: e.target.value}); if(errors.category) setErrors({...errors, category: ''}); }} className={errors.category ? 'border-red-500 focus:border-red-500 bg-red-50/10' : ''} />
              {errors.category && (
                <p className="text-red-500 text-xs font-['SF_Pro_Rounded'] mt-1 font-semibold flex items-center gap-1">
                  <MdError className="text-red-500 text-sm" /> {errors.category}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <FormInput label="Unit Price (EGP)" required type="number" placeholder="Enter price (EGP)" value={formData.price} onChange={e => { setFormData({...formData, price: e.target.value}); if(errors.price) setErrors({...errors, price: ''}); }} className={errors.price ? 'border-red-500 focus:border-red-500 bg-red-50/10' : ''} />
              {errors.price && (
                <p className="text-red-500 text-xs font-['SF_Pro_Rounded'] mt-1 font-semibold flex items-center gap-1">
                  <MdError className="text-red-500 text-sm" /> {errors.price}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <FormInput label="Available Stock" required type="number" placeholder="Enter quantity" value={formData.stock} onChange={e => { setFormData({...formData, stock: e.target.value}); if(errors.stock) setErrors({...errors, stock: ''}); }} className={errors.stock ? 'border-red-500 focus:border-red-500 bg-red-50/10' : ''} />
              {errors.stock && (
                <p className="text-red-500 text-xs font-['SF_Pro_Rounded'] mt-1 font-semibold flex items-center gap-1">
                  <MdError className="text-red-500 text-sm" /> {errors.stock}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <FormInput label="Minimum Stock Level" required type="number" placeholder="Enter minimum quantity" subLabel="Alert triggers when stock falls below this level" value={formData.minStock} onChange={e => { setFormData({...formData, minStock: e.target.value}); if(errors.minStock) setErrors({...errors, minStock: ''}); }} className={errors.minStock ? 'border-red-500 focus:border-red-500 bg-red-50/10' : ''} />
              {errors.minStock && (
                <p className="text-red-500 text-xs font-['SF_Pro_Rounded'] mt-1 font-semibold flex items-center gap-1">
                  <MdError className="text-red-500 text-sm" /> {errors.minStock}
                </p>
              )}
            </div>
          </div>

          {/* 📁 حقل رفع الصورة وتعديلها مع إظهار الـ Preview */}
          <div className="space-y-3">
            <label className="text-base font-bold text-slate-700 font-['SF_Pro_Rounded']">Product Image <span className="text-gray-500 text-sm font-normal">(Optional)</span></label>
            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/jpeg,image/png" className="hidden" />

            {!imageFile ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-44 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-colors group p-4"
              >
                <div className="flex flex-col items-center text-center max-w-xs space-y-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-gray-400 group-hover:text-cyan-600 transition-colors">
                    <rect width="18" height="18" x="3" y="3" rx="2" stroke="currentColor" strokeWidth="2" />
                    <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p className="text-slate-700 text-base font-normal font-['SF_Pro_Rounded']">📷 Click to upload</p>
                  <p className="text-gray-500 text-sm font-normal font-['SF_Pro_Rounded']">or drag and drop</p>
                  <p className="text-gray-400 text-xs font-normal font-['SF_Pro_Rounded'] tracking-wide pt-1">Recommended: 500×500px, Max 2MB</p>
                  <p className="text-gray-400 text-xs font-normal font-['SF_Pro_Rounded'] tracking-wide">Accepted: JPG, PNG</p>
                </div>
              </div>
            ) : (
              <div className="border border-slate-200 rounded-2xl p-4 bg-blue-50/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded-xl border border-slate-200 bg-white" />
                  )}
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-xl hidden sm:block"><FileImage size={20} /></div>
                  <div className="text-left truncate max-w-xs">
                    <p className="text-xs font-bold text-[#1b2a49] truncate">{imageFile.name}</p>
                    <p className="text-[10px] text-slate-400 font-semibold">{(imageFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button type="button" onClick={handleRemoveImage} className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all self-end sm:self-center"><X size={16} /></button>
              </div>
            )}
          </div>

          {/* Description Text Area */}
          <div className="space-y-3">
            <label className="text-base font-bold text-slate-700 font-['SF_Pro_Rounded']">Description <span className="text-gray-500 text-sm font-normal">(Optional)</span></label>
            <textarea rows={4} placeholder="Enter product description..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-5 text-base font-normal font-['SF_Pro_Rounded'] leading-6 focus:outline-none focus:border-cyan-500 transition-all placeholder:text-gray-400 text-slate-700"></textarea>
          </div>

          {/* 3. شريط التحكم والأزرار السفلية الديناميكية المتجاوبة */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="w-full sm:w-auto">
              {isEditMode && (
                <button 
                  type="button" 
                  onClick={handleDeleteProduct}
                  className="w-full sm:w-52 h-12 rounded-2xl border border-red-500 text-red-500 text-base font-normal font-['SF_Pro_Rounded'] flex items-center justify-center gap-2 hover:bg-rose-50 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Trash2 size={16} />
                  <span>Delete Drug</span>
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-end">
              <button 
                type="button" 
                onClick={() => navigate('/supplier/drugs')}
                className="w-full sm:w-28 h-12 rounded-2xl border border-gray-200 text-gray-500 text-base font-normal font-['SF_Pro_Rounded'] hover:bg-slate-50 active:scale-[0.98] transition-all shadow-sm cursor-pointer"
              >
                Cancel
              </button>
              
              <button 
                type="submit" 
                className="w-full sm:w-48 h-12 text-white text-base font-bold font-['SF_Pro_Rounded'] rounded-2xl shadow-[0px_4px_12px_0px_rgba(59,129,183,0.30)] hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
                style={{ background: '#0093B7' }}
              >
                {isEditMode ? 'Update Drug' : 'Save Product'}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}