import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import { ContentBox } from '../../commons/components/ContentComponents';
import Navbar from '../../commons/components/Navbar/Navbar';
import { BottomBarWithButtons } from '../../commons/components/SceneComponents';
import userActions from '../../actions/userActions';
import TasksContainer from './TasksContainer';
import PassiveMessageAlert from '../../commons/components/Alert/PassiveMessageAlert';

@connect(store => ({
  device: store.device,
  scene: store.routes.scene,
  showPassiveMessage: store.user.showPassiveMessage,
}), {
  showPassiveMessageAsync: userActions.showPassiveMessageAsync,
})
class Tasks extends Component {
  render() {
    const { device, scene, showPassiveMessage, showPassiveMessageAsync } = this.props;

    const contentBox = (
      <ContentBox>
        <TasksContainer />
      </ContentBox>
    );

    return (
      <MoiBackground>
        {contentBox}
        <Navbar />
        <BottomBarWithButtons width={device.dimensions.width} />

        <PassiveMessageAlert
            isOpenPassiveMessage={showPassiveMessage && scene.name === 'tasks'}
            touchableProps={{
              onPress: () => {
                showPassiveMessageAsync(false);
              }
            }}
            message='Revisa y completa tus tareas para recibir distintas recompensas'
          />
      </MoiBackground>
    );
  }
}

Tasks.propTypes = {
  device: PropTypes.object,
  neuron_id: PropTypes.number,
};

export default Tasks;
