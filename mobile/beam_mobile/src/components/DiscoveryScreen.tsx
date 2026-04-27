import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Animated, Pressable, Image, Dimensions } from 'react-native';
import { ChevronLeft, Target, ShieldCheck, Zap } from 'lucide-react-native';
import { useUser } from '../context/UserContext';

const { width } = Dimensions.get('window');

const MOCK_NEIGHBORS = [
  { id: '1', username: 'SolanaKing', avatar: '🦊', distance: '3m', color: 'bg-orange-500', pos: { x: 80, y: -120 } },
  { id: '2', username: 'Abhishek', avatar: '🧠', distance: '12m', color: 'bg-blue-500', pos: { x: -100, y: 60 } },
  { id: '3', username: 'NeonDoge', avatar: '👾', distance: '25m', color: 'bg-purple-500', pos: { x: 120, y: 150 } },
];

export const DiscoveryScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { profile } = useUser();
  const [isScanning, setIsScanning] = useState(true);
  const rippleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rippleAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="pt-16 px-6 flex-row items-center justify-between z-20">
        <Pressable onPress={onBack} className="w-12 h-12 rounded-2xl border border-border items-center justify-center bg-surface/50">
          <ChevronLeft color="#fff" size={24} />
        </Pressable>
        <View className="bg-primary/20 border border-primary/30 px-4 py-2 rounded-full flex-row items-center gap-2">
          <View className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <Text className="text-primary font-bold text-xs uppercase tracking-widest">Active Scan</Text>
        </View>
      </View>

      {/* Radar Logic */}
      <View className="flex-1 items-center justify-center">
        {/* Radar Rings */}
        {[1, 2, 3].map((i) => (
          <Animated.View
            key={i}
            style={{
              width: rippleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [100, i * 400],
              }),
              height: rippleAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [100, i * 400],
              }),
              opacity: rippleAnim.interpolate({
                inputRange: [0, 0.8, 1],
                outputRange: [0.6, 0.3, 0],
              }),
              borderRadius: 1000,
              position: 'absolute',
              borderWidth: 1,
              borderColor: '#9fe870',
            }}
          />
        ))}

        {/* Center User Avatar */}
        <View className="w-24 h-24 rounded-full bg-surface border-4 border-primary items-center justify-center z-10 shadow-2xl">
           <Text className="text-4xl">{profile?.avatar === '1' ? '🦊' : '👾'}</Text>
        </View>

        {/* Floating Neighbors */}
        {MOCK_NEIGHBORS.map((neighbor) => (
          <Animated.View
            key={neighbor.id}
            style={{
              position: 'absolute',
              transform: [
                { translateX: neighbor.pos.x },
                { translateY: neighbor.pos.y },
              ],
            }}
          >
            <View className="items-center">
                <Pressable className={`w-16 h-16 rounded-3xl ${neighbor.color} items-center justify-center border-4 border-background shadow-lg`}>
                    <Text className="text-2xl">{neighbor.avatar}</Text>
                </Pressable>
                <View className="bg-surface/80 px-3 py-1 rounded-full border border-border mt-2 backdrop-blur-md">
                    <Text className="text-[10px] font-bold text-white">{neighbor.username}</Text>
                    <Text className="text-[8px] text-primary text-center font-bold">{neighbor.distance}</Text>
                </View>
            </View>
          </Animated.View>
        ))}
      </View>

      {/* Footer Info */}
      <View className="absolute bottom-12 left-6 right-6">
        <View className="bg-surface/90 border border-border rounded-[2.5rem] p-6 backdrop-blur-xl flex-row items-center gap-6">
            <View className="w-14 h-14 rounded-2xl bg-primary/10 items-center justify-center border border-primary/20">
                <Target color="#9fe870" size={28} />
            </View>
            <View className="flex-1">
                <Text className="text-white font-bold text-lg">Discovery Engine</Text>
                <Text className="text-text-secondary text-xs">Scanning Devnet for users with active Beam signals...</Text>
            </View>
        </View>
      </View>
    </View>
  );
};
