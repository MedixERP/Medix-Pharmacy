// src/components/layout/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();

  // لو المستخدم مش عامل Login، بنرجعه لصفحة الـ login فوراً
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // لو مسجل دخول، بنخليه يكمل ويشوف الـ Layout والصفحات عادي
  return <Outlet />;
}