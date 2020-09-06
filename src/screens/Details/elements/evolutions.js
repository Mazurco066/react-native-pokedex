import React from 'react'
import { ScrollView, View } from 'react-native'
import { Text, Icon } from '@ui-kitten/components'
import styled from 'styled-components'

export default ({ prev_evolution, next_evolution }) => {
  return (
    <ScrollView style={{ padding: 8 }}>
      {
        (prev_evolution && prev_evolution.length) ||
        (next_evolution && next_evolution.length) ? (
          <Text>Evolutions found</Text>
        ) : (
          <Text>There is no evolutions for this Pokémon!</Text>
        )
      }
    </ScrollView>
  )
}
