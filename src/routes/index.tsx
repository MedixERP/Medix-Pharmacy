// src/routes/index.tsx
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

// Supplier Pages
const SupplierDashboard = lazy(() => import('../pages/supplier/Dashboard'));
const IncomingOrders = lazy(() => import('../pages/supplier/IncomingOrders'));
const Pharmacies = lazy(() => import('../pages/supplier/Pharmacies'));
const DrugsCatalog = lazy(() => import('../pages/supplier/Drugs'));
const AddProduct = lazy(() => import('../pages/supplier/AddProduct'));
const EditProduct = lazy(() => import('../pages/supplier/EditProduct'));
const AnalyticsReports = lazy(() => import('../pages/supplier/Reports'));
const Settings = lazy(() => import('../pages/supplier/Settings'));

// Pharmacist Dashboard Page
const PharmacistDashboard = lazy(() => import('../pages/pharmacist/Dashboard'));

// 💡 مكون مرن مؤقت للشاشات الأخرى لتجنب إيرور الـ Import لحين بنائها
const PharmacistPlaceholder = ({ title }: { title: string }) => (
  <div className="glass-light p-8 rounded-2xl text-center space-y-2 animate-in fade-in">
    <h2 className="text-xl font-bold text-[#1b2a49]">{title} Screen</h2>
    <p className="text-sm text-slate-400">This screen is fully integrated into the layout structure and ready for content.</p>
  </div>
);

const PageLoader = () => (
  <div className="w-full h-screen bg-white flex items-center justify-center flex-col gap-3">
    <div className="w-10 h-10 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
    <p className="text-xs font-bold text-[#1b2a49] tracking-wider uppercase opacity-60">Loading Medix Portal...</p>
  </div>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        
        {/* توجيه المسار الرئيسي الافتراضي (/) إلى لوحة التحكم فوراً لتجنب الـ Not Found عند التشغيل */}
        <Route path="/" element={<Navigate to="/pharmacist/dashboard" replace />} />

        {/* 1. Public Routes */}
        <Route path={ROUTES.HOME} element={<LandingPage />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        {/* 2. Protected Portal Gateway */}
        <Route element={<ProtectedRoute />}>
          
          {/* 🏪 Supplier Role Routing Group */}
          <Route element={<RoleGuard allowedRoles={['SUPPLIER', 'supplier']} />}>
            <Route element={<AppLayout />}>
              <Route path={ROUTES.SUPPLIER.DASHBOARD} element={<SupplierDashboard />} />
              <Route path={ROUTES.SUPPLIER.INCOMING_ORDERS} element={<IncomingOrders />} />
              <Route path="/supplier/pharmacies" element={<Pharmacies />} />
              <Route path="/supplier/drugs" element={<DrugsCatalog />} />
              <Route path="/supplier/drugs/add" element={<AddProduct />} />
              <Route path="/supplier/drugs/edit/:id" element={<EditProduct />} />
              <Route path="/supplier/analytics" element={<AnalyticsReports />} />
              <Route path="/supplier/settings" element={<Settings />} />
            </Route>
          </Route>

          {/* ⚡ Pharmacist Role Routing Group (تم تفعيلها وإصلاح مساراتها هنا) */}
          <Route element={<RoleGuard allowedRoles={['PHARMACIST', 'pharmacist']} />}>
            <Route element={<AppLayout />}>
              <Route path={ROUTES.PHARMACIST.DASHBOARD} element={<PharmacistDashboard />} />
              <Route path={ROUTES.PHARMACIST.SCAN_PRESCRIPTION} element={<PharmacistPlaceholder title="Scan Prescription" />} />
              <Route path={ROUTES.PHARMACIST.DRUG_SEARCH} element={<PharmacistPlaceholder title="Drug Search & Inventory" />} />
              <Route path={ROUTES.PHARMACIST.DRUG_ALTERNATIVES} element={<PharmacistPlaceholder title="Drug Alternatives" />} />
              <Route path={ROUTES.PHARMACIST.PATIENT_PROFILE} element={<PharmacistPlaceholder title="Patient Profile" />} />
            </Route>
          </Route>

        </Route>

        {/* 3. Fallback Handling */}
        <Route path={ROUTES.UNAUTHORIZED} element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}