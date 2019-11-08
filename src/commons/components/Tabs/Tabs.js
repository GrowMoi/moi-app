import React, { Component } from 'react';
import { View, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { TextBody } from '../Typography';
import { Size, Palette } from '../../styles';

const TabContainer = styled(View)`
  height: 295;
`;

const Labels = styled(View)`
  flex-direction: row;
  margin-bottom: -8;
`;

const LabelText = styled(TouchableOpacity)`
  border-color: transparent;
  padding-horizontal: ${Size.spaceSmall};
  padding-vertical: ${Size.spaceSmall};
  alignSelf: center;
`;

const TabContents = styled(View)`
  flex: 1;
`;

const Content = styled(View)`
  flex: 1;
  border-radius: 15px;
`;

const styles = StyleSheet.create({
  backgroundImage: {
    height: '100%',
    width: '100%',
  },
  tabStyles: {
    height: null,
    width: 115,
    resizeMode: 'contain',
  }
});

export default class Tabs extends Component {
  state = {
    currentTab: '',
  }

  componentDidMount() {
    const { data } = this.props;

    this.setState({
      currentTab: data[0].label || '',
    });
  }

  onPressLabel = (label) => {
    this.setState({ currentTab: label });
  }

  render() {
    const { data = [], transparent=false } = this.props;
    const { currentTab } = this.state;
    return (
      <TabContainer>
        <Labels>
          {data.length && data.map((d, i) => {
            const isSelected = currentTab === d.label;
            return (
              <ImageBackground
              key={`${d.label}-${i}`}
              style= { styles.tabStyles }
              source={isSelected ? {uri: 'tab_perfil_selected'} : {uri: 'tab_perfil_no_selected'}}
              >
                <LabelText
                  key={`${d.label}-${i}`}
                  selected={isSelected}
                  onPress={() => this.onPressLabel(d.label)}
                >
                  <TextBody color='#EEEEE7' inverted={isSelected}>{d.label}</TextBody>
                </LabelText>
              </ImageBackground>
            );
          })}
        </Labels>

        <TabContents>
        <ImageBackground style= { styles.backgroundImage } imageStyle={{ borderRadius: 15}} source={{uri: 'marco_profile_tab_contents'}} >
          {data.length && data.map((d, i) => {
            if (d.label === currentTab) {
              return (
                <Content key={`${d.label}-${i}-content`} transparent={transparent}>
                  {d.content}
                </Content>
              );
            }
          })}
          </ImageBackground>
        </TabContents>
      </TabContainer>
    );
  }
}
