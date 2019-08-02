import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Modal } from 'react-native';
import styled from 'styled-components/native';
import Preloader from '../../commons/components/Preloader/Preloader';
import LeaderBoardContent from './LeaderboardContent';
import CloseIcon from '../Events/CloseIcon';
import { Palette } from '../../commons/styles';
import MoiModal from '../Modal/MoiModal';

const Overlay = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Palette.black.alpha(0.7).css()};
`;

@connect(store => ({
  device: store.device,
}))
class LeaderBoardModal extends Component {
  state = {
    loading: false,
  }

  showLoading = (show = true) => {
    this.setState({ loading: show })
  }

  render() {
    const { animationType, device: { dimensions: { width, height } }, onClose, data, leaderboardParams } = this.props;
    const { loading } = this.state;

    return (
      <Modal
        animationType={animationType}
        visible={true}
        transparent={true}
        supportedOrientations={['portrait', 'landscape']} >
        {loading && <Preloader notFullScreen style={{ position: "absolute", width: width, height: height, zIndex: 10 }} />}
        <Overlay>
          <CloseIcon onPress={onClose} style={{ top: 42, right: 8 }} />
          <LeaderBoardContent data={data} closeModal={onClose} showLoading={this.showLoading} leaderboardParams={leaderboardParams} />
        </Overlay>
      </Modal>
    );
  }
}

export default LeaderBoardModal;
