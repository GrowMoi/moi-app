import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import ViewTransformer from 'react-native-view-transformer-next';
import { Maceta } from '../SceneComponents';
import treeActions from '../../../actions/treeActions';
import Preloader from '../Preloader/Preloader';

// Levels
import Level1 from './Level1';
import Level2 from './Level2';
import Level3 from './Level3';
import AllLevels from './AllLevels';
import userActions from '../../../actions/userActions';

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
})
export default class Tree extends Component {
  state = {
    loading: true,
    hasUserTree: false,
    level: null,
    zoomScale: 1,
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
  }

  selectCurrentLevel = (userTree) => {
    const level = userTree.meta.depth;

    const levelData = { userTree };

    const levels = {
      tree1: <Level1 { ...levelData } />,
      tree2: <Level2 { ...levelData } />,
      tree3: <Level3 { ...levelData } />,
      allLevels: <AllLevels { ...levelData } zoomScale={4}/>,
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
    const { userTree } = this.props;

    if (userTree.meta) {
      const currentLevel = this.selectCurrentLevel(userTree);

      this.setState({
        hasUserTree: true,
        level: currentLevel.component,
        zoomScale: currentLevel.zoomScale,
      });
    }
  }

  render() {
    const { loading, level, zoomScale, hasUserTree } = this.state;

    if (loading && !hasUserTree) { return <Preloader />; }
    return (
      <TreeContainer>
        <Zoom maxScale={zoomScale}>
          <MacetaContainer><Maceta width={200}/></MacetaContainer>
          {level}
        </Zoom>
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
