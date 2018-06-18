import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import { Router } from 'react-native-router-flux';
import { AppLoading, Font, Icon, DangerZone } from 'expo';
import { Text, Dimensions, AsyncStorage } from 'react-native';
import 'intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import routes from './routes';
import messages from './messages';
import store from './store';
import { flattenMessages, cacheImages } from './commons/utils';
import allImages from '../assets/images';
import fonts from '../assets/fonts';
import { setDeviceDimensions } from './actions/deviceActions';
import userActions from './actions/userActions';

addLocaleData([...en, ...es]);

const RouterWithRedux = connect()(Router);

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
  }

  async componentWillMount() {
    await this.setOrientation();
    await this.preLoadingAssets();
    Dimensions.addEventListener('change', this.setOrientation);
  }

  componentDidMount() {
    this.validateAuth();
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.setOrientation);
  }

  setOrientation = () => {
    store.dispatch(setDeviceDimensions());
  }

  async preLoadingAssets() {
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
      console.log('AUTH NOT VALID');
    }

    this.setState({ appIsReady: true });
  }

  render() {
    const { locale, appIsReady, assetsLoaded } = this.state;

    if (appIsReady && assetsLoaded) {
      return (
        <Provider store={store}>
          <IntlProvider
            locale={locale}
            messages={flattenMessages(messages[locale])}
            textComponent={Text}>
            <RouterWithRedux scenes={routes}/>
          </IntlProvider>
        </Provider>
      );
    }

    return <AppLoading/>;
  }
}
