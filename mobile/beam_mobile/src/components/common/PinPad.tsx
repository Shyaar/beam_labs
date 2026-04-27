import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import { Lock, Delete, ChevronLeft } from 'lucide-react-native';

interface PinPadProps {
  title: string;
  subtitle?: string;
  onComplete: (pin: string) => void;
  onBack?: () => void;
  error?: string;
}

export const PinPad: React.FC<PinPadProps> = ({ title, subtitle, onComplete, onBack, error }) => {
  const [pin, setPin] = useState('');
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const handlePress = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        onComplete(newPin);
      }
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
      ]).start(() => setPin(''));
    }
  }, [error]);

  const renderDigit = (index: number) => {
    const isActive = pin.length > index;
    return (
      <View 
        key={index}
        className={`w-4 h-4 rounded-full border-2 ${
          isActive ? 'bg-primary border-primary' : 'bg-transparent border-border'
        } mx-4`}
      />
    );
  };

  return (
    <View className="flex-1 bg-background items-center justify-between py-20 px-8">
      <View className="items-center w-full">
        {onBack && (
          <Pressable onPress={onBack} className="absolute left-0 -top-10 w-12 h-12 items-center justify-center">
            <ChevronLeft color="#fff" size={24} />
          </Pressable>
        )}
        <View className="w-16 h-16 rounded-3xl bg-primary/10 items-center justify-center border border-primary/20 mb-6">
          <Lock color="#9fe870" size={32} />
        </View>
        <Text className="text-2xl font-bold text-white text-center">{title}</Text>
        {subtitle && <Text className="text-text-secondary mt-2 text-center">{subtitle}</Text>}
        
        <Animated.View 
          style={{ transform: [{ translateX: shakeAnim }] }}
          className="flex-row mt-12 mb-8"
        >
          {[0, 1, 2, 3].map(renderDigit)}
        </Animated.View>
        {error && <Text className="text-red-500 font-bold text-sm mt-2">{error}</Text>}
      </View>

      <View className="w-full max-w-[320px]">
        <View className="flex-row flex-wrap justify-between gap-y-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <Pressable
              key={num}
              onPress={() => handlePress(num.toString())}
              className="w-[28%] aspect-square rounded-full items-center justify-center bg-surface border border-border/50"
            >
              <Text className="text-2xl font-bold text-white">{num}</Text>
            </Pressable>
          ))}
          <View className="w-[28%] aspect-square" />
          <Pressable
            onPress={() => handlePress('0')}
            className="w-[28%] aspect-square rounded-full items-center justify-center bg-surface border border-border/50"
          >
            <Text className="text-2xl font-bold text-white">0</Text>
          </Pressable>
          <Pressable
            onPress={handleBackspace}
            className="w-[28%] aspect-square rounded-full items-center justify-center"
          >
            <Delete color="#fff" size={28} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

