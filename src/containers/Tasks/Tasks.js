import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { View, FlatList } from 'react-native';
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

@connect(store => ({
  device: store.device,
}), {
  loadUserContentTasksAsync: userActions.loadUserContentTasksAsync,
})
class Tasks extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.getCurrentTasks();
  }

  getCurrentTasks = async () => {
    const { loadUserContentTasksAsync } = this.props;
    await loadUserContentTasksAsync(1);

    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;
    const { device } = this.props;
    // const widthContentPreview = device.dimensions.width > 320 ? 110 : 100;

    // const containerStyles = {
    //   width: (device.dimensions.width - Size.spaceMediumLarge),
    //   paddingHorizontal: Size.spaceSmall,
    // };

    const contentBox = !loading && (
      <ContentBox>
        <TasksContainer />
      </ContentBox>
    );

    return (
      <MoiBackground>
        {contentBox}
        {loading && <Preloader />}
        <Navbar />
        <BottomBarWithButtons width={device.dimensions.width} />
      </MoiBackground>
    );
  }
}

Tasks.propTypes = {
  device: PropTypes.object,
  neuron_id: PropTypes.number,
};

export default Tasks;
