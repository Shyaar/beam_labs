import '../global.css'

import { Slot } from 'expo-router'
import { AppIdentity, createSolanaDevnet, MobileWalletProvider } from '@wallet-ui/react-native-kit'

import { UserProvider } from '../context/UserContext'

const cluster = createSolanaDevnet()
const identity: AppIdentity = { 
  name: 'BEAM',
  uri: 'https://beam-labs.app',
  icon: 'https://raw.githubusercontent.com/Shyaar/beam_labs/main/mobile/beam_mobile/og-image.png'
}

export default function Layout() {
  return (
    <UserProvider>
      <MobileWalletProvider cluster={cluster} identity={identity}>
        <Slot />
      </MobileWalletProvider>
    </UserProvider>
  )
}
