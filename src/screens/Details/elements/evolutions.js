import React from 'react'
import { View, FlatList } from 'react-native'
import { Icon } from '@ui-kitten/components'
import { EmptyPlaceholder } from '~/components'
import ListItem from './ListItem'
import shortid from 'shortid'

export default ({ prev_evolution = [], next_evolution = [], id, num, name }) => {

  const evolutions = [
    ...prev_evolution.map(({ num, name }) => ({
      id: parseInt(num),
      name: name,
      num: num
    })),
    { id, num, name },
    ...next_evolution.map(({ num, name }) => ({
      id: parseInt(num),
      name: name,
      num: num
    }))
  ]

  const renderItem = ({ item, index }) =>
    <ListItem
      key={index}
      {...item}
      onPress={() => {}}
    />

  return (
    <FlatList
      removeClippedSubviews
      data={evolutions}
      keyExtractor={() => shortid()}
      renderItem={renderItem}
      ItemSeparatorComponent={() => (
        <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 4 }}>
          <Icon
            style={{ width: 24, height: 24 }}
            fill="#000000"
            name="arrow-downward-outline"
          />
        </View>
      )}
      ListEmptyComponent={() => <EmptyPlaceholder />}
      contentContainerStyle={{
        paddingVertical: 8,
        paddingHorizontal: 8
      }}
    />
  )
}
