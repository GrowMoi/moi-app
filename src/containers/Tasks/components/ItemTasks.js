import React, {Component} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Palette, Size } from './../../../commons/styles';
import { Header } from './../../../commons/components/Typography';

function ItemTasks(props) {
  return(
    <TouchableOpacity onPress={props.onPress && props.onPress} style={styles.container}>
      <View style={styles.subContainer}>
        <Feather style={styles.icon} name={props.icon} size={25}  />
        <Header customSize={Size.fontContentMinimized}>{props.title}</Header>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Palette.tasksList,
    height: 60,
    width: '95%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 5,
    borderWidth: 0.5,
    borderColor: Palette.invertedBlack,
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
})

export default ItemTasks;
