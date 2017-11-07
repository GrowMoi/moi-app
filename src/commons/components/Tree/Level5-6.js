import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import { getHeightAspectRatio } from '../../utils';
import NeuronsLayer from './NeuronsLayer';
import Branches from './allBranches';

import arbolNivel5Gris from '../../../../assets/images/tree/arbol_adulto/gris/arbol_nivel5_gris.png';
import arbolNivel6Gris from '../../../../assets/images/tree/arbol_adulto/gris/arbol-nivel6_gris.png';
import arbolColorNivel2 from '../../../../assets/images/tree/arbol_adulto/nivel_2/arbol_nivel2_color.png';

const Container = styled(View)`
  flex: 1;
  position: relative;
`;

const treeBaseWidth = 1417;
const treeBaseHeight = 1193;
const TreeBase = styled(Image)`
  position: absolute;
  bottom: 50;
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(treeBaseWidth, treeBaseHeight, props.width)};
  z-index: ${props => props.zIndex || 0};
  overflow: visible;
  justify-content: center;
  align-items: center;
`;

const Levels = styled(View)`
  align-items: center;
  flex: 1;
  overflow: visible;
`;

export default class Level5and6 extends Component {
  render() {
    const { userTree: { tree, meta: { depth } } } = this.props;
    const isLevel5 = depth === 5;
    const isLevel6 = depth === 6;

    const CURRENT_TREE_WIDTH = 320;
    const defaultProps = {
      resizeMode: 'contain',
      width: CURRENT_TREE_WIDTH,
    };

    const treeDimensions = {
      width: treeBaseWidth,
      height: treeBaseHeight,
    };

    return (
      <Container>
        <Levels>
          {isLevel5 && <TreeBase source={arbolNivel5Gris} {...defaultProps}/>}
          {isLevel6 && <TreeBase source={arbolNivel6Gris} {...defaultProps}/>}
          <TreeBase source={arbolColorNivel2} {...defaultProps}/>
          <Branches data={tree} width={CURRENT_TREE_WIDTH} treeDimensions={treeDimensions}/>
          <NeuronsLayer
            level={depth}
            data={tree}
            treeDimensions={treeDimensions}
            width={CURRENT_TREE_WIDTH}
          />
        </Levels>
      </Container>
    );
  }
}

Level5and6.propTypes = {
  userTree: PropTypes.object,
};
