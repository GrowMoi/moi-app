import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Navbar from '../../commons/components/Navbar/Navbar';

export default class Profile extends Component {
  render() {
    return (
      <View>
        <Navbar />
        <Text>Profile View</Text>
      </View>
    );
  }
}
