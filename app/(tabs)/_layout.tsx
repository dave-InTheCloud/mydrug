import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import TopBar from '@/components/TopBar';
import { usePathname } from 'expo-router';
import { IconButton, useTheme } from 'react-native-paper';
import DropDown from '@/components/DropDown';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname().slice(1);
  const capitalizedPathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
  const { colors } = useTheme();

  return (
    <>
    {/* <TopBar leftBtn rightBtn title={capitalizedPathname || 'Mon traitement'}  /> */}

    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
        headerRight: () => <DropDown colors={colors}/>,
        headerStyle: {
          backgroundColor:  colors.topBarBg,
          borderBottomColor: colors.topBarDividerColor,
          borderBottomWidth: 0.3
        },
        tabBarInactiveBackgroundColor: colors.topBarBg,
        tabBarActiveBackgroundColor: colors.topBarDividerColor,
        tabBarActiveTintColor: '#d6e7c2',
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Mon Traitement',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'medkit' : 'medkit-outline'} color={color} />
            ),
          }} />
        <Tabs.Screen
          name="document"
          options={{
            title: 'Document',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'document-text' : 'document-text-outline'} color={color} />
            ),
          }} />
        <Tabs.Screen
          name="ProfilView"
          options={{
            title: 'Mon Profil',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'person-circle' : 'person-circle-outline'} color={color} />
            ),
          }} />
      </Tabs></>
  );
}
