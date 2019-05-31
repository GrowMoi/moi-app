import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Header } from '../../commons/components/Typography';
import Button from '../../commons/components/Buttons/Button';
import NeuronContents from './NeuronContens';

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
        <Header small >{event.description}</Header>
        <View style={{ width: 70, height: 70, borderWidth: 1, borderColor: '#E3BB83',  margin: 10 }}>
          {event.image && <Image style={{ width: 70, height: 70 }} source={{ uri: event.image }} />}
        </View>
        <NeuronContents contents={event.contents}/>
        <Button title={'UNETE'} onPress={() => onTakeEvent()} image={'boton_unete'}/>
      </View>
    );
  }
};
