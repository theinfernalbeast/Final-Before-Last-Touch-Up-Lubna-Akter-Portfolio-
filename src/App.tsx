import React, { useState, lazy, Suspense } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { AdminDashboard } from './components/AdminDashboard';
import { PasswordModal } from './components/PasswordModal';
import { ThreeBackgroundCanvas } from './components/ThreeBackgroundCanvas';
import { Navbar } from './components/Navbar';
import { ScrollSection3D } from './components/ScrollSection3D';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { FloatingControls } from './components/FloatingControls';
import { Sparkles } from 'lucide-react';

const HeroSection = lazy(() => import('./components/HeroSection').then(m => ({ default: m.HeroSection })));
const ResearchSection = lazy(() => import('./components/ResearchSection').then(m => ({ default: m.ResearchSection })));
const CompetenciesSection = lazy(() => import('./components/CompetenciesSection').then(m => ({ default: m.CompetenciesSection })));
const ExperienceSection = lazy(() => import('./components/ExperienceSection').then(m => ({ default: m.ExperienceSection })));
const EducationSection = lazy(() => import('./components/EducationSection').then(m => ({ default: m.EducationSection })));
const LanguageSection = lazy(() => import('./components/LanguageSection').then(m => ({ default: m.LanguageSection })));
const AboutSection = lazy(() => import('./components/AboutSection').then(m => ({ default: m.AboutSection })));
const ContactSection = lazy(() => import('./components/ContactSection').then(m => ({ default: m.ContactSection })));

function PortfolioApp() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { isClinical } = useTheme();

  return (
    <div
      className={`relative min-h-screen transition-colors duration-300 overflow-x-hidden ${
        isClinical
          ? 'bg-slate-50 text-slate-900 selection:bg-purple-600 selection:text-white'
          : 'bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white'
      }`}
    >
      {/* 3D Ambient Background Canvas - consistent real-time physics in both themes */}
      <ThreeBackgroundCanvas />

      {/* Fixed Top Navigation Bar with Theme Switcher and Mobile Dropdown */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Flow with Code-Splitting Suspense & 3D IntersectionObserver scroll entrance animations */}
      <main className="relative z-10">
        <Suspense
          fallback={
            <div className="py-24 flex items-center justify-center">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-mono animate-pulse">
                <Sparkles className="w-4 h-4 text-purple-400 animate-spin" />
                <span>Loading section...</span>
              </div>
            </div>
          }
        >
          <ScrollSection3D>
            <HeroSection />
          </ScrollSection3D>

          <ScrollSection3D>
            <ResearchSection />
          </ScrollSection3D>

          <ScrollSection3D>
            <CompetenciesSection />
          </ScrollSection3D>

          <ScrollSection3D>
            <ExperienceSection />
          </ScrollSection3D>

          <ScrollSection3D>
            <EducationSection />
          </ScrollSection3D>

          <ScrollSection3D>
            <LanguageSection />
          </ScrollSection3D>

          <ScrollSection3D>
            <AboutSection />
          </ScrollSection3D>

          <ScrollSection3D>
            <ContactSection onOpenResume={() => setIsResumeOpen(true)} />
          </ScrollSection3D>
        </Suspense>
      </main>

      {/* Footer with social channels, contact methods, and centered Lubna Akter Portfolio */}
      <Footer />

      {/* Floating Controls: Edit Dashboard Trigger Button on top & Go-To-Top arrow right below it */}
      <FloatingControls
        onOpenDashboard={() => setIsPasswordModalOpen(true)}
      />

      {/* Interactive Full CV Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Password Authentication Modal */}
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={() => {
          setIsPasswordModalOpen(false);
          setIsAdminOpen(true);
        }}
      />

      {/* Admin Content & Image Editing Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PortfolioProvider>
          <PortfolioApp />
        </PortfolioProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
