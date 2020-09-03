import React from 'react'
import { View, Image } from 'react-native'

import logo from '../../../assets/images/poke-logo.png'

export default () => {
  return (
    <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
      <Image style={{ maxHeight: 50, resizeMode: 'contain' }} source={logo} />
    </View>
  )
}