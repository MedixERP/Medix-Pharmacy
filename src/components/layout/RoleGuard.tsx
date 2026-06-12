// src/components/layout/RoleGuard.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth'; // الـ hook بتاعك

interface RoleGuardProps {
  allowedRoles: string[];
}

export default function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { user, isAuthenticated } = useAuth();

  // 1. لو مش عامل تسجيل دخول أصلاً، ابعته لصفحة الـ Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. تحويل الأدوار المسموحة والحالية لحروف كبيرة مع مسح أي مسافات زائدة لمنع خطأ الـ Not Found
  const normalizedAllowedRoles = allowedRoles.map(role => role.trim().toUpperCase());
  const userRole = user?.role?.trim().toUpperCase() || '';

  // 3. لو الـ Role بتاعته مش مسموح لها تشوف الصفحة دي، واديه لصفحة الـ NotFound
  if (user && !normalizedAllowedRoles.includes(userRole)) {
    console.warn(`[RoleGuard] Access Denied. User role: "${userRole}" is not in:`, normalizedAllowedRoles);
    return <Navigate to="/not-found" replace />;
  }

  // 4. لو كله تمام والـ Role صح، خليه يدخل عادي ويشوف الصفحة الداخيلة (Outlet)
  return <Outlet />;
}