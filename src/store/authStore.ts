// src/store/authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. تعريف شكل بيانات المستخدم (User Interface)
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'PHARMACIST' | 'PATIENT' | 'SUPPLIER'; // الـ Roles اللي عندك في السيستم
}

// 2. تعريف شكل الـ State والـ Actions جوه الـ Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

// 3. إنشاء الـ Store باستخدام Zustand مع خاصية الـ Persist لحفظ الداتا في الـ LocalStorage
export const authStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,

      // أمل أكشن: لما المستخدم يعمل تسجيل دخول بنجاح
      login: (user, token) => 
        set({ 
          user, 
          token, 
          isAuthenticated: true 
        }),

      // ثاني أكشن: لما المستخدم يعمل Log out بنمسح كل حاجة
      logout: () => 
        set({ 
          user: null, 
          token: null, 
          isAuthenticated: false 
        }),
    }),
    {
      name: 'medix-auth-storage', // الاسم اللي السيستم هيسيف بيه الداتا في الـ LocalStorage
    }
  )
);