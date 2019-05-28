import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import Level1 from './Level1';
import Neuron from './Neuron';
import { FLORECIDA } from '../../../constants';
import secondLevelConfig from './neuronConfigs/level2.config';

// Redux
import { connect } from 'react-redux';
import neuronActions from '../../../actions/neuronActions';

const Container = styled(TouchableWithoutFeedback)`
  flex: 1;
  position: relative;
`;

const LevelContainer = styled(View)`
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


const sideBranchHeight = 573;
const sideBranchWidth = 397;
const aspectSideBranch = sideBranchWidth / sideBranchHeight;

const RightBranch = styled(ImageBackground)`
  width: ${props => props.width};
  height: ${props => Math.round(props.width / aspectSideBranch)};
  position: absolute;
  left: 30;
  bottom: 3;
  overflow: visible;
`;

const LeftBranch = styled(ImageBackground)`
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

const LeftCenterBranch = styled(ImageBackground)`
  width: ${props => props.width};
  height: ${props => Math.round(props.width / aspectSimpleBranch)};
  position: absolute;
  right: 10;
  bottom: 80;
  overflow: visible;
`;

const RightCenterBranch = styled(ImageBackground)`
  width: ${props => props.width};
  height: ${props => Math.round(props.width / aspectSimpleBranch)};
  position: absolute;
  bottom: 75;
  left: 35;
  overflow: visible;
`;


const levelConfig = {
  left: {
    branch: {
      props: {
        width: 100,
      },
      florecidaImg: 'nivel_2_color_left',
      descubiertaImg: 'nivel_2_descubierta_left',
      styles: LeftBranch,
    },
  },

  leftCenter: {
    branch: {
      props: {
        width: 70,
      },
      florecidaImg: 'nivel_2_color_left_center',
      descubiertaImg: 'nivel_2_descubierta_left_center',
      styles: LeftCenterBranch,
    },
  },

  rightCenter: {
    branch: {
      props: {
        width: 70,
      },
      florecidaImg: 'nivel_2_color_right_center',
      descubiertaImg: 'nivel_2_descubierta_right_center',
      styles: RightCenterBranch,
    },
  },

  right: {
    branch: {
      props: {
        width: 100,
      },
      florecidaImg: 'nivel_2_color_right',
      descubiertaImg: 'nivel_2_descubierta_right',
      styles: RightBranch,
    },
  },
};

@connect(state => ({
  label: state.neuron.currentlyPressed,
}), {
  setNeuronLabelInfo: neuronActions.setNeuronLabelInfo
})
export default class Level2 extends Component {

  hideWoodLabel = () => {
    const { setNeuronLabelInfo } = this.props;
    setNeuronLabelInfo({});
  }

  onPressNeuron = (measure, data) => {
    const { setNeuronLabelInfo, label } = this.props;

    // Actions.content({ title: data.title, neuron_id: data.id });

    if(data.id === label.id) {
      setNeuronLabelInfo({});
      return;
    }

    setNeuronLabelInfo({ ...measure, ...data });
  }

  renderTreeBranch = (branchDirection, neuronData, index) => {
    const currentNeuron = secondLevelConfig[branchDirection];
    const tree = levelConfig[branchDirection];
    const isflorecida = neuronData.state === FLORECIDA;
    const StyledComponent = tree.branch.styles;

    const neuronPrivateProps = neuronData && {
      onPress: (measure) => this.onPressNeuron(measure, neuronData),
      id: neuronData.id,
      name: neuronData.title,
      contentsLearned: neuronData.learnt_contents,
      totalContents: neuronData.total_approved_contents,
      position: currentNeuron.level2.position,
    };

    return (
      <StyledComponent
        key={index}
        { ...tree.branch.props }
        source={{uri: isflorecida ? tree.branch.florecidaImg : tree.branch.descubiertaImg }}
        resizeMode='contain'
      >
        <Neuron
          { ...currentNeuron.neuron }
          { ...neuronPrivateProps }
        />
      </StyledComponent>
    );
  }

  currentBranch = (data, index = 0) => {
    switch (index) {
      case 0:
        return this.renderTreeBranch('left', data, index);
      case 1:
        return this.renderTreeBranch('leftCenter', data, index);
      case 2:
        return this.renderTreeBranch('rightCenter', data, index);
      case 3:
        return this.renderTreeBranch('right', data, index);
      default:
        return null;
    }
  }

  render() {
    const { userTree } = this.props;

    return (
      <Container onPress={this.hideWoodLabel}>
        <LevelContainer>
          {!!userTree.tree && (
            <Level1 userTree={userTree}>
              <BranchContainer>
                {userTree.tree.root.children.length > 0 && (
                  userTree.tree.root.children.map((child, i) => (
                    this.currentBranch(child, i)
                  ))
                )}
              </BranchContainer>
            </Level1>
          )}
        </LevelContainer>
      </Container>
    );
  }
}

Level2.propTypes = {
  width: PropTypes.number,
  userTree: PropTypes.object,
};
