import { Image, StyleSheet, Platform, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import DailyTab from '@/components/DailyTab';
import ListAccordion from '@/components/ListAccordion';
import { Link, Stack, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Text, useTheme } from 'react-native-paper';

export default function HomeScreen() {
  const { colors } = useTheme();

  return (
    <ParallaxScrollView>
      <DailyTab style={{ backgroundColor: colors.background}} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
