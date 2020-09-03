import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'
import { Header, ListItem } from './elements'
import { showMessage } from 'react-native-flash-message'
import { LoadingPlaceholder } from '../../components'
import { tryAwait } from '../../utils'
import shortid from 'shortid'
import api from '../../api'

export default () => {

  const [ loading, setLoading ] = useState(true)
  const [ pokemons, setPokemons ] = useState([])

  useEffect(() => {
    tryAwait({
      promise: api.pokemons.listPokemons(),
      onResponse: ({ data: { results } }) => {
        setPokemons(results)
      } ,
      onError: () => {
        showMessage({
          message: 'Erro',
          description: 'Ocorreu um erro ao obter os pokemons.',
          type: 'danger'
        })
      },
      onLoad: _loading => setLoading(_loading)
    })
  }, [])

  const renderItem = ({ item, index }) =>
    <ListItem key={index} {...item} />

  return (
    <Layout style={{ flex: 1 }}>
      <Header />
      { loading ? (
        <LoadingPlaceholder />
      ) : (
        <FlatList
          removeClippedSubviews
          windowSize={5}
          data={pokemons}
          ListEmptyComponent={() => <Text>Vazio</Text>}
          keyExtractor={() => shortid()}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingVertical: 32,
            paddingHorizontal: 24
          }}
          onEndReached={() => { console.log('End reached') }}
          onEndReachedThreshold={0.1}
        />
      )}
    </Layout>
  )
}
