import React, { useState, useEffect } from 'react'
import { View, Image } from 'react-native'
import {
  Layout,
  Text,
  Tab,
  TabBar,
  TopNavigation,
  TopNavigationAction,
  Icon,
  ViewPager
} from '@ui-kitten/components'
import { showMessage } from 'react-native-flash-message'
import { useNavigation } from '@react-navigation/native'
import { LoadingPlaceholder } from '~/components'
import { About, Badge, Stats, Evolutions } from './elements'
import { tryAwait } from '~/utils'
import { typeColors } from '~/helpers'
import styled from 'styled-components'
import api from '~/api'

import pokebadge from '../../assets/images/pokebadge.png'

const PokeNavigation = styled(TopNavigation)`
  background: ${(props) => (props.bg ? props.bg : 'white')};
`

const PokeBackground = styled(View)`
  background: ${(props) => (props.bg ? props.bg : 'white')};
  height: 250px;
  padding: 8px;
  position: relative;
`

const PokeImage = styled(Image)`
  height: 100%;
  width: 100%;
`

const BadgeImageSmall = styled(Image)`
  height: 100px;
  width: 100px;
  position: absolute;
  left: -32px;
  top: 0;
  opacity: 0.5;
  z-index: 0;
`

const BadgeImage = styled(Image)`
  height: 200px;
  width: 200px;
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: 0.5;
`

const PokeTypeRow = styled(View)`
  flex-direction: row;
  justify-content: flex-start;
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
  color: white;
` 

export default ({  route: {
  params: {
    id,
    name,
    type,
    num,
    prev_evolution,
    next_evolution,
    weaknesses,
    height,
    weight,
    egg
  }
}}) => {

  const { goBack } = useNavigation()

  const [ loading, setLoading ] = useState(true)
  const [ selectedIndex, setSelectedIndex ] = useState(0)
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
    <Layout style={{ flex: 1 }} level="4">
      <PokeNavigation
        bg={typeColors[type[0]]}
        alignment="center"
        title={name}
        subtitle={`#${num}`}
        accessoryLeft={() => (
          <TopNavigationAction
            style={{ padding: 8, paddingRight: 48, zIndex: 1 }}
            icon={props => <Icon name="arrow-back-outline" {...props} />}
            onPress={goBack}
          />
        )}
      />
      <PokeBackground bg={typeColors[type[0]]}>
        <BadgeImageSmall
          style={{ resizeMode: 'contain' }}
          source={pokebadge}
        />
        <BadgeImage
          style={{ resizeMode: 'contain' }}
          source={pokebadge}
        />
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
      <TabBar
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <Tab title='About'/>
        <Tab title='Stats'/>
        <Tab title='Evolutions'/>
      </TabBar>
      <ViewPager
        style={{ flex: 1 }}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
      >
        <Layout level="1" style={{ flex: 1 }}>
          {loading ? (
            <LoadingPlaceholder />
          ) : (
            <About
              {...details}
              weaknesses={weaknesses}
              height={height}
              weight={weight}
              egg={egg}
            />
          )}
        </Layout>
        <Layout level="1" style={{ flex: 1 }}>
          {loading ? (
            <LoadingPlaceholder />
          ) : (
            <Stats {...details} />
          )}
        </Layout>
        <Layout level="1" style={{ flex: 1 }}>
          <Evolutions
            prev_evolution={prev_evolution}
            next_evolution={next_evolution}
          />
        </Layout>
      </ViewPager>
      <Badge />
    </Layout>
  )
}