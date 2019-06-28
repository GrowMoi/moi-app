import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled, { css } from 'styled-components/native';
import { TextBody } from '../Typography';
import { ContentBox } from '../ContentComponents';
import deviceUtils from '../../utils/device-utils';

const isTablet = deviceUtils.isTablet();

const TabsContainer = styled(View)`
  padding-top: 5;
  height: 103%;
  width: 89%;
`;

const TabLabel = styled(View)`
  ${props => props.horizontalTabs ? css`
    flex-direction: row;
    padding-left: ${isTablet ? 80 : 22};
    margin-bottom: -1;
  ` : css`
    position: absolute;
    top: -10;
    right: -32;
  `}
`;

const LabelText = styled(TouchableOpacity)`
  padding-top: 4;
  background-color: ${({ selected }) => (selected ? '#62692e' : '#828c3d')};
  border-top-width: ${({ selected }) => (selected ? 1 : 3)};
  border-left-width: ${({ selected }) => (selected ? 1 : 3)};
  border-right-width: ${({ selected }) => (selected ? 1 : 3)};
  border-color: #102b1b;
  border-top-left-radius: 8;
  border-top-right-radius: 8;
`;

const StyledContentBox = styled(ContentBox)`
  margin-top: 0;
  padding-bottom: 30;
  ${props => props.horizontalTabs ? css`
    width: 99%;
  ` : css`
    margin-left: -30;
    width: 90%;
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

    return (<TabsContainer >
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