import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Connection, PublicKey, SystemProgram } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import { getBeamProgram, getUserAccountPDA } from '../lib/anchor';

interface UserProfile {
  username: string;
  avatar: string;
  pin?: string; // Hashed or plain (for local dev)
}

interface UserContextType {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => Promise<void>;
  registerOnChain: (connection: Connection, wallet: any, username: string, avatar: string) => Promise<void>;
  fetchProfileFromChain: (connection: Connection, publicKey: PublicKey) => Promise<UserProfile | null>;
  isConnected: boolean;
  setIsConnected: (connected: boolean) => void;
  setPin: (pin: string) => Promise<void>;
  verifyPin: (pin: string) => boolean;
  isLocked: boolean;
  setIsLocked: (locked: boolean) => void;
  clearProfile: () => Promise<void>;
  isLoaded: boolean;
  isRegistering: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [isConnected, setIsConnectedState] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem('@beam_profile');
        if (savedProfile) {
          setProfileState(JSON.parse(savedProfile));
          setIsConnectedState(true);
        }
      } catch (e) {
        console.error('Failed to load profile', e);
      } finally {
        setIsLoaded(true);
      }
    };
    loadData();
  }, []);

  const setProfile = async (newProfile: UserProfile) => {
    setProfileState(newProfile);
    try {
      await AsyncStorage.setItem('@beam_profile', JSON.stringify(newProfile));
    } catch (e) {
      console.error('Failed to save profile', e);
    }
  };

  const registerOnChain = async (connection: Connection, wallet: any, username: string, avatar: string) => {
    if (!wallet.publicKey) throw new Error("Wallet not connected");
    
    setIsRegistering(true);
    try {
      const program = getBeamProgram(connection, wallet);
      const [userPDA] = getUserAccountPDA(wallet.publicKey);

      console.log("Registering on-chain:", username, avatar);
      
      const tx = await program.methods
        .register(username, avatar)
        .accounts({
          userAccount: userPDA,
          owner: wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("On-chain registration successful! TX:", tx);
      
      const newProfile = { username, avatar };
      await setProfile(newProfile);
      setIsConnectedState(true);
    } catch (e) {
      console.error('On-chain registration failed', e);
      throw e;
    } finally {
      setIsRegistering(false);
    }
  };

  const fetchProfileFromChain = async (connection: Connection, publicKey: PublicKey) => {
    try {
      // Create a dummy wallet for read-only access
      const dummyWallet = { publicKey: publicKey, signTransaction: () => {}, signAllTransactions: () => {} };
      const program = getBeamProgram(connection, dummyWallet);
      const [userPDA] = getUserAccountPDA(publicKey);

      console.log("Fetching profile from chain for:", publicKey.toString());
      const accountData = await (program.account as any).userAccount.fetch(userPDA);
      
      if (accountData) {
        const foundProfile = {
          username: accountData.username as string,
          avatar: accountData.avatarId as string, // Note: IDL uses avatarId from my previous update
        };
        await setProfile(foundProfile);
        setIsConnectedState(true);
        return foundProfile;
      }
      return null;
    } catch (e) {
      console.log("No on-chain profile found for this wallet.");
      return null;
    }
  };

  const setIsConnected = (connected: boolean) => {
    setIsConnectedState(connected);
  };

  const clearProfile = async () => {
    setProfileState(null);
    setIsConnectedState(false);
    try {
      await AsyncStorage.removeItem('@beam_profile');
    } catch (e) {
      console.error('Failed to clear profile', e);
    }
  };

  const [isLocked, setIsLocked] = useState(false);

  const setPin = async (pin: string) => {
    if (profile) {
      const updatedProfile = { ...profile, pin };
      await setProfile(updatedProfile);
    }
  };

  const verifyPin = (inputPin: string) => {
    return profile?.pin === inputPin;
  };

  return (
    <UserContext.Provider value={{ 
      profile, 
      setProfile, 
      registerOnChain,
      fetchProfileFromChain,
      isConnected, 
      setIsConnected, 
      setPin,
      verifyPin,
      isLocked,
      setIsLocked,
      clearProfile,
      isLoaded,
      isRegistering
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
