import React, { Component } from 'react';
import {
  View,
  Alert,
  ScrollView,
  ImageBackground,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {
  WebBrowser,
} from 'expo';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import { BottomBarWithButtons } from '../../commons/components/SceneComponents';
import { ContentBox } from '../../commons/components/ContentComponents';
import Preloader from '../../commons/components/Preloader/Preloader';
import { TextBody, Header } from '../../commons/components/Typography';
import Carousel from '../../commons/components/Carousel/Carousel';
import MoiIcon from '../../commons/components/MoIcon/MoIcon';
import { Palette, Size } from '../../commons/styles';
import ActionsHeader from './ActionsContentMax';
import NoteInput from '../../commons/components/NoteInput/NoteInput';
import { YoutubePlayer } from '../../commons/components/VideoPlayer';
import { youtube } from '../../commons/utils';
import ActionSheet from '../../commons/components/ActionSheets/ActionSheet';

// Redux
import neuronActions from '../../actions/neuronActions';
import userActions from '../../actions/userActions';
// import treeActions from '../../actions/treeActions';

const { width } = Dimensions.get('window');

const HeaderContent = styled(View)`
  margin-vertical: ${Size.spaceSmall};
  align-items: center;
`;

const Icon = styled(Ionicons)`
  background-color: transparent;
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

const VideoImg = styled(ImageBackground)`
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
    paddingHorizontal: Size.spaceSmall,
  },
});

@connect(store => ({
  contentSelected: store.neuron.contentSelected,
  currentNeuron: store.neuron.neuronSelected,
  device: store.device,
  quiz: store.user.quiz,
}), {
  loadContentByIdAsync: neuronActions.loadContentByIdAsync,
  storeTaskAsync: userActions.storeTaskAsync,
  readContentAsync: userActions.readContentAsync,
  loadNeuronByIdAsync: neuronActions.loadNeuronByIdAsync,
  storeNotesAsync: userActions.storeNotesAsync,
  storeAsFavoriteAsync: userActions.storeAsFavoriteAsync,
  // loadTreeAsync: treeActions.loadTreeAsync,
  stopCurrentBackgroundAudio: neuronActions.stopCurrentBackgroundAudio,
  playCurrentBackgroundAudio: neuronActions.playCurrentBackgroundAudio,
})
export default class SingleContentScene extends Component {
  state = {
    loading: true,
    videoModalVisible: false,
    currentVideoId: '',
    actionSheetsVisible: false,
    favorite: false,
  }

  componentDidMount() {
    this.loadContentAsync();
  }

  loadContentAsync = async () => {
    const { loadContentByIdAsync, content_id, neuron_id } = this.props;
    try {
      await loadContentByIdAsync(neuron_id, content_id);
    } catch (error) {
      this.showErrorMessage();
    }

    this.toggleLoading(false);
  }

  setModalVisible(visible, currentId = '') {
    const { stopCurrentBackgroundAudio, playCurrentBackgroundAudio } = this.props;

    this.setState({
      videoModalVisible: visible,
      currentVideoId: currentId,
    });

    if(visible) {
      stopCurrentBackgroundAudio();
    } else {
      playCurrentBackgroundAudio();
    }
  }

  toggleActionSheets = () => {
    const { actionSheetsVisible } = this.state;
    this.setActionSheetVisible(!actionSheetsVisible);
  }

  dismissActionSheets = () => {
    this.setActionSheetVisible(false);
  }

  setActionSheetVisible = (isVisible) => {
    this.setState({ actionSheetsVisible: isVisible });
  }

  showAlert = (description = '', onPress) => {
    Alert.alert('Contenido', description, [{
      text: 'OK',
      onPress,
    }]);
  }

  storeTask = async (neuronId, contentId) => {
    const { storeTaskAsync } = this.props;
    const res = await storeTaskAsync(neuronId, contentId);
    const { data: { exist } } = res;
    if (exist) {
      this.showAlert('Este contenido ya se encuentra almacenado en tus tareas');
    } else {
      this.showAlert('Este contenido fué almacenado correctamente');
    }
  }

  storeNotes = async (neuronId, contentId, notes) => {
    const { storeNotesAsync } = this.props;
    try {
      await storeNotesAsync(neuronId, contentId, notes);
      this.showAlert('Este contenido fué almacenado correctamente');
    } catch (error) {
      this.showAlert('Este contenido no fué almacenado correctamente, intentalo nuevamente');
    }
  }

  storeAsFavorite = async (neuronId, contentId) => {
    const { storeAsFavoriteAsync } = this.props;

    const res = await storeAsFavoriteAsync(neuronId, contentId);
    if (res.status === 200) this.setState({ favorite: res.data.favorite });
  };

  redirectTo = (route) => {
    Actions.refresh(route);
  }

