import React, { Component } from 'react';
import {
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import styled, { css } from 'styled-components/native';
import { object } from '../../utils';

import { getHeightAspectRatio } from '../../utils';
import resources from './resources';

const width = 108;
const height = 107;
const Container = styled(ImageBackground)`
  justify-content: center;
  align-items: center;
  margin-horizontal: 5;
  margin-vertical: 5;
  border: solid 0px #40582D;
  border-radius: 13px;
  overflow: hidden;
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(width, height, props.width)};
  ${props => {
      if (props.active) {
        return css`
          border: solid 5px #FFFF;
        `
      }
    }
  }
`;

const TouchableContainer = styled(TouchableOpacity)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`
const ItemImage = styled(Image)`
  width: ${props => props.disabled ? '70%' : '100%'};
  height: ${props => props.disabled ? '70%' : '100%'};
`

class Item extends Component {
  render() {
    const { width = 90, active, disabled, image } = this.props;
    const box = resources.getBox(disabled);

    return (
      <Container
        source={{uri: box}}
        resizeMode='contain'
        width={width}
        active={active}
      >
        <TouchableContainer
          onPress={() => {
            if(this.props.onPress) {
              this.props.onPress();
            }
          }}
        >
          <ItemImage
            disabled={disabled}
            source={{ uri: image }}
            resizeMode='contain'
          />
        </TouchableContainer>
      </Container>
    )
  }
}

export default Item;
