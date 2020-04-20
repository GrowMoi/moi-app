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
import * as routeTypes from '../../routeTypes'

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
            isOpenPassiveMessage={showPassiveMessage && scene.name === routeTypes.TASKS}
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


const mapStateToProps = (state) => ({
  device: state.device,
  scene: state.routes.scene,
  showPassiveMessage: state.user.showPassiveMessage,
})

const mapDispatchToProps = {
  showPassiveMessageAsync: userActions.showPassiveMessageAsync,
}


Tasks.propTypes = {
  device: PropTypes.object,
  neuron_id: PropTypes.number,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tasks);
