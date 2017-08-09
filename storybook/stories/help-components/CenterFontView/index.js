import React, { Component } from 'react';
import { View } from 'react-native';
import { Font, AppLoading } from 'expo';
import style from './style';
import fonts from '../../../../assets/fonts';

export default class CenterFontView extends Component {
  state = {
    isReady: false,
  }

  componentDidMount() {
    this.loadFontsAsync();
  }

  async loadFontsAsync() {
    await Font.loadAsync(fonts);
    this.setState({ isReady: true });
  }

  render() {
    const { children } = this.props;
    const { isReady } = this.state;

    if (isReady) {
      return (
        <View style={style.main}>
          {children}
        </View>
      );
    }

    return <AppLoading />;
  }
}
