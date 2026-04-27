import { Platform } from 'react-native'

type BeamWalletState = {
  account: string | null
  connect: () => Promise<void> | void
  disconnect: () => Promise<void> | void
  signTransaction?: (transaction: any) => Promise<any>
  signAllTransactions?: (transactions: any[]) => Promise<any[]>
  connectLabel: string
  helperText: string
  isAvailable: boolean
  discoveredWallets: any[]
  isAuthenticated: boolean
}

export function useBeamWallet(): BeamWalletState {
  if (Platform.OS === 'web') {
    const { useBeamWallet: useWebBeamWallet } = require('./useBeamWallet.web') as {
      useBeamWallet: () => BeamWalletState
    }

    return useWebBeamWallet()
  }

  const { useBeamWallet: useNativeBeamWallet } = require('./useBeamWallet.native') as {
    useBeamWallet: () => BeamWalletState
  }

  return useNativeBeamWallet()
}
