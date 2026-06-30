// 🟢 السطر الأول في الملف بعد التعديل:
import React, { useState } from 'react';
import { Search, Plus, ChevronDown, Edit2, Trash2, Pill, AlertTriangle, X } from 'lucide-react'; // تأكدي من وجود X هنا
import SEOHead from '../../components/shared/SEOHead';
import { DataTable } from '../../components/shared/DataTable'; 
import AddEditDrug from './AddEditDrugModal';

interface Drug {
  id: string; 
  name: string;
  scientific: string;
  price: string;
  quantity: number;
  minThreshold: number;
  concentration?: string;
}

export default function DrugManagement() {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // States الخاصة بـ Pop-up الحذف الاحترافي
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [drugToDelete, setDrugToDelete] = useState<Drug | null>(null);

  const [drugsCatalog, setDrugsCatalog] = useState<Drug[]>([
    { id: '1', name: 'Panadol', scientific: 'Paracetamol', price: '50 EGP', quantity: 150, minThreshold: 50, concentration: '500mg' },
    { id: '2', name: 'Augmentin', scientific: 'Amoxicillin + Clavulanic Acid', price: '120 EGP', quantity: 0, minThreshold: 30, concentration: '1g' },
    { id: '3', name: 'Brufen', scientific: 'Ibuprofen', price: '75 EGP', quantity: 5, minThreshold: 50, concentration: '400mg' },
    { id: '4', name: 'Amoxil', scientific: 'Amoxicillin', price: '95 EGP', quantity: 120, minThreshold: 40, concentration: '250mg' },
    { id: '5', name: 'Metformin', scientific: 'Metformin HCl', price: '60 EGP', quantity: 180, minThreshold: 80, concentration: '850mg' },
    { id: '6', name: 'Aspirin', scientific: 'Acetylsalicylic Acid', price: '30 EGP', quantity: 15, minThreshold: 60, concentration: '100mg' },
    { id: '7', name: 'Lipitor', scientific: 'Atorvastatin', price: '140 EGP', quantity: 85, minThreshold: 30, concentration: '20mg' },
    { id: '8', name: 'Nexium', scientific: 'Esomeprazole', price: '110 EGP', quantity: 0, minThreshold: 25, concentration: '40mg' },
  ]);

  const getStockStatus = (quantity: number, minThreshold: number) => {
    if (quantity === 0) return { label: 'Out of Stock', style: 'bg-rose-50 text-red-500' };
    if (quantity <= minThreshold) return { label: 'Low Stock', style: 'bg-yellow-50 text-amber-500' };
    return { label: 'In Stock', style: 'bg-green-100 text-green-500' };
  };

  const handleAddClick = () => {
    setSelectedDrug(null);
    setView('form');
  };

  const handleEditClick = (drug: Drug) => {
    setSelectedDrug(drug);
    setView('form');
  };

  // فتح التنبيه المنبثق للحذف وتحديد الدواء المستهدف
  const openDeleteModal = (drug: Drug) => {
    setDrugToDelete(drug);
    setIsDeleteModalOpen(true);
  };

  // تأكيد عملية الحذف النهائية
  const confirmDelete = () => {
    if (drugToDelete) {
      setDrugsCatalog(prev => prev.filter(drug => drug.id !== drugToDelete.id));
      setIsDeleteModalOpen(false);
      setDrugToDelete(null);
    }
  };

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentDrugs = drugsCatalog.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);
  const totalPages = Math.ceil(drugsCatalog.length / itemsPerPage);

  const tableHeaders = [
    'Drug Name',
    'Scientific Name',
    'Price',
    'Quantity',
    'Min Threshold',
    'Status',
    'Actions'
  ];

  const renderTableRow = (drug: Drug) => {
    const status = getStockStatus(drug.quantity, drug.minThreshold);
    return (
      <tr key={drug.id} className="hover:bg-slate-50/50 transition-colors h-20">
        <td className="py-4 px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-sky-100 rounded-2xl flex items-center justify-center text-cyan-600 shadow-2xs">
              <Pill size={18} />
            </div>
            <span className="text-slate-700 text-base font-bold font-['Arimo']">
              {drug.name}
            </span>
          </div>
        </td>
        <td className="py-4 px-6 text-gray-500 text-sm font-normal font-['Arimo']">
          {drug.scientific}
        </td>
        <td className="py-4 px-6 text-slate-700 text-sm font-normal font-['Arimo']">
          {drug.price}
        </td>
        <td className="py-4 px-6 text-slate-700 text-sm font-normal font-['Arimo']">
          {drug.quantity}
        </td>
        <td className="py-4 px-6 text-gray-500 text-sm font-normal font-['Arimo']">
          {drug.minThreshold}
        </td>
        <td className="py-4 px-6">
          <span className={`inline-flex items-center justify-center px-3 py-1 rounded-[10px] text-xs font-normal font-['Arimo'] h-8 ${status.style}`}>
            {status.label}
          </span>
        </td>
        <td className="py-4 px-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <button 
              type="button"
              onClick={() => handleEditClick(drug)}
              className="text-gray-400 hover:text-blue-600 transition-colors p-1 rounded-md cursor-pointer"
            >
              <Edit2 size={16} />
            </button>
            <button 
              type="button"
              onClick={() => openDeleteModal(drug)}
              className="text-gray-400 hover:text-rose-600 transition-colors p-1 rounded-md cursor-pointer"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const renderMobileCard = (drug: Drug) => {
    const status = getStockStatus(drug.quantity, drug.minThreshold);
    return (
      <div className="p-5 rounded-2xl bg-white border border-slate-100 shadow-2xs flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-sky-100 rounded-xl flex items-center justify-center text-cyan-600">
              <Pill size={16} />
            </div>
            <div>
              <h4 className="font-bold text-[#1b2a49] text-base font-['Arimo']">{drug.name}</h4>
              <p className="text-xs text-gray-400 font-['Arimo'] truncate max-w-[150px]">{drug.scientific}</p>
            </div>
          </div>
          <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-[8px] ${status.style}`}>
            {status.label}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-50 text-xs text-center font-['Arimo']">
          <div>
            <p className="text-gray-400">Price</p>
            <p className="font-bold text-slate-700 mt-0.5">{drug.price}</p>
          </div>
          <div>
            <p className="text-gray-400">Qty</p>
            <p className="font-bold text-slate-700 mt-0.5">{drug.quantity}</p>
          </div>
          <div>
            <p className="text-gray-400">Min</p>
            <p className="font-bold text-gray-500 mt-0.5">{drug.minThreshold}</p>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={() => handleEditClick(drug)} className="text-gray-400 hover:text-blue-600 p-1"><Edit2 size={15} /></button>
          <button type="button" onClick={() => openDeleteModal(drug)} className="text-gray-400 hover:text-rose-600 p-1"><Trash2 size={15} /></button>
        </div>
      </div>
    );
  };

  if (view === 'form') {
    return (
      <AddEditDrug 
        drugToEdit={selectedDrug ? {
          ...selectedDrug,
          concentration: selectedDrug.concentration || '500mg'
        } : null}
        onBack={() => setView('list')} 
      />
    );
  }

  return (
    <div className="animate-in fade-in duration-300 text-left relative pt-[2px] px-[2px] space-y-6">
      <SEOHead 
        title="Drug Management" 
        description="Medix Drug Catalog Management - Administer system database pharmaceutical product specifications, costs, and static parameters." 
      />

      <div className="select-none">
        <h1 className="text-[24px] md:text-[30px] font-bold text-blue-950 font-['Arimo'] leading-10">
          Drug Management
        </h1>
        <p className="text-sm md:text-base font-normal text-gray-500 font-['Arimo'] leading-6 mt-1">
          Manage your pharmacy's drug inventory and information.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-5 rounded-2xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] border border-slate-50/50">
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto items-center flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search by drug name or scientific name..." 
              className="w-full bg-white border border-gray-200 rounded-2xl py-2.5 pl-12 pr-4 text-sm font-normal text-slate-700 font-['Arimo'] focus:outline-none focus:border-cyan-600 transition-all placeholder:text-gray-400"
            />
          </div>
          
          <div className="relative w-full sm:w-44">
            <select className="w-full bg-white text-gray-500 text-base font-normal font-['SF_Pro_Rounded'] border border-gray-200 rounded-2xl py-2 pl-4 pr-10 appearance-none focus:outline-none focus:border-cyan-600 transition-all cursor-pointer h-10">
              <option>All Stock Status</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
          </div>
        </div>

        <button 
          type="button"
          onClick={handleAddClick}
          className="flex items-center justify-center gap-2 bg-gradient-to-br from-cyan-600 to-blue-400 rounded-2xl shadow-[0px_4px_12px_0px_rgba(59,129,183,0.30)] text-white text-sm font-bold font-['Arimo'] px-5 py-2.5 transition-all transform active:scale-95 cursor-pointer w-full sm:w-auto shrink-0"
        >
          <Plus size={18} /> Add Drug
        </button>
      </div>

      <DataTable
        data={currentDrugs}
        headers={tableHeaders}
        renderRow={renderTableRow}
        renderCard={renderMobileCard}
        currentPage={currentPage}
        totalPages={totalPages}
        indexOfFirstItem={indexOfFirstItem}
        filteredCount={drugsCatalog.length}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* 🔴 بوب الحذف الاحترافي الجميل (Delete Pop-up Modal) */}
      {isDeleteModalOpen && drugToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-200 text-center space-y-4">
            
            {/* زر الإغلاق العلوي */}
            <button 
              type="button" 
              onClick={() => setIsDeleteModalOpen(false)} 
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* الأيقونة التحذيرية بتدرج الفيجما الفخم */}
            <div className="mx-auto size-14 bg-rose-50 text-red-500 rounded-2xl flex items-center justify-center shadow-inner border border-rose-100/20">
              <AlertTriangle size={28} />
            </div>

            {/* النصوص التوضيحية */}
            <div className="space-y-2 select-none">
              <h3 className="text-xl font-bold text-blue-950 font-['SF_Pro_Rounded']">Delete Product</h3>
              <p className="text-sm text-gray-500 font-normal font-['SF_Pro_Rounded'] px-2">
                Are you sure you want to delete <span className="font-bold text-slate-700">"{drugToDelete.name}"</span>? This action cannot be undone.
              </p>
            </div>

            {/* أزرار الإجراءات */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button 
                type="button" 
                onClick={() => setIsDeleteModalOpen(false)} 
                className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm py-3 rounded-xl transition-all cursor-pointer font-['SF_Pro_Rounded']"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={confirmDelete} 
                className="bg-[#E74C3C] hover:bg-red-600 text-white font-bold text-sm py-3 rounded-xl shadow-[0px_4px_12px_0px_rgba(231,76,60,0.30)] transition-all cursor-pointer font-['SF_Pro_Rounded'] active:scale-95"
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}