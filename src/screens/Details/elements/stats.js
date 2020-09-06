import React from 'react'
import { ScrollView, View } from 'react-native'
import { Text } from '@ui-kitten/components'
import { Divider } from '~/components'
import styled from 'styled-components'

const StatRow = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 16px;
`

const Label = styled(Text)`
  font-size: 12px;
  flex: 1;
  color: #777777;
  text-transform: capitalize;
`

const Value = styled(Text)`
  font-size: 12px;
  flex: 0.5;
`

const StatBar = styled(View)`
  flex: 1.5;
  background-color: #ABABAB;
  height: 4px;
  border-radius: 2px;
  overflow: hidden;
`

const StatusFill = styled(View)`
  width: ${props => props.width ? props.width : '100%'};
  background-color: ${props => props.bg ? props.bg : 'green'};
  height: 100%;
`

export default ({ stats }) => {

  const total = stats.reduce(
    (pv, cv) => pv + (cv.stat.name == 'special-attack' ? 0 : cv.base_stat), 0)

  return (
    <ScrollView style={{ padding: 8 }}>
      { stats && stats.map(({ base_stat, stat: { name } }, i) => (
        <StatRow key={i}>
          <Label>{name}</Label>
          <Value>{base_stat}</Value>
          <StatBar>
            <StatusFill
              width={`${Math.floor((base_stat/250) * 100)}%`}
              bg={base_stat < 50 ? 'red' : 'green'}
            />
          </StatBar>
        </StatRow>
      )) }
      <StatRow>
        <Label>Total</Label>
        <Value>{total}</Value>
        <StatBar>
          <StatusFill
            width={`${Math.floor((total/590) * 100)}%`}
            bg={total < 50 ? 'red' : 'green'}
          />
        </StatBar>
      </StatRow>
      <Divider my={2} />
    </ScrollView>
  )
}
