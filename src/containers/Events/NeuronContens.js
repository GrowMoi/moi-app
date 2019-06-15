import React, { Component } from 'react';
import { View, FlatList, Image, Text } from 'react-native';
import styled from 'styled-components/native';
import { Header } from '../../commons/components/Typography';
import { Size } from '../../commons/styles';

const TextContainer = styled(View)`
  height: 25;
`;

export default class NeuronContents extends Component {

  get data() {
    const { contents } = this.props;
    return contents && contents.length > 4 ? contents.slice(0, 4) : contents;
  }

  getNeuronColor(color) {
    switch (color) {
      case 'blue':
        return 'neurona_color_azul';
      case 'yellow':
        return 'neurona_color_amarillo';
      case 'orange':
        return 'neurona_color_naranja';
      case 'dark_orange':
        return 'neurona_color_naranja_oscuro';
      case 'fuchsia':
        return 'neuronaFucsia';
      case 'green':
        return 'neurona_color_verde';
      default:
        return 'neurona_descubierta';
    }
  }

  _renderItem = ({ item }) => {
    const neuron = this.getNeuronColor(item.neuron_color);

    return (
      <View style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: Size.neuronContainerSizeEventInfo,
      }}>
        <Image style={{ width: Size.neuronSizeEventInfo, height: Size.neuronSizeEventInfo }} source={{ uri: neuron }} />
        <TextContainer>
          <Header color={'white'} customSize={Size.titleNeuronSizeEventInfo}>{item.neuron}</Header>
        </TextContainer>

      </View>
    );
  }

  _keyExtractor = item => item.content_id.toString();

  render() {

    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
        <FlatList
          contentContainerStyle={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          ItemSeparatorComponent={({ highlighted }) => (
            <View style={{ width: 12, height: 1, backgroundColor: 'white', marginTop: Size.marginTopSeparatorNeurons }}></View>
          )}
          data={this.data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          horizontal
        />
      </View>
    );
  }
};
