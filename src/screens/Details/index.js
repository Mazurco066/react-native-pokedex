import React, { useState, useEffect } from 'react'
import { View, Image } from 'react-native'
import { Layout, Text, TopNavigation, TopNavigationAction, Icon, useTheme } from '@ui-kitten/components'
import { showMessage } from 'react-native-flash-message'
import { useNavigation } from '@react-navigation/native'
import { tryAwait } from '~/utils'
import { typeColors } from '~/helpers'
import styled from 'styled-components'
import api from '~/api'

const PokeNavigation = styled(TopNavigation)`
  background: ${(props) => (props.bg ? props.bg : 'white')};
`

const PokeBackground = styled(View)`
  background: ${(props) => (props.bg ? props.bg : 'white')};
  height: 250px;
  padding: 8px;
  position: relative;
  margin-bottom: 16px;
`

const PokeImage = styled(Image)`
  height: 100%;
  width: 100%;
`

const PokeTypeRow = styled(View)`
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  flex-grow: 1;
  width: 100%;
  position: absolute;
  bottom: 8px;
  right: 8px;
  left: 8px;
`

const PokeType = styled(Text)`
  font-size: 10px;
  padding-top: 8px;
  padding-left: 8px;
  padding-right: 8px;
  background: ${(props) => (props.bg ? props.bg : 'white')};
` 

export default ({  route: {
  params: { id, name, type, num }
}}) => {

  const theme = useTheme()
  const { goBack } = useNavigation()

  const [ loading, setLoading ] = useState(true)
  const [ details, setDetails ] = useState({})

  useEffect(() => {
    tryAwait({
      promise: api.pokemons.pokemonDetails(id),
      onResponse: ({ data }) => setDetails(data),
      onError: () => {
        showMessage({
          message: 'Erro',
          description: 'Error while fetching pokemon data.',
          type: 'danger'
        })
      },
      onLoad: _loading => setLoading(_loading)
    })
  }, [])

  return (
    <Layout style={{ flex: 1 }} level='4'>
      <PokeNavigation
        bg={typeColors[type[0]]}
        alignment="center"
        title={name}
        subtitle={`#${num}`}
        accessoryLeft={() => (
          <TopNavigationAction
            style={{ padding: 8, paddingRight: 48 }}
            icon={props => <Icon name="arrow-back-outline" {...props} />}
            onPress={goBack}
          />
        )}
      />
      <PokeBackground bg={typeColors[type[0]]}>
        <PokeImage
          style={{ resizeMode: 'contain' }}
          source={{ uri: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${num}.png`}}
        />
        <PokeTypeRow>
          {type && type.map((t, i) => (
            <PokeType
              style={{ 
                marginRight: i + 1 == type.length ? 0 : 8,
                borderColor: 'white',
                borderWidth: 1
              }}
              bg={typeColors[t]}
              key={i}
            >
              {t}
            </PokeType>
          ))}
        </PokeTypeRow>
      </PokeBackground>
    </Layout>
  )
}