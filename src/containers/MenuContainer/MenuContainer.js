import React from 'react'
import { View, Text } from 'react-native'
import { Palette } from '../../commons/styles'
import SideMenu from '../../commons/components/Drawer/SideMenu'
import styled, { css } from 'styled-components/native'

const { colors } = Palette;

const MenuContainer = (props) => {
  const MENU_WIDTH = 250;

  return (
    <Container>
      <MenuContent width={MENU_WIDTH}>
        <SideMenu width={MENU_WIDTH} />
      </MenuContent>

      <RestContainer />
    </Container>
  )
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

export default MenuContainer
