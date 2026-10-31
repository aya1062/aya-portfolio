import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { TechGrid } from '../ui/TechGrid';
import { AuroraGlow } from '../ui/AuroraGlow';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-[#070D12] text-brand-text flex flex-col justify-between selection:bg-brand-cyan/20 selection:text-brand-cyan">
      {/* Background Architectural Grid */}
      <TechGrid withVignette withCrosshairs />

      {/* Global Ambient Aurora Lighting */}
      <AuroraGlow
        variant="composite"
        size="xl"
        intensity="subtle"
        className="top-0 left-1/2 -translate-x-1/2 pointer-events-none"
      />

      {/* Sticky Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-20">
        {children || <Outlet />}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
