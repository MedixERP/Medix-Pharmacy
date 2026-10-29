// src/store/searchStore.ts
import { create } from 'zustand';

interface SearchState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearch: () => void;
}

// 🚀 اتأكدي إن الاسم هنا useSearchStore بالظبط لتطابق الاستدعاء في الـ Navbar
export const useSearchStore = create<SearchState>((set) => ({
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  clearSearch: () => set({ searchQuery: '' }),
}));