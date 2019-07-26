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
  PixelRatio,
  Share,
} from 'react-native';
import {
  WebBrowser,
  takeSnapshotAsync
} from 'expo';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import uuid from 'uuid/v4'

import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import { BottomBarWithButtons, BackButton } from '../../commons/components/SceneComponents';
import { ContentBox } from '../../commons/components/ContentComponents';
import Preloader from '../../commons/components/Preloader/Preloader';
import { TextBody, Header } from '../../commons/components/Typography';
import Carousel from '../../commons/components/Carousel/Carousel';
import MoiIcon from '../../commons/components/MoIcon/MoIcon';
import { Palette, Size } from '../../commons/styles';
import ActionsHeader from './ActionsContentMax';
import NoteInput from '../../commons/components/NoteInput/NoteInput';
import ContentImagePreview from '../../commons/components/ContentComponents/ContentImagePreview'
import ActionSheet from '../../commons/components/ActionSheets/ActionSheet';
import ReadingAnimation from '../../commons/components/ReadingAnimation/ReadingAnimation';
import PassiveMessageAlert from '../../commons/components/Alert/PassiveMessageAlert'
import * as constants from '../../constants';

// Redux
import neuronActions from '../../actions/neuronActions';
import userActions from '../../actions/userActions';
import { backButtonWithSound } from '../../routes';

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
  padding-top: 10;
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
  width: 45%;
  height: 100;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: ${Size.spaceSmall};
`;
const VideoContainer = styled(View)`
  flex: 1;
  width: 100%;
  position: relative;
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
  scene: store.routes.scene,
  showPassiveMessage: store.user.showPassiveMessage,
}), {
  loadContentByIdAsync: neuronActions.loadContentByIdAsync,
  storeTaskAsync: userActions.storeTaskAsync,
  readContentAsync: userActions.readContentAsync,
  loadNeuronByIdAsync: neuronActions.loadNeuronByIdAsync,
  storeNotesAsync: userActions.storeNotesAsync,
  storeAsFavoriteAsync: userActions.storeAsFavoriteAsync,
  getEventInProgressAsync: userActions.getEventInProgressAsync,
  stopCurrentBackgroundAudio: neuronActions.stopCurrentBackgroundAudio,
  playCurrentBackgroundAudio: neuronActions.playCurrentBackgroundAudio,
  uploadImageAsync: userActions.uploadImageAsync,
  generateShareDataAsync: userActions.generateShareDataAsync,
  showPassiveMessageAsync: userActions.showPassiveMessageAsync,
})
export default class SingleContentScene extends Component {
  state = {
    loading: false,
    videoModalVisible: false,
    currentVideoId: '',
    actionSheetsVisible: false,
    favorite: false,
    reading: false,
    animationFinished: false,
    hasTest: false,
    isShowingContent: true,
  }

  async componentDidMount() {
    await this.loadContentAsync();
  }

  loadContentAsync = async () => {
    const { loadContentByIdAsync, content_id, neuron_id } = this.props;

    this.toggleLoading(true);

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
       this.showAlert('Este contenido ya se encuentra almacenado en tus tareas', () => {
        this.setActionSheetVisible(false);
      });
    } else {
      this.showAlert('Este contenido fué almacenado correctamente', () => {
        this.setActionSheetVisible(false);
      });
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

    try {
      const res = await storeAsFavoriteAsync(neuronId, contentId);
      this.setState((prevState) => ({ favorite: res.data.favorite, actionSheetsVisible: false }));
    } catch (error) {
      this.showAlert('Error al guardar como favorito');
      throw new Error(error);
    }
  };

  shareContent = async (neuronId, contentId, contentTitle, descriptionContent) => {
    const { uploadImageAsync, generateShareDataAsync } = this.props;

    const screenShot = await this.takeScreenShotTree();
    const uploadRes = await uploadImageAsync(screenShot);
    const contentUri = `${constants.WEB_URL_BASE}/#/neuron/${neuronId}/content/${contentId}`;
    const { social_sharing: {public_url} } = await generateShareDataAsync(contentTitle, descriptionContent ? descriptionContent : 'desc', contentUri, uploadRes.secure_url);

    const shareImageBase64 = {
        title: contentTitle,
        message: public_url,
        url: public_url,
        subject: contentTitle
    };
    await Share.share(shareImageBase64);
	this.dismissActionSheets();
  }

  redirectTo = (route) => {
    Actions.refresh(route);
  }

