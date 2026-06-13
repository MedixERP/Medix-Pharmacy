// src/App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/index'; 
import { authStore } from './store/authStore'; 

function App() {
  useEffect(() => {
    // 💡 جربيها دلوقتي: فَعّلي الدور اللي حابه تدخلي بيه واقفلي الباقي بالـ Comment
    
    // خيار 1: للدخول كـ صيدلي (Pharmacist)
    // authStore.getState().login(
    //   { id: 'user_01', name: 'Medix Pharmacist', email: 'pharmacist@medix.com', role: 'PHARMACIST' },
    //   'mock-jwt-token-xyz-123'
    // );

    /* // خيار 2: للدخول كـ مورد (Supplier)*/
    authStore.getState().login(
      { id: 'sup_01', name: 'Eva Pharma', email: 'supplier@evapharma.com', role: 'SUPPLIER' },
      'mock-jwt-token-xyz-123'
    );
    

    /* // خيار 3: للدخول كـ أدمن النظام (Admin)  */
  //   authStore.getState().login(
  //     { id: 'adm_01', name: 'Medix Admin', email: 'admin@medix.com', role: 'ADMIN' },
  //     'mock-jwt-token-xyz-123'
  //   );
  
  }, []);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;