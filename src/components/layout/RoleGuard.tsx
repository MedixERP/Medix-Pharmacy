// src/components/layout/RoleGuard.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../routes/routes';

interface RoleGuardProps {
  allowedRoles: string[];
}

export default function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { user, isAuthenticated } = useAuth();

  // 1. لو مش عامل تسجيل دخول، حوّليه لصفحة الـ Login
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // 2. تنظيف وتوحيد الرولز لحروف كابيتال منعاً للأخطاء
  const normalizedAllowedRoles = allowedRoles.map(role => role.trim().toUpperCase());
  const userRole = user?.role?.trim().toUpperCase() || '';

  // 3. الحل الذكي: لو الـ Role بتاعته مش مسموح لها تشوف الصفحة دي
  if (user && !normalizedAllowedRoles.includes(userRole)) {
    console.warn(`[RoleGuard] Access Denied. Redirecting User from incorrect route. Role: "${userRole}"`);
    
    // توجيهه تلقائياً للمكان الصح بدل ما السيستم يضرب
    if (userRole === 'PHARMACIST') {
      return <Navigate to={ROUTES.PHARMACIST.DASHBOARD} replace />;
    } else if (userRole === 'SUPPLIER') {
      return <Navigate to={ROUTES.SUPPLIER.DASHBOARD} replace />;
    } else {
      return <Navigate to={ROUTES.LOGIN} replace />;
    }
  }

  // 4. لو كله تمام والـ Role صح، يدخل عادي ويشوف الصفحة
  return <Outlet />;
}