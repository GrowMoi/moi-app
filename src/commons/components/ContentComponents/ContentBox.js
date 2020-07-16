import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View, ImageBackground } from 'react-native';
import { Size } from '../../styles';
import { getHeightAspectRatio } from '../../utils';

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const width = 622;
const height = 991;
const ContentScreen = styled(ImageBackground)`
  flex: 1;
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(width, height, props.width)};
  justify-content: center;
  border-radius: 10;
  margin-top: ${Size.navbarHeight + Size.spaceXSmall};
  justify-content: flex-start;
  align-items: center;
  padding-bottom: ${Size.paddingBottom};
  padding-top: ${Size.paddingTop};
  padding-left: ${Size.paddingLeft};
  padding-right: ${Size.paddingRight};
`;

class ContentBox extends Component {
  get currentAchievement() {
    const { achievements } = this.props;

    const [achievement] = (achievements || []).filter(item => item.active);
    return achievement;
  }

  getCurrentBox() {
     let currentBox = 'regular_box';
    return currentBox;
  }

  render() {
    const { device: { dimensions: { width } }, image } = this.props;
    const {
      contentContainerStyle,
      style,
      ...rest
    } = this.props;

    const padding = 20;
    return (
      <Container>
        <ContentScreen
          style={style}
          resizeMode='stretch'
          width={(width - padding)}
          source={{uri: image ? image : this.getCurrentBox() }}
          {...rest}>
          {this.props.children}
        </ContentScreen>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  achievements: state.user.achievements,
  device: state.device,
})

ContentBox.propTypes = {
  children: PropTypes.any,
  contentContainerStyle: PropTypes.any,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default connect(
  mapStateToProps,
)(ContentBox)
