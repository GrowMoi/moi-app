import React, { Component } from 'react';
import { Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import { LANDSCAPE } from '../../../constants';
import { Size } from '../../styles';

// const Bar = styled(Image)`
//   height: ${Size.bottomBarHeight};
//   width: ${props => props.width};
//   position: absolute;
//   bottom: -2;
// `;
const Bar = styled(Image)`
  height: ${Size.bottomBarHeight};
  width: 100%;
  position: absolute;
  bottom: -2;
`;

class BottomBar extends Component {
  static propTypes = {
    device: PropTypes.object,
  }

  render() {
    const { device } = this.props;
    const { orientation } = device.dimensions;
    // const currentImage = orientation === LANDSCAPE ? 'bottom_bar_landscape' : 'bottom_bar';

    //FIXME: temporarily orientation blocked
    const width = Dimensions.get('window').width;

    return (<Bar width={width} source={{uri: 'bottom_bar'}} resizeMode='stretch' />);
  }
}

const mapStateToProps = (state) => ({
  device: state.device,
})

export default connect(mapStateToProps)(BottomBar)
