import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import MoIcon from '../MoIcon/MoIcon';

const TabIconContainer = styled(View)`
  justify-content: center;
  align-items: center;
`;

const Title = styled(Text)`
  margin-top: 5;
  font-size: ${props => props.titleSize};
`;

export default class TabIcon extends Component {
  render() {
    const { name, size, title, selected, titleSize } = this.props;

    return (
      <TabIconContainer>
        <MoIcon name={name} size={size} active={selected} />
        <Title titleSize={titleSize} >{title}</Title>
      </TabIconContainer>
    );
  }
}

TabIcon.defaultProps = {
  size: 40,
  titleSize: 11,
  type: 'moi',
};

TabIcon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number,
  title: PropTypes.string,
  selected: PropTypes.bool,
  titleSize: PropTypes.number,
  type: PropTypes.string,
};
