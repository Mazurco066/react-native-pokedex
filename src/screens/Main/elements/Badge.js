import React from 'react'
import { Text, Card } from '@ui-kitten/components'
import styled from 'styled-components'

const DataSourceCard = styled(Card)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: blue;
`

const DataSourceText = styled(Text)`
  color: white;
  font-size: 10px;
`

export default () => {
  return (
    <DataSourceCard>
      <DataSourceText>Data provided by Pokéapi V2</DataSourceText>
    </DataSourceCard>
  )
}