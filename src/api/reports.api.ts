// src/api/reports.api.ts
import axios from 'axios';

const BASE_URL = 'http://medixpharmacy.runasp.net/api';

export const reportsApi = {
  /**
   * 📊 جلب بيانات ملخص لوحة تحكم المورد أونلاين
   */
  getDashboardSummary: async () => {
    const response = await axios.get(`${BASE_URL}/dashboard/summary`);
    return response.data; // بيرجع الكروت والجدول الحقيقي
  }
};