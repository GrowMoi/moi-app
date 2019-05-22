import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Palette } from './../../../commons/styles';
import { Ionicons } from '@expo/vector-icons';
import { TextBody, Title, Header } from './../../../commons/components/Typography';

const SubItemRow = (props) => {

  const content = (
    <View style={styles.rowContainer}>
      <View style={styles.titleContainer}>
        <Header>{props.title}</Header>
        <TextBody ellipsizeMode='tail' numberOfLines={2} t>{props.description}</TextBody>
      </View>
    </View>
  );

  let item = content;
  if(props.onPress) {
    item = (
      <TouchableOpacity onPress={props.onPress}>
        {content}
      </TouchableOpacity>
    )
  }

  return(
    <View style={styles.container}>
      {props.clickClose && (
        <TouchableOpacity style={styles.onIcon} onPress={props.clickClose} >
          {/* <Ionicons name="md-close" size={10} color='black' /> */}
          <Image style={styles.closeImage} source={{uri: 'button_close'}} resizeMode='contain' />
        </TouchableOpacity>
      )}
      {item}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    height: 120,
    position: 'relative',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  rowContainer: {
    backgroundColor: Palette.tasksList,
    height: '100%',
    borderRadius: 5,
    shadowColor: '#90a058',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  background: {
    height: '100%',
    width: '100%',
  },
  onIcon: {
    backgroundColor: 'transparent',
    // borderBottomLeftRadius: 10,
    // borderBottomRightRadius: 10,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    width: 20,
    height: 20,
    zIndex: 999,
    position: 'absolute',
    top: 2,
    right: 3,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeImage: {
    width: 20,
  },
  titleContainer: {
    flex: 1,
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    width: '100%',
  },
  title: {
    fontSize: 10,
    backgroundColor: Palette.invertedBlack,
    width: '100%',
    color: 'white',
    paddingLeft: 5,
  },
})

export default SubItemRow;
