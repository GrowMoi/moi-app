import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import { View, Text, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { TextBody } from '../Typography';
import { ContentBox } from '../ContentComponents';
import deviceUtils from '../../utils/device-utils';

const isTablet = deviceUtils.isTablet();

const TabsContainer = styled(View)`
  
  height: 103%;
  width: 160%;
`;

const TabLabel = styled(View)`
  ${props => props.horizontalTabs ? css`
    flex-direction: row;
    padding-left: ${isTablet ? 80 : 22};
    margin-bottom: -1;
  ` : css`
    position: absolute;
    top: -10;
  `}
`;

const LabelText = styled(TouchableOpacity)`
  margin-top: 10;
  background-color: ${({ selected }) => (selected ? '#0D5FA1' : '#3CBCCB')};
  border-top-width: ${({ selected }) => (selected ? 1 : 3)};
  border-left-width: ${({ selected }) => (selected ? 1 : 3)};
  border-right-width: ${({ selected }) => (selected ? 1 : 3)};
  border-color: ${({ selected }) => (selected ? '#3CBCCB': '#0D5FA1')};
  border-top-left-radius: 8;
  border-top-right-radius: 8;
 left: 100
`;

const StyledContentBox = styled(ContentBox)`
  margin: 0;
  padding: 0;
  padding-top: 5%;
  padding-bottom: 5%;
  margin-bottom: 5%;
  height: 80%
  ${props => props.horizontalTabs ? css`
    width: 55%;
  ` : css`
    padding-left: -30;
    margin: 0
    width: 55%;
    heigth: 80%;
  `}
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

  renderTabsLabel() {
    const { currentTab } = this.state;
    const { data, horizontalTabs = false } = this.props;

    return (
      <TabLabel horizontalTabs={horizontalTabs}>
        {data.length && data.map((d, i) => {
          const isSelected = currentTab === d.label;
          const heightLabel = 100;

          return (
            <LabelText
              key={`${d.label}-${i}`}
              selected={isSelected}
              onPress={() => this.onPressLabel(d.label)}
              style={!horizontalTabs ? {
                transform: [{ rotate: '90deg' }],
                height: 30,
                width: heightLabel,
                marginTop: heightLabel / 1.5,
              } : {
                  paddingLeft: 10,
                  paddingRight: 10
                }}
            >
              <TextBody inverted={isSelected} color={'#262625'} center>{d.label}</TextBody>
            </LabelText>
          );
        })}
      </TabLabel>
    );
  }

  render() {
    const { currentTab } = this.state;
    const { data, horizontalTabs = false } = this.props;

    return (<TabsContainer>
      {horizontalTabs && this.renderTabsLabel()}
      <StyledContentBox image={'wood_frame'} horizontalTabs={horizontalTabs}>
        {data.length && data.map((d, i) => {
          if (d.label === currentTab) {
            return d.content
          }
        })}
        </StyledContentBox>
      {!horizontalTabs && this.renderTabsLabel()}
    </TabsContainer>
    );
  }
}