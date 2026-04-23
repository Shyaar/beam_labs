import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserProfile {
  username: string;
  avatar: string;
}

interface UserContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
  isLoading: boolean;
  clearProfile: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [isConnected, setIsConnectedState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load profile and connection from localStorage on mount
    const savedProfile = localStorage.getItem('beam_profile');
    const savedConnection = localStorage.getItem('beam_connected');
    
    if (savedProfile) {
      try {
        setProfileState(JSON.parse(savedProfile));
      } catch (e) {
        console.error('Failed to parse saved profile', e);
      }
    }
    
    if (savedConnection === 'true') {
      setIsConnectedState(true);
    }
    
    setIsLoading(false);
  }, []);

  const setProfile = (newProfile: UserProfile) => {
    setProfileState(newProfile);
    localStorage.setItem('beam_profile', JSON.stringify(newProfile));
  };

  const setIsConnected = (connected: boolean) => {
    setIsConnectedState(connected);
    localStorage.setItem('beam_connected', connected ? 'true' : 'false');
  };

  const clearProfile = () => {
    setProfileState(null);
    setIsConnectedState(false);
    localStorage.removeItem('beam_profile');
    localStorage.removeItem('beam_connected');
  };

  return (
    <UserContext.Provider value={{ 
      profile, 
      setProfile, 
      isConnected, 
      setIsConnected, 
      isLoading, 
      clearProfile 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
