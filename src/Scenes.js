import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const colorWhite = '#fff';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class Scenes extends Component {
  state = {
    asd: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Moi App!</Text>
      </View>
    );
  }
}
