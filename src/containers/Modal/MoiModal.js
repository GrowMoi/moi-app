import React, { PureComponent } from 'react';
import { View, Modal } from 'react-native';
import { connect } from 'react-redux';
import deviceUtils from '../../commons/utils/device-utils';


class MoiModal extends PureComponent {
  render() {
    const { device, children, ...rest } = this.props;
    return (
      <Modal {...rest}>
        <View style={{width: '100%', height: '100%'}}>
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
