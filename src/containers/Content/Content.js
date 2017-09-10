import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import Tree from '../../commons/components/Tree';
import actions from '../../actions/neuronActions';

const ContentScreen = styled(View)`
  flex: 1;
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
          <Text>Contenido</Text>
        </ContentScreen>
        <Navbar/>
      </MoiBackground>
    );
  }
}

Tree.propTypes = {
  title: PropTypes.string,
};
