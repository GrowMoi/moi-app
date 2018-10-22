import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, View, TouchableWithoutFeedback } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components/native';
import Neuron from './Neuron';
import treeLevel1Gray from '../../../../assets/images/tree/nivel_1/nivel_1_descubierta.png';
import treeLevel1Color from '../../../../assets/images/tree/nivel_1/nivel_1_color.png';
import { FLORECIDA } from '../../../constants';
import WoodLabel from '../WoodLabel/WoodLabel';
import { neuron } from '../../utils';
import { connect } from 'react-redux';
import neuronActions from '../../../actions/neuronActions';
import Preloader from '../Preloader/Preloader';

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
  position: relative;
  flex: 1;
  overflow: visible;
  align-items: center;
`;

@connect(state => ({
  label: state.neuron.currentlyPressed,
  device: state.device,
}), {
  setNeuronLabelInfo: neuronActions.setNeuronLabelInfo,
  loadNeuronByIdAsync: neuronActions.loadNeuronByIdAsync,
})
export default class Level1 extends Component {
  state = {
    loading: false,
  }

  static defaultProps = {
    width: 50,
  }

  static propTypes = {
    width: PropTypes.number,
    userTree: PropTypes.object,
    children: PropTypes.any,
  }

  hideWoodLabel = () => {
    const { setNeuronLabelInfo } = this.props;
    setNeuronLabelInfo({});
  }

  playContent = async () => {
    const { userTree } = this.props;
    const { tree } = userTree;

    await this.getCurrentContents(tree.root.id);
    Actions.content({ title: tree.root.title, neuron_id: tree.root.id });
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
    const { loading } = this.state;
    const { width, userTree, children, label } = this.props;
    const { tree, meta } = userTree;

    const contentsLearned = tree.root.learnt_contents || 0;
    const totalContents = tree.root.total_approved_contents || 0;

    const treeColor = tree.root.state === FLORECIDA ? treeLevel1Color : treeLevel1Gray;
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
        <LevelContainer>
          {(meta || {}).depth === 1 && (
            (label.pageX && label.pageY) && (
              <WoodLabel
                text={label.title}
                onPress={() => {
                  this.hideWoodLabel();
                  this.playContent();
                }}
                style={{
                  position: 'absolute',
                  top: label.pageY,
                  left: label.pageX,
                  transform: [{translate: ['-50%', '-30%', 1] }]
                }}
              />
              )
            )}
          {children}
          <TreeLevel
            width={width}
            source={treeColor}
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
              size={{ max: 80, min: 50 }}
              position={{ top: -25, left: -8 }}
            />
          </View>
          </TreeLevel>
          {loading && (<Preloader />)}
        </LevelContainer>
      </Container>
    );
  }
}
