import { useMobileWallet } from '@wallet-ui/react-native-kit'

export function useBeamWallet() {
  const { account, connect, disconnect, signTransaction } = useMobileWallet()

  return {
    account: account?.address.toString() ?? null,
    connect,
    disconnect,
    signTransaction,
    signAllTransactions: undefined, // Mobile kit may not support batch signing yet
    connectLabel: 'Connect Mobile Wallet',
    helperText: 'Open your mobile wallet connection flow in the native development build.',
    isAvailable: true,
    discoveredWallets: [],
    isAuthenticated: !!account,
  }
}