  afterFinishAnimation = async (neuronId) => {
    const { loadNeuronByIdAsync, fromEvent, getEventInProgressAsync } = this.props;
    const { hasTest } = this.state;

    this.setState({ reading: false, isShowingContent: false });

    if (hasTest) {
      Actions.quiz({ type: ActionConst.RESET });
    } else {
      try {
        await loadNeuronByIdAsync(neuronId);
        if(fromEvent) await getEventInProgressAsync();
        Actions.pop();
      } catch (error) {
        console.log(error);
      }
    }
  }

  readContent = async (neuronId, contentId) => {
    const { readContentAsync, loadNeuronByIdAsync } = this.props;
    const { reading } = this.state;

    if(!reading) {
      this.setState({ loading: true, reading: true });

      try {
        const res = await readContentAsync(neuronId, contentId);
        const { data } = res;

        await this.setState({
          hasTest: (data || {}).test || false,
        });

      } catch (error) {
        console.log('ERROR TO READ CONTENT', error.message);
        this.showErrorMessage();
      }
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

  goToSingleContent = (contentId, neuronId, title) => {

    Actions.singleContent({
      content_id: contentId,
      neuron_id: neuronId,
      title: this.props.title,
      renderBackButton: () => backButtonWithSound(async () => {
        Actions.pop();
        await this.loadContentAsync();
      })
    })
  }

  async takeScreenShotTree() {
    const { device: { dimensions: { width, height, orientation } } } = this.props;

    const pixelRatio = PixelRatio.get(); // The pixel ratio of the device

    const resultScreenShot = await takeSnapshotAsync(this.contentView, {
      result: 'base64',
      height: height / pixelRatio,
      width: width / pixelRatio,
      quality: 1,
      format: 'png',
    });

    return this.normalizeBase64Image(resultScreenShot);
  }

  normalizeBase64Image(base64Image) {
    return 'data:image/png;base64,' + base64Image.replace(/(?:\r\n|\r|\n)/g, '')
  }

  render() {
    const { contentSelected: content, device, scene, fromEvent, showPassiveMessage, showPassiveMessageAsync } = this.props;

    const {
      loading,
      actionSheetsVisible,
      favorite,
      reading,
      isShowingContent,
    } = this.state;

    const options = [
      { label: 'Compartir',
        icon: 'md-share',
        fn: () => this.shareContent(content.neuron_id, content.id, content.title, content.description),
      },
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
      <View style={{flex:1}} collapsable={false} ref={view => this.contentView = view }>
          <MoiBackground>
          {(loading && !reading) && <Preloader />}
          {!loading && isShowingContent && (
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
                      {((content || {}).links || []).map((link, i) => (
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
                      {((content || {}).recommended_contents || []).map(rContent => {
                          return (
                          <ContentImagePreview
                              data={rContent}
                              key={uuid()}
                              width={'46%'}
                              touchProps={{
                              onPress:() => this.goToSingleContent(rContent.id, rContent.neuron_id, rContent.title),
                              }}
                          />
                          )
                      })}
                      </VideoContainer>
                  </Section>

                  </ScrollView>
                  </KeyboardAvoidingView>
              </ContentBox>
              )}
          {!loading && <BottomBarWithButtons
              readButton={!(content.learnt || content.read) || fromEvent}
              onPressReadButton={() => this.readContent(content.neuron_id, content.id)}
              width={device.dimensions.width}
          />}
          {/* Animation */}
          {reading && (
              <ReadingAnimation
              ref={ref => this.readingAnim = ref}
              onFinishAnimation={() => {
                  this.afterFinishAnimation(content.neuron_id);
              }}
              />
          )}

          {/* Action Sheets */}
          <ActionSheet
              hasCancelOption
              visible={actionSheetsVisible}
              options={options}
              dismiss={this.dismissActionSheets}
          />
          <Navbar/>

          <PassiveMessageAlert
              isOpenPassiveMessage={showPassiveMessage && scene.name === 'singleContent'}
              touchableProps={{
                onPress: () => {
                    showPassiveMessageAsync(false);
                }
              }}
              message='Cuando termines de leer la explicación, presiona el botón
              celeste para enviar la pregunta al test'
          />
          </MoiBackground>
      </View>
    );
  }
}

SingleContentScene.propTypes = {
  title: PropTypes.string,
  contentSelected: PropTypes.object,
  device: PropTypes.object,
  storeTaskAsync: PropTypes.func,
  fromEvent: PropTypes.bool,
};
