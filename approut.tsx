

import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './routes';

// استيراد المكونات العامة الخفيفة (مباشرة بدون lazy)
// import Spinner from '../components/ui/Spinner';
import RoleGuard from '../components/layout/RoleGuard';
// import AppLayout from '../components/layout/AppLayout';

// 🏠 Public Pages (Lazy Loaded)
const LandingPage = lazy(() => import('../features/landing-page/LandingPage'));
const Login = lazy(() => import('../pages/auth/Login'));
const Register = lazy(() => import('../pages/auth/Register'));
// const NotFound = lazy(() => import('../pages/auth/NotFound'));

// 🔧 Admin Pages (Lazy Loaded)
// const AdminDashboard = lazy(() => import('../pages/admin/Dashboard'));
// const AdminUserManagement = lazy(() => import('../pages/admin/UserManagement'));
// const AdminDrugManagement = lazy(() => import('../pages/admin/DrugManagement'));
// const AdminSupplierManagement = lazy(() => import('../pages/admin/SupplierManagement'));
// const AdminPurchaseOrders = lazy(() => import('../pages/admin/PurchaseOrders'));
// const AdminExpiryTracking = lazy(() => import('../pages/admin/ExpiryTracking'));
// const AdminCustomerManagement = lazy(() => import('../pages/admin/CustomerManagement'));
// const AdminReports = lazy(() => import('../pages/admin/Reports'));
// const AdminInventory = lazy(() => import('../pages/admin/Inventory'));

// // 💊 Pharmacist Pages (Lazy Loaded)
// const PharmacistDashboard = lazy(() => import('../pages/pharmacist/Dashboard'));
// const ScanPrescription = lazy(() => import('../pages/pharmacist/ScanPrescription'));
// const DrugSearch = lazy(() => import('../pages/pharmacist/DrugSearch'));
// const DrugAlternatives = lazy(() => import('../pages/pharmacist/DrugAlternatives'));
// const DrugInteractions = lazy(() => import('../pages/pharmacist/DrugInteractions'));
// const PharmacistPatientProfile = lazy(() => import('../pages/pharmacist/PatientProfile'));

// // 🏪 Supplier Pages (Lazy Loaded)
const SupplierDashboard = lazy(() => import('../pages/supplier/Dashboard'));
const IncomingOrders = lazy(() => import('../pages/supplier/IncomingOrders'));
// const OrderHistory = lazy(() => import('../pages/supplier/OrderHistory'));

// // 👤 Patient Pages (Lazy Loaded)
// const PatientProfile = lazy(() => import('../pages/patient/Profile'));
// const PrescriptionHistory = lazy(() => import('../pages/patient/PrescriptionHistory'));
// const ChronicMeds = lazy(() => import('../pages/patient/ChronicMeds'));


// Loading Fallback Spinner Component
// const PageLoader = () => (
//   <div className="w-full h-screen bg-slate-950 flex items-center justify-center">
//     <Spinner />
//   </div>
// );

const AppRoutes: React.FC = () => {
  return (
    // <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Core Routes */}
        <Route path={ROUTES.HOME} element={<LandingPage />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        {/* Protected Core Layout Gateway */}
        {/* <Route element={<AppLayout />}> */}
          
          {/* 🔧 Admin Nodes Layer */}
          {/* <Route element={<RoleGuard allowedRoles={['admin']} />}>
            <Route path={ROUTES.ADMIN.DASHBOARD} element={<AdminDashboard />} />
            <Route path={ROUTES.ADMIN.USER_MANAGEMENT} element={<AdminUserManagement />} />
            <Route path={ROUTES.ADMIN.DRUG_MANAGEMENT} element={<AdminDrugManagement />} />
            <Route path={ROUTES.ADMIN.SUPPLIER_MANAGEMENT} element={<AdminSupplierManagement />} />
            <Route path={ROUTES.ADMIN.PURCHASE_ORDERS} element={<AdminPurchaseOrders />} />
            <Route path={ROUTES.ADMIN.EXPIRY_TRACKING} element={<AdminExpiryTracking />} />
            <Route path={ROUTES.ADMIN.CUSTOMER_MANAGEMENT} element={<AdminCustomerManagement />} />
            <Route path={ROUTES.ADMIN.REPORTS} element={<AdminReports />} />
            <Route path={ROUTES.ADMIN.INVENTORY} element={<AdminInventory />} />
          </Route> */}

          {/* 💊 Pharmacist Nodes Layer */}
          {/* <Route element={<RoleGuard allowedRoles={['pharmacist']} />}>
            <Route path={ROUTES.PHARMACIST.DASHBOARD} element={<PharmacistDashboard />} />
            <Route path={ROUTES.PHARMACIST.SCAN_PRESCRIPTION} element={<ScanPrescription />} />
            <Route path={ROUTES.PHARMACIST.DRUG_SEARCH} element={<DrugSearch />} />
            <Route path={ROUTES.PHARMACIST.DRUG_ALTERNATIVES} element={<DrugAlternatives />} />
            <Route path={ROUTES.PHARMACIST.DRUG_INTERACTIONS} element={<DrugInteractions />} />
            <Route path={ROUTES.PHARMACIST.PATIENT_PROFILE} element={<PharmacistPatientProfile />} />
          </Route> */}

          {/* 🏪 Supplier Nodes Layer */}
          <Route element={<RoleGuard allowedRoles={['supplier']} />}>
            <Route path={ROUTES.SUPPLIER.DASHBOARD} element={<SupplierDashboard />} />
            <Route path={ROUTES.SUPPLIER.INCOMING_ORDERS} element={<IncomingOrders />} />
            {/* <Route path={ROUTES.SUPPLIER.ORDER_HISTORY} element={<OrderHistory />} />
          </Route> */}

          {/* 👤 Patient Nodes Layer */}
          {/* <Route element={<RoleGuard allowedRoles={['patient']} />}>
            <Route path={ROUTES.PATIENT.PROFILE} element={<PatientProfile />} />
            <Route path={ROUTES.PATIENT.PRESCRIPTION_HISTORY} element={<PrescriptionHistory />} />
            <Route path={ROUTES.PATIENT.CHRONIC_MEDS} element={<ChronicMeds />} />
          </Route>

        </Route> */}

        {/* Unauthorized & Fallback Wildcard Node */}
        {/* <Route path="/unauthorized" element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    // </Suspense>
  );
};

export default AppRoutes;