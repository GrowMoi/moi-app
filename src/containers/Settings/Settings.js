import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, Alert, View } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';

// Moi Components
import MoiBackground from '../../commons/components/Background/MoiBackground';
import { BottomBar, InterestBox } from '../../commons/components/SceneComponents';
import Navbar from '../../commons/components/Navbar/Navbar';
import { ContentBox } from '../../commons/components/ContentComponents';
import { Size, Palette } from '../../commons/styles';
import HeaderLevels from './HeaderLevels';
import RowLevel from './RowLevel';
import preferencesActions from '../../actions/contentPreferencesActions';
import userActions from '../../actions/userActions';
import SettingsSection from './SettingsSection';
import InterestButton from './InterestButton';
import Preloader from '../../commons/components/Preloader/Preloader';
import Button from '../../commons/components/Buttons/Button';
import { Line } from '../../commons/components/SceneComponents';
import { getHeightAspectRatio } from '../../commons/utils';


const StyledLine = styled(Line)`
`;

const labelPreferences = {
  'que-es': '¿Que es?',
  'por-que-es': '¿Por qué es?',
  'quien-cuando-donde': '¿Quién, Cuándo, Dónde?',
  'como-funciona': '¿Cómo funciona?',
};

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-top: ${Size.navbarHeight + Size.spaceXSmall};
  padding-bottom: ${Size.paddingBottom};
  padding-top: ${Size.paddingTop};
  padding-left: ${Size.paddingLeft};
  padding-right: ${Size.paddingRight};
`

class Settings extends Component {
  state = {
    updating: false,
    passiveMessage: false,
  }

  componentDidMount() {
    const { userData: { profile: { content_preferences } }, setCurrentSettings, passiveMessageSettings } = this.props;

    setCurrentSettings(content_preferences);
    this.setState({passiveMessage: passiveMessageSettings.show})
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
      await this.setPassiveMessageSettings();

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

  toggleSwitch = () => {
      this.setState(prevState => ({ passiveMessage: !prevState.passiveMessage }));
  }

  setPassiveMessageSettings = () => {
      const { setCurrentPassiveMessageSettings, passiveMessageSettings } = this.props;
      const { passiveMessage } = this.state;
      setCurrentPassiveMessageSettings({...passiveMessageSettings, show: passiveMessage});
  }

  render() {
    const { device, settings } = this.props;
    const { passiveMessage } = this.state;

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
        <Container>
          <ScrollView contentContainerStyle={containerStyles}>
            <SettingsSection title='Niveles'>
              <HeaderLevels />
              {(settings || []).map((row, i) => (
                <RowLevel
                  key={i}
                  title={labelPreferences[row.kind]}
                  onValueChange={this.setSettingValue}
                  {...row}
                />
              ))}
              <StyledLine size={2} style={{ marginTop: 20 }} color={Palette.colors.lightenDarkBlue}/>
              <RowLevel
                  title={'Mensages pasivos'}
                  toggleSwitch={this.toggleSwitch}
                  toggle={passiveMessage}
                />
                <StyledLine size={2} color={Palette.colors.lightenDarkBlue}/>
            </SettingsSection>

          </ScrollView>

          <Button style={{ width: '80%' }} title='Guardar Preferencias' onPress={this.saveSettings}/>
          {this.state.updating && <Preloader />}
        </Container>
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

const mapStateToProps = (state) => ({
  device: state.device,
  userData: state.user.userData,
  settings: state.user.settings,
  passiveMessageSettings: state.user.passiveMessageSettings,
})

const mapDispatchToProps = {
  setCurrentSettings: userActions.setCurrentSettings,
  updateSettingsAsync: userActions.updateSettingsAsync,
  setCurrentPassiveMessageSettings: userActions.setCurrentPassiveMessageSettings,
}


export default connect(mapStateToProps, mapDispatchToProps)(Settings)
