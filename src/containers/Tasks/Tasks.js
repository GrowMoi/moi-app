import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import { ContentBox, ContentPreview } from '../../commons/components/ContentComponents';
import { Size } from '../../commons/styles';
import { normalize } from '../../commons/utils';
import Preloader from '../../commons/components/Preloader/Preloader';
import Navbar from '../../commons/components/Navbar/Navbar';
import { BottomBarWithButtons } from '../../commons/components/SceneComponents';
import userActions from '../../actions/userActions';

@connect(store => ({
  neuronSelected: store.neuron.neuronSelected,
  device: store.device,
  user: store.user,
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

  onPressRowcontent = (e, content) => {
    const { neuronSelected, neuron_id } = this.props;

    Actions.singleContent({
      content_id: content.id,
      title: neuronSelected.neuron.title,
      neuron_id,
    });
  }

  render() {
    const { loading } = this.state;
    const { device, user: { tasks } } = this.props;
    const widthContentPreview = device.dimensions.width > 320 ? 150 : 100;

    const containerStyles = {
      width: (device.dimensions.width - Size.spaceLarge),
      paddingHorizontal: Size.spaceSmall,
    };

    const contentBox = !loading && (
      <ContentBox>
        <ScrollView contentContainerStyle={containerStyles}>
          {!!tasks &&
            tasks.meta.total_items > 0 &&
            tasks.content_tasks.content_tasks.map((content, i) => {
              const normalizeKind = `¿${normalize.normalizeFirstCapLetter(content.kind)}?`;
              const oddInverted = i % 2 === 1;

              return (
                <ContentPreview
                  closeButton
                  id={content.id}
                  onPressCloseButton={id => console.log('CLOSE CONTENT', id)}
                  width={widthContentPreview}
                  onPress={e => this.onPressRowcontent(e, content)}
                  inverted={oddInverted}
                  key={content.id}
                  title={content.title}
                  subtitle={normalizeKind}
                  source={{ uri: content.media[0] }}
                />
              );
            })
          }
        </ScrollView>
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
  neuronSelected: PropTypes.object,
  device: PropTypes.object,
  user: PropTypes.object,
  neuron_id: PropTypes.number,
};

export default Tasks;
