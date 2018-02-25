import React, { Component } from 'react';
import styled from 'styled-components/native';
import {
  ScrollView,
  View,
  FlatList
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import uuid from 'uuid/v4';

// Common Components
import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import { ContentPreview, ContentBox } from '../../commons/components/ContentComponents';
import { BottomBarWithButtons } from '../../commons/components/SceneComponents';
import Preloader from '../../commons/components/Preloader/Preloader';
import { normalize } from '../../commons/utils';
import { Size } from '../../commons/styles';
import { Header } from '../../commons/components/Typography';

// Actions
import neuronActions from '../../actions/neuronActions';
import userActions from '../../actions/userActions';
import EmptyState from '../../commons/components/EmptyState';

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`
const ContentPreviewAnimatable = Animatable.createAnimatableComponent(ContentPreview);

@connect(store => ({
  neuronSelected: store.neuron.neuronSelected,
  device: store.device,
}),
{
  loadNeuronByIdAsync: neuronActions.loadNeuronByIdAsync,
  readContentAsync: userActions.readContentAsync,
})
export default class ContentListScene extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    this.getCurrentContents();
  }

  getCurrentContents = async () => {
    const { loadNeuronByIdAsync, neuron_id } = this.props;
    await loadNeuronByIdAsync(neuron_id);

    this.setState({ loading: false });
  }

  onPressRowcontent = (e, content) => {
    const { neuronSelected, neuron_id } = this.props;

    Actions.singleContent({
      content_id: content.id,
      neuron_id,
      title: neuronSelected.title,
    });
  }

  render() {
    const { loading } = this.state;
    const { neuronSelected, device } = this.props;
    const widthContentPreview = device.dimensions.width > 320 ? 110 : 100;

    const containerStyles = {
      width: (device.dimensions.width - Size.spaceMediumLarge),
      paddingHorizontal: Size.spaceSmall,
    };

    let contents;
    if(neuronSelected !== undefined) {
      contents = (neuronSelected.contents || []).filter(c => !c.read);
    }
    const contentsExist = (contents || []).length > 0;

    return (
      <MoiBackground>
        {!loading ? (
          <ContentBox>
            {contentsExist && (
              <ScrollView contentContainerStyle={containerStyles}>
                {(contents || []).map((content, i) => {
                  const normalizeKind = `¿${normalize.normalizeFirstCapLetter(content.kind)}?`;
                  const oddInverted = i % 2 === 1;

                  const MILLISECONDS = 100;
                  const delay = MILLISECONDS * i;

                  return (
                    <ContentPreview
                      animationDelay={delay}
                      key={`${uuid()}-${content.id}`}
                      width={widthContentPreview}
                      onPress={e => this.onPressRowcontent(e, content)}
                      inverted={oddInverted}
                      title={content.title}
                      subtitle={normalizeKind}
                      source={{ uri: content.media[0] }}
                    />
                  );
                })}
              </ScrollView>
            )}

            {!contentsExist &&
              <EmptyState text='Ya haz aprendido todos los contenidos en esta neurona' />
            }
          </ContentBox>
        ) : (
          <Preloader />
        )}

        <Navbar/>
        <BottomBarWithButtons
          readButton={ false }
          width={device.dimensions.width}
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
