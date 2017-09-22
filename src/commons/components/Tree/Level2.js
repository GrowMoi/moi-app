import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import Level1 from './Level1';
import Neuron from './Neuron';
import { FLORECIDA } from '../../../constants';

// branch images descubiertas
import descubiertaRight from '../../../../assets/images/tree/nivel_2/nivel_2_descubierta_right.png';
import descubiertaRightCenter from '../../../../assets/images/tree/nivel_2/nivel_2_descubierta_right_center.png';
import descubiertaLeftCenter from '../../../../assets/images/tree/nivel_2/nivel_2_descubierta_left_center.png';
import descubiertaLeft from '../../../../assets/images/tree/nivel_2/nivel_2_descubierta_left.png';

// branch images color
import colorRight from '../../../../assets/images/tree/nivel_2/nivel_2_color_right.png';
import colorRightCenter from '../../../../assets/images/tree/nivel_2/nivel_2_color_right_center.png';
import colorLeftCenter from '../../../../assets/images/tree/nivel_2/nivel_2_color_left_center.png';
import colorLeft from '../../../../assets/images/tree/nivel_2/nivel_2_color_left.png';

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

  currentBranch(index = 0, data) {
    const neuronConfig = {
      left: {
        color: 'blue',
        contentsLearned: 0,
        totalContents: 5,
        position: { left: -10, top: -17 },
      },
      leftCenter: {
        color: 'green',
        contentsLearned: 1,
        totalContents: 2,
        position: { right: -5, top: -20 },
      },
      rightCenter: {
        color: 'yellow',
        id: 4,
        contentsLearned: 3,
        totalContents: 5,
        position: { right: -20, top: -10 },
      },
      right: {
        color: 'fuchsia',
        contentsLearned: 8,
        totalContents: 8,
        position: { right: -67, top: -20 },
      },
    };

    const isflorecida = data.state === FLORECIDA;
    switch (index) {
      case 0:
        return (
          <LeftBranch
            key={index}
            width={100}
            source={isflorecida ? colorLeft : descubiertaLeft}
            resizeMode='contain'
          >
            <Neuron
              id={data.id}
              name={data.title}
              {...neuronConfig.left}
            />
          </LeftBranch>
        );
      case 1:
        return (
          <LeftCenterBranch
            key={index}
            width={70}
            source={isflorecida ? colorLeftCenter : descubiertaLeftCenter}
            resizeMode='contain'
          >
            <Neuron
              id={data.id}
              name={data.title}
              {...neuronConfig.leftCenter}
            />
          </LeftCenterBranch>
        );
      case 2:
        return (
          <RightCenterBranch
            key={index}
            width={70}
            source={isflorecida ? colorRightCenter : descubiertaRightCenter}
            resizeMode='contain'
          >
            <Neuron
              id={data.id}
              name={data.title}
              {...neuronConfig.rightCenter}
            />
          </RightCenterBranch>
        );
      case 3:
        return (
          <RightBranch
            key={index}
            width={100}
            source={isflorecida ? colorRight : descubiertaRight}
            resizeMode='contain'
          >
            <Neuron
              id={data.id}
              name={data.title}
              {...neuronConfig.right}
            />
          </RightBranch>
        );
      default:
        return null;
    }
  }

  render() {
    const { userTree } = this.props;
    const { tree } = userTree;

    const childrenExist = !!tree.root.children;
    if (childrenExist) return null;
    return (
      <Container>
        <Level1>
          <BranchContainer>
            {tree.root.children.length > 0 && (
              tree.root.children.map((child, i) => (
                this.currentBranch(i, child)
              ))
            )}
          </BranchContainer>
        </Level1>
      </Container>
    );
  }
}
