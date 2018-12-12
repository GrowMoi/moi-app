import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Level1 from './Level1';
import Neuron from './Neuron';
import { FLORECIDA } from '../../../constants';
import secondLevelConfig from './neuronConfigs/level2.config';
import WoodLabel from '../WoodLabel/WoodLabel';
import Preloader from '../Preloader/Preloader';

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
      florecidaImg: colorLeft,
      descubiertaImg: descubiertaLeft,
      styles: LeftBranch,
    },
  },

  leftCenter: {
    branch: {
      props: {
        width: 70,
      },
      florecidaImg: colorLeftCenter,
      descubiertaImg: descubiertaLeftCenter,
      styles: LeftCenterBranch,
    },
  },

  rightCenter: {
    branch: {
      props: {
        width: 70,
      },
      florecidaImg: colorRightCenter,
      descubiertaImg: descubiertaRightCenter,
      styles: RightCenterBranch,
    },
  },

  right: {
    branch: {
      props: {
        width: 100,
      },
      florecidaImg: colorRight,
      descubiertaImg: descubiertaRight,
      styles: RightBranch,
    },
  },
};

@connect(state => ({
  label: state.neuron.currentlyPressed,
}), {
  setNeuronLabelInfo: neuronActions.setNeuronLabelInfo,
  loadNeuronByIdAsync: neuronActions.loadNeuronByIdAsync,
})
export default class Level2 extends Component {
  state = {
    loading: false,
  }

  playContent = async () => {
    const { label } = this.props;

    await this.getCurrentContents(label.id);
    Actions.content({ title: label.title, neuron_id: label.id });
  }

  getCurrentContents = async (neuronId) => {
    const { loadNeuronByIdAsync } = this.props;
    this.setState({ loading: true });
    try {
      await loadNeuronByIdAsync(neuronId);
      this.setState({ loading: false });

    } catch (error) {
      this.setState({ loading: false });
      console.log(error.message);
    }
  }

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

  // playContent = () => {
  //   const { label } = this.props;
  //   Actions.content({ title: label.title, neuron_id: label.id });
  // }

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
        source={isflorecida ? tree.branch.florecidaImg : tree.branch.descubiertaImg }
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
    const { userTree, label } = this.props;
    const { loading } = this.state;

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
          {/* {label.pageX && label.pageY &&
          <WoodLabel
            text={label.title}
            onPress={() => {
              this.hideWoodLabel();
              this.playContent();
            }}
            style={{
              position: 'absolute',
              width: 200,
              top: label.pageY,
              left: label.pageX,
              transform: [{translate: [-70, '-30%', 1] }]
            }}
          />} */}
          {loading && <Preloader style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />}
        </LevelContainer>
      </Container>
    );
  }
}

Level2.propTypes = {
  width: PropTypes.number,
  userTree: PropTypes.object,
};
