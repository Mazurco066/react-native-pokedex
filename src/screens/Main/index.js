import React, { useEffect, useState } from 'react'
import { FlatList, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { Layout, Text, Input, Icon } from '@ui-kitten/components'
import { Badge, Header, ListItem } from './elements'
import { showMessage } from 'react-native-flash-message'
import { Divider, EmptyPlaceholder, LoadingPlaceholder } from '../../components'
import { tryAwait } from '../../utils'
import shortid from 'shortid'
import styled from 'styled-components'
import api from '../../api'

const WelcomeLabel = styled(Text)`
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
`

export default () => {

  const [ loading, setLoading ] = useState(true)
  const [ pokemons, setPokemons ] = useState([])
  const [ offset, setOffset ] = useState(0)

  useEffect(() => {
    tryAwait({
      promise: api.pokemons.listPokemons(40, offset),
      onResponse: ({ data: { results } }) => {
        setOffset(offset + 40)
        setPokemons(results)
      } ,
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

  loadPokemons = () => {
    tryAwait({
      promise: api.pokemons.listPokemons(40, offset),
      onResponse: ({ data: { results } }) => {
        setOffset(offset + 40)
        setPokemons([ ...pokemons, ...results ])
      } ,
      onError: () => {
        showMessage({
          message: 'Erro',
          description: 'Errors while listing more pokémons.',
          type: 'danger'
        })
      }
    })
  }

  const renderInputIcon = (props) => (
    <TouchableOpacity onPress={() => { console.log('Search here') }}>
      <Icon {...props} name='search'/>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) =>
    <ListItem key={index} {...item} />

  return (
    <Layout style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
      >
        <Header />
        <WelcomeLabel>
          Find your pokémon!
        </WelcomeLabel>
        <Input
          style={{ marginHorizontal: 8, marginBottom: 8 }}
          accessoryRight={renderInputIcon}
        />
        { loading ? (
          <LoadingPlaceholder />
        ) : (
          <FlatList
            removeClippedSubviews
            windowSize={20}
            data={pokemons}
            ListEmptyComponent={() => <EmptyPlaceholder />}
            keyExtractor={() => shortid()}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingVertical: 8,
              paddingHorizontal: 8
            }}
            onEndReached={() => loadPokemons() }
            onEndReachedThreshold={0.4}
            ItemSeparatorComponent={() => <Divider my={2} />}
          />
        )}
      </KeyboardAvoidingView>
      <Badge />
    </Layout>
  )
}
