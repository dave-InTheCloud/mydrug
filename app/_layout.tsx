import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { IconButton, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { Button } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const theme = {
    ...MD3LightTheme, // or MD3DarkTheme
    //roundness: 2,
    colors: {
      surfaceDisabled: 'rgba(46, 50, 40, 0.12)',
      onSurfaceDisabled: 'rgba(46, 50, 40, 0.38)',
      backdrop: 'rgba(46, 50, 40, 0.4)',
      primary: '#5e9403',
      onPrimary: 'rgb(255, 255, 255)',
      primaryContainer: 'rgb(181, 246, 93)',
      onPrimaryContainer: 'rgb(17, 32, 0)',
      secondary: 'rgb(226, 124, 40)',
      onSecondary: 'rgb(255, 255, 255)',
      secondaryContainer: 'rgb(255, 220, 198)',
      onSecondaryContainer: 'rgb(48, 20, 0)',
      tertiary: 'rgb(0, 104, 116)',
      onTertiary: 'rgb(255, 255, 255)',
      tertiaryContainer: 'rgb(151, 240, 255)',
      onTertiaryContainer: 'rgb(0, 31, 36)',
      error: 'rgb(186, 26, 26)',
      onError: 'rgb(255, 255, 255)',
      errorContainer: 'rgb(255, 218, 214)',
      onErrorContainer: 'rgb(65, 0, 2)',
      background: 'rgb(253, 252, 245)',
      onBackground: 'rgb(27, 28, 24)',
      surface: 'rgb(253, 252, 245)',
      onSurface: 'rgb(27, 28, 24)',
      surfaceVariant: 'rgb(225, 228, 213)',
      onSurfaceVariant: 'rgb(68, 72, 61)',
      outline: 'rgb(117, 121, 108)',
      outlineVariant: 'rgb(197, 200, 185)',
      shadow: 'rgb(0, 0, 0)',
      scrim: 'rgb(0, 0, 0)',
      inverseSurface: 'rgb(48, 49, 44)',
      inverseOnSurface: 'rgb(242, 241, 233)',
      inversePrimary: 'rgb(154, 217, 67)',
      elevation: {
        level0: 'transparent',
        level1: 'rgb(244, 245, 233)',
        level2: 'rgb(238, 240, 225)',
        level3: 'rgb(232, 236, 218)',
        level4: 'rgb(231, 234, 216)',
        level5: 'rgb(227, 231, 211)',
      },
      topBarBg: '#8ac73247',
      topBarDividerColor: '#e27c28c4'
    },
  };

  return (
    <PaperProvider theme={theme}>
      {/* <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}> */}
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      {/* </ThemeProvider> */}
    </PaperProvider>
  );
}
