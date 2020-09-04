import React from 'react'
import { TouchableOpacity, Image, View } from 'react-native'
import { Text, Card } from '@ui-kitten/components'
import styled from 'styled-components'

import pokebadge from '../../../assets/images/pokebadge.png'

const Col = styled(View)`
  position: relative;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const PokeCode = styled(Text)`
  text-transform: uppercase;
  background: yellow;
  padding-top: 8px;
  padding-left: 8px;
  padding-right: 8px;
  color: black;
`

const PokeName = styled(Text)`
  text-transform: capitalize;
  margin-top: 8px;
`

export default ({ name, url }) => {

  const pokeId = url.split('/').reverse()[1]

  const generateImgUri = id =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  return (
    <TouchableOpacity onPress={() => { console.log('seu cu') }}>
      <Card>
        <Row>
          <Col>
            <PokeCode>Nº {pokeId.padStart(3, '0')}</PokeCode>
            <PokeName>{name}</PokeName>
          </Col>
          <Col>
            <Image
              style={{
                width: 80,
                height: 80,
                resizeMode: 'contain',
                position: 'absolute',
                transform: [{ rotate: '30deg' }]
              }}
              source={pokebadge}
            />
            <Image
              style={{ 
                width: 80,
                height: 80,
                resizeMode: 'contain'
              }}
              source={{ uri: generateImgUri(pokeId) }}
            />
          </Col>
        </Row>
      </Card>
    </TouchableOpacity>
  )
}
