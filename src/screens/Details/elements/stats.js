import React from 'react'
import { View } from 'react-native'
import { Card, Text } from '@ui-kitten/components'

export default ({ stats }) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>Status</Text>
      { stats && stats.map(({ base_stat, stat: { name } }, i) => (
        <Text key={i}>{name} - {base_stat}</Text>
      )) }
    </View>
  )
}
