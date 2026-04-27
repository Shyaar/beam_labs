import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView, Image } from 'react-native';
import { 
  User, 
  Wallet, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Zap,
  Radio,
  ShieldCheck
} from 'lucide-react-native';
import { PinPad } from '../common/PinPad';
import { useUser } from '../../context/UserContext';
import { useBeamWallet } from '../../hooks/useBeamWallet';
import { Connection, PublicKey } from '@solana/web3.js';
import * as anchor from '@coral-xyz/anchor';
import { getBeamProgram, getUserAccountPDA } from '../../lib/anchor';

const AVATARS = [
  { id: '1', color: 'bg-orange-500', icon: '🦊' },
  { id: '2', color: 'bg-green-500', icon: '🧠' },
  { id: '3', color: 'bg-blue-500', icon: '💎' },
  { id: '4', color: 'bg-purple-500', icon: '👾' },
  { id: '5', color: 'bg-pink-500', icon: '🍭' },
  { id: '6', color: 'bg-yellow-500', icon: '⚡' },
];


export const OnboardingFlow: React.FC = () => {
  const { isConnected, setIsConnected, setProfile, fetchProfileFromChain } = useUser();
  const { connect, account, isAuthenticated } = useBeamWallet();
  
  const [step, setStep] = useState(isConnected ? 2 : 1);
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);
  const [userPin, setUserPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-advance logic: If user authenticates via Social/Email, move to Step 2
  React.useEffect(() => {
    if (isAuthenticated && step === 1) {
      setStep(2);
      // Optional: Check if they already have an on-chain profile
      // if (account) fetchProfileFromChain(connection, new PublicKey(account));
    }
  }, [isAuthenticated, step]);

  const handleFinish = async (pin?: string) => {
    if (!username.trim()) return;
    
    setIsLoading(true);
    try {
      // Save PIN first
      if (pin) {
        // We will store this in the profile later
      }
      if (account) {
        console.log("Registering on chain...");
        const connection = new Connection("https://api.devnet.solana.com", "confirmed");
        
        // Use the signing methods from our hook
        const { signTransaction, signAllTransactions } = useBeamWallet();
        
        if (signTransaction && signAllTransactions) {
          const wallet = {
            publicKey: new PublicKey(account),
            signTransaction: signTransaction as any,
            signAllTransactions: signAllTransactions as any,
          };
          
          const program = getBeamProgram(connection, wallet);
          const [pda] = getUserAccountPDA(new PublicKey(account));
          
          await program.methods.register(username.trim(), selectedAvatar.id)
            .accounts({
              userAccount: pda,
              owner: new PublicKey(account),
              systemProgram: anchor.web3.SystemProgram.programId,
            })
            .rpc();
            
          console.log("Successfully registered on-chain!");
          
          const accountData = await (program.account as any).userAccount.fetch(pda);
      
          if (accountData) {
            const foundProfile = {
              username: accountData.username as string,
              avatar: accountData.avatarUrl as string, // Matching updated IDL
            };
            setProfile(foundProfile);
          }
        } else {
          console.warn("Wallet signing methods missing, falling back to simulation.");
          await new Promise(resolve => setTimeout(resolve, 1500));
          setProfile({
            username: username.trim(),
            avatar: selectedAvatar.id
          });
        }
      }
    } catch (e) {
      console.error("Registration failed", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background items-center justify-center p-6">
      <View className="w-full">
        {step === 1 && (
          <View className="flex-col items-center text-center gap-8">
            <View className="w-32 h-32 items-center justify-center relative">
               <View className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-25" />
               <Image 
                source={require('../../../assets/logos/dark.png')} 
                style={{ width: 100, height: 100 }}
                resizeMode="contain"
               />
            </View>
            <View className="flex-col gap-3 items-center">
              <Text className="text-3xl font-extrabold tracking-tight text-white">Choice of wallet</Text>
              <Text className="text-text-secondary font-medium text-center">Select a wallet to continue your Beam experience.</Text>
            </View>
            
            <View className="flex-col gap-6 w-full items-center">
              <Pressable 
                onPress={() => connect()}
                className="w-full bg-primary rounded-full py-5 items-center justify-center shadow-2xl"
              >
                <Text className="text-black font-bold text-xl">Sign In or Create Wallet</Text>
              </Pressable>
              
              <View className="flex-row items-center gap-4 w-full px-4">
                <View className="flex-1 h-px bg-border" />
                <Text className="text-text-secondary text-xs font-bold uppercase tracking-widest">Protected by BEAM Vault</Text>
                <View className="flex-1 h-px bg-border" />
              </View>

              <Text className="text-xs text-text-secondary text-center px-6 leading-5">
                New to Solana? No problem. Use your Email, Google, or Apple ID to create your secure BEAM wallet in seconds.
              </Text>
            </View>
          </View>
        )}

        {step === 2 && (
          <View className="flex-col gap-8">
            <View className="flex-col gap-2">
              <Text className="text-3xl font-extrabold tracking-tight text-white">Create your ID</Text>
              <Text className="text-text-secondary font-medium">This is how people will see you when Beaming.</Text>
            </View>

            <View className="flex-col gap-6">
              <View className="flex-col gap-2">
                <Text className="text-xs font-bold text-text-secondary uppercase tracking-widest px-1">Your Username</Text>
                <View className="relative">
                  <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                    <User color="#a0a0ab" size={20} />
                  </View>
                  <TextInput 
                    value={username}
                    onChangeText={setUsername}
                    placeholder="e.g. solana_king"
                    placeholderTextColor="#a0a0ab"
                    className="w-full bg-surface border border-border rounded-2xl py-4 pl-12 pr-4 text-lg font-semibold text-white focus:border-primary"
                  />
                </View>
              </View>

              <View className="flex-col gap-4">
                <Text className="text-xs font-bold text-text-secondary uppercase tracking-widest px-1">Choose an Avatar</Text>
                <View className="flex-row flex-wrap gap-4 justify-between">
                  {AVATARS.map((avatar) => (
                    <Pressable
                      key={avatar.id}
                      onPress={() => setSelectedAvatar(avatar)}
                      className={`w-[30%] aspect-square rounded-3xl items-center justify-center relative ${
                        selectedAvatar.id === avatar.id 
                          ? 'ring-4 ring-primary border-4 border-primary scale-95 shadow-2xl' 
                          : 'bg-surface border border-border opacity-70'
                      } ${avatar.color}`}
                    >
                      <Text className="text-3xl">{avatar.icon}</Text>
                      {selectedAvatar.id === avatar.id && (
                        <View className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full items-center justify-center border-4 border-background">
                          <Check color="#000" size={16} strokeWidth={3} />
                        </View>
                      )}
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>

            <View className="flex-row items-center gap-4 pt-4">
              <Pressable 
                onPress={() => setStep(1)}
                className="w-14 h-14 rounded-2xl border border-border items-center justify-center"
              >
                <ChevronLeft color="#a0a0ab" size={24} />
              </Pressable>
              <Pressable 
                disabled={!username.trim() || isLoading}
                onPress={() => setStep(3)}
                className={`flex-1 bg-primary rounded-full py-4 items-center justify-center flex-row gap-2 shadow-xl ${(!username.trim() || isLoading) ? 'opacity-50' : ''}`}
              >
                <Text className="text-black text-lg font-bold">
                  Secure Account
                </Text>
                <ChevronRight color="#000" size={20} />
              </Pressable>
            </View>
          </View>
        )}

        {step === 3 && (
          <PinPad 
            title="Secure your Beam"
            subtitle="Set a 4-digit PIN to protect your profile and history."
            onComplete={(pin) => {
              setUserPin(pin);
              handleFinish(pin);
            }}
            onBack={() => setStep(2)}
          />
        )}
      </View>
    </View>
  );
};
