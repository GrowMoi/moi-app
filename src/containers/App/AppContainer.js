import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux';
import { Router } from 'react-native-router-flux';
import MenuContainer from '../MenuContainer/MenuContainer'

import styled from 'styled-components/native'

const RouterWithRedux = connect()(Router)

const AppContainer = (props) => {
  return (
    <Container>
      <RouterWithRedux scenes={props.scenes} />
      <MenuContainer />
    </Container>
  )
}

const Container = styled(View)`
  flex: 1;
`

export default AppContainer
