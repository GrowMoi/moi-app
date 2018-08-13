import React, {Component} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { Palette } from './../../../commons/styles';
import { Header } from './../../../commons/components/Typography';

function ItemTasks(props) {
  return(
    <TouchableOpacity onPress={props.onPress && props.onPress} style={styles.container}>
      <View style={styles.subContainer}>
        <Feather style={styles.icon} name={props.icon} size={25}  />
        <Header>{props.title}</Header>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Palette.tasksList,
    height: 40,
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
  },
  icon: {
    marginHorizontal: 10,
  },
})

export default ItemTasks;
