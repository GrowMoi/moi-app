import React, { Component } from 'react'
import { View, Keyboard } from 'react-native'
import { connect } from 'react-redux';
import { Router } from 'react-native-router-flux';
import MenuContainer from '../MenuContainer/MenuContainer'
import { TIME_FOR_INACTIVITY } from '../../constants';
import userActions from '../../actions/userActions'
import UserInactivity from 'react-native-user-inactivity';


import styled from 'styled-components/native'

const RouterWithRedux = connect()(Router)

class AppContainer extends Component {
  showPassiveMessage = async () => {
    const { showPassiveMessageAsync } = this.props
    await showPassiveMessageAsync();
  }

  render() {
    const { activeMessages } = this.props;
    return (
      <Container>
        <UserInactivity
            isActive={activeMessages}
            timeForInactivity={TIME_FOR_INACTIVITY}
            onAction={(isActive) => {
              if(!isActive) {
                Keyboard.dismiss()
                this.showPassiveMessage();
              }
            }}
          >
            <RouterWithRedux>
              {this.props.scenes()}
            </RouterWithRedux>
          </UserInactivity>
        <MenuContainer />
      </Container>
    )
  }
}

const Container = styled(View)`
  flex: 1;
`

const mapStateToProps = (state) => {
  return {
    activeMessages: state.user.passiveMessageSettings.show
  }
}

const mapDispatchToProps = {
  showPassiveMessageAsync: userActions.showPassiveMessageAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)