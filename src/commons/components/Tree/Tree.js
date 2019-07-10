import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, AsyncStorage, PixelRatio, ImageEditor, ImageStore, Platform } from 'react-native';
import { takeSnapshotAsync } from 'expo';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import ViewTransformer from 'react-native-view-transformer-next';
import { Actions } from 'react-native-router-flux';
import { Maceta } from '../SceneComponents';
import treeActions from '../../../actions/treeActions';
import Preloader from '../Preloader/Preloader';
import { Video } from '../../../commons/components/VideoPlayer';
import vineta_1 from '../../../../assets/videos/vineta_1.mp4';
import LabelsLayer from './LabelsLayer'

// Levels
import Level1 from './Level1';
import Level2 from './Level2';
import Level3 from './Level3';
import AllLevels from './AllLevels';
import userActions from '../../../actions/userActions';
import neuronActions from '../../../actions/neuronActions';
import { AnimatedNubes } from './AnimatedNubes';
import { Sound } from '../SoundPlayer';
import NewAchievementsModal from '../Quiz/NewAchievements';
import EventCompletedModal from '../Quiz/EventCompleted';
import { Size } from '../../styles';
import deviceUtils from '../../utils/device-utils';
import { PORTRAIT } from '../../../constants';

const isTablet = deviceUtils.isTablet();

const screenShotHeight = 350;

const styles = StyleSheet.create({
  treeView: {
    position: 'relative',
    flex: 1,
  },
});

const TreeContainer = styled(View)`
  flex: 1;
  justify-content: flex-end;
`;

const MacetaContainer = styled(View)`
  position: absolute;
  align-items: center;
  left: 0;
  right: 0;
  bottom: 0;
`;

@connect(store => ({
  device: store.device,
  userTree: store.tree.userTree,
  user: store.user.userData,
  quizResult: store.user.quizResult,
}), {
    loadTreeAsync: treeActions.loadTreeAsync,
    getUserProfileAsync: userActions.getUserProfileAsync,
    getAchievementsAsync: userActions.getAchievementsAsync,
    setZoomTreeInfo: treeActions.setZoomTreeInfo,
    setZoomScale: treeActions.setZoomScaleTree,
    setNeuronLabelInfo: neuronActions.setNeuronLabelInfo,
    uploadTreeImageAsync: userActions.uploadTreeImageAsync,
    removeQuizResult: userActions.removeQuizResult,
  })
export default class Tree extends Component {

  treeView = null;

  state = {
    loading: true,
    hasUserTree: false,
    level: null,
    zoomScale: 1,
    modalVisible: false,
    events: [],
    showModalNewAchievements: false,
    showEventCompleted: false,
    eventTitle: '',
    eventType: '',
    achievements: null,
    showLabelLayer: true,
  }

  initialActions = async () => {
    const { loadTreeAsync, getUserProfileAsync, getAchievementsAsync, user } = this.props;

    await Promise.all([
      loadTreeAsync(),
      getUserProfileAsync(user.profile.id),
      getAchievementsAsync(),
    ]);
  }

  async componentDidMount() {
    this.setTitleView();
    await this.initialActions();
    this.getTreeLevel();
    this.setState({ loading: false });
    this.handleVideoFirstLogin();
  }

  componentWillReceiveProps(newProps) {
    const { userTree } = this.props;
    const newUserTree = newProps.userTree;

    if (Object.keys(userTree).length !== 0 && userTree.meta.current_learnt_contents !== newUserTree.meta.current_learnt_contents) {
      setTimeout(() => { this.takeScreenShotTree() }, 2000);
    }
  }

  setTitleView() {
    const { user } = this.props;
    Actions.refresh({ title: user.profile.username });
  }

  handleVideoFirstLogin = async () => {
    const { userTree } = this.props;

    if (!userTree.tree) return;

    const videoShown = await AsyncStorage.getItem('videoShown');
    if (!videoShown && userTree.tree.root.learnt_contents === 0) this.showVideo();
  }

  showVideo = (show = true) => {
    this.setState({ modalVisible: show });
  }

  onPlaybackStatusUpdate = async (playbackStatus) => {
    if (playbackStatus.didJustFinish) {
      await AsyncStorage.setItem('videoShown', "true");
      this.showVideo(false);
    }
  }

  prevZoomInfo = null;
  canPlaySound = true;

