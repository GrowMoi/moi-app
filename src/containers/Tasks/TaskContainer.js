import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from './components/Header';
import TaskTabContainer from './components/TaskTabContainer';
import { connect } from 'react-redux';
import userActions from '../../actions/userActions';
import { Actions } from 'react-native-router-flux';

@connect(store => ({
  neuronSelected: store.neuron.neuronSelected,
  user: store.user,
}), {
  loadUserContentTasksAsync: userActions.loadUserContentTasksAsync,
})

class TasksContainer extends Component {
  componentDidMount() {
    this.getCurrentTasks();
  }

  getCurrentTasks = async () => {
    const { loadUserContentTasksAsync } = this.props;
    await loadUserContentTasksAsync(1);

    this.setState({ loading: false });
  }

  onPressItem = (item) => {
    const { neuronSelected } = this.props;
    const { id, neuron_id, title } = item;

    Actions.singleContent({
      content_id: id,
      title: neuronSelected.title,
      neuron_id,
    });
  }

  render(){
    const { user: { tasks } } = this.props;
    return(
      <View style={styles.container}>
        <Header />
        <ScrollView>
          <View style={styles.scrollContainer}>
            <TaskTabContainer
              data={((tasks.content_tasks || {}).content_tasks || [])}
              title='Tareas'
              icon='md-create'
              onClickItem={item => this.onPressItem(item)}
            />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1,
    width: '90%',
    paddingHorizontal: 10,
  },
  scrollContainer: {
    alignItems: 'center',
  },
})

export default TasksContainer;
