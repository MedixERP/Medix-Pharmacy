// src/pages/supplier/CompanyProfile.tsx
import React, { useState, useRef } from 'react';
import { Edit2, Package, Users, CheckCircle2, Star, Mail, Briefcase, Check, X, Camera } from 'lucide-react';
import SEOHead from '../../components/shared/SEOHead';
import useAuth from '../../hooks/useAuth';

export default function CompanyProfile() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [companyInfo, setCompanyInfo] = useState({
    name: 'Eva Pharma',
    type: 'Pharmaceutical Company',
    memberSince: 'Jan 2024',
    status: 'Active',
    ordersThisMonth: 23,
    activeClients: 15,
    deliveryRate: '95%',
    rating: '4.8',
    contactPerson: 'Ahmed Mostafa',
    jobTitle: 'Sales Manager',
    email: 'contact@evapharma.com',
    phone: '+20 100 555 1234',
    taxId: '123-456-789',
    commercialReg: 'CR-456789',
    paymentTerms: '30 Days Net'
  });

  const [editBuffer, setEditBuffer] = useState({ ...companyInfo });

  const handleSave = () => {
    setCompanyInfo(editBuffer);
    setIsEditing(false);
    console.log('Saved Profile Payload:', editBuffer);
  };

  const handleLogoChangeClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      console.log('New Logo File Selected:', e.target.files[0].name);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-left relative max-w-[1600px] mx-auto pb-10 select-none">
      <SEOHead title="Company Profile" description="Manage and view your corporate supplier badge." />
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-[#1b2a49] tracking-tight">Company Profile</h1>
          <p className="text-sm text-slate-400 mt-1">Manage your company credentials and public face</p>
        </div>
        
        {!isEditing ? (
          <button 
            onClick={() => { setEditBuffer({ ...companyInfo }); setIsEditing(true); }}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-[#1b2a49] px-4 py-2 rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer"
          >
            <Edit2 size={13} className="text-slate-500" /> Edit Profile
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={handleSave} className="inline-flex items-center gap-1 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer hover:bg-emerald-700">
              <Check size={13} /> Save Profile
            </button>
            <button onClick={() => setIsEditing(false)} className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer hover:bg-slate-200">
              <X size={13} /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-b from-blue-50/40 to-white border border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center relative shadow-2xs">
        <div 
          onClick={handleLogoChangeClick}
          className="w-24 h-24 rounded-full text-white flex items-center justify-center font-black text-2xl shadow-lg mb-4 transform hover:scale-105 transition-transform cursor-pointer relative group overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1B2A49 0%, #5B9FD7 100%)' }}
        >
          {user?.name ? user.name.slice(0, 2).toUpperCase() : 'EP'}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
            <Camera size={18} className="text-white animate-pulse" />
          </div>
        </div>
        <h2 className="text-xl font-black text-[#1b2a49] tracking-wide">{companyInfo.name}</h2>
        <p className="text-xs text-slate-400 font-semibold mt-1">{companyInfo.type}</p>
        
        <div className="flex items-center gap-3 justify-center mt-3 text-xs font-bold">
          <span className="text-slate-400">Member since: {companyInfo.memberSince}</span>
          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-md border border-emerald-100/40 uppercase text-[10px]">
            <Check size={10} strokeWidth={3} /> {companyInfo.status}
          </span>
        </div>

        <button onClick={handleLogoChangeClick} className="mt-5 px-4 py-2 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-600 bg-white shadow-3xs transition-all cursor-pointer">
          Change Logo
        </button>
      </div>

      {/* شاشة الأرقام والإحصائيات */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-[#1b2a49]">Performance Overview</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-3xs flex flex-col justify-between min-h-[120px]"><div className="p-2 bg-amber-50 text-amber-600 rounded-xl w-fit"><Package size={16} /></div><div className="mt-3"><span className="text-2xl font-black text-[#1b2a49] block">{companyInfo.ordersThisMonth}</span><span className="text-[11px] font-semibold text-slate-400 block mt-0.5">Orders This Month</span></div></div>
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-3xs flex flex-col justify-between min-h-[120px]"><div className="p-2 bg-blue-50 text-blue-600 rounded-xl w-fit"><Users size={16} /></div><div className="mt-3"><span className="text-2xl font-black text-[#1b2a49] block">{companyInfo.activeClients}</span><span className="text-[11px] font-semibold text-slate-400 block mt-0.5">Active Clients</span></div></div>
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-3xs flex flex-col justify-between min-h-[120px]"><div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl w-fit"><CheckCircle2 size={16} /></div><div className="mt-3"><span className="text-2xl font-black text-emerald-600 block">{companyInfo.deliveryRate}</span><span className="text-[11px] font-semibold text-slate-400 block mt-0.5">On-time Delivery</span></div></div>
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-3xs flex flex-col justify-between min-h-[120px]"><div className="p-2 bg-amber-50 text-amber-500 rounded-xl w-fit"><Star size={16} /></div><div className="mt-3"><span className="text-2xl font-black text-[#1b2a49] block">{companyInfo.rating}</span><span className="text-[11px] font-semibold text-slate-400 block mt-0.5">Rating</span></div></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* معلومات التواصل المدعومة بالتعديل الحركي */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs space-y-4">
          <h4 className="text-sm font-bold text-[#1b2a49] flex items-center gap-2 border-b border-slate-50 pb-3"><Mail size={15} className="text-blue-500" /> Contact Information</h4>
          <div className="grid grid-cols-2 gap-y-3.5 text-xs font-semibold text-slate-600">
            <div><p className="text-slate-400 font-medium mb-0.5">Contact Person</p>
              {!isEditing ? <p className="text-[#1b2a49] text-[13px]">{companyInfo.contactPerson}</p> : <input type="text" value={editBuffer.contactPerson} onChange={e => setEditBuffer({...editBuffer, contactPerson: e.target.value})} className="bg-slate-50 p-1.5 rounded-lg border w-full text-xs" />}
            </div>
            <div><p className="text-slate-400 font-medium mb-0.5">Job Title</p>
              {!isEditing ? <p className="text-[#1b2a49] text-[13px]">{companyInfo.jobTitle}</p> : <input type="text" value={editBuffer.jobTitle} onChange={e => setEditBuffer({...editBuffer, jobTitle: e.target.value})} className="bg-slate-50 p-1.5 rounded-lg border w-full text-xs" />}
            </div>
            <div className="col-span-2"><p className="text-slate-400 font-medium mb-0.5">Email</p>
              {!isEditing ? <p className="text-[#1b2a49] text-[13px]">{companyInfo.email}</p> : <input type="email" value={editBuffer.email} onChange={e => setEditBuffer({...editBuffer, email: e.target.value})} className="bg-slate-50 p-1.5 rounded-lg border w-full text-xs" />}
            </div>
            <div className="col-span-2"><p className="text-slate-400 font-medium mb-0.5">Phone</p>
              {!isEditing ? <p className="text-[#1b2a49] text-[13px]">{companyInfo.phone}</p> : <input type="text" value={editBuffer.phone} onChange={e => setEditBuffer({...editBuffer, phone: e.target.value})} className="bg-slate-50 p-1.5 rounded-lg border w-full text-xs" />}
            </div>
          </div>
        </div>

        {/* تفاصيل العمل التجاري */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-3xs space-y-4">
          <h4 className="text-sm font-bold text-[#1b2a49] flex items-center gap-2 border-b border-slate-50 pb-3"><Briefcase size={15} className="text-blue-500" /> Business Details</h4>
          <div className="grid grid-cols-2 gap-y-3.5 text-xs font-semibold text-slate-600">
            <div><p className="text-slate-400 font-medium mb-0.5">Company Type</p>
              {!isEditing ? <p className="text-[#1b2a49] text-[13px]">{companyInfo.type}</p> : <input type="text" value={editBuffer.type} onChange={e => setEditBuffer({...editBuffer, type: e.target.value})} className="bg-slate-50 p-1.5 rounded-lg border w-full text-xs" />}
            </div>
            <div><p className="text-slate-400 font-medium mb-0.5">Tax ID</p>
              {!isEditing ? <p className="text-[#1b2a49] text-[13px]">{companyInfo.taxId}</p> : <input type="text" value={editBuffer.taxId} onChange={e => setEditBuffer({...editBuffer, taxId: e.target.value})} className="bg-slate-50 p-1.5 rounded-lg border w-full text-xs" />}
            </div>
            <div><p className="text-slate-400 font-medium mb-0.5">Commercial Reg</p>
              {!isEditing ? <p className="text-[#1b2a49] text-[13px]">{companyInfo.commercialReg}</p> : <input type="text" value={editBuffer.commercialReg} onChange={e => setEditBuffer({...editBuffer, commercialReg: e.target.value})} className="bg-slate-50 p-1.5 rounded-lg border w-full text-xs" />}
            </div>
            <div><p className="text-slate-400 font-medium mb-0.5">Payment Terms</p>
              {!isEditing ? <p className="text-[#1b2a49] text-[13px]">{companyInfo.paymentTerms}</p> : <input type="text" value={editBuffer.paymentTerms} onChange={e => setEditBuffer({...editBuffer, paymentTerms: e.target.value})} className="bg-slate-50 p-1.5 rounded-lg border w-full text-xs" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}