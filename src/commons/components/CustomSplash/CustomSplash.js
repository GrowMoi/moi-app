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

  async componentDidMount() {
    const { onFinish, startAsync, onError } = this.props;

    if (startAsync) {
      try {
        const result = await startAsync()
        if (onFinish) {
          onFinish(result);
        }
      } catch (error) {
        if (onError) {
          onError(error);
        }
      }
    }
  }

  render() {
    return (
      <Background
        source={{ uri: "splashv2" }}
        resizeMode="stretch"
      ></Background>
    );
  }
}
