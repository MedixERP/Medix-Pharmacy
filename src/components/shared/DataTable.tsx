'use client';

import React from 'react';

// تعريف الـ Generics والـ Props لجعل الجدول مرن وقابل لإعادة الاستخدام في أي مكان
interface DataTableProps<T> {
  data: T[];                                     // مصفوفة البيانات الحية (Orders أو Drugs أو غيرها)
  headers: string[];                             // عناوين الأعمدة للـ Desktop
  renderRow: (item: T) => React.ReactNode;       // دالة بناء الـ السطر <tr> والخلايا <td>
  renderCard: (item: T) => React.ReactNode;      // دالة بناء الكارت للـ Mobile والـ Tablet تلقائياً
  
  // حقول الـ Pagination المربوطة بالـ State الخارجية للـ Backend
  currentPage: number;
  totalPages: number;
  indexOfFirstItem: number;
  filteredCount: number;
  onPageChange: (page: number) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  headers,
  renderRow,
  renderCard,
  currentPage,
  totalPages,
  indexOfFirstItem,
  filteredCount,
  onPageChange,
}: DataTableProps<T>) {
  
  return (
    <div className="w-full space-y-4">
      
      {/* 📱 أ: كروت الموبايل (تظهر تلقائياً في الشاشات الصغيرة وتختفي تماماً بدءاً من md) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden select-none">
        {data.length > 0 ? (
          data.map((item) => <React.Fragment key={item.id}>{renderCard(item)}</React.Fragment>)
        ) : (
          <div className="py-10 text-center text-xs font-bold text-slate-400 bg-white rounded-2xl border border-slate-200">
            No items found.
          </div>
        )}
      </div>

      {/* 💻 ب: تصميم الجدول لـ التابلت واللابتوب والـ Desktop بنفس الشادو والـ Outline لفيجما بالملي */}
      <div className="w-full bg-white rounded-2xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.06)] outline outline-1 outline-offset-[-1px] outline-slate-300 overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* الهيدر الرمادي الصريح المتطابق مع الفجما */}
            <thead>
              <tr className="bg-slate-100 border-b border-gray-200 select-none text-left h-12">
                {headers.map((header, index) => (
                  <th 
                    key={index} 
                    className={`py-3 px-6 text-gray-500 text-xs font-bold font-['SF_Pro_Rounded'] uppercase leading-5 whitespace-nowrap ${
                      index === headers.length - 1 ? 'text-center' : ''
                    }`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            
            {/* عرض الأسطر والـ td الممررة ديناميكياً */}
            <tbody className="divide-y divide-slate-100 text-sm">
              {data.length > 0 ? (
                data.map((item) => <React.Fragment key={item.id}>{renderRow(item)}</React.Fragment>)
              ) : (
                <tr>
                  <td colSpan={headers.length} className="py-10 text-center text-xs font-bold text-slate-400 select-none">
                    No items found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ⚙️ نظام الـ Pagination التفاعلي الموحد لجميع الجداول بالتدرج اللوني لنيكست والسابق */}
      <div className=" py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-semibold select-none shadow-xs">
        <span>
          Showing {filteredCount > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfFirstItem + data.length, filteredCount)} of {filteredCount} items
        </span>
        
        <div className="flex items-center gap-1">
          <button 
            type="button"
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => (
            <button 
              key={i + 1}
              type="button"
              onClick={() => onPageChange(i + 1)}
              className={`w-8 h-8 rounded-lg font-bold shadow-sm transition-all cursor-pointer flex items-center justify-center ${
                currentPage === i + 1 
                  ? 'bg-gradient-to-br from-cyan-600 to-blue-400 text-white shadow-md border-none' 
                  : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
              }`}
            >
              {i + 1}
            </button>
          ))}
          
          <button 
            type="button"
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}