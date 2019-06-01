import React, { Component } from 'react';
import { Image, FlatList, View, TouchableOpacity } from 'react-native';
import ContentContainer from './ContentContainer';
import { Header, TextBody } from '../../commons/components/Typography';

export default class ListEvents extends Component {

  _renderItem = ({ item }) => {
    const { width, onSelectEvent } = this.props;
    return (
      <TouchableOpacity
        onPress={() => onSelectEvent(item)}
        activeOpacity={0.8}
      >
        <ContentContainer style={{ paddingTop: 10, paddingBottom: 10 }} width={(width / 3) - 15} colorsMargin={['#F9C680', '#D39E25']} colorsContent={['#EAC899', '#E5BD6E']} horizontalGradient>
          <View style={{ width: 40, height: 40, borderWidth: 1, borderColor: '#E3BB83' }}>
            {item.image && <Image style={{ width: 40, height: 40 }} source={{ uri: item.image }} />}
          </View>
          <Header style={{ paddingTop: 10, paddingBottom: 5, textAlign: 'center' }} customSize={13} bolder>{item.title}</Header>
          {/* <Header  style={{ textAlign: 'center' }} customSize={12} >{item.description}</Header> */}
        </ContentContainer>
      </TouchableOpacity>
    );
  }

  _keyExtractor = item => item.isSuperEvent ? `se-${item.id.toString()}`  : item.id.toString();

  render() {

    const { events } = this.props;

    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <FlatList
          contentContainerStyle={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          ItemSeparatorComponent={({ highlighted }) => (
            <View style={{ width: 5 }} />
          )}
          data={events}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
           ListEmptyComponent={
            <TextBody center>No tienes eventos para unirte</TextBody>
          }
          horizontal
        />
      </View>
    );
  }
}