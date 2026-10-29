import React, { Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import RolesOverview from './components/RolesOverview';
import Footer from './components/Footer';

// Lazy loading for heavy sections to boost initial load performance
const TimelineSlider = lazy(() => import('./components/TimelineSlider'));
const AICapabilities = lazy(() => import('./components/AICapabilities'));
const FAQ = lazy(() => import('./components/FAQ'));

const FallbackLoader = () => (
  <div className="w-full h-96 flex items-center justify-center bg-slate-950">
    <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin"></div>
  </div>
);

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      <Navbar />
      
      <main className="flex flex-col">
        <Hero />
        <Stats />
        <RolesOverview />
        
        <Suspense fallback={<FallbackLoader />}>
          <TimelineSlider />
        </Suspense>

        <Suspense fallback={<FallbackLoader />}>
          <AICapabilities />
        </Suspense>

        <Suspense fallback={<FallbackLoader />}>
          <FAQ />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;