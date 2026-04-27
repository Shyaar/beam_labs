import React, { useEffect, useState } from 'react';
import { View, Text, Animated, Image } from 'react-native';

export const SplashScreen: React.FC = () => {
  const [fadeAnim] = useState(new Animated.Value(1));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: false,
      }),
    ]).start();
  }, []);

  return (
    <View className="flex-1 bg-primary items-center justify-center p-8">
      {/* Decorative Circles (Static for now to match web aesthetic without heavy reanimated) */}
      <View className="absolute w-64 h-64 border-2 border-black/10 rounded-full scale-[2]" />
      <View className="absolute w-96 h-96 border border-black/5 rounded-full scale-[1.5]" />

      <Animated.View 
        style={{ transform: [{ scale: scaleAnim }] }}
        className="items-center justify-center relative z-10"
      >
        <Image 
          source={require('../../../assets/logos/light.png')} 
          style={{ width: 120, height: 120 }}
          resizeMode="contain"
        />
      </Animated.View>
      
      <View className="mt-8 items-center">
        <Text className="text-4xl font-extrabold text-black tracking-tighter">Beam</Text>
        <Text className="text-black/60 font-bold uppercase tracking-[0.3em] text-[10px] mt-2">Solana Proximity</Text>
      </View>

      {/* Loading Bar Simulator */}
      <View className="absolute bottom-16 w-32 h-1 bg-black/10 rounded-full overflow-hidden">
        <View className="w-1/2 h-full bg-black rounded-full" />
      </View>
    </View>
  );
};
