import React, { memo } from 'react'
import { Image, View } from 'react-native'
import { useTheme, Text, Card } from '@ui-kitten/components'
import { typeColors } from '~/helpers'
import styled from 'styled-components'
import { color } from 'styled-system'

const Col = styled(View)`
  flex-direction: column;
`

const PokeImage = styled(View)`
  justify-content: center;
  align-items: center;
`

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const PokeCode = styled(Text)`
  text-transform: uppercase;
  text-align: left;
  font-size: 8px;
  color: ${(props) => (props.color ? props.color : 'white')};
`

const PokeTypeRow = styled(View)`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  flex-grow: 1;
  width: 100%;
`

const PokeType = styled(Text)`
  font-size: 6px;
  padding-top: 4px;
  padding-left: 4px;
  padding-right: 4px;
  margin-bottom: 4px;
  background: ${(props) => (props.bg ? props.bg : 'white')};
  color: white;
`

const PokeName = styled(Text)`
  text-transform: capitalize;
  text-align: right;
  font-size: 8px;
  ${color}
`

export default memo(({ name, num, type, onPress = () => {} }) => {
  const theme = useTheme()

  const generateImgUri = () =>
    `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${num}.png`

  return (
    <Card style={{ flex: 1, marginHorizontal: 4 }} onPress={onPress}>
      <PokeImage>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
          }}
          source={{ uri: generateImgUri() }}
        />
      </PokeImage>
      <Row style={{ marginTop: 16 }}>
        <Col>
          <PokeCode color={theme['color-primary-500']}>
            #{num}
          </PokeCode>
        </Col>
        <Col>
          <PokeName>{name}</PokeName>
        </Col>
      </Row>
      <PokeTypeRow style={{ marginTop: 8 }}>
        {type &&
          type.map((t, i) => (
            <PokeType
              style={{ marginRight: i + 1 == type.length ? 0 : 8 }}
              bg={typeColors[t]}
              key={i}
            >
              {t}
            </PokeType>
          ))}
      </PokeTypeRow>
    </Card>
  )
})
