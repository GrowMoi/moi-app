import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import styled from 'styled-components/native';
import Neuron from './Neuron';
import treeLevel1 from '../../../../assets/images/tree/nivel_1/nivel_1_descubierta.png';

const treeAscpectRatio = (37 / 21);
const TreeLevel1 = styled(Image)`
  width: ${props => props.width};
  height: ${props => treeAscpectRatio * props.width};
  position: absolute;
  bottom: 50;
  align-self: center;
`;

const Container = styled(View)`
  position: relative;
  flex: 1;
`;

export default class Level1 extends Component {
  static defaultProps = {
    width: 50,
  }

  static propTypes = {
    width: PropTypes.number,
  }

  render() {
    const { width } = this.props;
    return (
      <Container>
        <TreeLevel1
          width={width}
          source={treeLevel1}
          resizeMode='contain'
        >
          <Neuron
            position={{
              left: 10,
            }}
          />
        </TreeLevel1>
      </Container>
    );
  }
}
