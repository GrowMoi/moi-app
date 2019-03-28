import React, { Component } from 'react'
import styled from 'styled-components/native'
import MoiAlert from './Alert'
import PassiveMessage from './PassiveMessage';

const MoiPassiveMessageModal = styled(MoiAlert)`
  position: absolute;
  flex: 1;
`

export default class PassiveMessageAlert extends Component {
  render() {
    const { isOpenPassiveMessage = false, touchableProps = {}, message } = this.props
    return (
      <MoiPassiveMessageModal
        animationType="fade"
        open={isOpenPassiveMessage}
        touchableProps={touchableProps}
        noOverlay>
        <PassiveMessage position="bottomRight">{message}</PassiveMessage>
      </MoiPassiveMessageModal>
    )
  }
}
