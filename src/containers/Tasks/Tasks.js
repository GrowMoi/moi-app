import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import { ContentBox, ContentPreview } from '../../commons/components/ContentComponents';
// import { Size } from '../../commons/styles';
// import { normalize } from '../../commons/utils';
import Preloader from '../../commons/components/Preloader/Preloader';
import Navbar from '../../commons/components/Navbar/Navbar';
import { BottomBarWithButtons } from '../../commons/components/SceneComponents';
import userActions from '../../actions/userActions';
import TasksContainer from './TasksContainer';
import UserInactivity from 'react-native-user-inactivity'
import PassiveMessageAlert from '../../commons/components/Alert/PassiveMessageAlert'

@connect(store => ({
  device: store.device,
  scene: store.routes.scene,
}))
class Tasks extends Component {
  state = {
    isOpenPassiveMessage: false,
  }

  render() {
    const { device, scene } = this.props;
    const { isOpenPassiveMessage } = this.state
    // const widthContentPreview = device.dimensions.width > 320 ? 110 : 100;

    // const containerStyles = {
    //   width: (device.dimensions.width - Size.spaceMediumLarge),
    //   paddingHorizontal: Size.spaceSmall,
    // };

    const contentBox = (
      <ContentBox>
        <TasksContainer />
      </ContentBox>
    );

    return (
      <UserInactivity
        timeForInactivity={6000}
        onAction={(isActive) => {
          if(!isActive && scene.name === 'tasks') {
            Keyboard.dismiss()
            this.setState({ isOpenPassiveMessage: !isActive })
          }
        }}
      >
        <MoiBackground>
          {contentBox}
          <Navbar />
          <BottomBarWithButtons width={device.dimensions.width} />

          <PassiveMessageAlert
              isOpenPassiveMessage={isOpenPassiveMessage}
              touchableProps={{
                onPress: () => {
                  this.setState(prevState => ({ isOpenPassiveMessage: !prevState.isOpenPassiveMessage }))
                }
              }}
              message='Revisa y completa tus tareas para recibir distintas recompensas'
            />
        </MoiBackground>
      </UserInactivity>
    );
  }
}

Tasks.propTypes = {
  device: PropTypes.object,
  neuron_id: PropTypes.number,
};

export default Tasks;
