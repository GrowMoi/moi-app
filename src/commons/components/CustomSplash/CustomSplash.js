import React, { Component } from "react";
import { ImageBackground } from "react-native";
import styled from "styled-components/native";

const Background = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export default class TempSplash extends Component {

  render() {
    const { onFinish, wait = 1000 } = this.props;

    setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, wait);

    return (
      <Background
        source={{ uri: "splashv2" }}
        resizeMode="stretch"
      ></Background>
    );
  }
}
