// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/index'; 
import { authStore } from './store/authStore'; // استيراد الـ store الخاص بالـ Auth

function App() {
  useEffect(() => {
    // 💡 للتبديل والدخول بين الصيدلي والمورد أثناء الاختبار:
    
    // خيار أ: للدخول كـ صيدلي (Pharmacist)
    authStore.getState().login(
      { 
        id: 'user_01', 
        name: 'Medix User', 
        email: 'user@medix.com', 
        role: 'PHARMACIST' 
      },
      'mock-jwt-token-xyz-123'
    );

    /* // خيار ب: للدخول كـ مورد (Supplier) - احذفي علامات التعليق لتفعيله
    authStore.getState().login(
      { 
        id: 'sup_01', 
        name: 'Eva Pharma', 
        email: 'supplier@evapharma.com', 
        role: 'SUPPLIER' 
      },
      'mock-jwt-token-xyz-123'
    );
    */
  }, []);

  return (
    <BrowserRouter>
      {/* الـ AppRoutes يحمل داخله كل الـ Lazy Pages والـ Role Guards لحماية النظام */}
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;