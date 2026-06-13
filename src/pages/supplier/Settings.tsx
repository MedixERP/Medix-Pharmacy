// src/pages/supplier/Settings.tsx
import React, { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';
import SEOHead from '../../components/shared/SEOHead';

export default function Settings() {
  // 1. الـ States الخاصة بالبيانات (تتغير ديناميكياً وجاهزة للربط مع الباك إند)
  const [profile, setProfile] = useState({
    name: 'Eva Pharma',
    type: 'Pharmaceutical Company',
    taxId: '123-456-789',
    regDate: 'Jan 15, 2020'
  });

  const [contact, setContact] = useState({
    email: 'contact@evapharma.com',
    phone: '+20 100 555 1234',
    address: '123 Industrial Zone, Cairo, Egypt'
  });

  const [payment, setPayment] = useState({
    terms: '30 Days Net',
    bankAccount: '**** **** **** 5678'
  });

  const [notifyNewOrder, setNotifyNewOrder] = useState(true);
  const [notifyEmail, setNotifyEmail] = useState(true);

  // 2. الـ States الخاصة بوضع التعديل لكل كارد بشكل منفصل
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);

  // الـ States المؤقتة أثناء الكتابة (الـ Form inputs buffer)
  const [profileInput, setProfileInput] = useState({ ...profile });
  const [contactInput, setContactInput] = useState({ ...contact });
  const [paymentInput, setPaymentInput] = useState({ ...payment });

  // 3. دوال الحفظ المحدثة (تطبع الـ Payload لتكون جاهزة للباك إند فوراً)
  const saveProfile = () => {
    setProfile(profileInput);
    setIsEditingProfile(false);
    console.log('Sending Updated Profile Payload to Backend:', profileInput);
    // هنا عند الربط: await api.updateProfile(profileInput);
  };

  const saveContact = () => {
    setContact(contactInput);
    setIsEditingContact(false);
    console.log('Sending Updated Contact Payload to Backend:', contactInput);
    // هنا عند الربط: await api.updateContact(contactInput);
  };

  const savePayment = () => {
    setPayment(paymentInput);
    setIsEditingPayment(false);
    console.log('Sending Updated Payment Payload to Backend:', paymentInput);
    // هنا عند الربط: await api.updatePayment(paymentInput);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-left relative max-w-5xl mx-auto pb-10">
      {/* الـ SEO المتكامل للملف */}
      <SEOHead 
        title="Settings" 
        description="Manage your Eva Pharma corporate profile, contact details, payment configurations, and system notification rules." 
      />

      {/* 1. الترحيب والهيدر الموحد لجميع الصفحات بالمسافات والألوان الدقيقة بالملي */}
      <div>
        <h1 
          className="text-[24px] md:text-[30px] font-bold text-[#1B2A49] md:leading-[42px] tracking-[0px] select-none"
          style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 700 }}
        >
          Settings
        </h1>
        <p 
          className="text-[13px] md:text-[15px] font-normal text-[#7F8C8D] md:leading-[22.5px] tracking-[0px] mt-[8px]"
          style={{ fontFamily: '"SF Pro Rounded", "Arimo", sans-serif', fontWeight: 400 }}
        >
          Manage your account settings
        </p>
      </div>

      {/* ================= Box 1: Company Profile ================= */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(27,42,73,0.02)] relative transition-all">
        <div className="absolute right-6 top-6 flex items-center gap-2">
          {!isEditingProfile ? (
            <button 
              onClick={() => { setProfileInput({ ...profile }); setIsEditingProfile(true); }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              <Edit2 size={13} /> Edit
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button onClick={saveProfile} className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-emerald-700 transition-all cursor-pointer shadow-xs">
                <Check size={12} /> Save
              </button>
              <button onClick={() => setIsEditingProfile(false)} className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-slate-200 transition-all cursor-pointer">
                <X size={12} /> Cancel
              </button>
            </div>
          )}
        </div>
        <h3 className="text-sm font-bold text-[#1b2a49] mb-5 select-none" style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}>Company Profile</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-xs">
          <div>
            <p className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">Company Name</p>
            {!isEditingProfile ? (
              <p className="font-bold text-[#1b2a49] text-[14px]">{profile.name}</p>
            ) : (
              <input type="text" value={profileInput.name} onChange={e => setProfileInput({...profileInput, name: e.target.value})} className="w-full bg-[#F5F7FA] border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-[#1b2a49] focus:outline-none focus:bg-white focus:border-blue-400 transition-all" />
            )}
          </div>
          <div>
            <p className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">Company Type</p>
            {!isEditingProfile ? (
              <p className="font-bold text-[#1b2a49] text-[14px]">{profile.type}</p>
            ) : (
              <input type="text" value={profileInput.type} onChange={e => setProfileInput({...profileInput, type: e.target.value})} className="w-full bg-[#F5F7FA] border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-[#1b2a49] focus:outline-none focus:bg-white focus:border-blue-400 transition-all" />
            )}
          </div>
          <div>
            <p className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">Tax ID</p>
            {!isEditingProfile ? (
              <p className="font-bold text-[#1b2a49] text-[14px]">{profile.taxId}</p>
            ) : (
              <input type="text" value={profileInput.taxId} onChange={e => setProfileInput({...profileInput, taxId: e.target.value})} className="w-full bg-[#F5F7FA] border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-[#1b2a49] focus:outline-none focus:bg-white focus:border-blue-400 transition-all" />
            )}
          </div>
          <div>
            <p className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">Registration Date</p>
            <p className="font-bold text-[#7F8C8D] text-[14px] py-1 select-none" style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}>{profile.regDate}</p>
          </div>
        </div>
      </div>

      {/* ================= Box 2: Contact Information ================= */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(27,42,73,0.02)] relative transition-all">
        <div className="absolute right-6 top-6 flex items-center gap-2">
          {!isEditingContact ? (
            <button 
              onClick={() => { setContactInput({ ...contact }); setIsEditingContact(true); }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:bg-slate-50 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              <Edit2 size={13} /> Edit
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button onClick={saveContact} className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-emerald-700 transition-all cursor-pointer shadow-xs">
                <Check size={12} /> Save
              </button>
              <button onClick={() => setIsEditingContact(false)} className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-slate-200 transition-all cursor-pointer">
                <X size={12} /> Cancel
              </button>
            </div>
          )}
        </div>
        <h3 className="text-sm font-bold text-[#1b2a49] mb-5 select-none" style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}>Contact Information</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-xs">
          <div>
            <p className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">Email</p>
            {!isEditingContact ? (
              <p className="font-bold text-[#1b2a49] text-[14px]">{contact.email}</p>
            ) : (
              <input type="email" value={contactInput.email} onChange={e => setContactInput({...contactInput, email: e.target.value})} className="w-full bg-[#F5F7FA] border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-[#1b2a49] focus:outline-none focus:bg-white focus:border-blue-400 transition-all" />
            )}
          </div>
          <div>
            <p className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">Phone</p>
            {!isEditingContact ? (
              <p className="font-bold text-[#1b2a49] text-[14px]">{contact.phone}</p>
            ) : (
              <input type="text" value={contactInput.phone} onChange={e => setContactInput({...contactInput, phone: e.target.value})} className="w-full bg-[#F5F7FA] border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-[#1b2a49] focus:outline-none focus:bg-white focus:border-blue-400 transition-all" />
            )}
          </div>
          <div className="sm:col-span-2">
            <p className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">Address</p>
            {!isEditingContact ? (
              <p className="font-bold text-[#1b2a49] text-[14px]">{contact.address}</p>
            ) : (
              <input type="text" value={contactInput.address} onChange={e => setContactInput({...contactInput, address: e.target.value})} className="w-full bg-[#F5F7FA] border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-[#1b2a49] focus:outline-none focus:bg-white focus:border-blue-400 transition-all" />
            )}
          </div>
        </div>
      </div>

      {/* ================= Box 3: Payment Settings ================= */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(27,42,73,0.02)] relative transition-all">
        <div className="absolute right-6 top-6 flex items-center gap-2">
          {!isEditingPayment ? (
            <button 
              onClick={() => { setPaymentInput({ ...payment }); setIsEditingPayment(true); }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:bg-slate-50 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
            >
              <Edit2 size={13} /> Edit
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button onClick={savePayment} className="inline-flex items-center gap-1 bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-emerald-700 transition-all cursor-pointer shadow-xs">
                <Check size={12} /> Save
              </button>
              <button onClick={() => setIsEditingPayment(false)} className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-slate-200 transition-all cursor-pointer">
                <X size={12} /> Cancel
              </button>
            </div>
          )}
        </div>
        <h3 className="text-sm font-bold text-[#1b2a49] mb-5 select-none" style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}>Payment Settings</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-xs">
          <div>
            <p className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">Default Payment Terms</p>
            {!isEditingPayment ? (
              <p className="font-bold text-[#1b2a49] text-[14px]">{payment.terms}</p>
            ) : (
              <input type="text" value={paymentInput.terms} onChange={e => setPaymentInput({...paymentInput, terms: e.target.value})} className="w-full bg-[#F5F7FA] border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-[#1b2a49] focus:outline-none focus:bg-white focus:border-blue-400 transition-all" />
            )}
          </div>
          <div>
            <p className="text-slate-400 font-semibold mb-1 uppercase tracking-wider text-[11px]">Bank Account</p>
            {!isEditingPayment ? (
              <p className="font-bold text-[#1b2a49] text-[14px] tracking-widest">{payment.bankAccount}</p>
            ) : (
              <input type="text" value={paymentInput.bankAccount} onChange={e => setPaymentInput({...paymentInput, bankAccount: e.target.value})} className="w-full bg-[#F5F7FA] border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-[#1b2a49] focus:outline-none focus:bg-white focus:border-blue-400 transition-all" />
            )}
          </div>
        </div>
      </div>

      {/* ================= Box 4: Notification Preferences ================= */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(27,42,73,0.02)] relative transition-all">
        <h3 className="text-sm font-bold text-[#1b2a49] mb-5 select-none" style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}>Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-[#1b2a49]">
            <div className="text-left">
              <p className="text-sm font-bold text-[#1b2a49]">New order notifications</p>
              <p className="text-slate-400 font-normal text-[11px] mt-0.5">Receive immediate notifications on dashboard for new pharmacy orders.</p>
            </div>
            <button 
              onClick={() => setNotifyNewOrder(!notifyNewOrder)}
              className={`w-10 h-6 rounded-full p-1 transition-colors cursor-pointer flex-shrink-0 relative border border-transparent ${notifyNewOrder ? 'bg-[#1b2a49]' : 'bg-slate-200'}`}
              aria-label="Toggle new order notifications"
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-200 ${notifyNewOrder ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </button>
          </div>
          <hr className="border-slate-100/60" />
          <div className="flex items-center justify-between text-xs font-semibold text-[#1b2a49]">
            <div className="text-left">
              <p className="text-sm font-bold text-[#1b2a49]">Email notifications</p>
              <p className="text-slate-400 font-normal text-[11px] mt-0.5">Send a detailed invoice and notification to corporate email when status updates.</p>
            </div>
            <button 
              onClick={() => setNotifyEmail(!notifyEmail)}
              className={`w-10 h-6 rounded-full p-1 transition-colors cursor-pointer flex-shrink-0 relative border border-transparent ${notifyEmail ? 'bg-[#1b2a49]' : 'bg-slate-200'}`}
              aria-label="Toggle email notifications"
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-all duration-200 ${notifyEmail ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}