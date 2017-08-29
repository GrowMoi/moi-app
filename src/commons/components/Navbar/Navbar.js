import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Image, StatusBar, View } from 'react-native';
import styled from 'styled-components/native';
import navbarImageLandscape from '../../../../assets/images/navbar/barra_sup_landscape.png';
import navbarImagePortrait from '../../../../assets/images/navbar/barra_superior_portrait.png';
import { Size } from '../../styles';
import { LANDSCAPE } from '../../../constants';

const Bar = styled(View)`
  position: absolute;
  left: 0;
  right: 0;
  top: -2;
  height: ${Size.navbarHeight};
`;

const BackgroundImage = styled(Image)`
  position: relative;
  flex: 1;
  width: ${props => props.width};
  height: ${Size.navbarHeight};
`;

const mapStateToProps = state => ({
  device: state.device,
});

@connect(mapStateToProps)
class Navbar extends Component {
  static propTypes = {
    device: PropTypes.object,
  }

  goToProfile = () => {
    Actions.profile();
  }

  render() {
    const { device } = this.props;
    const { width, orientation } = device.dimensions;
    const currentImage = orientation === LANDSCAPE ? navbarImageLandscape : navbarImagePortrait;

    return (
      <Bar>
        <StatusBar hidden />
        <BackgroundImage
          resizeMode='stretch'
          width={width}
          source={currentImage}
        />
      </Bar>
    );
  }
}

export default Navbar;
