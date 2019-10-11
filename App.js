import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppLoading, Updates } from 'expo';
import * as Localization from 'expo-localization';
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import * as Font from 'expo-font';
import { Text, Dimensions, AsyncStorage, Keyboard, SafeAreaView, Alert } from 'react-native';
import 'intl';
import en from 'intl/locale-data/jsonp/en';
import es from 'intl/locale-data/jsonp/es';
import NetInfo from "@react-native-community/netinfo";

import routes from './src/routes';
import messages from './src/messages';
import store from './src/store';
import { flattenMessages, cacheImages } from './src/commons/utils';
import allImages from './assets/images';
import fonts from './assets/fonts';
import { setDeviceDimensions, setNetInfo } from './src/actions/deviceActions';
import userActions from './src/actions/userActions';
import UserInactivity from 'react-native-user-inactivity';
import { TIME_FOR_INACTIVITY } from './src/constants';
import Loader from './src/commons/components/Loader/Loader';
import CustomSplash from './src/commons/components/CustomSplash/CustomSplash'
import AppContainer from './src/containers/App/AppContainer'
import { Actions, ActionConst } from 'react-native-router-flux';

// addLocaleData([...en, ...es]);

const allFonts = {
  ...fonts,
  ...Ionicons.font,
  ...FontAwesome.font,
};

class App extends Component {
  state = {
    locale: this.deviceLocale,
    assetsLoaded: false,
    appIsReady: false,
    showCustomSplash: false,
    showMainApp: false,
    netInfo: null,
    isShowingAlert: false,
  }

  async componentWillMount() {
    Dimensions.addEventListener('change', this.setOrientation);
    await this.setPassiveMessageSettings();
    await this.handleAppReview();
    this.checkUpdates();
  }

  componentDidMount() {
    this.subscribeNetInfo();
  }

  subscribeNetInfo = () => {
    this.unsubscribeNetInfo = NetInfo.addEventListener(state => {

      if(state.isConnected) {
        store.dispatch(setNetInfo(state))
        this.setState({ netInfo: state })
      }

      if(!state.isConnected && !this.state.isShowingAlert) {
        store.dispatch(setNetInfo(state))
        this.setState(
          prevState => ({ netInfo: state, isShowingAlert: true }),
          () => {
            Alert.alert(
              'Tienes problemas de conexión',
              'Asegurate de estar conectado a una red estable de internet, para disfrutar la experiencia',
              [
                {text: 'Intentar nuevamente', onPress: () => {
                  this.setState(() => ({ showMainApp: false, isShowingAlert: false }),
                  () => {
                    Actions.login({ type: ActionConst.RESET });
                  });
                }},
              ],
              {cancelable: false},
            )
          }
        );
      }
    });
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.setOrientation);
    this.unsubscribeNetInfo();
  }

  setOrientation = (options) => {
    store.dispatch(setDeviceDimensions(options));
  }

  setPassiveMessageSettings = async () => {
    const passiveMessage = await AsyncStorage.getItem('passiveMessage');
    const passiveMessageBoolean = passiveMessage !== null ? passiveMessage === 'true' : true;
    store.dispatch(userActions.setCurrentPassiveMessageSettings({ show: passiveMessageBoolean }));
  }

  handleAppReview = async () => {
    const showReview = await AsyncStorage.getItem('showReview');
    if(showReview === 'true') {
        AsyncStorage.setItem('showReview', 'showReview');
    }
  }

  preLoadingAssets = async () => {
    const cacheImgs = await cacheImages(allImages);
    await Font.loadAsync(allFonts);

    await Promise.all(cacheImgs);
    this.setState({ assetsLoaded: true });
  }

  get deviceLocale() {
    const currentLocale = Localization.locale;
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

    this.setOrientation();
    return Promise.resolve()
  }

  showPassiveMessage = async () => {
    await store.dispatch(userActions.showPassiveMessageAsync());
  }

  onAppReady = () => {
    console.log('APP READY!')
    this.setState({ showMainApp: true });
  }

  async checkUpdates() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if(update.isAvailable) {
        //do nothing
      }
    } catch (e) {
      // handle or log error
    }
  }

  render() {
    const { appIsReady, assetsLoaded, showMainApp, showCustomSplash } = this.state;

    if (!appIsReady) {
      return (
        <AppLoading
          startAsync={this.validateAuth}
          onFinish={() => this.setState({ appIsReady: true, showCustomSplash: true })}
          onError={console.warn}
        />
      );
    }

    if (appIsReady && showCustomSplash) {
      return (
        <CustomSplash
          startAsync={this.validateAuth}
          onFinish={() => this.setState({ showCustomSplash: false })}
          onError={console.warn}
        />
      )
    }

    if (showMainApp) {
      return (
        <Provider store={store}>
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
        </Provider>
      );
    }

    return (
      <Loader
        onInit={this.preLoadingAssets}
        assetsLoaded={assetsLoaded}
        onAppReady={this.onAppReady}
      />
    );
  }
}

export default App
