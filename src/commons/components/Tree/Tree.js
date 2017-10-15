import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import ViewTransformer from 'react-native-view-transformer';
import { Maceta } from '../SceneComponents';
import treeActions from '../../../actions/treeActions';
import Preloader from '../Preloader/Preloader';

// Levels
import Level1 from './Level1';
import Level2 from './Level2';

const styles = StyleSheet.create({
  treeView: {
    position: 'relative',
    flex: 1,
  },
});

const Loading = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

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

const LoadingNeuron = styled(Image)`
  width: 40px;
  height: 40px;
`;

@connect(store => ({
  device: store.device,
  userTree: store.tree.userTree,
}), {
  loadTreeAsync: treeActions.loadTreeAsync,
})
export default class Tree extends Component {
  state = {
    loading: true,
    hasUserTree: false,
    level: null,
    zoomScale: 1,
  }

  async componentDidMount() {
    const { loadTreeAsync } = this.props;
    try {
      await loadTreeAsync();
      this.getTreeLevel();
    } catch (error) {
      console.log('ERROR TO GET TREE');
    }

    this.setState({ loading: false });
  }

  selectCurrentLevel = (userTree) => {
    const level = userTree.meta.depth;

    const levels = {
      tree1: <Level1 userTree={userTree} />,
      tree2: <Level2 userTree={userTree} />,
    };

    switch (level) {
      case 1:
        return { component: levels.tree1, zoomScale: 1 };
      case 2:
        return { component: levels.tree2, zoomScale: 1 };
      default:
        return { component: levels.tree1, zoomScale: 1 };
    }
  }

  getTreeLevel = () => {
    const { userTree } = this.props;

    if (userTree.meta) {
      this.setState({
        hasUserTree: true,
        level: this.selectCurrentLevel(userTree).component,
        zoomScale: this.selectCurrentLevel(userTree).zoomScale,
      });
    }
  }

  render() {
    const { loading, level, zoomScale, hasUserTree } = this.state;

    if (loading && !hasUserTree) { return <Preloader />; }
    return (
      <TreeContainer>
        <ViewTransformer
          style={styles.treeView}
          maxScale={zoomScale}
        >
          <MacetaContainer><Maceta width={200}/></MacetaContainer>
          {level}
        </ViewTransformer>
      </TreeContainer>
    );
  }
}

Tree.propTypes = {
  device: PropTypes.any,
  userTree: PropTypes.object,
};
