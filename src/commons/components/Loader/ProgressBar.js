import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Animated } from 'react-native';
import styled from 'styled-components/native';

const BackgroundBar = styled(View)`
  width: ${props => props.width};
  background-color: #336869;
  border-radius: 5;
  height: 20;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 5;
`;

export default class ProgressBar extends Component {
  state = {
    progressValue: new Animated.Value(0),
    progress: 0,
  }

  duration = 20000;

  componentDidMount() {
    this.progressAnimation = this.createProgressAnimation();
    this.progressAnimation.start();
    this.state.progressValue.addListener((progress) => {
      this.setState({ progress: Math.trunc(progress.value) });
    });
  }

  componentWillReceiveProps(newProps) {
    const { assetsLoaded, appIsReady } = this.props;
    if (!assetsLoaded && newProps.assetsLoaded) {
      this.handleAssetsLoaded();
    }

    if (!appIsReady && newProps.appIsReady) {
      this.handleAppReady();
    }
  }

  handleAssetsLoaded() {
    this.props.onAssetsLoaded();
    this.duration = 5000;
    this.progressAnimation = this.createProgressAnimation();
    this.progressAnimation.start();
  }

  handleAppReady() {
    if (this.state.progress === 100) {
      this.props.onAppReady();
    } else {
      this.progressAnimation.stop();
      this.duration = 500;
      this.progressAnimation = this.createProgressAnimation();
      this.progressAnimation.start(() => {
        this.props.onAppReady();
      });
    }
  }



  createProgressAnimation() {
    const { progressValue } = this.state;
    return Animated.timing(
      progressValue,
      {
        toValue: 100,
        duration: this.duration,
      }
    );
  }

  render() {
    const { progressValue, progress } = this.state;
    const { width } = this.props;


    const style = {
      width: progressValue.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
      }),
    }

    return (
      <BackgroundBar width={width}>
        <Animated.View style={{ backgroundColor: '#BEF649', borderRadius: 5, height: 20, position: 'absolute', left: 0, ...style }} />
        <Text style={{ fontSize: 7, fontWeight: '500', color: progress <= 50 ? 'white' : 'black' }}>{`${progress}%`}</Text>
      </BackgroundBar>
    );
  }
}