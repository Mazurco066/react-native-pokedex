import React from 'react'
import { View } from 'react-native'
import { Spinner } from '@ui-kitten/components'
import styled from 'styled-components'

const LoadingView = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default () => {
  return (
    <LoadingView>
      <Spinner />
    </LoadingView>
  )
}