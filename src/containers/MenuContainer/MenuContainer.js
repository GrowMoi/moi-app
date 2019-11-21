import React, { Component } from 'react'
import { View, TouchableWithoutFeedback, Animated, Dimensions, Easing } from 'react-native'
import SideMenu from '../../commons/components/Drawer/SideMenu'
import deviceUtils from '../../commons/utils/device-utils';

// Redux
import { connect } from 'react-redux'
import * as sideActions from '../../actions/sideActions'

// styles
import styled, { css } from 'styled-components/native'
import { Palette } from '../../commons/styles'
import { Actions, ActionConst } from 'react-native-router-flux';

const { colors } = Palette;
const isTablet = deviceUtils.isTablet()

class MenuContainer extends Component {
  state = {
    MENU_WIDTH: isTablet ? 350 : 250,
    translateX: new Animated.Value(0),
    opacity: new Animated.Value(0),
  }

  animateMenu = (easing, value = 1) => {
    Animated.parallel([
      Animated.timing(
        this.state.translateX,
        {
          toValue: value,
          duration: 200,
          useNativeDriver: true,
          easing,
        }
      ),
      Animated.timing(
        this.state.opacity,
        {
          toValue: value,
          duration: 50,
          delay: 200,
          useNativeDriver: true,
        }
      )
    ]).start();
  }

  closeMenu = () => {
    this.props.sideMenuClose();
    Animated.parallel([
      Animated.timing(
        this.state.translateX,
        {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }
      ),
      Animated.timing(
        this.state.opacity,
        {
          toValue: 0,
          delay: 0,
          duration: 0,
          useNativeDriver: true,
          easing: Easing.in(Easing.ease),
        }
      )
    ]).start();
  }

  componentWillReceiveProps(props) {
    if(props.sideMenu.menuIsOpen) {
      Animated.parallel([
        Animated.timing(
          this.state.translateX,
          {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.ease),
          }
        ),
        Animated.timing(
          this.state.opacity,
          {
            toValue: 1,
            duration: 150,
            delay: 150,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }
        )
      ]).start();
    }
  }

  render() {
    const { device: { dimensions = {} } } = this.props;
    const { MENU_WIDTH } = this.state;

    return (
      <Container style={{
        width: dimensions.width,
        transform: [{
          translateX: this.state.translateX.interpolate({
            inputRange: [0, 1],
            outputRange: [0, dimensions.width]
          })
        }]
          }}>
        <TouchableWithoutFeedback onPress={this.closeMenu}>
          <RestContainer style={{
            opacity: this.state.opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.3],
            })
          }}/>
        </TouchableWithoutFeedback>

        <MenuContent width={MENU_WIDTH}>
          <SideMenu
            onClose={this.closeMenu}
            width={MENU_WIDTH}
            onPressOption={(option) => {
              this.closeMenu();
              Actions[option.id]({ type: ActionConst.RESET });
            }}
          />
        </MenuContent>
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

const Container = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: -100%;
  height: 100%;
  width: 100%;
  flex-direction: row;
`

const RestContainer = styled(Animated.View)`
  position: absolute;
  left: 0;
  top: 0;
  background-color: ${colors.blue};
  height: 100%;
  width: 100%;
`

const mapStateToProps = (state) => ({
  sideMenu: state.sideMenu,
  device: state.device,
})

const mapDispatchToProps = {
  ...sideActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer)
