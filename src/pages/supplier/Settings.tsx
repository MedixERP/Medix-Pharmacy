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

  // 3. دوال الحفظ المحدثة للباك إند
  const saveProfile = () => {
    setProfile(profileInput);
    setIsEditingProfile(false);
    console.log('Sending Updated Profile Payload to Backend:', profileInput);
  };

  const saveContact = () => {
    setContact(contactInput);
    setIsEditingContact(false);
    console.log('Sending Updated Contact Payload to Backend:', contactInput);
  };

  const savePayment = () => {
    setPayment(paymentInput);
    setIsEditingPayment(false);
    console.log('Sending Updated Payment Payload to Backend:', paymentInput);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-left relative pb-12 max-w-6xl mx-auto  ">
      <SEOHead 
        title="Settings" 
        description="Manage your Eva Pharma corporate profile, contact details, payment configurations, and system notification rules." 
      />

      {/* الهيدر الموحد بالمسافات والألوان الدقيقة بالملي */}

 <div>
        <h1 
          className="text-[24px] md:text-[30px] font-bold text-[#1B2A49] md:leading-[42px] trackiing-[0px] flex items-center gap-2 select-none"
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
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.03)] relative transition-all duration-200">
        <div className="absolute right-6 top-6 flex items-center gap-2">
          {!isEditingProfile ? (
            <button 
              onClick={() => { setProfileInput({ ...profile }); setIsEditingProfile(true); }}
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#3B81B7] hover:text-blue-600 transition-all cursor-pointer font-['SF_Pro_Rounded']"
            >
              <Edit2 size={14} /> Edit
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button onClick={saveProfile} className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl hover:bg-blue-700 transition-all cursor-pointer shadow-sm">
                <Check size={12} /> Save
              </button>
              <button onClick={() => setIsEditingProfile(false)} className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 text-xs font-semibold px-3 py-1.5 rounded-xl hover:bg-slate-200 transition-all cursor-pointer">
                <X size={12} /> Cancel
              </button>
            </div>
          )}
        </div>
        <h3 className="text-[16px] font-bold text-slate-800 mb-6 select-none font-['SF_Pro_Rounded']">Company Profile</h3>
        
        {/* التعديل هنا: جعل الـ grid مقسم إلى عمودين فقط على الشاشات المتوسطة والأكبر لتصبح كل معلومتين بجانب بعضهما والباقي تحتهما */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-sm font-['SF_Pro_Rounded']">
          <div>
            <p className="text-slate-400 text-[12px] font-normal mb-1.5 select-none">Company Name</p>
            {!isEditingProfile ? (
              <p className="font-semibold text-slate-800 text-[15px]">{profile.name}</p>
            ) : (
              <input type="text" value={profileInput.name} onChange={e => setProfileInput({...profileInput, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 transition-all" />
            )}
          </div>
          <div>
            <p className="text-slate-400 text-[12px] font-normal mb-1.5 select-none">Company Type</p>
            {!isEditingProfile ? (
              <p className="font-semibold text-slate-800 text-[15px]">{profile.type}</p>
            ) : (
              <input type="text" value={profileInput.type} onChange={e => setProfileInput({...profileInput, type: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 transition-all" />
            )}
          </div>
          <div>
            <p className="text-slate-400 text-[12px] font-normal mb-1.5 select-none">Tax ID</p>
            {!isEditingProfile ? (
              <p className="font-semibold text-slate-800 text-[15px]">{profile.taxId}</p>
            ) : (
              <input type="text" value={profileInput.taxId} onChange={e => setProfileInput({...profileInput, taxId: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 transition-all" />
            )}
          </div>
          <div>
            <p className="text-slate-400 text-[12px] font-normal mb-1.5 select-none">Registration Date</p>
            <p className="font-semibold text-slate-800 text-[15px] select-none">{profile.regDate}</p>
          </div>
        </div>
      </div>

      {/* ================= Box 2: Contact Information ================= */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.03)] relative transition-all duration-200">
        <div className="absolute right-6 top-6 flex items-center gap-2">
          {!isEditingContact ? (
            <button 
              onClick={() => { setContactInput({ ...contact }); setIsEditingContact(true); }}
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#3B81B7] hover:text-blue-600 transition-all cursor-pointer font-['SF_Pro_Rounded']"
            >
              <Edit2 size={14} /> Edit
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button onClick={saveContact} className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl hover:bg-blue-700 transition-all cursor-pointer shadow-sm">
                <Check size={12} /> Save
              </button>
              <button onClick={() => setIsEditingContact(false)} className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 text-xs font-semibold px-3 py-1.5 rounded-xl hover:bg-slate-200 transition-all cursor-pointer">
                <X size={12} /> Cancel
              </button>
            </div>
          )}
        </div>
        <h3 className="text-[16px] font-bold text-slate-800 mb-6 select-none font-['SF_Pro_Rounded']">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4 text-sm font-['SF_Pro_Rounded']">
          <div className="w-full flex flex-col justify-start items-start">
            <p className="text-slate-400 text-[12px] font-normal mb-1.5 select-none">Email</p>
            {!isEditingContact ? (
              <p className="font-semibold text-slate-800 text-[15px] truncate w-full">{contact.email}</p>
            ) : (
              <input type="email" value={contactInput.email} onChange={e => setContactInput({...contactInput, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 transition-all" />
            )}
          </div>
          <div className="w-full flex flex-col justify-start items-start">
            <p className="text-slate-400 text-[12px] font-normal mb-1.5 select-none">Phone</p>
            {!isEditingContact ? (
              <p className="font-semibold text-slate-800 text-[15px]">{contact.phone}</p>
            ) : (
              <input type="text" value={contactInput.phone} onChange={e => setContactInput({...contactInput, phone: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 transition-all" />
            )}
          </div>
          <div className="w-full md:col-span-2 flex flex-col justify-start items-start mt-2">
            <p className="text-slate-400 text-[12px] font-normal mb-1.5 select-none">Address</p>
            {!isEditingContact ? (
              <p className="font-semibold text-slate-800 text-[15px]">{contact.address}</p>
            ) : (
              <input type="text" value={contactInput.address} onChange={e => setContactInput({...contactInput, address: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 transition-all" />
            )}
          </div>
        </div>
      </div>

      {/* ================= Box 3: Payment Settings ================= */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.03)] relative transition-all duration-200">
        <div className="absolute right-6 top-6 flex items-center gap-2">
          {!isEditingPayment ? (
            <button 
              onClick={() => { setPaymentInput({ ...payment }); setIsEditingPayment(true); }}
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#3B81B7] hover:text-blue-600 transition-all cursor-pointer font-['SF_Pro_Rounded']"
            >
              <Edit2 size={14} /> Edit
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button onClick={savePayment} className="inline-flex items-center gap-1 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl hover:bg-blue-700 transition-all cursor-pointer shadow-sm">
                <Check size={12} /> Save
              </button>
              <button onClick={() => setIsEditingPayment(false)} className="inline-flex items-center gap-1 bg-slate-100 text-slate-500 text-xs font-semibold px-3 py-1.5 rounded-xl hover:bg-slate-200 transition-all cursor-pointer">
                <X size={12} /> Cancel
              </button>
            </div>
          )}
        </div>
        <h3 className="text-[16px] font-bold text-slate-800 mb-6 select-none font-['SF_Pro_Rounded']">Payment Settings</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 text-sm font-['SF_Pro_Rounded']">
          <div className="flex flex-col justify-start items-start">
            <p className="text-slate-400 text-[12px] font-normal mb-1.5 select-none">Default Payment Terms</p>
            {!isEditingPayment ? (
              <p className="font-semibold text-slate-800 text-[15px]">{payment.terms}</p>
            ) : (
              <input type="text" value={paymentInput.terms} onChange={e => setPaymentInput({...paymentInput, terms: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 transition-all" />
            )}
          </div>
          <div className="flex flex-col justify-start items-start">
            <p className="text-slate-400 text-[12px] font-normal mb-1.5 select-none">Bank Account</p>
            {!isEditingPayment ? (
              <p className="font-semibold text-slate-800 text-[15px] tracking-wide">{payment.bankAccount}</p>
            ) : (
              <input type="text" value={paymentInput.bankAccount} onChange={e => setPaymentInput({...paymentInput, bankAccount: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 transition-all" />
            )}
          </div>
        </div>
      </div>

      {/* ================= Box 4: Notification Preferences ================= */}
      <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0px_2px_12px_0px_rgba(0,0,0,0.03)] relative transition-all duration-200">
        <h3 className="text-[16px] font-bold text-slate-800 mb-6 select-none font-['SF_Pro_Rounded']">Notification Preferences</h3>
        
        <div className="w-full flex flex-col justify-start items-start gap-5 font-['SF_Pro_Rounded']">
          {/* الإشعار الأول */}
          <div className="w-full flex justify-between items-center relative">
            <div className="flex flex-col justify-start items-start">
              <p className="text-slate-700 text-[15px] font-normal">New order notifications</p>
            </div>
            <button 
              type="button"
              onClick={() => setNotifyNewOrder(!notifyNewOrder)}
              className={`w-11 h-6 rounded-full p-0.5 transition-all duration-200 cursor-pointer flex items-center relative ${
                notifyNewOrder ? 'bg-[#3B81B7]' : 'bg-slate-200'
              }`}
              aria-label="Toggle new order notifications"
            >
              <div className={`bg-white w-5 h-5 rounded-full shadow-sm transform transition-all duration-200 ${
                notifyNewOrder ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* الإشعار الثاني */}
          <div className="w-full flex justify-between items-center relative">
            <div className="flex flex-col justify-start items-start">
              <p className="text-slate-700 text-[15px] font-normal">Email notifications</p>
            </div>
            <button 
              type="button"
              onClick={() => setNotifyEmail(!notifyEmail)}
              className={`w-11 h-6 rounded-full p-0.5 transition-all duration-200 cursor-pointer flex items-center relative ${
                notifyEmail ? 'bg-[#3B81B7]' : 'bg-slate-200'
              }`}
              aria-label="Toggle email notifications"
            >
              <div className={`bg-white w-5 h-5 rounded-full shadow-sm transform transition-all duration-200 ${
                notifyEmail ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}