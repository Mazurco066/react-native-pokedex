import React from 'react'
import styled from 'styled-components'
import { space } from 'styled-system'
import { View } from 'react-native'

const Space = styled(View)`
  ${space}
`

export default props => <Space {...props} />