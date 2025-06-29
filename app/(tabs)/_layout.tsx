'use client'

import React, { useEffect } from 'react'
import { Slot, useRouter, usePathname } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { PaperProvider, MD3LightTheme, Appbar, useTheme } from 'react-native-paper'
import { AuthProvider, useAuth } from '../context/AuthContext'
import { View } from 'react-native'

SplashScreen.preventAutoHideAsync()

const chefcitoTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#FFAE52',
    onPrimary: '#FFFFFF',
    primaryContainer: '#FFE4CC',
    onPrimaryContainer: '#8B4513',
    secondary: '#8B4513',
    onSecondary: '#FFFFFF',
    secondaryContainer: '#D2B48C',
    onSecondaryContainer: '#5D2F0A',
    surface: '#FFFFFF',
    onSurface: '#1C1B1F',
    surfaceVariant: '#F3F3F3',
    onSurfaceVariant: '#49454F',
    background: '#FFAE52',
    onBackground: '#1C1B1F',
    error: '#BA1A1A',
    onError: '#FFFFFF',
    outline: '#79747E',
    outlineVariant: '#CAC4D0',
  },
}

function GlobalNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth()
  const theme = useTheme()

  const isLoginScreen = pathname === '/'

  return (
    <Appbar.Header style={{ backgroundColor: '#FF9500' }}>
      <Appbar.Content
        title="CHEFCITO"
        titleStyle={{
          fontWeight: 'bold',
          color: theme.colors.onPrimary,
        }}
        onPress={() => router.push('/home')}
      />
      {!isLoginScreen && (
        <Appbar.Action
          icon="account-circle"
          color={theme.colors.onPrimary}
          onPress={() => {
            if (user) router.push('/profile')
            else router.push('/')
          }}
        />
      )}
    </Appbar.Header>
  )
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  })

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync()
  }, [fontsLoaded])

  if (!fontsLoaded) return null

  return (
    <AuthProvider>
      <PaperProvider theme={chefcitoTheme}>
        <View style={{ flex: 1 }}>
          <GlobalNavbar />
          <View style={{ flex: 1 }}>
            <Slot />
          </View>
        </View>
        <StatusBar style="light" />
      </PaperProvider>
    </AuthProvider>
  )
}
