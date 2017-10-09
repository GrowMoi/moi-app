import React, { Component } from 'react';
import {
  View,
  Alert,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import { BottomBarWithButtons } from '../../commons/components/SceneComponents';
import { ContentBox } from '../../commons/components/ContentComponents';
import actions from '../../actions/neuronActions';
import Preloader from '../../commons/components/Preloader/Preloader';
import { TextBody, Header } from '../../commons/components/Typography';
import Carousel from '../../commons/components/Carousel/Carousel';
import MoiIcon from '../../commons/components/MoIcon/MoIcon';
import { Palette, Size } from '../../commons/styles';
import ActionsHeader from './ActionsContentMax';
import NoteInput from '../../commons/components/NoteInput/NoteInput';
import YoutubePlayer from '../../commons/components/VideoPlayer/YoutubePlayer';
import { youtube } from '../../commons/utils';

const { width } = Dimensions.get('window');

const HeaderContent = styled(View)`
  margin-vertical: ${Size.spaceSmall};
  align-items: center;
`;

const Section = styled(View)`
  margin-bottom: ${(props) => {
    if (props.notBottomSpace) return 0;
    return Size.spaceLarge;
  }};
`;

const TextLeftBorder = styled(View)`
  padding-left: ${Size.spaceSmall};
  margin-left: ${Size.spaceSmall};
  border-color: transparent;
  border-left-width: 1;
  border-left-color: ${Palette.white.alpha(0.3).css()};
`;

const Source = styled(View)`
  align-items: flex-start;
`;
const Divider = styled(View)`
  height: 1;
  background-color: ${(props) => {
    if (props.color) return props.color;
    return Palette.white.alpha(0.5).css();
  }};
  margin-vertical: 3;
  align-self: stretch;
`;

const VideoImg = styled(Image)`
  width: 130;
  height: 100;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: ${Size.spaceSmall};
`;
const VideoContainer = styled(View)`
  flex: 1;
  flex-flow: row wrap;
  justify-content: space-around;
  margin-vertical: ${Size.spaceSmall};
`;
const PlayIcon = styled(FontAwesome)`
  color: ${Palette.white};
  position: absolute;
  background-color: transparent;
  opacity: 0.8;
`;

const styles = StyleSheet.create({
  scrollContainer: {
    alignSelf: 'stretch',
  },
});

@connect(store => ({
  contentSelected: store.neuron.contentSelected,
  currentNeuron: store.neuron.neuronSelected,
  device: store.device,
}), {
  loadContentByIdAsync: actions.loadContentByIdAsync,
})
export default class SingleContentScene extends Component {
  state = {
    loading: true,
    videoModalVisible: false,
    currentVideoId: '',
  }

  componentDidMount() {
    this.loadContentAsync();
  }

  loadContentAsync = async () => {
    const { loadContentByIdAsync, content_id, neuron_id } = this.props;
    await loadContentByIdAsync(neuron_id, content_id);

    this.setState({ loading: false });
  }

  setModalVisible(visible, currentId = '') {
    this.setState({
      videoModalVisible: visible,
      currentVideoId: currentId,
    });
  }

  render() {
    const { contentSelected, device } = this.props;
    const {
      loading,
      videoModalVisible,
      currentVideoId,
    } = this.state;

    return (
      <MoiBackground>
        {loading && <Preloader />}
        {!loading && (
          <ContentBox>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

              <HeaderContent>
                <Header bolder inverted>{contentSelected.content.title}</Header>
              </HeaderContent>

              <Carousel
                showsPagination
                loop
                autoplay
                size={{ height: 200, width: (width - Size.spaceLarge) }}
                images={contentSelected.content.media}
              />

              <ActionsHeader>
                <MoiIcon onPress={() => Alert.alert('Fav Clicked')} name='fav' size={20} />
                <Ionicons onPress={() => Alert.alert('Circle Clicked')} name='md-information-circle' size={20} color={Palette.white.css()} />
                <Ionicons name='ios-more' size={20} color={Palette.white.css()} />
              </ActionsHeader>

              <Section>
                <TextBody inverted>{contentSelected.content.description}</TextBody>
                <Source>
                  <TextBody bolder color={Palette.dark}>Fuente</TextBody>
                  <Divider color={Palette.dark.alpha(0.2).css()} />
                  <TextBody inverted>{contentSelected.content.source}</TextBody>
                </Source>
              </Section>

              <Section>
                <Header inverted bolder>Links</Header>
                {contentSelected.content.links.map((link, i) => (
                  <TextLeftBorder key={i}>
                    <TextBody inverted>{link}</TextBody>
                  </TextLeftBorder>
                ))}
              </Section>

              <Section>
                <Header inverted bolder>Notas</Header>
                <TextLeftBorder>
                  <NoteInput text={contentSelected.content.user_notes} />
                </TextLeftBorder>
              </Section>

              <Section notBottomSpace>
                <Header inverted bolder>Recomendados</Header>
                <VideoContainer>
                  {contentSelected.content.videos &&
                    contentSelected.content.videos.length > 0 &&
                    contentSelected.content.videos.map((video, i) => {
                      const videoId = youtube.extractIdFromUrl(video.url);

                      return (
                        <TouchableWithoutFeedback key={i} onPress={() => this.setModalVisible(!this.state.videoModalVisible, videoId)}>
                          <VideoImg
                            source={{ uri: `https:${video.thumbnail}` }}
                            resizeMode="cover"
                          >
                            <PlayIcon name='play-circle' size={40} />
                          </VideoImg>
                        </TouchableWithoutFeedback>
                      );
                    })
                  }
                </VideoContainer>
              </Section>

            </ScrollView>
          </ContentBox>
        )}

        <Navbar/>
        <BottomBarWithButtons width={device.dimensions.width}/>
        {/* Modal */}
        <YoutubePlayer
          videoId={currentVideoId}
          visible={videoModalVisible}
          onPressClose={() => this.setModalVisible(false)}
        />
      </MoiBackground>
    );
  }
}

SingleContentScene.propTypes = {
  title: PropTypes.string,
  contentSelected: PropTypes.object,
  device: PropTypes.object,
};
