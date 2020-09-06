import React, { useEffect, useState } from 'react'
import { FlatList, Image } from 'react-native'
import { Layout, Icon, TopNavigation, TopNavigationAction, useTheme } from '@ui-kitten/components'
import { ListItem, Badge } from './elements'
import { showMessage } from 'react-native-flash-message'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Divider, EmptyPlaceholder, LoadingPlaceholder } from '~/components'
import { pokemonActions } from '~/store/actions'
import { tryAwait } from '~/utils'
import styled from 'styled-components'
import api from '~/api'

import pokeball from '../../assets/images/pokeball.png'

const TopBar = styled(TopNavigation)`
  background: ${(props) => (props.bg ? props.bg : 'white')};
`

const Main = ({ navigation: { navigate }, list, setupPokemonList }) => {

  const theme = useTheme()

  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    tryAwait({
      promise: api.pokemons.listPokemons(),
      onResponse: ({ data: { pokemon } }) => setupPokemonList(pokemon),
      onError: () => {
        showMessage({
          message: 'Erro',
          description: 'Error while listing pokémons.',
          type: 'danger'
        })
      },
      onLoad: _loading => setLoading(_loading)
    })
  }, [])

  const renderItem = ({ item, index }) =>
    <ListItem
      key={index}
      {...item}
      onPress={() => navigate('Details', { ...item })}
    />

  return (
    <Layout style={{ flex: 1, position: 'relative' }} level='4'>
      <TopBar
        bg={theme['color-primary-500']}
        title="Pokémons"
        subtitle="1º Generation"
        alignment="center"
        accessoryLeft={() => (
          <Image
            style={{
              marginLeft: 8,
              width: 32,
              height: 32,
              resizeMode: 'contain'
            }}
            source={pokeball}
          />
        )}
        accessoryRight={() => (
          <TopNavigationAction
            style={{ padding: 8 }}
            icon={props => <Icon name="search" {...props} />}
            onPress={() => {}}
          />
        )}
      />
      { loading ? (
        <LoadingPlaceholder />
      ) : (
        <FlatList
          bounces={false}
          removeClippedSubviews
          windowSize={21}
          numColumns={2}
          data={list}
          keyExtractor={({ id }) => id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <Divider my={2} />}
          ListEmptyComponent={() => <EmptyPlaceholder />}
          contentContainerStyle={{
            paddingVertical: 8,
            paddingHorizontal: 4
          }}
        />
      )}
      <Badge />
    </Layout>
  )
}

const mapStateToProps = state => {
  const { pokemon: { list = [] } } = state
  return { list }
}

const mapDispatchToProps = dispatch => {
  const { setupPokemonList } = pokemonActions
  return bindActionCreators({ setupPokemonList }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
