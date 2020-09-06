import React from 'react'
import { Image, View } from 'react-native'
import { Card, Text, useTheme } from '@ui-kitten/components'
import styled from 'styled-components'

const PokeImage = styled(Image)`
  height: 90px;
  width: 90px;
  margin-right: 16px;
`

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 100%;
`

const Col = styled(View)`
  flex-direction: column;
  flex: 1;
  flex-grow: 1;
`

const PokeCode = styled(Text)`
  font-size: 12px;
  color: ${props => props.color ? props.color : 'white'};
`

const PokeName = styled(Text)`
  font-size: 12px;
`

export default ({ num, name, onPress = () => {} }) => {

  const theme = useTheme()

  const generateImgUri = () =>
    `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${num}.png`

  return (
    <Card onPress={onPress}>
      <Row>
        <PokeImage
          style={{ resizeMode: 'contain' }}
          source={{ uri: generateImgUri() }}
        />
        <Col>
          <PokeCode color={theme['color-primary-500']}>
            #{num}
          </PokeCode>
          <PokeName>{name}</PokeName>
        </Col>
      </Row>
    </Card>
  )
}