import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'expo';
import styled from 'styled-components/native';
import { BottomBar, Maceta } from '../../../commons/components/SceneComponents';
import ActionSheet from '../../../commons/components/ActionSheets/ActionSheet';

const BottomContainer = styled(View)`
  position: relative;
  height: 50;
`;

const BarContainer = styled(View)`
  position: absolute;
  bottom: 0;
  height: 16;
  left: 0;
  right: 0;
`;

const MacetaContainer = styled(View)`
  position: absolute;
  align-items: center;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ButtonMore = styled(TouchableOpacity)`
  position: absolute;
  bottom: 15;
  right: 15;
  background-color: transparent;
`;

export default class TreeBottom extends Component {
  state = {
    optionsAreVisible: false,
  }

  showOptions = () => {
    this.setState({ optionsAreVisible: true });
  }

  hideOptions = () => {
    this.setState({ optionsAreVisible: false });
  }

  render() {
    const { optionsAreVisible } = this.state;
    const options = [
      { label: 'Galeria', icon: 'md-photos' },
      { label: 'Recomendaciones', icon: 'md-thumbs-up' },
      { label: 'Links', icon: 'md-link' },
      { label: 'Notas', icon: 'md-create' },
    ];
    return (
      <BottomContainer>
        <BarContainer><BottomBar/></BarContainer>
        <MacetaContainer><Maceta width={200}/></MacetaContainer>
        <ButtonMore onPress={this.showOptions}>
          <Icon.Ionicons name="ios-more" size={45} />
        </ButtonMore>
        <ActionSheet
          options={options}
          visible={optionsAreVisible}
          hasCancelOption
          dismiss={this.hideOptions} />
      </BottomContainer>
    );
  }
}
