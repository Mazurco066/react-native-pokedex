import React from 'react'
import { View } from 'react-native'
import { Text, useTheme } from '@ui-kitten/components'
import styled from 'styled-components'

const DataSourceCard = styled(View)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.bg ? props.bg : 'blue'};
  padding-top: 8px;
`

const DataSourceText = styled(Text)`
  color: white;
  font-size: 10px;
`

export default () => {
  const theme = useTheme()

  return (
    <DataSourceCard bg={theme['color-primary-500']}>
      <DataSourceText>Data provided by Pokéapi V2</DataSourceText>
    </DataSourceCard>
  )
}