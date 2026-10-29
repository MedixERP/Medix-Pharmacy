// src/components/shared/SEOHead.tsx
import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description?: string;
}

export default function SEOHead({ title, description }: SEOHeadProps) {
  useEffect(() => {
    document.title = `${title} | PharmaDash Supplier`;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description || 'Smart Pharmacy Management System - Supplier Dashboard Backend');
  }, [title, description]);

  return null;
}