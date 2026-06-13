export const ROUTES = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  UNAUTHORIZED: '/unauthorized',

  // Admin Role Controls
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USER_MANAGEMENT: '/admin/users',
    DRUG_MANAGEMENT: '/admin/drugs',
    SUPPLIER_MANAGEMENT: '/admin/suppliers',
    PURCHASE_ORDERS: '/admin/orders',
    EXPIRY_TRACKING: '/admin/expiry',
    CUSTOMER_MANAGEMENT: '/admin/customers',
    REPORTS: '/admin/reports',
    INVENTORY: '/admin/inventory',
  },

  // Pharmacist Role Controls
  PHARMACIST: {
    DASHBOARD: '/pharmacist/dashboard',
    SCAN_PRESCRIPTION: '/pharmacist/scan',
    DRUG_SEARCH: '/pharmacist/search',
    DRUG_ALTERNATIVES: '/pharmacist/alternatives',
    DRUG_INTERACTIONS: '/pharmacist/interactions',
    PATIENT_PROFILE: '/pharmacist/patient',
  },

  // Supplier Role Controls
  SUPPLIER: {
    DASHBOARD: '/supplier/dashboard',
    INCOMING_ORDERS: '/supplier/orders',
  
  },

  // Patient Role Controls
  PATIENT: {
    PROFILE: '/patient/profile',
    PRESCRIPTION_HISTORY: '/patient/history',
    CHRONIC_MEDS: '/patient/chronic',
  }
};