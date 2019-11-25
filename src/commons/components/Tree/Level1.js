import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, View, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import Neuron from './Neuron';
import { FLORECIDA } from '../../../constants';
import { neuron } from '../../utils';
import { connect } from 'react-redux';
import neuronActions from '../../../actions/neuronActions';

const treeHeight = 371;
const treeWidth = 213;
const aspect = treeWidth / treeHeight;

const TreeLevel = styled(ImageBackground)`
  width: ${props => props.width};
  height: ${props => Math.round(props.width / aspect)};
  position: absolute;
  bottom: 50;
  align-self: center;
  overflow: visible;
`;

const Container = styled(TouchableWithoutFeedback)`
`;

const LevelContainer = styled(View)`
  width: 100%;
  height: ${props => Math.round(props.width / aspect) + 60};
  position: relative;
  flex: 1;
  overflow: visible;
  align-items: center;
`;

class Level1 extends Component {

  static defaultProps = {
    width: 50,
  }

  static propTypes = {
    width: PropTypes.number,
    userTree: PropTypes.object,
    children: PropTypes.any,
  }

  componentWillMount() {
    const { setHeightTreeContainer, width  } = this.props;
    const heightTree = Math.round(width / aspect);
    setHeightTreeContainer(heightTree + 50);
  }


  hideWoodLabel = () => {
    const { setNeuronLabelInfo } = this.props;
    setNeuronLabelInfo({});
  }

  onPressNeuron = (measure, data) => {
    const { setNeuronLabelInfo, label } = this.props;

    if(data.id === label.id) {
      setNeuronLabelInfo({});
      return;
    }
    setNeuronLabelInfo({ ...measure, ...data });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.device.dimensions.orientation !== this.props.device.dimensions.orientation) {
      this.props.setNeuronLabelInfo({});
    }
  }

  render() {
    const { width, userTree, children, label } = this.props;
    const { tree, meta } = userTree;

    const contentsLearned = tree.root.learnt_contents || 0;
    const totalContents = tree.root.total_approved_contents || 0;

    const treeColor = tree.root.state === FLORECIDA ? 'nivel_1_color' : 'nivel_1_descubierta';
    const neuronColor = tree.root.state === FLORECIDA && 'yellow';
    const NEURON_MIN_SIZE = 50;
    const NEURON_MAX_SIZE = 80;
    const neuronSize = neuron.calculateSize({
      contentsLearned,
      totalContents,
      size: {
        min: NEURON_MIN_SIZE,
        max: NEURON_MAX_SIZE
      }
    });

    return (
      <Container onPress={this.hideWoodLabel}>
        <LevelContainer width={width}>
          {children}
          <TreeLevel
            width={width}
            source={{uri: treeColor}}
            resizeMode='contain'
          >
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Neuron
              onPress={(measure) => this.onPressNeuron(measure, tree.root)}
              color={neuronColor}
              name={tree.root.title}
              id={tree.root.id}
              contentsLearned={contentsLearned}
              totalContents={totalContents}
              size={{ max: 50, min: 45 }}
              position={{ bottom: -37, left: 5 }}
            />
          </View>
          </TreeLevel>
        </LevelContainer>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  label: state.neuron.currentlyPressed,
  device: state.device,
})

const mapDispatchToProps = {
  setNeuronLabelInfo: neuronActions.setNeuronLabelInfo,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Level1)
