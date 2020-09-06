import React from 'react'
import { ScrollView, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import styled from 'styled-components'

const AboutRow = styled(View)`
  flex-direction: row;
  width: 100%;
  margin-top: 16px;
`

const Label = styled(Text)`
  font-size: 12px;
  flex: 1;
  color: #777777;
`
const Value = styled(Text)`
  font-size: 12px;
  flex: 2;
`

export default ({
  weaknesses,
  height,
  weight,
  egg,
  species: { name }
}) => {
  return (
    <ScrollView style={{ padding: 8 }}>
      <AboutRow>
        <Label>Species:</Label>
        <Value style={{ textTransform: 'capitalize' }}>
          {name}
        </Value>
      </AboutRow>
      <AboutRow>
        <Label>Height:</Label>
        <Value>{height}</Value>
      </AboutRow>
      <AboutRow>
        <Label>Weigth:</Label>
        <Value>{weight}</Value>
      </AboutRow>
      <AboutRow>
        <Label>Egg:</Label>
        <Value>{egg}</Value>
      </AboutRow>
      <AboutRow>
        <Label>Weakness:</Label>
        <Value>
          {weaknesses.map((w, i) => i == weaknesses.length ? w : `${w}, `)}
        </Value>
      </AboutRow>
    </ScrollView>
  )
}
