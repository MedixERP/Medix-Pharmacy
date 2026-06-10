// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/index'; 
import { authStore } from './store/authStore'; // استيراد الـ store الخاص بالـ Auth

function App() {
  useEffect(() => {
    // 🚀 تسجيل دخول وهمي تلقائي كـ SUPPLIER (كابيتال) لفتح النظام وتجربة الصفحات فوراً
    authStore.getState().login(
      { 
        id: 'sup_01', 
        name: 'Eva Pharma', 
        email: 'supplier@evapharma.com', 
        role: 'SUPPLIER' // متوافق تماماً مع الـ Interface والـ RoleGuard
      },
      'mock-jwt-token-xyz-123'
    );
  }, []);

  return (
    <BrowserRouter>
      {/* الـ AppRoutes يحمل داخله كل الـ Lazy Pages والـ Role Guards لحماية النظام */}
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;