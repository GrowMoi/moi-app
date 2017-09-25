import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import ViewTransformer from 'react-native-view-transformer';
import { Maceta } from '../SceneComponents';
import actions from '../../../actions/treeActions';
import loadingGif from '../../../../assets/images/loading.gif';

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
  loadTreeAsync: actions.loadTreeAsync,
})
export default class Tree extends Component {
  state = {
    loading: true,
  }

  async componentDidMount() {
    const { loadTreeAsync } = this.props;
    await loadTreeAsync(1);

    setTimeout(() => {
      this.setState({ loading: false });
    }, 0);
  }

  get level() {
    const { userTree } = this.props;
    // const level = userTree.meta.depth;
    const level = 2;

    switch (level) {
      case 1:
        return {
          component: <Level1 />,
          zoomScale: 1,
        };
      case 2:
        return {
          component: <Level2 />,
          zoomScale: 1,
        };
      default:
        return { component: <Level1 />, zoomScale: 1 };
    }
  }

  render() {
    const { loading } = this.state;
    if (loading) {
      return (
        <Loading>
          <LoadingNeuron source={loadingGif} resizeMode='contain' />
        </Loading>
      );
    }

    return (
      <TreeContainer>
        <ViewTransformer
          style={styles.treeView}
          maxScale={this.level.zoomScale}
        >
          <MacetaContainer><Maceta width={200}/></MacetaContainer>
          {this.level.component}
        </ViewTransformer>
      </TreeContainer>
    );
  }
}

Tree.propTypes = {
  device: PropTypes.any,
  userTree: PropTypes.object,
};
