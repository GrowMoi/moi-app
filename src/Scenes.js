import React, { Component } from 'react';
import { connect, Provider } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import { Router } from 'react-native-router-flux';
import { Util, AppLoading, Font } from 'expo';
import { Text } from 'react-native';
import 'intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';

import routes from './routes';
import messages from './messages';
import store from './store';
import { flattenMessages } from './commons/utils';
import typography from './assets/fonts';

addLocaleData([...en, ...es]);

const RouterWithRedux = connect()(Router);

export default class Scenes extends Component {
  state = {
    locale: null,
    appIsReady: false,
    fontLoaded: false,
  }

  componentWillMount() {
    this.getCurrentLocale();
  }

  async componentDidMount() {
    await Font.loadAsync(typography);
    this.setState({ fontLoaded: true });
  }

  async getCurrentLocale() {
    const currentLocale = await Util.getCurrentLocaleAsync();
    let locale;
    if (/^es/.test(currentLocale)) locale = 'es';
    else if (/^en/.test(currentLocale)) locale = 'en';

    this.setState({ locale, appIsReady: true });
  }

  render() {
    const { locale, appIsReady, fontLoaded } = this.state;

    if (appIsReady && fontLoaded) {
      return (
        <Provider store={store}>
          <IntlProvider locale={locale} messages={flattenMessages(messages[locale])} textComponent={Text}>
            <RouterWithRedux scenes={routes}/>
          </IntlProvider>
        </ Provider>
      );
    }
    return <AppLoading />;
  }
}

