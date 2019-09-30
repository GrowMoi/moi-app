import React, { PureComponent } from 'react';
import { View, Modal } from 'react-native';
import { connect } from 'react-redux';
import deviceUtils from '../../commons/utils/device-utils';


class MoiModal extends PureComponent {
  get heigthModal() {
    const { device } = this.props;
    const isAndroidLandscape = deviceUtils.isAndroidLandscape(device.dimensions);
    const percent = isAndroidLandscape ? device.heightPercent : 100;
    return `${percent}%`;
  }

  render() {
    const { device, children, ...rest } = this.props;
    return (
      <Modal {...rest}>
        <View style={{width: '100%', height: this.heigthModal}}>
          {children}
        </View>
      </Modal>
    );
  }
};

const mapStateToProps = (state) => ({
  device: state.device,
})

export default connect(mapStateToProps)(MoiModal)
