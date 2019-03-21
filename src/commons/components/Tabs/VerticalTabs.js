import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { TextBody } from '../Typography';
import { getHeightAspectRatio } from '../../utils';
import WoodFrame from '../WoodFrame';

const widthFrame = 335;
const heightFrame = 648;

const TabsContainer = styled(View)`
height: ${props => getHeightAspectRatio(widthFrame, heightFrame, props.width)};
`;

const TabContent = styled(View)`
`;

const TabLabel = styled(View)`
  position: absolute;
  top: -25;
  right: -42;
`;

const Content = styled(View)`
  flex: 1;
`;

const LabelText = styled(TouchableOpacity)`
  padding-top: 4;
  background-color: ${({ selected }) => (selected ? '#62692e' : '#828c3d')};
  border-top-width: ${({ selected }) => (selected ? 1 : 3)};;
  border-left-width: ${({ selected }) => (selected ? 1 : 3)};;
  border-right-width: ${({ selected }) => (selected ? 1 : 3)};;
  border-color: #102b1b;
  border-top-left-radius: 8;
  border-top-right-radius: 8;
`;

export default class VerticalTabs extends Component {
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
    const { currentTab } = this.state;
    const { data, width } = this.props;

    return (<TabsContainer width={width}>
      <TabContent>
        {data.length && data.map((d, i) => {
          if (d.label === currentTab) {
            return (
              <WoodFrame width={width - 20} key={`${d.label}-${i}-content`}>
                {d.content}
              </WoodFrame>
            );
          }
        })}
      </TabContent>
      <TabLabel>
        {data.length && data.map((d, i) => {
          const isSelected = currentTab === d.label;
          const heightLabel = 100;

          return (
            <LabelText
              key={`${d.label}-${i}`}
              selected={isSelected}
              onPress={() => this.onPressLabel(d.label)}
              style={{
                transform: [{ rotate: '90deg' }],
                height: 30,
                width: heightLabel,
                marginTop: heightLabel / 1.5,
              }}
            >
              <TextBody inverted={isSelected} color={'#262625'} center>{d.label}</TextBody>
            </LabelText>
          );
        })}
      </TabLabel>
    </TabsContainer>
    );
  }
}