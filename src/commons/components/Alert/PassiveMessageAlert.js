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
  sideMenu: store.sideMenu,
  passiveMessageSettings: store.user.passiveMessageSettings,
}))
export default class PassiveMessageAlert extends Component {
  render() {
    const { isOpenPassiveMessage = false, touchableProps = {}, message, passiveMessageSettings: { show }, sideMenu: { menuIsOpen } } = this.props

    return (
      <MoiPassiveMessageModal
        animationType="none"
        open={isOpenPassiveMessage && !menuIsOpen && show}
        touchableProps={touchableProps}
        noOverlay>
        <PassiveMessage position="bottomRight">{message}</PassiveMessage>
      </MoiPassiveMessageModal>
    )
  }
}
