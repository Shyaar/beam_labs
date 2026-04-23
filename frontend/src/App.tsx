import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { AppLayout } from './AppLayout';
import { Dashboard } from './Dashboard';
import { SplashScreen } from './components/onboarding/SplashScreen';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { useUser } from './context/UserContext';

function AppContent() {
  const [showSplash, setShowSplash] = useState(true);
  const [isBeaming, setIsBeaming] = useState(false);
  const { isConnected, profile, isLoading } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2800); // Cinematic duration
    return () => clearTimeout(timer);
  }, []);

  if (showSplash || isLoading) {
    return (
      <AnimatePresence>
        {showSplash && <SplashScreen />}
      </AnimatePresence>
    );
  }

  // Simplified auth wall checking mock isConnected and profile
  if (!isConnected || !profile) {
    return (
      <AnimatePresence mode="wait">
        <OnboardingFlow key="onboarding" />
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isBeaming ? (
        <div key="beaming">
          {/* ProximityFlow will be injected here */}
          <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center text-white p-6">
            <div className="text-center flex flex-col gap-4">
              <div className="w-20 h-20 bg-primary/20 rounded-full animate-pulse mx-auto flex items-center justify-center">
                <div className="w-10 h-10 bg-primary rounded-full" />
              </div>
              <h2 className="text-2xl font-bold">Proximity Pairing...</h2>
              <p className="text-text-secondary italic">Building the cinematic experience</p>
              <button 
                onClick={() => setIsBeaming(false)}
                className="mt-8 px-6 py-2 border border-border rounded-full hover:bg-surface transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <AppLayout key="dashboard">
          <Dashboard onBeam={() => setIsBeaming(true)} />
        </AppLayout>
      )}
    </AnimatePresence>
  );
}

function App() {
  return (
    <AppContent />
  );
}

export default App;
