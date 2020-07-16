import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { Size, Palette } from './../../../commons/styles';
import { Header as Headers } from './../../../commons/components/Typography';

function Header(props) {
  return(
    <View style={styles.container}>
      <Headers>{props.title}</Headers>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 15,
  },
})

export default Header;
