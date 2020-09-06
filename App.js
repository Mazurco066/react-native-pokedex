import React from 'react'
import { SafeAreaView, Platform, StatusBar } from 'react-native'
import FlashMessage from 'react-native-flash-message'
import Navigator from './src/router'
import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { AppLoading } from 'expo'
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p'
import store, { persistor } from './src/store'
import theme from './theme.json'
import 'react-native-gesture-handler'

export default () => {
  const [fontsLoaded] = useFonts({ PressStart2P_400Regular })
  if (!fontsLoaded) return <AppLoading />
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <StatusBar theme="dark"/>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <SafeAreaView style={{ flex: 1 }}>
              <Navigator />
            </SafeAreaView>
          </PersistGate>
        </Provider>
      </ApplicationProvider>
      <FlashMessage position="top" icon="auto" />
    </>
  )
}