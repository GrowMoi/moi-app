import React, { Component } from 'react';
import { ScrollView, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import uuid from 'uuid/v4';
import { ContentPreview, ContentBox } from '../../commons/components/ContentComponents';
import { normalize } from '../../commons/utils';
import EmptyState from '../../commons/components/EmptyState';
import { connect } from 'react-redux';

@connect(store => ({
  neuronSelected: store.neuron.neuronSelected,
  device: store.device,
  route: store.route,
}))
export default class ContentListBox extends Component {

  onPressRowcontent = (content) => {
    const { neuronSelected, neuronId } = this.props;

    Actions.singleContent({
      content_id: content.id,
      neuron_id: neuronId,
      title: neuronSelected.title,
    });
  }

  filterReadedContents = (contents = []) => {
   return contents.filter(d => (!d.read || d.learnt));
  }

  render() {
    const { containerStyles, device, neuronSelected } = this.props;
    const widthContentPreview = device.dimensions.width > 320 ? 110 : 100;

    const contents = this.filterReadedContents((neuronSelected || {}).contents);
    const existContentsToRead = (contents || []).length > 0;

    return (
      <ContentBox>
        {existContentsToRead && (
          <ScrollView contentContainerStyle={containerStyles}>
            {(contents || []).map((content, i) => {

              const normalizeKind = `¿${normalize.normalizeFirstCapLetter(content.kind)}?`;
              const oddInverted = i % 2 === 1;

              const MILLISECONDS = 100;
              const delay = MILLISECONDS * i;

              return (
                <ContentPreview
                  learnt={content.learnt}
                  animationDelay={delay}
                  key={`${uuid()}-${content.id}`}
                  width={widthContentPreview}
                  onPress={e => this.onPressRowcontent(content)}
                  inverted={oddInverted}
                  title={content.title || ''}
                  subtitle={normalizeKind}
                  source={{ uri: content.media[0] }}
                />
              );
            })}
          </ScrollView>
        )}

        {!existContentsToRead &&
          <EmptyState text='Ya haz leido todos los contenidos en esta neurona' />
        }
      </ContentBox>
    )
  }
}
