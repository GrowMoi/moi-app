import React, { Component } from 'react';
import { View, FlatList, Image, Text } from 'react-native';
import styled from 'styled-components/native';
import { Header } from '../../commons/components/Typography';

import neuronaDescubierta from '../../../assets/images/neurona/neurona_descubierta.png';
import neuronaAzul from '../../../assets/images/neurona/neurona_color_azul.png';
import neuronaVerde from '../../../assets/images/neurona/neurona_color_verde.png';
import neuronaFucsia from '../../../assets/images/neurona/neurona_color_fucsia.png';
import neuronaNaranja from '../../../assets/images/neurona/neurona_color_naranja.png';
import neuronaAmarilla from '../../../assets/images/neurona/neurona_color_amarillo.png';
import neuronaNaranjaOscuro from '../../../assets/images/neurona/neurona_color_naranja_oscuro.png';

const TextContainer = styled(View)`
  height: 25;
`;

export default class NeuronContents extends Component {

  getNeuronColor(color) {
    switch (color) {
      case 'blue':
        return neuronaAzul;
      case 'yellow':
        return neuronaAmarilla;
      case 'orange':
        return neuronaNaranja;
      case 'dark_orange':
        return neuronaNaranjaOscuro;
      case 'fuchsia':
        return neuronaFucsia;
      case 'green':
        return neuronaVerde;
      default:
        return neuronaDescubierta;
    }
  }

  _renderItem = ({ item }) => {
    const neuron = this.getNeuronColor(item.neuron_color);

    return (
      <View style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
      }}>
        <Image style={{ width: 15, height: 15 }} source={neuron} />
        <TextContainer>
          <Header color={'white'} customSize={8}>{item.neuron}</Header>
        </TextContainer>

      </View>
    );
  }

  _keyExtractor = item => item.content_id.toString();

  render() {
    const { contents } = this.props;

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
            <View style={{ width: 12, height: 1, backgroundColor: 'white', marginTop: 7 }}></View>
          )}
          data={contents}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          horizontal
        />
      </View>
    );
  }
};
