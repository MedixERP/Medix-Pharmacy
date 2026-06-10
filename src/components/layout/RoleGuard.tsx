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

  // 2. لو الـ Role بتاعته مش مسموح لها تشوف الصفحة دي، واديه لصفحة الـ Unauthorized أو الـ NotFound
  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/not-found" replace />;
  }

  // 3. لو كله تمام والـ Role صح، خليه يدخل عادي ويشوف الصفحة الداخيلة (Outlet)
  return <Outlet />;
}