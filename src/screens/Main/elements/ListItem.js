import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from '@ui-kitten/components'

export default ({ name, url }) => {
  return (
    <TouchableOpacity onPress={() => { console.log('seu cu') }}>
      <Text>{name}</Text>
      <Text>{ url }</Text>
    </TouchableOpacity>
  )
}