  readContent = async (neuronId, contentId) => {
    const { readContentAsync, loadNeuronByIdAsync } = this.props;
    this.toggleLoading();

    try {
      const res = await readContentAsync(neuronId, contentId);
      const { data } = res;

      if (data.test) {
        Actions.quiz({type: ActionConst.RESET});
      } else {
        this.showAlert(
          'Contenido aprendido',
          async () => {

            try {
              await loadNeuronByIdAsync(neuronId);
              Actions.pop();

            } catch (error) {
             console.log(error);
            }
          },
        );
      }
    } catch (error) {
      console.log('ERROR TO READ CONTENT', error.message);
      this.showErrorMessage();
    }
  };

  showErrorMessage() {
    this.toggleLoading(
      false,
      () => {
        setTimeout(() => {
          this.showAlert('Ha ocurrido un error por favor intentelo de nuevo mas tarde')
        }, 200)
      }
    );
  }

  toggleLoading(display = true, cb) {
    this.setState(prevState => ({
      loading: display
    }), cb);
  }

  handleOpenLinks = (url) => {
    if(url) {
      WebBrowser.openBrowserAsync(url);
    }
  }

  render() {
    const { contentSelected: content, device } = this.props;

    const {
      loading,
      videoModalVisible,
      currentVideoId,
      actionSheetsVisible,
      favorite,
    } = this.state;

    const options = [
      { label: 'Compartir', icon: 'md-share' },
      {
        label: 'Guardar',
        icon: 'md-download',
        fn: () => this.storeTask(content.neuron_id, content.id),
      },
      {
        label: 'Favoritos',
        icon: 'md-star',
        fn: () => (this.storeAsFavorite(content.neuron_id, content.id)),
      },
    ];

    return (
      <MoiBackground>
        {loading && <Preloader />}
        {!loading && (
          <ContentBox>
            <KeyboardAvoidingView keyboardVerticalOffset={50} behavior="padding">
              <ScrollView contentContainerStyle={styles.scrollContainer}>

                <HeaderContent>
                  <Header bolder inverted>{content.title}</Header>
                </HeaderContent>

                <Carousel
                  showsPagination
                  loop
                  autoplay
                  size={{ height: 200, width: (width - Size.spaceXLarge) }}
                  images={content.media}
                />

                <ActionsHeader>
                  {(content.favorite || favorite) && <MoiIcon name='fav' size={20} />}
                  {/* <Icon onPress={() => Alert.alert('Circle Clicked')} name='md-information-circle' size={20} color={Palette.white.css()} /> */}
                  <Icon name='ios-more' size={20} color={Palette.white.css()} onPress={this.toggleActionSheets}/>
                </ActionsHeader>

                <Section>
                  <TextBody inverted>{content.description}</TextBody>
                  <Source>
                    <TextBody bolder color={Palette.dark}>Fuente</TextBody>
                    <Divider color={Palette.dark.alpha(0.2).css()} />
                    <TextBody inverted>{content.source}</TextBody>
                  </Source>
                </Section>

                <Section>
                  <Header inverted bolder>Links</Header>
                  {content.links.map((link, i) => (
                    <TextLeftBorder key={i}>
                      <TouchableOpacity onPress={() => this.handleOpenLinks(link)}>
                        <TextBody inverted>{link}</TextBody>
                      </TouchableOpacity>
                    </TextLeftBorder>
                  ))}
                </Section>

                <Section>
                  <Header inverted bolder>Notas</Header>
                  <TextLeftBorder>
                    <NoteInput
                      text={content.user_notes}
                      onEndEditing={e => this.storeNotes(content.neuron_id, content.id, e.nativeEvent.text)}
                    />
                  </TextLeftBorder>
                </Section>

                <Section notBottomSpace>
                  <Header inverted bolder>Recomendados</Header>
                  <VideoContainer>
                    {content.videos.length &&
                      content.videos.map((video, i) => {
                        const videoId = youtube.extractIdFromUrl(video.url);

                        if (videoId) {
                          return (
                            <TouchableOpacity key={i} onPress={() => this.setModalVisible(!this.state.videoModalVisible, videoId)}>
                              <VideoImg
                                source={{ uri: `https:${video.thumbnail}` }}
                                resizeMode="cover"
                                >
                                  <PlayIcon name='play-circle' size={40} />
                                </VideoImg>
                              </TouchableOpacity>
                            );
                          }
                        })
                      }
                    </VideoContainer>
                  </Section>

                </ScrollView>
              </KeyboardAvoidingView>
            </ContentBox>
          )}
        {!loading && <BottomBarWithButtons
          readButton={!(content.learnt || content.read)}
          onPressReadButton={() => this.readContent(content.neuron_id, content.id)}
          width={device.dimensions.width}
        />}
        {/* Action Sheets */}
        <ActionSheet
          hasCancelOption
          visible={actionSheetsVisible}
          options={options}
          dismiss={this.dismissActionSheets}
        />
        {/* Modal */}
        <YoutubePlayer
          videoId={currentVideoId}
          visible={videoModalVisible}
          onPressClose={() => this.setModalVisible(false)}
        />

        <Navbar/>
      </MoiBackground>
    );
  }
}

SingleContentScene.propTypes = {
  title: PropTypes.string,
  contentSelected: PropTypes.object,
  device: PropTypes.object,
  storeTaskAsync: PropTypes.func,
};
