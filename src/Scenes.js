import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import { Router } from 'react-native-router-flux';
import { Util, AppLoading, Font, Icon } from 'expo';
import { Text, Dimensions } from 'react-native';
import 'intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import routes from './routes';
import messages from './messages';
import store from './store';
import { flattenMessages } from './commons/utils';
import fonts from '../assets/fonts';
import { setDeviceDimensions } from './actions/deviceActions';

addLocaleData([...en, ...es]);

const RouterWithRedux = connect()(Router);

export default class Scenes extends Component {
  state = {
    locale: null,
    appIsReady: false,
  }

  componentWillMount() {
    this.preLoadingAssets();
  }

  componentDidMount() {
    this.setOrientation();
    Dimensions.addEventListener('change', this.setOrientation);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.setOrientation);
  }

  setOrientation = () => {
    store.dispatch(setDeviceDimensions());
  }

  async preLoadingAssets() {
    const allFonts = {
      ...fonts,
      ...Icon.Ionicons.font,
      ...Icon.FontAwesome.font,
    };

    const locale = await this.getCurrentLocale();
    await Font.loadAsync(allFonts);

    this.setState({ appIsReady: true, locale });
  }

  async getCurrentLocale() {
    const currentLocale = await Util.getCurrentLocaleAsync();
    let locale;
    if (/^es/.test(currentLocale)) locale = 'es';
    else if (/^en/.test(currentLocale)) locale = 'en';
    else locale = 'es';

    return locale;
  }

  render() {
    const { locale, appIsReady } = this.state;

    if (appIsReady) {
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

    return <AppLoading />;
  }
}
