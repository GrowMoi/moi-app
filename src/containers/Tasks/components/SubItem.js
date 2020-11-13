import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ImageBackground } from 'react-native';
import { Palette } from './../../../commons/styles';
import { Ionicons } from '@expo/vector-icons';
import { TextBody } from './../../../commons/components/Typography';

const SubItem = (props) => {
  const clickItem = () => {
    if(props.clickItem) props.clickItem();
  }

  const clickClose = () => {
    if(props.clickClose) props.clickClose();
  }

  const propsStyle = props.style ? props.style : {};
  const titleStile = props.fontSize ? [styles.title, {fontSize: props.fontSize}] : styles.title ;

  return(
    <View style={[styles.container, propsStyle]}>
      {props.clickClose && (
        <TouchableHighlight style={styles.onIcon} onPress={clickClose} >
          <Ionicons name="md-close" size={10} color='black' />
        </TouchableHighlight>
      )}
      <TouchableHighlight onPress={clickItem} style={styles.onContainer}>
        <ImageBackground
          source={{uri: props.source}}
          style={styles.background}
        >
          <View style={styles.titleContainer}>
            <TextBody numberOfLines={1} ellipsizeMode='tail' style={titleStile}>{props.title}</TextBody>
          </View>
        </ImageBackground>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '43%',
    height: 75,
    marginBottom: 6,
    marginTop: 6,
    marginLeft: 10,
    position: 'relative',
    shadowColor: '#90a058',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: '#4e4e4e',
  },
  background: {
    height: '100%',
    width: '100%',
  },
  onIcon: {
    backgroundColor: Palette.tasksList.css(),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    width: 15,
    height: 15,
    zIndex: 999,
    position: 'absolute',
    top: -5,
    right: -5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    paddingTop: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 10,
    backgroundColor: Palette.invertedBlack,
    width: '100%',
    color: 'white',
    paddingLeft: 5,
  },
})

export default SubItem;
