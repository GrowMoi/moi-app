import React, { Component } from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { width as DeviceWidth } from 'react-native-device-detection'

export default class ContentContainer extends Component {
  render() {
    const { width = (DeviceWidth - 20), height = 200, children, horizontalGradient, colorsMargin, colorsContent, style } = this.props;

    const start = {
      x: 0,
      y: horizontalGradient ? 0 : 1
    };

    const end = {
      x: horizontalGradient ? 0 : 1,
      y: 1
    };

    return (

      <LinearGradient
        colors={colorsMargin}
        start={start}
        end={end}
        style={{ padding: 5, alignItems: 'center', borderRadius: 10, width: width, minHeight: height }}>
        <View style={{ width: width - 10, minHeight: height - 10, borderRadius: 10, borderWidth: 1, borderColor: '#E3BB83' }}>
          <LinearGradient
            colors={colorsContent}
            start={start}
            end={end}
            style={{ padding: 5, alignItems: 'center', borderRadius: 10, width: width - 10, minHeight: height - 10, ...style }}>
            {children}
          </LinearGradient>
        </View>
      </LinearGradient>
    );
  }
};
