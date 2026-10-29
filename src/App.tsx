// src/App.tsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/index'; 

function App() {
  // تم تنظيف الـ useEffect والـ Hardcoded Login بالكامل.
  // الآن السيستم هيفتح على الـ Landing Page، ولو رحتي لـ /login هتقدري تسجلي دخول يدوي لأي حساب من الأربعة.
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;