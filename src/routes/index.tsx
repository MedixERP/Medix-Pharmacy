// src/routes/index.tsx
import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './routes';
import useAuth from '../hooks/useAuth'; 

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
const AddProduct = lazy(() => import('../pages/supplier/AddEditProduct'));
const EditProduct = lazy(() => import('../pages/supplier/AddEditProduct'));
const AnalyticsReports = lazy(() => import('../pages/supplier/Reports'));
const Settings = lazy(() => import('../pages/supplier/Settings'));
const CompanyProfile = lazy(() => import('../pages/supplier/CompanyProfile'));
const NotificationsPage = lazy(() => import('../pages/supplier/Notifications'));

// Pharmacist Pages
const PharmacistDashboard = lazy(() => import('../pages/pharmacist/Dashboard'));
const PharmacistDrugs = lazy(() => import('../pages/pharmacist/Drugs'));
// مكون مؤقت احترافي للشاشات غير المكتوبة بعد
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(27,42,73,0.02)] animate-in fade-in duration-300">
    <h2 className="text-xl font-bold text-[#1b2a49] mb-2">{title} Screen</h2>
    <p className="text-xs text-slate-400 font-medium">هذه الشاشة مدمجة بالكامل في الـ Layout ومتناسقة مع الـ Sidebar والـ Navbar.</p>
  </div>
);

// ⚡ الـ Redirect الذكي والمعدّل:
// لما المستخدم يفتح أول مسار في الموقع "/"، هيتم عرضه للـ LandingPage مباشرة
// إذا كان مسجل دخول بالفعل وضغط على زر معين، الـ Store هيتكفل بتوجيهه للوحة التحكم الخاصة به
const RootRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  
  // 🌟 التعديل السحري: لو المستخدم داخل المسار الرئيسي، اعرضي الـ LandingPage فوراً
  return <LandingPage />;
};

export default function AppRoutes() {
  return (
    <Suspense 
      fallback = {
        <div className="h-screen w-screen flex items-center justify-center bg-[#f8fafc]">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#3B81B7] border-t-transparent"></div>
        </div>
      }
    >
      <Routes>
        {/* 🌟 الآن المسار الرئيسي يفتح الـ Landing Page مباشرة بدون قيود */}
        <Route path="/" element={<RootRedirect />} />

        {/* 1. Public Routes */}
        <Route path={ROUTES.HOME} element={<LandingPage />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />

        {/* 2. Protected Gateway */}
        <Route element={<ProtectedRoute />}>
          
          {/* 🏪 مجموعة مسارات المورد (Supplier) */}
          <Route element={<RoleGuard allowedRoles={['SUPPLIER', 'supplier']} />}>
            <Route element={<AppLayout />}>
              <Route path={ROUTES.SUPPLIER.DASHBOARD} element={<SupplierDashboard />} />
              <Route path="/supplier/pharmacies" element={<Pharmacies />} />
              <Route path="/supplier/drugs" element={<DrugsCatalog />} />
              <Route path="/supplier/drugs/add" element={<AddProduct />} />
              <Route path="/supplier/drugs/edit/:id" element={<EditProduct />} />
              <Route path="/supplier/analytics" element={<AnalyticsReports />} />
              <Route path="/supplier/settings" element={<Settings />} />
              <Route path={ROUTES.SUPPLIER.INCOMING_ORDERS} element={<IncomingOrders />} />
              <Route path="/supplier/profile" element={<CompanyProfile />} />
              <Route path="/supplier/notifications" element={<NotificationsPage />} />
            </Route>
          </Route>

          {/* ⚡ مجموعة مسارات الصيدلي (Pharmacist) */}
          <Route element={<RoleGuard allowedRoles={['PHARMACIST', 'pharmacist']} />}>
            <Route element={<AppLayout />}>
              <Route path={ROUTES.PHARMACIST.DASHBOARD} element={<PharmacistDashboard />} />
              <Route path={ROUTES.PHARMACIST.SCAN_PRESCRIPTION} element={<PharmacistDrugs/>} />
              <Route path={ROUTES.PHARMACIST.DRUG_SEARCH} element={<PlaceholderPage title="Drug Search & Inventory" />} />
              <Route path={ROUTES.PHARMACIST.DRUG_ALTERNATIVES} element={<PlaceholderPage title="Drug Alternatives" />} />
            </Route>
          </Route>

          {/* 👑 مجموعة مسارات الأدمن (Admin) بنفس الـ Layout والـ Styles بالضبط */}
          <Route element={<RoleGuard allowedRoles={['ADMIN', 'admin']} />}>
            <Route element={<AppLayout />}>
              <Route path={ROUTES.ADMIN.DASHBOARD} element={<PlaceholderPage title="Admin Dashboard Overview" />} />
              <Route path={ROUTES.ADMIN.USER_MANAGEMENT} element={<PlaceholderPage title="User Management (التحكم بالمستخدمين)" />} />
              <Route path={ROUTES.ADMIN.DRUG_MANAGEMENT} element={<PlaceholderPage title="Global Drug Management" />} />
              <Route path={ROUTES.ADMIN.SUPPLIER_MANAGEMENT} element={<PlaceholderPage title="Suppliers Verification (الموردين)" />} />
              <Route path={ROUTES.ADMIN.PURCHASE_ORDERS} element={<PlaceholderPage title="Global Purchase Orders Trace" />} />
              <Route path={ROUTES.ADMIN.REPORTS} element={<PlaceholderPage title="System Logs & Analytics Reports" />} />
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
