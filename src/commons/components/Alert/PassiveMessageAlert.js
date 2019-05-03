import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components/native'
import MoiAlert from './Alert'
import PassiveMessage from './PassiveMessage';

const MoiPassiveMessageModal = styled(MoiAlert)`
  position: absolute;
  flex: 1;
`

@connect(store => ({
  drawerState: store.user.drawerState,
}))
export default class PassiveMessageAlert extends Component {
  render() {
    const { isOpenPassiveMessage = false, touchableProps = {}, message, drawerState: { isOpen } } = this.props

    return (
      <MoiPassiveMessageModal
        animationType="none"
        open={isOpenPassiveMessage && !isOpen}
        touchableProps={touchableProps}
        noOverlay>
        <PassiveMessage position="bottomRight">{message}</PassiveMessage>
      </MoiPassiveMessageModal>
    )
  }
}
