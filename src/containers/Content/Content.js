import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import Tree from '../../commons/components/Tree';
import actions from '../../actions/neuronActions';
import { Size, Palette } from '../../commons/styles';

const ContentScreen = styled(View)`
  flex: 1;
  border-radius: 10;
  shadow-color: ${Palette.dark};
  shadow-opacity: 0.5;
  shadow-offset: -5px 5px;
  shadow-radius: 2;
  margin-top: ${Size.navbarHeight + Size.spaceXSmall};
  margin-horizontal: ${Size.spaceSmall};
  margin-bottom: ${Size.spaceSmall};
  background-color: #96be59;
  justify-content: flex-start;
  align-items: center;
`;

@connect(store => ({
  neuron: store.neuron,
}),
{
  loadNeuronByIdAsync: actions.loadNeuronByIdAsync,
})
export default class ContentScene extends Component {
  componentDidMount() {
    const { loadNeuronByIdAsync } = this.props;
    loadNeuronByIdAsync(1);
  }

  render() {
    return (
      <MoiBackground>
        <ContentScreen>
          <Text>Contenido...</Text>
        </ContentScreen>
        <Navbar/>
      </MoiBackground>
    );
  }
}

Tree.propTypes = {
  title: PropTypes.string,
};
