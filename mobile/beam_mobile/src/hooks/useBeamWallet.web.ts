import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useMemo } from 'react';

export function useBeamWallet() {
  const { 
    user, 
    primaryWallet, 
    handleLogOut, 
    setShowAuthFlow,
    isAuthenticated
  } = useDynamicContext();

  const account = useMemo(() => {
    return primaryWallet?.address || null;
  }, [primaryWallet]);

  const signTransaction = async (transaction: any) => {
    if (!primaryWallet || !primaryWallet.connector || !('signTransaction' in primaryWallet.connector)) {
      throw new Error("Wallet not connected or does not support signing");
    }
    return (primaryWallet.connector as any).signTransaction(transaction);
  };

  const signAllTransactions = async (transactions: any[]) => {
    if (!primaryWallet || !primaryWallet.connector || !('signAllTransactions' in primaryWallet.connector)) {
      throw new Error("Wallet not connected or does not support mult-signing");
    }
    return (primaryWallet.connector as any).signAllTransactions(transactions);
  };

  return {
    account,
    user,
    isAuthenticated,
    connect: () => setShowAuthFlow(true),
    disconnect: async () => {
      await handleLogOut();
    },
    signTransaction,
    signAllTransactions,
    connectLabel: isAuthenticated ? 'Connected' : 'Sign In',
    helperText: 'Sign in with Email or Socials.',
    isAvailable: true,
    discoveredWallets: [], // Dynamic handles discovery internally in its modal
  };
}
