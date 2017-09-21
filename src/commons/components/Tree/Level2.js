import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import Level1 from './Level1';
import Neuron from './Neuron';

// branch images
import descubiertaRight from '../../../../assets/images/tree/nivel_2/nivel_2_descubierta_right.png';
import descubiertaRightCenter from '../../../../assets/images/tree/nivel_2/nivel_2_descubierta_right_center.png';
import descubiertaLeftCenter from '../../../../assets/images/tree/nivel_2/nivel_2_descubierta_left_center.png';
import descubiertaLeft from '../../../../assets/images/tree/nivel_2/nivel_2_descubierta_left.png';

const sideBranchHeight = 573;
const sideBranchWidth = 397;
const aspectSideBranch = sideBranchWidth / sideBranchHeight;

const RightBranch = styled(Image)`
  width: ${props => props.width};
  height: ${props => Math.round(props.width / aspectSideBranch)};
  position: absolute;
  left: 30;
  bottom: 3;
  overflow: visible;
`;

const LeftBranch = styled(Image)`
  width: ${props => props.width};
  height: ${props => Math.round(props.width / aspectSideBranch)};
  position: absolute;
  right: 16;
  bottom: 4;
  overflow: visible;
`;

const simpleBranchHeight = 496;
const simpleBranchWidth = 270;
const aspectSimpleBranch = simpleBranchWidth / simpleBranchHeight;

const LeftCenterBranch = styled(Image)`
  width: ${props => props.width};
  height: ${props => Math.round(props.width / aspectSimpleBranch)};
  position: absolute;
  right: 10;
  bottom: 80;
  overflow: visible;
`;

const RightCenterBranch = styled(Image)`
  width: ${props => props.width};
  height: ${props => Math.round(props.width / aspectSimpleBranch)};
  position: absolute;
  bottom: 75;
  left: 35;
  overflow: visible;
`;

const Container = styled(View)`
  flex: 1;
  position: relative;
`;

const BranchContainer = styled(View)`
  flex: 1;
  width: 50;
  position: relative;
  bottom: 50;
  justify-content: flex-end;
  align-self: center;
`;


@connect(store => ({
  userTree: store.tree.userTree,
}))
export default class Level2 extends Component {
  static propTypes = {
    width: PropTypes.number,
    userTree: PropTypes.object,
  }

  render() {
    const { userTree } = this.props;
    const { tree } = userTree;
    const neuronConfig = {
      left: {
        color: 'orange',
        name: 'Izquierda',
        id: 2,
        contentsLearned: 4,
        totalContents: 5,
        position: { left: -10, top: -17 },
      },
      right: {
        color: 'blue',
        name: 'Derecha',
        id: 3,
        contentsLearned: 0,
        totalContents: 8,
        position: { right: -67, top: -20 },
      },
      rightCenter: {
        color: 'dark_orange',
        name: 'Derecha',
        id: 4,
        contentsLearned: 3,
        totalContents: 5,
        position: { right: -20, top: -10 },
      },
      leftCenter: {
        color: 'green',
        name: 'Derecha',
        id: 5,
        contentsLearned: 0,
        totalContents: 2,
        position: { right: -5, top: -20 },
      },
    };

    return (
      <Container>
        <Level1>
          <BranchContainer>

            <RightBranch
              width={100}
              source={descubiertaRight}
              resizeMode='contain'
            >
              <Neuron {...neuronConfig.right} />
            </RightBranch>

            <RightCenterBranch
              width={70}
              source={descubiertaRightCenter}
              resizeMode='contain'
            >
              <Neuron {...neuronConfig.rightCenter} />
            </RightCenterBranch>

            <LeftCenterBranch
              width={70}
              source={descubiertaLeftCenter}
              resizeMode='contain'
            >
              <Neuron {...neuronConfig.leftCenter} />
            </LeftCenterBranch>

            <LeftBranch
              width={100}
              source={descubiertaLeft}
              resizeMode='contain'
            >
              <Neuron {...neuronConfig.left} />
            </LeftBranch>

          </BranchContainer>
        </Level1>
      </Container>
    );
  }
}
