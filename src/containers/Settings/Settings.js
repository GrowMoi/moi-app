import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

// Moi Components
import MoiBackground from '../../commons/components/Background/MoiBackground';
import { BottomBar, Line } from '../../commons/components/SceneComponents';
import Navbar from '../../commons/components/Navbar/Navbar';
import { ContentBox } from '../../commons/components/ContentComponents';
import { Size } from '../../commons/styles';
import HeaderLevels from './HeaderLevels';
import { Header } from '../../commons/components/Typography';
import RowLevel from './RowLevel';
import preferencesActions from '../../actions/contentPreferencesActions';

const StyledContentBox = styled(ContentBox)`
  margin-bottom: ${Size.spaceMedium};
`;

const StyledLine = styled(Line)`
  margin-bottom: ${Size.spaceMedium};
  margin-top: ${Size.spaceSmall};
`;

const labelPreferences = {
  'que-es': '¿Que es?',
  'por-que-es': '¿Por qué es?',
  'quien-cuando-donde': '¿Quién, Cuándo, Dónde?',
  'como-funciona': '¿Cómo funciona?',
};

@connect(store => ({
  device: store.device,
  userData: store.user.userData,
}), {
  updatePreferencesAsync: preferencesActions.setCurrentPreferencesAsync,
})
export default class Settings extends Component {
  setSettingValue = async (kind, level) => {
    const { updatePreferencesAsync } = this.props;
    updatePreferencesAsync(kind, level);
  }

  render() {
    const { device, userData: { profile: { content_preferences } } } = this.props;

    const containerStyles = {
      width: (device.dimensions.width - Size.spaceLarge),
      paddingHorizontal: Size.spaceSmall,
    };

    const rows = content_preferences.map((row, i) => (
      <RowLevel
        key={i}
        title={labelPreferences[row.kind]}
        onValueChange={(kind, level) => this.setSettingValue(kind, level)}
        {...row}
      />
    ));

    const sliderSection = (
      <View>
        <Header heavy>Levels</Header>
        <StyledLine size={2} />
        <HeaderLevels />
        <View>
          {rows}
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

    return (
      <MoiBackground>
        {contentBox}
        <Navbar />
        <BottomBar width={device.dimensions.width} />
      </MoiBackground>
    );
  }
}

Settings.propTypes = {
  userData: PropTypes.object,
  device: PropTypes.object,
};
