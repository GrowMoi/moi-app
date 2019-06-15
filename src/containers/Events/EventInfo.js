import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Header } from '../../commons/components/Typography';
import Button from '../../commons/components/Buttons/Button';
import NeuronContents from './NeuronContens';
import { Size } from '../../commons/styles';

export default class EventInfo extends Component {
  render() {
    const { event, onTakeEvent } = this.props;

    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
        <Header style={{ paddingTop: 10, paddingBottom: 5 }} small bolder >{event.title.toUpperCase()}</Header>
        <Header small ellipsizeMode='tail' numberOfLines={2}>{event.description}</Header>
        <View style={{ width: Size.iconSizeEventInfo, height: Size.iconSizeEventInfo, borderWidth: 1, borderColor: '#E3BB83',  margin: 10 }}>
          {event.image && <Image style={{ width: Size.iconSizeEventInfo, height: Size.iconSizeEventInfo }} source={{ uri: event.image }} />}
        </View>
        <NeuronContents contents={event.contents}/>
        <Button title={'UNETE'} onPress={() => onTakeEvent()} image={'boton_unete'}/>
      </View>
    );
  }
};
