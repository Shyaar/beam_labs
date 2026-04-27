import { StatusBar } from 'expo-status-bar'
import { Pressable, Text, View, ScrollView, Image, Modal } from 'react-native'
import { useState } from 'react'
import { DiscoveryScreen } from './DiscoveryScreen'
import { useBeamWallet } from '../hooks/useBeamWallet'
import { useUser } from '../context/UserContext'
import {
  MoreHorizontal,
  TrendingUp,
  ScanLine,
  ArrowDown,
  ArrowUp,
  Banknote,
  ArrowUpRight,
  ArrowDownLeft,
  LayoutGrid,
  Image as ImageIcon,
  History,
  Plus,
  Wallet,
  Zap
} from 'lucide-react-native'

function shortenAddress(address: string) {
  if (address.length <= 12) {
    return address
  }
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

function AccountCard({ name, balance, symbol, usdValue, iconColor, iconLabel }:any) {
  return (
    <View className="bg-surface border border-border rounded-[2.5rem] p-6 mb-4 flex-col gap-6">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className={`w-10 h-10 rounded-full items-center justify-center border border-border ${iconColor}`}>
             <Text className="text-white font-bold">{iconLabel}</Text>
          </View>
          <Text className="font-semibold text-white">{name}</Text>
        </View>
        <MoreHorizontal color="#a0a0ab" size={20} />
      </View>
      <View className="flex-col gap-1">
        <Text className="text-3xl font-bold tracking-tight text-white">
          {balance} <Text className="text-xl font-medium text-text-secondary">{symbol}</Text>
        </Text>
        <Text className="text-sm text-text-secondary">{usdValue} USD</Text>
      </View>
    </View>
  )
}

function NFTCard({ name, collection, floorPrice, bgColor }:any) {
  return (
    <View className="bg-surface border border-border rounded-[2.5rem] overflow-hidden mb-4 mr-2 flex-1">
      <View className={`aspect-square w-full items-center justify-center ${bgColor}`} />
      <View className="p-4 flex-col gap-1">
        <Text className="text-[10px] font-bold text-primary uppercase tracking-widest">{collection}</Text>
        <Text className="font-bold text-white truncate">{name}</Text>
        {floorPrice && (
          <View className="flex-row items-center justify-between mt-2 pt-2 border-t border-border">
            <Text className="text-text-secondary font-medium text-[10px]">Floor Price</Text>
            <Text className="font-bold text-white text-[10px]">{floorPrice} SOL</Text>
          </View>
        )}
      </View>
    </View>
  )
}

function ActivityItem({ name, date, amount, type, status }:any) {
  const isSend = type === 'send'
  return (
    <View className="flex-row items-center justify-between py-4 px-4 rounded-2xl">
      <View className="flex-row items-center gap-4">
        <View className={`w-12 h-12 rounded-full items-center justify-center ${isSend ? 'bg-orange-500/20' : 'bg-green-500/20'}`}>
          {isSend ? <ArrowUpRight color="#f97316" size={20} /> : <ArrowDownLeft color="#22c55e" size={20} />}
        </View>
        <View>
          <Text className="font-semibold text-white">{name}</Text>
          <Text className="text-xs text-text-secondary">{date} • {status}</Text>
        </View>
      </View>
      <View className="items-end">
        <Text className={`font-bold ${isSend ? 'text-white' : 'text-primary'}`}>
          {isSend ? '-' : '+'}{amount}
        </Text>
        <Text className="text-xs text-text-secondary">SOL</Text>
      </View>
    </View>
  )
}

export function HomeScreen() {
  const { account, connect, disconnect, connectLabel, isAvailable } = useBeamWallet()
  const { profile } = useUser()
  const [activeTab, setActiveTab] = useState<'tokens' | 'nfts' | 'recent'>('tokens')
  const [showDiscovery, setShowDiscovery] = useState(false)
  
  const firstName = account ? shortenAddress(account) : 'Guest'

  return (
    <ScrollView className="flex-1 bg-background pt-16">
      <View className="flex-col gap-8 pb-32 px-4">
        
        <View className="flex-col gap-2">
          <Text className="text-4xl font-bold tracking-tight text-white">
            Good morning, {profile?.username || firstName}.
          </Text>
          <Text className="text-text-secondary">Your Solana balances are looking healthy today.</Text>
        </View>

        {/* Wallet Info Status Card */}
        {account && (
          <View className="flex-row items-center justify-between bg-surface-hover/30 border border-border px-5 py-4 rounded-3xl mb-[-16px]">
            <View className="flex-row items-center gap-4">
              <View className="w-10 h-10 rounded-2xl bg-primary/10 items-center justify-center border border-primary/20">
                <Wallet color="#9fe870" size={20} />
              </View>
              <View>
                <Text className="text-[10px] font-black text-text-secondary uppercase tracking-widest">Network</Text>
                <Text className="text-white font-bold">Solana Devnet</Text>
              </View>
            </View>
            <View className="bg-primary/20 border border-primary/30 px-3 py-1 rounded-lg">
              <Text className="text-primary font-bold text-[10px] uppercase">Solflare Active</Text>
            </View>
          </View>
        )}

        {/* Total Balance Card */}
        <View className="bg-surface border border-border rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
          <View className="flex-col items-center text-center gap-8 z-10 relative">
            
            <View className="flex-col items-center gap-1">
              <Text className="text-text-secondary font-bold uppercase tracking-widest text-[10px]">Total Balance</Text>
              <Text className="text-5xl font-extrabold tracking-tight text-white">$7,495.12</Text>
              <View className="flex-row items-center justify-center gap-2">
                <TrendingUp color="#9fe870" size={16} />
                <Text className="text-primary font-bold text-sm">+2.45% today</Text>
              </View>
            </View>

            <View className="flex-row justify-between w-full mt-4">
              <View className="items-center gap-2">
                <View className="w-14 h-14 rounded-full bg-primary/20 items-center justify-center">
                  <ArrowDown color="#9fe870" size={24} />
                </View>
                <Text className="text-xs font-bold text-text-secondary">Deposit</Text>
              </View>
              
              <Pressable 
                onPress={() => setShowDiscovery(true)}
                className="items-center gap-2"
              >
                <View className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 items-center justify-center relative overflow-hidden">
                  <Image 
                    source={require('../../assets/logos/dark.png')} 
                    style={{ width: 28, height: 28 }}
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-xs font-bold text-white uppercase tracking-wider">Beam</Text>
              </Pressable>

              <View className="items-center gap-2">
                <View className="w-14 h-14 rounded-full bg-surface-hover border border-border items-center justify-center">
                  <Banknote color="#a0a0ab" size={24} />
                </View>
                <Text className="text-xs font-bold text-text-secondary">Withdraw</Text>
              </View>

              <View className="items-center gap-2">
                <View className="w-14 h-14 rounded-full bg-surface-hover border border-border items-center justify-center">
                  <ArrowUp color="#a0a0ab" size={24} />
                </View>
                <Text className="text-xs font-bold text-text-secondary">Send</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Connect Button Injection inside content if needed, or simply let it float */}
        <Pressable 
            onPress={account ? disconnect : connect} 
            className="bg-surface opacity-90 border border-border py-4 px-6 rounded-2xl items-center"
        >
            <Text className="text-white font-bold">{account ? 'Disconnect Wallet' : connectLabel}</Text>
        </Pressable>

        {/* Tab Control */}
        <View className="border-b border-border flex-row">
          <Pressable onPress={() => setActiveTab('tokens')} className={`flex-1 py-4 items-center flex-row justify-center gap-2 border-b-2 ${activeTab === 'tokens' ? 'border-primary' : 'border-transparent'}`}>
            <LayoutGrid color={activeTab === 'tokens' ? '#9fe870' : '#a0a0ab'} size={16} />
            <Text className={`font-bold ${activeTab === 'tokens' ? 'text-primary' : 'text-text-secondary'}`}>Tokens</Text>
          </Pressable>
          <Pressable onPress={() => setActiveTab('nfts')} className={`flex-1 py-4 items-center flex-row justify-center gap-2 border-b-2 ${activeTab === 'nfts' ? 'border-primary' : 'border-transparent'}`}>
            <ImageIcon color={activeTab === 'nfts' ? '#9fe870' : '#a0a0ab'} size={16} />
            <Text className={`font-bold ${activeTab === 'nfts' ? 'text-primary' : 'text-text-secondary'}`}>NFTs</Text>
          </Pressable>
          <Pressable onPress={() => setActiveTab('recent')} className={`flex-1 py-4 items-center flex-row justify-center gap-2 border-b-2 ${activeTab === 'recent' ? 'border-primary' : 'border-transparent'}`}>
            <History color={activeTab === 'recent' ? '#9fe870' : '#a0a0ab'} size={16} />
            <Text className={`font-bold ${activeTab === 'recent' ? 'text-primary' : 'text-text-secondary'}`}>Recent</Text>
          </Pressable>
        </View>

        {/* Content Area */}
        <View className="min-h-[400px]">
          {activeTab === 'tokens' && (
            <View>
              <AccountCard name="Solana" balance="42.68" symbol="SOL" usdValue="6,245.12" iconColor="bg-solana" />
              <AccountCard name="USD Coin" balance="1,250.00" symbol="USDC" usdValue="1,250.00" iconColor="bg-blue-500" iconLabel="S" />
              <View className="bg-transparent border-dashed border-2 border-border rounded-[2.5rem] items-center justify-center p-8 min-h-[160px]">
                <View className="w-10 h-10 rounded-full border border-text-secondary items-center justify-center mb-2">
                  <Plus color="#a0a0ab" size={20} />
                </View>
                <Text className="font-semibold text-text-secondary">Add currency</Text>
              </View>
            </View>
          )}

          {activeTab === 'nfts' && (
            <View className="flex-row flex-wrap justify-between">
              <View className="w-[48%]">
                <NFTCard name="Beam Pass #001" collection="Beam Exclusives" bgColor="bg-primary" floorPrice="5.5" />
                <NFTCard name="Solar Flare" collection="Hyperion" bgColor="bg-orange-500" floorPrice="12.2" />
              </View>
              <View className="w-[48%]">
                <NFTCard name="Cyber Monk" collection="Neon Nights" bgColor="bg-blue-500" floorPrice="4.8" />
                <NFTCard name="Glimmer #42" collection="Luminous" bgColor="bg-teal-400" floorPrice="8.9" />
              </View>
            </View>
          )}

          {activeTab === 'recent' && (
            <View className="bg-surface border border-border rounded-[2.5rem] p-2 flex-col">
              <ActivityItem name="Abhishek (Superteam)" date="21 Apr" amount="2.50" type="receive" status="Confirmed" />
              <ActivityItem name="Conference Merchant" date="20 Apr" amount="0.15" type="send" status="Confirmed" />
              <ActivityItem name="Solana Name Service" date="19 Apr" amount="0.05" type="send" status="Confirmed" />
              <ActivityItem name="Raydium Swap" date="18 Apr" amount="12.00" type="send" status="Confirmed" />
              <ActivityItem name="Jupiter Swap" date="17 Apr" amount="4.20" type="receive" status="Confirmed" />
            </View>
          )}
        </View>

      </View>
      <Modal
        visible={showDiscovery}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <DiscoveryScreen onBack={() => setShowDiscovery(false)} />
      </Modal>

      <StatusBar style="light" />
    </ScrollView>
  )
}
