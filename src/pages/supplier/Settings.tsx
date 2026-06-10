// src/pages/supplier/Settings.tsx
import React, { useState } from 'react';
import { Edit2, Check, X, Save } from 'lucide-react';
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

  // 2. الـ States الخاصة بوضع التعديل (Is Editing?) لكل كارد بشكل منفصل
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isEditingPayment, setIsEditingPayment] = useState(false);

  // الـ States المؤقتة أثناء الكتابة (الـ Form inputs buffer)
  const [profileInput, setProfileInput] = useState({ ...profile });
  const [contactInput, setContactInput] = useState({ ...contact });
  const [paymentInput, setPaymentInput] = useState({ ...payment });

  // 3. دوال الحفظ والإلغاء (Actions)
  const saveProfile = () => { setProfile(profileInput); setIsEditingProfile(false); };
  const saveContact = () => { setContact(contactInput); setIsEditingContact(false); };
  const savePayment = () => { setPayment(paymentInput); setIsEditingPayment(false); };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-left relative max-w-5xl mx-auto">
      {/* الـ SEO المتكامل للملف */}
      <SEOHead 
        title="Settings" 
        description="Manage your Eva Pharma corporate profile, contact details, payment configurations, and system notification rules." 
      />

      {/* الهيدر والـ Subtitle بنفس الـ Typography والمسافات بالملي من فيجما */}
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
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(27,42,73,0.03)] relative transition-all">
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
        <h3 className="text-sm font-bold text-[#1b2a49] mb-5 select-none">Company Profile</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-xs">
          <div>
            <p className="text-slate-400 font-medium mb-1">Company Name</p>
            {!isEditingProfile ? (
              <p className="font-bold text-[#1b2a49] text-sm">{profile.name}</p>
            ) : (
              <input type="text" value={profileInput.name} onChange={e => setProfileInput({...profileInput, name: e.target.value})} className="w-full bg-[#F5F7FA] border border-slate-200/60 rounded-xl px-3 py-2 text-sm font-bold text-[#1b2a49] focus:outline-none focus:bg-white focus:border-blue-500 transition-all" />
            )}
          </div>
          <div>
            <p className="text-slate-400 font-medium mb-1">Company Type</p>
            {!isEditingProfile ? (
              <p className="font-bold text-[#1b2a49] text-sm">{profile.type}</p>
            ) : (
              <input type="text" value={profileInput.type} onChange={e => setProfileInput({...profileInput, type: e.target.value})} className="w-full bg-[#F5F7FA] border border-slate-200/60 rounded-xl px-3 py-2 text-sm font-bold text-[#1b2a49] focus:outline-none focus:bg-white focus:border-blue-500 transition-all" />
            )}
          </div>
          <div>
            <p className="text-slate-400 font-medium mb-1">Tax ID</p>
            {!isEditingProfile ? (
              <p className="font-bold text-[#1b2a49] text-sm">{profile.taxId}</p>
            ) : (
              <input type="text" value={profileInput.taxId} onChange={e => setProfileInput({...profileInput, taxId: e.target.value})} className="w-full bg-[#F5F7FA] border border-slate-200/60 rounded-xl px-3 py-2 text-sm font-bold text-[#1b2a49] focus:outline-none focus:bg-white focus:border-blue-500 transition-all" />
            )}
          </div>
          <div>
            <p className="text-slate-400 font-medium mb-1">Registration Date</p>
            <p className="font-bold text-[#1b2a49] text-sm py-2 select-none">{profile.regDate}</p>
          </div>
        </div>
      </div>

      {/* ================= Box 2: Contact Information ================= */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(27,42,73,0.03)] relative transition-all">
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
        <h3 className="text-sm font-bold text-[#1b2a49] mb-5 select-none">Contact Information</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-xs">
          <div>
            <p className="text-slate-400 font-medium mb-1">Email</p>
            {!isEditingContact ? (
              <p className="font-bold text-[#1b2a49] text-sm">{contact.email}</p>
            ) : (
              <input type="email" value={contactInput.email} onChange={e => setContactInput({...contactInput, email: e.target.value})} className="w-full bg-[#F5F7FA] border border-slate-200/60 rounded-xl px-3 py-2 text-sm font-bold text-[#1b2a49] focus:outline-none focus:bg-white focus:border-blue-500 transition-all" />
            )}
          </div>
          <div>
            <p className="text-slate-400 font-medium mb-1">Phone</p>
            {!isEditingContact ? (
              <p className="font-bold text-[#1b2a49] text-sm">{contact.phone}</p>
            ) : (
              <input type="text" value={contactInput.phone} onChange={e => setContactInput({...contactInput, phone: e.target.value})} className="w-full bg-[#F5F7FA] border border-slate-200/60 rounded-xl px-3 py-2 text-sm font-bold text-[#1b2a49] focus:outline-none focus:bg-white focus:border-blue-500 transition-all" />
            )}
          </div>
          <div className="sm:col-span-2">
            <p className="text-slate-400 font-medium mb-1">Address</p>
            {!isEditingContact ? (
              <p className="font-bold text-[#1b2a49] text-sm">{contact.address}</p>
            ) : (
              <input type="text" value={contactInput.address} onChange={e => setContactInput({...contactInput, address: e.target.value})} className="w-full bg-[#F5F7FA] border border-slate-200/60 rounded-xl px-3 py-2 text-sm font-bold text-[#1b2a49] focus:outline-none focus:bg-white focus:border-blue-500 transition-all" />
            )}
          </div>
        </div>
      </div>

      {/* ================= Box 3: Payment Settings ================= */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(27,42,73,0.03)] relative transition-all">
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
        <h3 className="text-sm font-bold text-[#1b2a49] mb-5 select-none">Payment Settings</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-xs">
          <div>
            <p className="text-slate-400 font-medium mb-1">Default Payment Terms</p>
            {!isEditingPayment ? (
              <p className="font-bold text-[#1b2a49] text-sm">{payment.terms}</p>
            ) : (
              <input type="text" value={paymentInput.terms} onChange={e => setPaymentInput({...paymentInput, terms: e.target.value})} className="w-full bg-[#F5F7FA] border border-slate-200/60 rounded-xl px-3 py-2 text-sm font-bold text-[#1b2a49] focus:outline-none focus:bg-white focus:border-blue-500 transition-all" />
            )}
          </div>
          <div>
            <p className="text-slate-400 font-medium mb-1">Bank Account</p>
            {!isEditingPayment ? (
              <p className="font-bold text-[#1b2a49] text-sm tracking-widest">{payment.bankAccount}</p>
            ) : (
              <input type="text" value={paymentInput.bankAccount} onChange={e => setPaymentInput({...paymentInput, bankAccount: e.target.value})} className="w-full bg-[#F5F7FA] border border-slate-200/60 rounded-xl px-3 py-2 text-sm font-bold text-[#1b2a49] focus:outline-none focus:bg-white focus:border-blue-500 transition-all" />
            )}
          </div>
        </div>
      </div>

      {/* ================= Box 4: Notification Preferences ================= */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_10px_30px_rgba(27,42,73,0.03)] relative transition-all">
        <h3 className="text-sm font-bold text-[#1b2a49] mb-5 select-none">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-[#1b2a49]">
            <div>
              <p className="text-sm font-bold">New order notifications</p>
              <p className="text-slate-400 font-normal text-[11px] mt-0.5">Receive immediate notifications on dashboard for new pharmacy orders.</p>
            </div>
            <button 
              onClick={() => setNotifyNewOrder(!notifyNewOrder)}
              className={`w-10 h-6 rounded-full p-1 transition-colors cursor-pointer flex-shrink-0 ${notifyNewOrder ? 'bg-[#1b2a49]' : 'bg-slate-200'}`}
              aria-label="Toggle new order notifications"
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifyNewOrder ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </button>
          </div>
          <hr className="border-slate-50" />
          <div className="flex items-center justify-between text-xs font-semibold text-[#1b2a49]">
            <div>
              <p className="text-sm font-bold">Email notifications</p>
              <p className="text-slate-400 font-normal text-[11px] mt-0.5">Send a detailed invoice and notification to corporate email when status updates.</p>
            </div>
            <button 
              onClick={() => setNotifyEmail(!notifyEmail)}
              className={`w-10 h-6 rounded-full p-1 transition-colors cursor-pointer flex-shrink-0 ${notifyEmail ? 'bg-[#1b2a49]' : 'bg-slate-200'}`}
              aria-label="Toggle email notifications"
            >
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${notifyEmail ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}