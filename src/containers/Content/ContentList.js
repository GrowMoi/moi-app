import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PassiveMessageAlert from '../../commons/components/Alert/PassiveMessageAlert'

// Common Components
import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import { BottomBarWithButtons } from '../../commons/components/SceneComponents';
import { Size } from '../../commons/styles';
import ContentListBox from './ContentListBox';

// Actions
import userActions from '../../actions/userActions';

@connect(store => ({
  device: store.device,
  scene: store.routes.scene,
  showPassiveMessage: store.user.showPassiveMessage,
}), {
  showPassiveMessageAsync: userActions.showPassiveMessageAsync,
})
export default class ContentListScene extends Component {
  previousScene;

  constructor(props) {
    super(props);
    this.previousScene = null;
  }

  render() {
    const { device, neuron_id, showPassiveMessage, showPassiveMessageAsync, scene } = this.props;

    const containerStyles = {
      width: (device.dimensions.width - Size.spaceMediumLarge),
      paddingHorizontal: Size.spaceSmall,
    };

    return (
      <MoiBackground>
        <ContentListBox
          containerStyles={containerStyles}
          neuronId={neuron_id}
        />

        <Navbar />
        <BottomBarWithButtons
          readButton={false}
          width={device.dimensions.width}
        />

        <PassiveMessageAlert
          isOpenPassiveMessage={showPassiveMessage && scene.name === 'content'}
          touchableProps={{
            onPress: () => {
              showPassiveMessageAsync(false);
            }
          }}
          message='Elige el contenido que más te interese y presiona sobre el'
        />
      </MoiBackground>
    );
  }
}

ContentListScene.propTypes = {
  title: PropTypes.string,
  neuronSelected: PropTypes.object,
  neuron_id: PropTypes.number,
  device: PropTypes.object,
};
