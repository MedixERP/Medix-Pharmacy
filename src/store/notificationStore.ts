// src/store/notificationStore.ts
import { create } from 'zustand';

export interface NotificationItem {
  id: number;
  type: string;
  title: string;
  desc: string;
  time: string;
  unread: boolean;
  actionLabel?: string;
  icon: string;
  color: string;
}

interface NotificationState {
  notifications: NotificationItem[];
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [
    { id: 1, type: 'order_new', title: 'New Order Received', desc: 'Smart Pharmacy ordered 24 items Order #PO-2026-008 • 4,500 EGP', time: '30 min ago', unread: true, actionLabel: 'Accept Order', icon: '🔔', color: 'border-l-emerald-500' },
    { id: 2, type: 'order_shipping', title: 'Order Needs Shipping', desc: 'Order #PO-2026-006 confirmed. Ready to ship to MediCare Pharmacy', time: '2 hours ago', unread: true, actionLabel: 'Ship Now', icon: '📦', color: 'border-l-blue-500' },
    { id: 3, type: 'order_delivered', title: 'Order Delivered', desc: 'Order #PO-2026-004 delivered to City Health Pharmacy', time: '1 day ago', unread: false, actionLabel: 'View Receipt', icon: '✅', color: 'border-l-indigo-500' },
    { id: 4, type: 'system', title: 'System Announcement', desc: 'New feature: Real-time tracking now available for all orders', time: '3 days ago', unread: false, icon: '⚙️', color: 'border-l-slate-400' },
  ],
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, unread: false } : n)
  })),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, unread: false }))
  })),
}));