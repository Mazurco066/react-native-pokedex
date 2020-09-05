import React, { useEffect, useState } from 'react'
import { FlatList, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { Layout, Text, Input, Icon } from '@ui-kitten/components'
import { Header, ListItem } from './elements'
import { showMessage } from 'react-native-flash-message'
import { Divider, EmptyPlaceholder, LoadingPlaceholder } from '../../components'
import { tryAwait } from '../../utils'
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

  useEffect(() => {
    tryAwait({
      promise: api.pokemons.listPokemons(),
      onResponse: ({ data }) => setPokemons(data),
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

  const renderInputIcon = (props) => (
    <TouchableOpacity onPress={() => { console.log('Search here') }}>
      <Icon {...props} name='search'/>
    </TouchableOpacity>
  );

  const renderItem = ({ item, index }) =>
    <ListItem
      key={index}
      {...item}
      onPress={() => console.log('Vai tomar no cu')}
    />

  return (
    <Layout style={{ flex: 1 }} level='4'>
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
            bounces={false}
            removeClippedSubviews
            windowSize={21}
            numColumns={2}
            data={pokemons}
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
      </KeyboardAvoidingView>
    </Layout>
  )
}
