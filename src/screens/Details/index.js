import React from 'react'
import { View, Text } from 'react-native'

export default ({  route: {
  params: { id, name: { english } }
}}) => {
  return (
    <View>
      <Text>Details: {id} - {english}</Text>
    </View>
  )
}