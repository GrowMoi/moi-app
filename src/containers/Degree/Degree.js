import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Modal, Text } from 'react-native';
// import { Video as ExpoVideo, ScreenOrientation } from 'expo';
import Ionicons from '@expo/vector-icons/Ionicons';
import styled from 'styled-components/native';
// import { getHeightAspectRatio } from '../../utils';
// import { Palette } from '../../styles';

// Actions
import userActions from '../../actions/userActions';

const Overlay = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 0, 255, 0.8);
`;

const CloseIcon = styled(Ionicons)`
  position: absolute;
  top: 20;
  right: 20;
  zIndex: 1;
  background-color: transparent;
`;

@connect(store => ({
  finalTestResult: store.user.finalTestResult,
}),
{
  saveResultFinalTest: userActions.saveResultFinalTest,
})
class Degree extends Component {

  constructor(props) {
    super(props);
    this.removeResultFinalTest = this.removeResultFinalTest.bind(this);
  }

  removeResultFinalTest() {
    console.log("eliminar el final test");
    const { saveResultFinalTest } = this.props;
    saveResultFinalTest(null);
  }

  render() {
    const { animationType, modalProps,  finalTestResult} = this.props;
		console.log("​Degree -> render -> finalTestResult", finalTestResult.time)

    const showModal = !!finalTestResult;

    return (
          <Modal {...modalProps}
            animationType={animationType}
            visible={showModal}
            transparent={true}
          >
            <Overlay>
              <CloseIcon
                name='md-close'
                color='white'
                size={35}
                onPress={this.removeResultFinalTest}
              />
              <Text>
                Contenido del diploma
              </Text>
            </Overlay>
          </Modal>
        );
  }

}

Degree.defaultProps = {
  animationType: 'fade',
  visible: false,
}

export default Degree;