  onViewTransformed = zoomInfo => {
    if (this.prevZoomInfo === null) {
      this.prevZoomInfo = zoomInfo;
    }

    if (this.isSameZoomInfo(this.prevZoomInfo, zoomInfo)) return;
    if (this.canPlaySound) {
      this.setState({ showLabelLayer: false });
      Sound.playOverBackgroundSound('treeActions', true, 1);
      this.canPlaySound = false;
    }
    this.prevZoomInfo = zoomInfo;
  }

  isSameZoomInfo(previousZoomInfo, newZoomInfo) {
    return previousZoomInfo.scale === newZoomInfo.scale && previousZoomInfo.translateX === newZoomInfo.translateX && previousZoomInfo.translateY === newZoomInfo.translateY;
  }

  onTransformGestureReleased = (zoomInfo) => {
    const { setZoomTreeInfo, setNeuronLabelInfo } = this.props;
    Sound.stopOverBackgroundSound();
    setZoomTreeInfo(zoomInfo);
    setTimeout(() => {
      this.canPlaySound = true;
      setNeuronLabelInfo({});
      this.setState({ showLabelLayer: true });
    }, 1000);
  }

  selectCurrentLevel = (userTree) => {
    const level = userTree.meta.depth;
    const levelData = { userTree };

    const levels = {
      tree1: <Level1 {...levelData} setHeightTreeContainer={this.setHeightTreeContainer} />,
      tree2: <Level2 {...levelData} setHeightTreeContainer={this.setHeightTreeContainer} />,
      tree3: <Level3 {...levelData} />,
      allLevels: <AllLevels {...levelData} zoomScale={4} setHeightTreeContainer={this.setHeightTreeContainer} />,
    };

    switch (level) {
      case 1:
        return { component: levels.tree1, zoomScale: 1 };
      case 2:
        return { component: levels.tree2, zoomScale: 1 };
      case 3:
        return { component: levels.allLevels, zoomScale: 3 };
      case 4:
        return { component: levels.allLevels, zoomScale: 3 };
      case 5:
        return { component: levels.allLevels, zoomScale: 4 };
      case 6:
        return { component: levels.allLevels, zoomScale: 4 };
      case 7:
        return { component: levels.allLevels, zoomScale: 4 };
      case 8:
        return { component: levels.allLevels, zoomScale: 4 };
      case 9:
        return { component: levels.allLevels, zoomScale: 4 };
      default:
        return { component: levels.tree1, zoomScale: 1 };
    }
  }

  getTreeLevel = () => {
    const { userTree, setZoomScale } = this.props;

    if (userTree.meta) {
      const currentLevel = this.selectCurrentLevel(userTree);

      this.setState({
        hasUserTree: true,
        level: currentLevel.component,
        zoomScale: currentLevel.zoomScale,
      });

      setZoomScale(currentLevel.zoomScale);
    }
  }

  async takeScreenShotTree() {
    const { device: { dimensions: { width, height, orientation } } } = this.props;
    const { treeHeight, zoomScale } = this.state;

    const pixelRatio = PixelRatio.get(); // The pixel ratio of the device

    const zoom = isTablet ? this.getTabletScale(zoomScale) : 1;

    const resultScreenShot = await takeSnapshotAsync(this.treeView, {
      result: 'base64',
      height: this.sizeTreeScreenShot / pixelRatio,
      width: this.sizeTreeScreenShot / pixelRatio,
      quality: 1,
      format: 'png',
    });

    this.uploadTreeImage(resultScreenShot);
  }

  uploadTreeImage = async (image) => {
    const { uploadTreeImageAsync, getUserProfileAsync, user } = this.props;
    await uploadTreeImageAsync(this.normalizeBase64Image(image));
    await getUserProfileAsync(user.profile.id);
    console.log("upload ok");
  }

  normalizeBase64Image(base64Image) {
    return 'data:image/png;base64,' + base64Image.replace(/(?:\r\n|\r|\n)/g, '')
  }

  validateResultQuiz() {
    const { quizResult: { achievements = [], event = {}, super_event = {} } } = this.props;
    if (achievements.length > 0) {
      this.showModalNewAchievements(achievements);
    }

    if (event.completed) {
      this.showEventCompletedModal(event.info.title, 'evento');
    }

    if (super_event.completed) {
      this.showEventCompletedModal(super_event.info.event_achievement.title, 'super evento');
    }

    if (achievements.length === 0 && !event.completed) {
      this.removeQuizResult();
    }
  }

