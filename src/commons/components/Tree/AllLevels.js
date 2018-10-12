import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getHeightAspectRatio } from '../../utils';
import NeuronsLayer from './NeuronsLayer';
import neuronActions from '../../../actions/neuronActions';
import Branches from './allBranches';
import WoodLabel from '../WoodLabel/WoodLabel';
import Preloader from '../Preloader/Preloader';

import arbolNivel3Gris from '../../../../assets/images/tree/arbol_adulto/gris/arbol_nivel3_gris.png';
import arbolNivel4Gris from '../../../../assets/images/tree/arbol_adulto/gris/arbol_nivel4_gris.png';
import arbolNivel5Gris from '../../../../assets/images/tree/arbol_adulto/gris/arbol_nivel5_gris.png';
import arbolNivel6Gris from '../../../../assets/images/tree/arbol_adulto/gris/arbol_nivel6_gris.png';
import arbolNivel7Gris from '../../../../assets/images/tree/arbol_adulto/gris/arbol_nivel7_gris.png';
import arbolNivel8Gris from '../../../../assets/images/tree/arbol_adulto/gris/arbol_nivel8_gris.png';
import arbolNivel9Gris from '../../../../assets/images/tree/arbol_adulto/gris/arbol_nivel9_gris.png';
import arbolColorNivel2 from '../../../../assets/images/tree/arbol_adulto/nivel_2/arbol_nivel2_color.png';

const Container = styled(TouchableWithoutFeedback)`
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

@connect(state => ({
  label: state.neuron.currentlyPressed,
  device: state.device,
}), {
  setNeuronLabelInfo: neuronActions.setNeuronLabelInfo,
  loadNeuronByIdAsync: neuronActions.loadNeuronByIdAsync,
})
export default class AllLevels extends Component {
  state = {
    loading: false,
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.device.dimensions.orientation !== this.props.device.dimensions.orientation) {
      this.props.setNeuronLabelInfo({});
    }
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

  render() {
    const {
      userTree: { tree, meta: { depth } },
      label,
      zoomScale,
    } = this.props;
    const { loading } = this.state;

    const isLevel4 = depth === 4;
    const isLevel3 = depth === 3;
    const isLevel5 = depth === 5;
    const isLevel6 = depth === 6;
    const isLevel7 = depth === 7;
    const isLevel8 = depth === 8;
    const isLevel9 = depth === 9;

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
      <Container onPress={this.hideWoodLabel}>
        <Levels>
          {isLevel5 && <TreeBase source={arbolNivel5Gris} {...defaultProps}/>}
          {isLevel4 && <TreeBase source={arbolNivel4Gris} {...defaultProps}/>}
          {isLevel3 && <TreeBase source={arbolNivel4Gris} {...defaultProps}/>}
          {isLevel6 && <TreeBase source={arbolNivel6Gris} {...defaultProps}/>}
          {isLevel7 && <TreeBase source={arbolNivel7Gris} {...defaultProps}/>}
          {isLevel8 && <TreeBase source={arbolNivel8Gris} {...defaultProps}/>}
          {isLevel9 && <TreeBase source={arbolNivel9Gris} {...defaultProps}/>}
          <TreeBase source={arbolColorNivel2} {...defaultProps}/>
          <Branches
            level={depth}
            data={tree}
            treeDimensions={treeDimensions}
            width={CURRENT_TREE_WIDTH}
          />
          <NeuronsLayer
            level={depth}
            data={tree}
            treeDimensions={treeDimensions}
            width={CURRENT_TREE_WIDTH}
          />
          {label.pageX && label.pageY &&
            <WoodLabel
              text={label.title}
              onPress={() => {
                this.hideWoodLabel();
                this.playContent();
              }}
              zoomScale={zoomScale}
              style={{
                position: 'absolute',
                top: label.pageY,
                left: label.pageX,
              }}
            />
          }
          {loading && (<Preloader />)}
        </Levels>
      </Container>
    );
  }
}

AllLevels.propTypes = {
  userTree: PropTypes.object,
};
