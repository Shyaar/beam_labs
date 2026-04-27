import '../global.css';

import { Slot } from 'expo-router';
import {
  DynamicContextProvider,
} from '@dynamic-labs/sdk-react-core';
import { SolanaWalletConnectors } from '@dynamic-labs/solana';

import { UserProvider } from '../context/UserContext';

export default function Layout() {
  return (
    <UserProvider>
      <DynamicContextProvider
        settings={{
          environmentId: 'adf9d599-5cb7-41a5-9227-f3f3ac327cad',
          walletConnectors: [SolanaWalletConnectors],
        }}
      >
        <Slot />
      </DynamicContextProvider>
    </UserProvider>
  );
}
