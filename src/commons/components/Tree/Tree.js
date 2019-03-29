import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, AsyncStorage, PixelRatio, ImageEditor, ImageStore } from 'react-native';
import { takeSnapshotAsync } from 'expo';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import ViewTransformer from 'react-native-view-transformer-next';
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
}), {
    loadTreeAsync: treeActions.loadTreeAsync,
    getUserProfileAsync: userActions.getUserProfileAsync,
    getAchievementsAsync: userActions.getAchievementsAsync,
    setZoomTreeInfo: treeActions.setZoomTreeInfo,
    setZoomScale: treeActions.setZoomScaleTree,
    setNeuronLabelInfo: neuronActions.setNeuronLabelInfo,
    uploadTreeImageAsync: userActions.uploadTreeImageAsync,
  })
export default class Tree extends Component {

  treeView = null;

  state = {
    loading: true,
    hasUserTree: false,
    level: null,
    zoomScale: 1,
    modalVisible: false,
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
    await this.initialActions();
    this.getTreeLevel();
    this.setState({ loading: false });
    this.handleVideoFirstLogin();
  }

  componentWillReceiveProps(newProps) {
    const { userTree } = this.props;
    const newUserTree = newProps.userTree;

    if (Object.keys(userTree).length !== 0 && userTree !== newUserTree) {
      setTimeout(() => { this.takeScreenShotTree() }, 2000);
    }
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
    const { setZoomTreeInfo, setNeuronLabelInfo } = this.props;
    if (this.prevZoomInfo === null) {
      this.prevZoomInfo = zoomInfo;
    }

    setZoomTreeInfo(zoomInfo);
    setNeuronLabelInfo({});
    if (this.isSameZoomInfo(this.prevZoomInfo, zoomInfo)) return;
    if (this.canPlaySound) {
      Sound.playOverBackgroundSound('treeActions', true);
      this.canPlaySound = false;
    }
    this.prevZoomInfo = zoomInfo;
  }

  isSameZoomInfo(previousZoomInfo, newZoomInfo) {
    return previousZoomInfo.scale === newZoomInfo.scale && previousZoomInfo.translateX === newZoomInfo.translateX && previousZoomInfo.translateY === newZoomInfo.translateY;
  }

  onTransformGestureReleased = (zoomInfo) => {
    const { setZoomTreeInfo } = this.props;
    setZoomTreeInfo(zoomInfo);
    setTimeout(() => {
      Sound.stopOverBackgroundSound();
      this.canPlaySound = true;
    }, 1000);
  }

  selectCurrentLevel = (userTree) => {
    const level = userTree.meta.depth;
    console.log("TCL: selectCurrentLevel -> level", level)

    const levelData = { userTree };

    const levels = {
      tree1: <Level1 {...levelData} />,
      tree2: <Level2 {...levelData} />,
      tree3: <Level3 {...levelData} />,
      allLevels: <AllLevels {...levelData} zoomScale={4} />,
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

    const pixelRatio = PixelRatio.get(); // The pixel ratio of the device

    const resultScreenShot = await takeSnapshotAsync(this.treeView, {
      result: 'base64',
      height: (height / pixelRatio) / 2,
      width: width / pixelRatio,
      quality: 1,
      format: 'png',
    });

    if (orientation === 'LANDSCAPE') {
      this.uploadTreeImage(resultScreenShot);
      return;
    }

    this.cropImage(this.normalizeBase64Image(resultScreenShot), width, height);
  }

  getHeigthImage(height) {
    const { userTree } = this.props;

    const level = userTree.meta.depth;
    const imageHeight = height / 1.9617;

    const levelsOffset = {
      1: imageHeight / 2.125,
      2: imageHeight / 8.5,
      3: imageHeight / 2.2667,
      4: imageHeight / 2.2667,
      5: imageHeight / 4.25,
      6: imageHeight / 6.8,
      7: imageHeight / 13.6,
      8: 0,
      9: 0,
    }

    return {
      offset: levelsOffset[level],
      height: levelsOffset[level] === 0 ? height / 2 : imageHeight - levelsOffset[level],
    }
  }

  async cropImage(image, width, height) {

    const heightImage = this.getHeigthImage(height);

    let cropData = {
      offset: { x: 0, y: heightImage.offset },
      size: { width: width, height: heightImage.height }
    }

    ImageEditor.cropImage(image, cropData, this.getImageFromRctImage, () => { });
  }

  getImageFromRctImage = (rctImageUri) => {
    ImageStore.getBase64ForTag(rctImageUri, (image) => {
      ImageStore.removeImageForTag(rctImageUri);
      this.uploadTreeImage(image);
    }, () => { });
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

  render() {
    const { loading, level, zoomScale, hasUserTree, modalVisible } = this.state;
    // console.log("TCL: render -> level", level)

    const { device: { dimensions: { width, height } } } = this.props;

    const videoDimensions = {
      width: 1280,
      height: 720
    };

    if (loading && !hasUserTree) { return <Preloader />; }
    return (
      <TreeContainer>
        <AnimatedNubes deviceWidth={width} deviceHeight={height} />
        {!modalVisible &&
          <Zoom
            maxScale={zoomScale}
            onViewTransformed={this.onViewTransformed}
            onTransformGestureReleased={this.onTransformGestureReleased}
            ref={view => { this.treeView = view; }}
          >
            <MacetaContainer><Maceta width={200} /></MacetaContainer>
            {level}
          </Zoom>}
        {!modalVisible && <LabelsLayer />}
        {modalVisible && <Video
          videoDimensions={videoDimensions}
          source={vineta_1}
          dismiss={() => this.showVideo(false)}
          visible={modalVisible}
          width={width}
          onPlaybackStatusUpdate={this.onPlaybackStatusUpdate}
          showCloseIcon={false}
        />}
      </TreeContainer>
    );
  }
}

const Zoom = styled(ViewTransformer)`
  overflow: visible;
  position: relative;
  flex: 1;
`;

Tree.propTypes = {
  device: PropTypes.any,
  userTree: PropTypes.object,
};
