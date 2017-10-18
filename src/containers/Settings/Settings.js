import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

// Moi Components
import MoiBackground from '../../commons/components/Background/MoiBackground';
import Preloader from '../../commons/components/Preloader/Preloader';
import { BottomBar } from '../../commons/components/SceneComponents';
import Navbar from '../../commons/components/Navbar/Navbar';
import { ContentBox } from '../../commons/components/ContentComponents';
import { Size } from '../../commons/styles';

const StyledContentBox = styled(ContentBox)`
  margin-bottom: ${Size.spaceMedium};
`;

@connect(store => ({
  device: store.device,
}))
export default class Settings extends Component {
  render() {
    const { device } = this.props;

    const containerStyles = {
      width: (device.dimensions.width - Size.spaceLarge),
      paddingHorizontal: Size.spaceSmall,
    };

    const sliderSection = (
      <View>
        <Text>Settings</Text>
        <View>
          <Text>level</Text>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </View>
      </View>
    );

    const contentBox = (
      <StyledContentBox>
        <ScrollView contentContainerStyle={containerStyles}>
          {sliderSection}
        </ScrollView>
      </StyledContentBox>
    );
    // {loading && <Preloader />}

    return (
      <MoiBackground>
        {contentBox}
        <Navbar />
        <BottomBar width={device.dimensions.width} />
      </MoiBackground>
    );
  }
}
