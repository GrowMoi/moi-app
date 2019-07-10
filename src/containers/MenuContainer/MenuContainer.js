import React, { Component } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import SideMenu from '../../commons/components/Drawer/SideMenu'

// Redux
import { connect } from 'react-redux'
import * as sideActions from '../../actions/sideActions'

// styles
import styled, { css } from 'styled-components/native'
import { Palette } from '../../commons/styles'

const { colors } = Palette;

class MenuContainer extends Component {
  state = {
    MENU_WIDTH: 250,
    expanded: false,
  }

  closeMenu = () => this.props.sideMenuClose()

  render() {
    return (
      <Container>
        <MenuContent width={this.state.MENU_WIDTH}>
          <SideMenu onClose={this.closeMenu} width={this.state.MENU_WIDTH} />
        </MenuContent>

        <TouchableWithoutFeedback onPress={this.closeMenu}>
          <RestContainer/>
        </TouchableWithoutFeedback>
      </Container>
    )
  }
}

const MenuContent = styled(View)`
  ${(props) => !!props.width && css`
    width: ${props.width};
  `}
  height: 100%;
`

const Container = styled(View)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  flex-direction: row;
`

const RestContainer = styled(View)`
  background-color: ${colors.cream.alpha(0.5).css()};
  height: 100%;
  width: 100%;
`

const mapStateToProps = (state) => ({
  sideMenu: state.sideMenu,
})

const mapDispatchToProps = {
  ...sideActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer)
