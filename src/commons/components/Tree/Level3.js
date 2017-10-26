import React, { Component } from 'react';
import { View, Image, Dimensions } from 'react-native';
import styled from 'styled-components/native';

import arbolNivel3Gris from '../../../../assets/images/tree/arbol_adulto/gris/arbol_nivel3_gris.png';
import arbolColorNivel2 from '../../../../assets/images/tree/arbol_adulto/nivel_2/arbol_nivel2_color.png';


const { width, height } = Dimensions.get('window');

const Container = styled(View)`
  flex: 1;
  position: relative;
`;

const TreeBase = styled(Image)`
  bottom: 0;
  left: 0;
  position: absolute;
`;

const Tree2 = TreeBase.extend``;

const Levels = styled(View)`
  bottom: 40;
  width: ${width};
  position: relative;
  overflow: visible;
`;

export default class Level3 extends Component {
  render() {
    const { userTree } = this.props;

    return (
      <Container>
        {!!userTree.tree && (
          <Levels>
            <TreeBase source={arbolColorNivel2} resizeMode='contain'/>
            <Tree2 source={arbolNivel3Gris} resizeMode='contain' />
          </Levels>
        )}
      </Container>
    );
  }
}
