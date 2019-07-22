import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, AsyncStorage, PixelRatio, ImageEditor, ImageStore, Platform } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import treeActions from '../../actions/treeActions';
import { Header } from '../../commons/components/Typography';
import ReadingAnimation from '../../commons/components/ReadingAnimation/ReadingAnimation';
import Preloader from '../../commons/components/Preloader/Preloader';

const AnimationContainer = styled(View)`
  position: absolute;
  height: 100%;
  width: 100%;
  flex: 1;
  align-self: stretch;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled(View)`
  flex: 1;
  align-items: center;
  align-self: stretch;
`;

@connect(store => ({
    userTree: store.tree.userTree,
    quizResult: store.user.quizResult,
}),
    {
        loadTreeAsync: treeActions.loadTreeAsync,
    })
export default class LevelPassedTransition extends Component {
    state = {
        showAnimation: true,
        showLevel: false,
        currentLevel: null,
    };

    prevLevel;

    componentWillMount() {
        const { userTree } = this.props;
        this.prevLevel = userTree.meta.depth;
    }

    async componentDidMount() {
        const { loadTreeAsync } = this.props;
        const res = await loadTreeAsync(null, true);
        this.setState({ currentLevel: res.data.meta.depth });
    }

    validateQuizResults() {
      const { quizResult: { achievements = [], event = {}, super_event = {} } } = this.props;
      // return achievements.length > 0 || event.completed || super_event.completed;
      return achievements.length > 0;
    }

    render() {
        const { showAnimation, showLevel, currentLevel } = this.state;

        if (!currentLevel) {
            return <Preloader />;
        }

        if (currentLevel === this.prevLevel && !this.validateQuizResults()) {
            Actions.tree();
            return null;
        }

        return (
            <AnimationContainer>
                {showAnimation && (<ReadingAnimation
                    ref={ref => this.readingAnim = ref}
                    onFinishAnimation={() => {
                        // this.setState({ showLevel: true });
                        // setTimeout(() => {
                        Actions.tree();
                        // }, 1000);
                    }}
                />)}
                {showLevel && (<Animatable.View animation="zoomOut" easing="ease-in">
                    <Header customSize={80} bolder>{`Nivel ${currentLevel}`}</Header>
                </Animatable.View>)}
            </AnimationContainer>
        );
    }
}

LevelPassedTransition.propTypes = {
    device: PropTypes.any,
    userTree: PropTypes.object,
};
