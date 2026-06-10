// src/components/layout/AppLayout.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function AppLayout() {
  // الـ State المسؤولة عن فتح وغلق القائمة في شاشات الموبايل
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[#f8fafc] overflow-hidden">
      {/* الهيدر العلوي الممتد مع تمرير الـ state للـ Hamburger Button */}
      <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* الـ Container السفلي الذكي */}
      <div className="flex flex-1 min-h-0 relative">
        {/* السايدبار المتجاوب متموقع مطلقاً بالنسبة للأب ويبدأ من تحت الناف بار فوراً */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* منطقة المحتوى الداخلي (Outlet) بالأبعاد الموحدة الدقيقة من فيجما */}
        {/* pt-[46px] للمسافة من فوق، و px-[28px] للمسافة من الجوانب */}
        <main className="flex-1 pt-[46px] pb-[46px] px-[28px] bg-[#f8fafc] overflow-y-auto transition-all duration-300
          ml-0 md:ml-20 lg:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
}