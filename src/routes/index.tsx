import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './routes';

// Layouts & Guards
import RoleGuard from '../components/layout/RoleGuard';
import AppLayout from '../components/layout/AppLayout';
import ProtectedRoute from '../components/layout/ProtectedRoute';

// Core Pages
const LandingPage = lazy(() => import('../features/landing-page/LandingPage'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
const NotFound = lazy(() => import('../pages/auth/NotFound'));

// Supplier Premium Pages
const SupplierDashboard = lazy(() => import('../pages/supplier/Dashboard'));
const IncomingOrders = lazy(() => import('../pages/supplier/IncomingOrders'));
const Pharmacies = lazy(() => import('../pages/supplier/Pharmacies'));
const DrugsCatalog = lazy(() => import('../pages/supplier/Drugs'));
const AddProduct = lazy(() => import('../pages/supplier/AddProduct'));
const EditProduct = lazy(() => import('../pages/supplier/EditProduct'));
const AnalyticsReports = lazy(() => import('../pages/supplier/Reports'));
const Settings = lazy(() => import('../pages/supplier/Settings'));

// Local Spinner Loader
const PageLoader = () => (
  <div className="w-full h-screen bg-white flex items-center justify-center flex-col gap-3">
    <div className="w-10 h-10 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
    <p className="text-xs font-bold text-[#1b2a49] tracking-wider uppercase opacity-60">Loading Medix...</p>
  </div>
);

const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* 1. Public Core Routes */}
        <Route path={ROUTES.HOME} element={<LandingPage />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        {/* 2. Protected Gateway */}
        <Route element={<ProtectedRoute />}>
          
          {/* 🏪 Supplier Role Layer */}
          <Route element={<RoleGuard allowedRoles={['SUPPLIER', 'supplier']} />}>
            <Route element={<AppLayout />}>
              {/* اللينكات الأساسية المأخوذة من الـ ROUTES Object بتاعك بالظبط */}
              <Route path={ROUTES.SUPPLIER.DASHBOARD} element={<SupplierDashboard />} />
              <Route path={ROUTES.SUPPLIER.INCOMING_ORDERS} element={<IncomingOrders />} />
              
              {/* باقي اللينكات المكملة لسيستم الـ Supplier المتكامل */}
              <Route path="/supplier/pharmacies" element={<Pharmacies />} />
              <Route path="/supplier/drugs" element={<DrugsCatalog />} />
              <Route path="/supplier/drugs/add" element={<AddProduct />} />
              <Route path="/supplier/drugs/edit/:id" element={<EditProduct />} />
              <Route path="/supplier/analytics" element={<AnalyticsReports />} />
              <Route path="/supplier/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* الأدمن والصيدلي وباقي السيستم معمولهم كومنت آمن علشان ميعملوش إيرور */}
          {/* <Route element={<RoleGuard allowedRoles={['ADMIN']} />}>
            <Route element={<AppLayout />}>
              <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminDashboard />} />
            </Route>
          </Route> 
          */}

        </Route>

        {/* 3. Fallback Handling */}
        <Route path={ROUTES.UNAUTHORIZED} element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;