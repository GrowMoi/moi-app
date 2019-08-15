import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import Expo, { Font, Icon, DangerZone, AppLoading } from 'expo';
import { Text, Dimensions, AsyncStorage, Keyboard } from 'react-native';
import 'intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import ModalHost from 'expo/src/modal/ModalHost';

import routes from './routes';
import messages from './messages';
import store from './store';
import { flattenMessages, cacheImages } from './commons/utils';
import allImages from '../assets/images';
import fonts from '../assets/fonts';
import { setDeviceDimensions } from './actions/deviceActions';
import userActions from './actions/userActions';
import UserInactivity from 'react-native-user-inactivity';
import { TIME_FOR_INACTIVITY } from './constants';
import Loader from './commons/components/Loader/Loader';
import AppContainer from './containers/App/AppContainer'

addLocaleData([...en, ...es]);

const allFonts = {
  ...fonts,
  ...Icon.Ionicons.font,
  ...Icon.FontAwesome.font,
};

export default class Scenes extends Component {
  state = {
    locale: null,
    assetsLoaded: false,
    appIsReady: false,
    showMainApp: false,
  }

  async componentWillMount() {
    await this.setOrientation();
    await this.validateAuth();
    // await this.preLoadingAssets();
    await this.setPassiveMessageSettings();
    Dimensions.addEventListener('change', this.setOrientation);
    this.checkUpdates();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.setOrientation);
  }

  setOrientation = () => {
    store.dispatch(setDeviceDimensions());
  }

  setPassiveMessageSettings = async () => {
    const passiveMessage = await AsyncStorage.getItem('passiveMessage');
    const passiveMessageBoolean = passiveMessage !== null ? passiveMessage === 'true' : true;
    store.dispatch(userActions.setCurrentPassiveMessageSettings({ show: passiveMessageBoolean }));
  }

  preLoadingAssets = async () => {
    const locale = await this.getCurrentLocale();
    const cacheImgs = await cacheImages(allImages);
    await Font.loadAsync(allFonts);

    await Promise.all(cacheImgs);
    this.setState({ assetsLoaded: true, locale });
  }

  async getCurrentLocale() {
    const currentLocale = await DangerZone.Localization.getCurrentLocaleAsync();
    let locale;
    if (/^es/.test(currentLocale)) locale = 'es';
    else if (/^en/.test(currentLocale)) locale = 'en';
    else locale = 'es';

    return locale;
  }

  validateAuth = async () => {

    try {
      await store.dispatch(userActions.validateToken());
    } catch (error) {
      console.log('AUTH NOT VALID', error.message);
      await store.dispatch(userActions.resetData());
    }

    this.setState({ appIsReady: true });
  }

  showPassiveMessage = async () => {
    await store.dispatch(userActions.showPassiveMessageAsync());
  }

  onAppReady = () => {
    this.setState({ showMainApp: true });
  }

  async checkUpdates() {
    try {
      const update = await Expo.Updates.checkForUpdateAsync();
      if(update.isAvailable) {
        //do nothing
      }
    } catch (e) {
      // handle or log error
    }
  }

  render() {
    const { locale, appIsReady, assetsLoaded, showMainApp } = this.state;

    if(!appIsReady) {
      return <AppLoading />;
    }

    if (showMainApp) {
      return (
        <ModalHost>
          <Provider store={store}>
            <IntlProvider
              locale={locale}
              messages={flattenMessages(messages[locale])}
              textComponent={Text}>
              <UserInactivity
                timeForInactivity={TIME_FOR_INACTIVITY}
                onAction={(isActive) => {
                  if(!isActive) {
                    Keyboard.dismiss()
                    this.showPassiveMessage();
                  }
                }}
              >
                <AppContainer scenes={routes} />
              </UserInactivity>
            </IntlProvider>
          </Provider>
         </ModalHost>
      );
    }

    return <Loader onInit={this.preLoadingAssets} assetsLoaded={assetsLoaded} onAppReady={this.onAppReady} />;
  }
}
