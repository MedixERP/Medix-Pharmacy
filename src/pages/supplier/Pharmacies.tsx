// src/pages/supplier/Pharmacies.tsx
import React, { useState } from 'react';
import { Search, Eye, Mail, X } from 'lucide-react';
import SEOHead from '../../components/shared/SEOHead';
import { DataTable } from '../../components/shared/DataTable'; // تأكدي من صحة مار المكون المشترك لديكِ

const initialPharmacies = [
  { id: 1, name: 'Smart Pharmacy', contact: 'Ahmed Hassan', email: 'contact@smart.com', phone: '+20 100 123 4567', orders: 45, lastOrder: 'Jan 28', status: 'Active', revenue: '125,000', memberSince: 'Jan 2024', address: '123 Main St, Cairo, Egypt' },
  { id: 2, name: 'Al-Ezaby', contact: 'Sara Ali', email: 'info@ezaby.com', phone: '+20 122 456 7890', orders: 32, lastOrder: 'Jan 27', status: 'Active', revenue: '98,000', memberSince: 'Mar 2023', address: '456 El-Thawra St, Heliopolis, Cairo' },
  { id: 3, name: 'Seif Pharmacy', contact: 'Mohamed Said', email: 'seif@pharma.com', phone: '+20 111 234 5678', orders: 18, lastOrder: 'Jan 20', status: 'Inactive', revenue: '42,500', memberSince: 'Nov 2024', address: '789 El-Bahr St, Tanta, Egypt' },
];

