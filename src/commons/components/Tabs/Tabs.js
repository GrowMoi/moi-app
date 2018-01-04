import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { TextBody } from '../Typography';
import { Size } from '../../styles';

const TabContainer = styled(View)`
  min-height: 250;
`;

const Labels = styled(View)`
  flex-direction: row;
`;

const LabelText = styled(TouchableOpacity)`
  padding-horizontal: ${Size.spaceSmall};
  padding-vertical: ${Size.spaceSmall};
  background-color: ${({ selected }) => (selected ? '#62692e' : 'transparent')};
  border-width: 1;
  border-color: black;
`;

const TabContents = styled(View)`
  flex: 1;
`;

const Content = styled(View)`
  flex: 1;
  background-color: #90b653;
  border-color: black;
  border-width: 1;
`;

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
    const { data = [] } = this.props;
    const { currentTab } = this.state;
    return (
      <TabContainer>
        <Labels>
          {data.length && data.map((d, i) => {
            const isSelected = currentTab === d.label;
            return (
              <LabelText
                key={`${d.label}-${i}`}
                selected={isSelected}
                onPress={() => this.onPressLabel(d.label)}
              >
                <TextBody inverted={isSelected}>{d.label}</TextBody>
              </LabelText>
            );
          })}
        </Labels>

        <TabContents>
          {data.length && data.map((d, i) => {
            if (d.label === currentTab) {
              return (
                <Content key={`${d.label}-${i}-content`}>
                  {d.content}
                </Content>
              );
            }
          })}
        </TabContents>
      </TabContainer>
    );
  }
}
