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

// Supplier Premium Pages
const SupplierDashboard = lazy(() => import('../pages/supplier/Dashboard'));
const IncomingOrders = lazy(() => import('../pages/supplier/IncomingOrders'));
const Pharmacies = lazy(() => import('../pages/supplier/Pharmacies'));
const DrugsCatalog = lazy(() => import('../pages/supplier/Drugs'));
const AddProduct = lazy(() => import('../pages/supplier/AddProduct'));
const EditProduct = lazy(() => import('../pages/supplier/EditProduct'));
const AnalyticsReports = lazy(() => import('../pages/supplier/Reports'));
const Settings = lazy(() => import('../pages/supplier/Settings'));

// Pharmacist Pages (تمت إضافتها وتفعيلها لحل مشكلة الـ Not Found)
const PharmacistDashboard = lazy(() => import('../pages/pharmacist/Dashboard'));
const ScanPrescription = lazy(() => import('../pages/pharmacist/ScanPrescription')); 
const DrugSearch = lazy(() => import('../pages/pharmacist/DrugSearch'));
const DrugAlternatives = lazy(() => import('../pages/pharmacist/DrugAlternatives'));
const PatientProfile = lazy(() => import('../pages/pharmacist/PatientProfile'));

// Local Spinner Loader
const PageLoader = () => (
  <div className="w-full h-screen bg-white flex items-center justify-center flex-col gap-3">
    <div className="w-10 h-10 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
    <p className="text-sm text-slate-500 font-bold tracking-wide">Loading Medix Portal...</p>
  </div>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* 1. Public Routes */}
        <Route path={ROUTES.HOME} element={<LandingPage />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        {/* 2. Protected Portal Routes */}
        <Route element={<ProtectedRoute />}>
          
          {/* ================= SUPPLIER ROUTING GROUP ================= */}
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

          {/* ================= PHARMACIST ROUTING GROUP ================= */}
          <Route element={<RoleGuard allowedRoles={['PHARMACIST', 'pharmacist']} />}>
            <Route element={<AppLayout />}>
              <Route path={ROUTES.PHARMACIST.DASHBOARD} element={<PharmacistDashboard />} />
              <Route path={ROUTES.PHARMACIST.SCAN_PRESCRIPTION} element={<ScanPrescription />} />
              <Route path={ROUTES.PHARMACIST.DRUG_SEARCH} element={<DrugSearch />} />
              <Route path={ROUTES.PHARMACIST.DRUG_ALTERNATIVES} element={<DrugAlternatives />} />
              <Route path={ROUTES.PHARMACIST.PATIENT_PROFILE} element={<PatientProfile />} />
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