export default function Pharmacies() {
  const [pharmacies] = useState(initialPharmacies);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState<typeof initialPharmacies[0] | null>(null);

  // إعدادات الـ Pagination المحلية المطلوبة للـ DataTable
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredPharmacies = pharmacies.filter(p => {
    const matchesFilter = filter === 'All' || p.status === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.contact.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // حسابات الـ Pagination الدقيقة لتمريرها للـ Component المشترك
  const totalPages = Math.ceil(filteredPharmacies.length / itemsPerPage);
  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const currentPharmacies = filteredPharmacies.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

  // 💻 أسماء الـ Headers لجدول الديسكتوب متوافقة مع ترويسة الفيجما
  const tableHeaders = [
    'Pharmacy Name',
    'Contact Person',
    'Email',
    'Phone',
    'Total Orders',
    'Last Order',
    'Status',
    'Actions'
  ];

  // 📱 بناء كارت الموبايل المتجاوب (Responsive Mobile Card)
  const renderMobileCard = (pharmacy: typeof initialPharmacies[0]) => (
    <div 
      onClick={() => setSelectedPharmacy(pharmacy)}
      className="p-5 rounded-2xl bg-white border border-slate-100 shadow-2xs flex flex-col justify-between space-y-4 hover:border-blue-200 transition-all cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 bg-sky-100 rounded-2xl flex justify-center items-center flex-shrink-0 shadow-inner">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M8.33301 10H11.6663" stroke="#3B81B7" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.33301 6.6665H11.6663" stroke="#3B81B7" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.6663 17.5002V15.0002C11.6663 14.5581 11.4907 14.1342 11.1782 13.8217C10.8656 13.5091 10.4417 13.3335 9.99967 13.3335C9.55765 13.3335 9.13372 13.5091 8.82116 13.8217C8.5086 14.1342 8.33301 14.5581 8.33301 15.0002V17.5002" stroke="#3B81B7" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5.00033 8.3335H3.33366C2.89163 8.3335 2.46771 8.50909 2.15515 8.82165C1.84259 9.13421 1.66699 9.55814 1.66699 10.0002V15.8335C1.66699 16.2755 1.84259 16.6994 2.15515 17.012C2.46771 17.3246 2.89163 17.5002 3.33366 17.5002H16.667C17.109 17.5002 17.5329 17.3246 17.8455 17.012C18.1581 16.6994 18.3337 16.2755 18.3337 15.8335V7.50016C18.3337 7.05814 18.1581 6.63421 17.8455 6.32165C17.5329 6.00909 17.109 5.8335 16.667 5.8335H15.0003" stroke="#3B81B7" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5 17.5V4.16667C5 3.72464 5.17559 3.30072 5.48816 2.98816C5.80072 2.67559 6.22464 2.5 6.66667 2.5H13.3333C13.7754 2.5 14.1993 2.67559 14.5118 2.98816C14.8244 3.30072 15 3.72464 15 4.16667V17.5" stroke="#3B81B7" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        </div>
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg ${
          pharmacy.status === 'Active' ? 'bg-green-100 text-green-500' : 'bg-slate-100 text-gray-400'
        }`}>{pharmacy.status}</span>
      </div>

      <div>
        <h4 className="font-bold text-[#1b2a49] text-base font-['SF_Pro_Rounded']">{pharmacy.name}</h4>
        <p className="text-xs text-slate-700 font-normal font-['SF_Pro_Rounded'] mt-0.5">Contact: {pharmacy.contact}</p>
      </div>

      <div className="flex items-center justify-between border-t border-slate-50 pt-3 text-xs">
        <div>
          <p className="text-gray-500 font-['SF_Pro_Rounded']">Last: {pharmacy.lastOrder}</p>
          <p className="text-slate-700 font-bold mt-0.5 font-['SF_Pro_Rounded']">📦 {pharmacy.orders} orders</p>
        </div>
        <button type="button" className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-400 text-white font-bold flex items-center justify-center shadow-xs">
          <Eye size={14} />
        </button>
      </div>
    </div>
  );

  // 💻 بناء الـ Table Row للديسكتوب بأبعاد ومسافات الفيجما الدقيقة (h-20 وأيقونة المبنى الزرقاء)
  const renderTableRow = (pharmacy: typeof initialPharmacies[0]) => (
    <tr key={pharmacy.id} className="hover:bg-slate-50/40 transition-all duration-150 h-20">
      {/* Pharmacy Name مع كونتينر الأيقونة الزرقاء بالمللي */}
      <td className="pl-4 pr-6">
        <div className="inline-flex justify-start items-center gap-3 h-10">
          <div className="w-10 h-10 bg-sky-100 rounded-2xl flex justify-center items-center shadow-xs">
         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M8.33301 10H11.6663" stroke="#3B81B7" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.33301 6.6665H11.6663" stroke="#3B81B7" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.6663 17.5002V15.0002C11.6663 14.5581 11.4907 14.1342 11.1782 13.8217C10.8656 13.5091 10.4417 13.3335 9.99967 13.3335C9.55765 13.3335 9.13372 13.5091 8.82116 13.8217C8.5086 14.1342 8.33301 14.5581 8.33301 15.0002V17.5002" stroke="#3B81B7" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5.00033 8.3335H3.33366C2.89163 8.3335 2.46771 8.50909 2.15515 8.82165C1.84259 9.13421 1.66699 9.55814 1.66699 10.0002V15.8335C1.66699 16.2755 1.84259 16.6994 2.15515 17.012C2.46771 17.3246 2.89163 17.5002 3.33366 17.5002H16.667C17.109 17.5002 17.5329 17.3246 17.8455 17.012C18.1581 16.6994 18.3337 16.2755 18.3337 15.8335V7.50016C18.3337 7.05814 18.1581 6.63421 17.8455 6.32165C17.5329 6.00909 17.109 5.8335 16.667 5.8335H15.0003" stroke="#3B81B7" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5 17.5V4.16667C5 3.72464 5.17559 3.30072 5.48816 2.98816C5.80072 2.67559 6.22464 2.5 6.66667 2.5H13.3333C13.7754 2.5 14.1993 2.67559 14.5118 2.98816C14.8244 3.30072 15 3.72464 15 4.16667V17.5" stroke="#3B81B7" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
          </div>
          <span className="text-slate-700 text-base font-bold font-['SF_Pro_Rounded'] leading-6 whitespace-nowrap">
            {pharmacy.name}
          </span>
        </div>
      </td>

      {/* Contact Person */}
      <td className="pl-6 pr-4 text-slate-700 text-sm font-normal font-['SF_Pro_Rounded'] leading-5 whitespace-nowrap">
        {pharmacy.contact}
      </td>

      {/* Email */}
      <td className="pl-[13px] pr-4 text-gray-500 text-sm font-normal font-['SF_Pro_Rounded'] leading-5 whitespace-nowrap">
        {pharmacy.email}
      </td>

      {/* Phone */}
      <td className="pl-14 pr-4 text-gray-500 text-sm font-normal font-['SF_Pro_Rounded'] leading-5 whitespace-nowrap">
        {pharmacy.phone}
      </td>

      {/* Total Orders */}
      <td className="pl-[30.3px] pr-4 text-slate-700 text-sm font-bold font-['SF_Pro_Rounded'] leading-5 whitespace-nowrap">
        {pharmacy.orders} orders
      </td>

      {/* Last Order */}
      <td className="pl-[30.48px] pr-4 text-gray-500 text-sm font-normal font-['SF_Pro_Rounded'] leading-5 whitespace-nowrap">
        {pharmacy.lastOrder}
      </td>

      {/* Status Badge */}
      <td className="pl-[20.39px] pr-4">
        <span className={`h-7 px-3 py-1.5 rounded-[10px] inline-flex justify-center items-center text-xs font-normal font-['SF_Pro_Rounded'] leading-5 ${
          pharmacy.status === 'Active' ? 'bg-green-100 text-green-500' : 'bg-slate-100 text-gray-400'
        }`}>
          {pharmacy.status}
        </span>
      </td>

      {/* Actions (Eye + Mail Icons) */}
      <td className="text-center">
        <div className="inline-flex justify-center items-center gap-2 w-full h-9 px-2">
          <button 
            type="button" 
            onClick={() => setSelectedPharmacy(pharmacy)} 
            className="w-9 h-9 rounded-[10px] flex justify-center items-center text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <Eye size={16} />
          </button>
          <a 
            href={`mailto:${pharmacy.email}`} 
            className="w-9 h-9 rounded-[10px] flex justify-center items-center text-slate-500 hover:text-blue-600 hover:bg-slate-50 transition-all"
          >
            <Mail size={16} />
          </a>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-left relative pb-10">
      <SEOHead 
        title="Pharmacies Management" 
        description="Track and manage all registered pharmacy partners and digital store accounts." 
      />

      {/* 1. العنوان والوصف المتطابق مع الفيجما */}
      <div>
        <h1 
          className="text-[24px] md:text-[30px] font-bold text-slate-700 md:leading-[42px] tracking-[0px] select-none"
          style={{ fontFamily: '"SF Pro Rounded", sans-serif', fontWeight: 700 }}
        >
          Pharmacist Accounts
        </h1>
        <p 
          className="text-[13px] md:text-[15px] font-normal text-[#7F8C8D] md:leading-[22.5px] tracking-[0px] mt-[8px]"
          style={{ fontFamily: '"SF Pro Rounded", sans-serif', fontWeight: 400 }}
        >
          Pharmacies you supply to
        </p>
      </div>

      {/* 2. شريط البحث والـ Filter Tabs */}
      <div className="space-y-6">
        <div className="relative w-full select-none">
  {/* حاوية الأيقونة المظبوطة في السنتر تماماً على اليسار */}
  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex justify-center items-center pointer-events-none text-gray-400 z-10">
    <Search size={18} />
  </div>
  
  {/* الـ Input بالـ Padding اليساري (pl-12) عشان يسيب مساحة دقيقة للأيقونة */}
  <input 
    type="text" 
    placeholder="Search pharmacy by name, contact..." 
    value={search}
    onChange={(e) => {
      setSearch(e.target.value);
      setCurrentPage(1); // تصفير الصفحة تلقائياً لضمان تجربة مستخدم سلسة
    }}
    className="w-full h-12 bg-white rounded-2xl outline outline-1 outline-offset-[-1px] outline-gray-200/80 pl-12 pr-4 text-sm text-[#1b2a49] placeholder-gray-400 focus:outline-none focus:outline-blue-500 focus:shadow-[0_0_0_4px_rgba(59,129,183,0.1)] transition-all font-['Arimo'] font-normal shadow-3xs"
  />
</div>

        <div className="flex gap-5 select-none overflow-x-auto pb-1 scrollbar-none">
          {['All', 'Active', 'Inactive'].map((tab) => {
            const count = tab === 'All' ? pharmacies.length : pharmacies.filter(p => p.status === tab).length;
            const isSelected = filter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setFilter(tab);
                  setCurrentPage(1);
                }}
                className={`h-10 px-5 text-sm font-bold rounded-[10px] transition-all cursor-pointer whitespace-nowrap ${
                  isSelected 
                    ? 'bg-blue-950 text-white ' 
                    : 'bg-white text-gray-500 hover:bg-slate-50'
                }`}
                style={{ fontFamily: '"SF Pro Rounded", sans-serif' }}
              >
                {tab} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. استدعاء الـ DataTable المشترك المسؤول عن حماية ستايل الفيجما والـ Pagination الموحد */}
      <DataTable
        data={currentPharmacies}
        headers={tableHeaders}
        renderRow={renderTableRow}
        renderCard={renderMobileCard}
        currentPage={currentPage}
        totalPages={totalPages}
        indexOfFirstItem={indexOfFirstItem}
        filteredCount={filteredPharmacies.length}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {/* الـ Modal تفاصيل الصيدلية (يظل محتفظاً بالـ State والـ Content بالكامل) */}
      {selectedPharmacy && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              type="button"
              onClick={() => setSelectedPharmacy(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-50 transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex flex-col items-center text-center mt-2 mb-6 select-none">
              <div className="w-16 h-16 rounded-2xl bg-sky-100 flex justify-center items-center shadow-xs mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-cyan-600">
                  <path d="M3 21h18M3 7V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2M5 21V7m14 14V7M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4M7 7h10M7 11h10M7 15h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#1b2a49]">{selectedPharmacy.name}</h3>
              <span className={`mt-1 inline-block text-xs font-bold px-2 py-0.5 rounded-md ${
                selectedPharmacy.status === 'Active' ? 'bg-green-100 text-green-500' : 'bg-slate-100 text-gray-400'
              }`}>
                ✓ {selectedPharmacy.status}
              </span>
            </div>

            <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-4 space-y-3 mb-6 text-left">
              <h4 className="text-xs font-bold text-[#1b2a49] tracking-wide uppercase opacity-70 select-none">
                📍 Contact Information
              </h4>
              <div className="text-xs space-y-2 text-slate-600 font-medium font-['SF_Pro_Rounded']">
                <p><span className="text-slate-400">Contact Person:</span> {selectedPharmacy.contact}</p>
                <p><span className="text-slate-400">Email:</span> {selectedPharmacy.email}</p>
                <p><span className="text-slate-400">Phone:</span> {selectedPharmacy.phone}</p>
                <p><span className="text-slate-400">Address:</span> {selectedPharmacy.address}</p>
              </div>
            </div>

            <div className="bg-slate-50/70 border border-slate-100 rounded-2xl p-4 space-y-3 mb-6 text-left select-none">
              <h4 className="text-xs font-bold text-[#1b2a49] tracking-wide uppercase opacity-70">
                📊 Order Statistics
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-xs">
                  <span className="text-xl font-extrabold text-[#1b2a49]">{selectedPharmacy.orders}</span>
                  <p className="text-[10px] font-bold text-slate-400 mt-0.5">Total Orders</p>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-xs">
                  <span className="text-xs font-extrabold text-purple-600 block py-1">{selectedPharmacy.revenue} EGP</span>
                  <p className="text-[10px] font-bold text-slate-400 mt-0.5">Revenue</p>
                </div>
                <div className="bg-white p-2 rounded-xl border border-slate-100 shadow-xs">
                  <span className="text-[11px] font-extrabold text-blue-600 block py-1">{selectedPharmacy.memberSince}</span>
                  <p className="text-[10px] font-bold text-slate-400 mt-0.5">Member Since</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button type="button" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer">
                View All Orders
              </button>
              <button type="button" onClick={() => setSelectedPharmacy(null)} className="w-full py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold text-xs rounded-xl transition-all cursor-pointer">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}