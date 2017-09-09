import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, Text } from 'react-native';
import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import Tree from '../../commons/components/Tree';

const ContentScreen = styled(View)`
  flex: 1;
`;

export default class ContentScene extends Component {
  render() {
    console.log(this.props);
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
