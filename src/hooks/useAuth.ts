// src/hooks/useAuth.ts
import { authStore } from '../store/authStore'; // اتأكدي من اسم التصدير عندك في الـ store

export default function useAuth() {
  // بنجيب البيانات من الـ store بتاعك مباشرة
  const user = authStore((state) => state.user);
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const login = authStore((state) => state.login);
  const logout = authStore((state) => state.logout);

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
}