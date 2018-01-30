import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { getHeightAspectRatio } from '../../utils';
import resources from './resources';

const width = 108;
const height = 107;
const Container = styled(Image)`
  justify-content: center;
  align-items: center;
  margin-horizontal: 5;
  margin-vertical: 5;
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(width, height, props.width)};
`;

const itemWidth = 70;
const itemHeight = 70;
const ItemImage = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(itemWidth, itemHeight, props.width)};
`

const Item = ({ type = 1, width = 90, onPress, active }) => {
  const paddingForItem = 30;
  const renderTypeItem = resources.getItem(type);
  const box = resources.getBox();

  return (
    <Container source={box} resizeMode='contain' width={width}>
      <TouchableOpacity onPress={onPress}>
        <ItemImage
          source={active ? renderTypeItem.source : renderTypeItem.inactive}
          resizeMode='contain'
          width={(width - paddingForItem)}
        />
      </TouchableOpacity>
    </Container>
  )
}

export default Item;