  showModalNewAchievements = (achievements) => {
    this.setState({ showModalNewAchievements: true, achievements: achievements });
  }

  hideModalNewAchievements = () => {
    if (!this.state.showEventCompleted) {
      this.removeQuizResult();
    }
    this.setState({ showModalNewAchievements: false });
  }

  showEventCompletedModal = (title, type) => {
    this.setState({ showEventCompleted: true, eventTitle: title, eventType: type });
  }

  hideEventCompletedModal = () => {
    this.removeQuizResult();
    this.setState({ showEventCompleted: false });
  }

  removeQuizResult() {
    this.props.removeQuizResult();
  }

  getTabletScale(zoomScale) {
    if (zoomScale === 1) {
      return 1.3;
    } else {
      return 1.5;
    }
  }

  setHeightTreeContainer = (treeHeight) => {
    this.setState({ treeHeight });
  }

  get sizeTreeScreenShot() {
    const { device: { dimensions: { width, height, orientation } } } = this.props;
    const size = orientation === PORTRAIT ? width : height;
    return size * (isTablet ? 0.9 : 0.8);
  }

  render() {
    const { loading, level, zoomScale, hasUserTree, modalVisible, showModalNewAchievements, showEventCompleted, eventTitle, eventType, achievements, showLabelLayer, treeHeight } = this.state;
    const { device: { dimensions: { width, height, orientation } }, quizResult } = this.props;

    if (quizResult && (!showModalNewAchievements && !showEventCompleted)) {
      this.validateResultQuiz();
    }

    const showAchievementsModal = !modalVisible && showModalNewAchievements;
    const showEventCompletedModal = !modalVisible && !showModalNewAchievements && showEventCompleted;


    const videoDimensions = {
      width: 1280,
      height: 720
    };

    const minZoom = {
      scale: isTablet ? this.getTabletScale(zoomScale) : 1,
    };

    const zoomContainerStyle = isTablet ? {
      position: 'absolute',
      height: zoomScale === 1 ? '87%' : '80%',
      top: 0,
      left: 0,
      right: 0,
    } : {
        flex: 1,
      };

    if (loading && !hasUserTree) { return <Preloader />; }
    return (
      <TreeContainer>
        <AnimatedNubes deviceWidth={width} deviceHeight={height} orientation={orientation} />
        {showAchievementsModal && <NewAchievementsModal achievements={achievements} onHideModal={this.hideModalNewAchievements} />}
        {showEventCompletedModal && <EventCompletedModal eventTitle={eventTitle} eventType={eventType} onHideModal={this.hideEventCompletedModal} />}
        {!modalVisible &&
          <Zoom
            flex={Platform.OS === 'android' ? 10 : 1}
            maxScale={zoomScale}
            onViewTransformed={this.onViewTransformed}
            onTransformGestureReleased={this.onTransformGestureReleased}
          >
            <View
              style={{
                height: this.sizeTreeScreenShot,
                width: this.sizeTreeScreenShot,
                position: 'absolute',
                bottom: 0,
                left: (width - this.sizeTreeScreenShot) / 2,
              }}
              ref={view => this.treeView = view}
              collapsable={false}
            >
              <TreeImage
                style={{
                  height: this.sizeTreeScreenShot,
                  width: this.sizeTreeScreenShot,
                  transform: [{ scale: minZoom.scale }],
                  ...zoomContainerStyle,
                }}
              >
                <MacetaContainer><Maceta width={200} /></MacetaContainer>
                {level}
              </TreeImage>
            </View>
          </Zoom>
        }
        {(!modalVisible && showLabelLayer) && <LabelsLayer />}
        {modalVisible && <Video
          videoDimensions={videoDimensions}
          source={vineta_1}
          dismiss={() => this.showVideo(false)}
          visible={modalVisible}
          width={width}
          onPlaybackStatusUpdate={this.onPlaybackStatusUpdate}
          showCloseIcon={false}
          skipButton
        />}
      </TreeContainer>
    );
  }
}

const Zoom = styled(ViewTransformer)`
  overflow: visible;
  position: relative;
`;

const TreeImage = styled(View)`
`;

Tree.propTypes = {
  device: PropTypes.any,
  userTree: PropTypes.object,
};
