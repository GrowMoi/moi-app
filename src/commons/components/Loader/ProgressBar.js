import React, { Component } from 'react';
import { View, Text, Animated } from 'react-native';
import styled from 'styled-components/native';
import Orientation from 'react-native-orientation';
import size from '../../styles/size';
import { Size } from '../../styles';

const BackgroundBar = styled(View)`
  width: ${props => props.width};
  background-color: #336869;
  border-radius: 5;
  height: ${size.bottomBarHeight};
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
    if (newProps.assetsLoaded) {
      this.handleAppReady();
    }

    // if (!appIsReady && newProps.appIsReady) {
    //   this.handleAppReady();
    // }
  }

  // handleAssetsLoaded() {
  //   this.props.onAssetsLoaded();
  //   this.duration = 10000;
  //   this.progressAnimation = this.createProgressAnimation();
  //   this.progressAnimation.start();
  // }

  handleAppReady() {
    if (this.state.progress === 100) {
      this.goToMainApp();
    } else {
      this.progressAnimation.stop();
      this.duration = 500;
      this.progressAnimation = this.createProgressAnimation();
      this.progressAnimation.start(({ finished }) => {
        if(finished) {
          this.goToMainApp();
        }
      });
    }
  }

  goToMainApp() {
    Orientation.unlockAllOrientations();
    this.props.onAppReady();
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
        <Animated.View style={{ backgroundColor: '#BEF649', borderRadius: 5, height: size.bottomBarHeight, position: 'absolute', left: 0, ...style }} />
        <Text style={{ fontSize: Size.fontBarLoader, fontWeight: '700', fontStyle: 'italic', color: progress <= 50 ? 'white' : '#366D68' }}>{`${progress}%`}</Text>
      </BackgroundBar>
    );
  }
}