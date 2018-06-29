import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

// Moi Components
import MoiBackground from '../../commons/components/Background/MoiBackground';
import { BottomBar, InterestBox } from '../../commons/components/SceneComponents';
import Navbar from '../../commons/components/Navbar/Navbar';
import { ContentBox } from '../../commons/components/ContentComponents';
import { Size } from '../../commons/styles';
import HeaderLevels from './HeaderLevels';
import RowLevel from './RowLevel';
import preferencesActions from '../../actions/contentPreferencesActions';
import userActions from '../../actions/userActions';
import SettingsSection from './SettingsSection';
import InterestButton from './InterestButton';
import Preloader from '../../commons/components/Preloader/Preloader';
import Button from '../../commons/components/Buttons/Button';


const StyledContentBox = styled(ContentBox)`
  margin-bottom: ${Size.spaceMedium};
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
  settings: store.user.settings,
}), {
  setCurrentSettings: userActions.setCurrentSettings,
  updateSettingsAsync: userActions.updateSettingsAsync,
})
export default class Settings extends Component {
  state = {
    updating: false,
  }

  componentDidMount() {
    const { userData: { profile: { content_preferences } }, setCurrentSettings } = this.props;

    setCurrentSettings(content_preferences);
  }

  setSettingValue = async (kind, level) => {
    const { setCurrentSettings, settings } = this.props;

    const currentChange = { kind, level };

    const whatSettingsChange = (settings || []).map((setting) => {
      if(setting['kind'] === currentChange.kind) {
        if(setting['level'] !== currentChange.level) {
          return { ...setting, ...currentChange, toUpdate: true };
        }
      }

      return setting;
    });

    setCurrentSettings(whatSettingsChange);
  }

  saveSettings = async () => {
    const { settings, updateSettingsAsync } = this.props;
    this.setState({ updating: true });

    try {
      await updateSettingsAsync(settings);

      Alert.alert('Preferencias', 'Tus preferencias se han actualizado con exito', [{
        text: 'Aceptar', onPress: () => {
          this.setState({ updating: false });
        }
      }]);
    } catch (error) {

      Alert.alert('Error', 'Lametamos el problema, no se pudieron guardar las preferencias', [{
        text: 'Aceptar', onPress: () => {
          this.setState({ updating: false });
        }
      }]);
      throw new Error(error);
    }
  }

  render() {
    const { device, settings } = this.props;

    const containerStyles = { flex: 1 };

    // const interestSection = (
    //   <SettingsSection title='Interest'>
    //     <InterestBox>
    //       <InterestButton type='sport'/>
    //     </InterestBox>
    //   </SettingsSection>
    // );

    return (
      <MoiBackground>
        <StyledContentBox>
          <ScrollView contentContainerStyle={containerStyles}>
            <SettingsSection title='Levels'>
              <HeaderLevels />
              {(settings || []).map((row, i) => (
                <RowLevel
                  key={i}
                  title={labelPreferences[row.kind]}
                  onValueChange={this.setSettingValue}
                  {...row}
                />
              ))}
            </SettingsSection>
          </ScrollView>

          <Button style={{ width: '80%' }} title='Guardar Preferencias' onPress={this.saveSettings}/>
          {this.state.updating && <Preloader />}
        </StyledContentBox>
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
