import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppLoading, Updates, SplashScreen } from 'expo';
import * as Localization from 'expo-localization';
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import * as Font from 'expo-font';
import { Text, Dimensions, AsyncStorage, Keyboard, SafeAreaView, Alert, View, Image } from 'react-native';
import 'intl';
import en from 'intl/locale-data/jsonp/en';
import es from 'intl/locale-data/jsonp/es';
import { NetInfo } from "react-native";
import Orientation from 'react-native-orientation'

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
import allVideos from './assets/videos'

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
    isSplashReady: false,
    appIsReady: false,
    showMainApp: false,
    netInfo: {},
    isShowingAlert: false,
  }

  async componentWillMount() {
    Dimensions.addEventListener('change', this.setOrientation);
    //NetInfo.isConnected.addEventListener('connectionChange', this.handleStatusConnection);

    await this.setPassiveMessageSettings();
    await this.handleAppReview();
    this.checkUpdates();
  }

  componentDidMount() {
    // Orientation.lockToPortrait();
    SplashScreen.preventAutoHide();
  }

  // handleStatusConnection = (isConnected) => {
  //   const netInfo = {isConnected};
  //   if(netInfo.isConnected) {
  //     store.dispatch(setNetInfo(netInfo))
  //     this.setState({ netInfo: netInfo })
  //   }

  //   if(!netInfo.isConnected && !this.state.isShowingAlert) {
  //     store.dispatch(setNetInfo(netInfo))
  //     this.setState(
  //       prevState => ({ netInfo: netInfo, isShowingAlert: true }),
  //       () => {
  //         Alert.alert(
  //           'Tienes problemas de conexión',
  //           'Asegurate de estar conectado a una red estable de internet, para disfrutar la experiencia',
  //           [
  //             {text: 'Intentar nuevamente', onPress: () => {
  //               this.setState(() => ({ showMainApp: false, isShowingAlert: false }),
  //               () => {
  //                 Actions.login({ type: ActionConst.RESET });
  //               });
  //             }},
  //           ],
  //           {cancelable: false},
  //         )
  //       }
  //     );
  //   }
  // }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.setOrientation);
    //NetInfo.isConnected.removeEventListener('connectionChange', this.handleStatusConnection);
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
    const videos = Object.keys(allVideos).map(key => allVideos[key])
    const cacheImgs = await cacheImages([...allImages, ...videos]);
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

  _cacheResourcesAsync = async () => {
    SplashScreen.hide();
    this.setState({ appIsReady: true });
  };

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
    const { appIsReady, assetsLoaded, showMainApp, isSplashReady } = this.state;

    if (!isSplashReady) {
      return (
        <AppLoading
          startAsync={this.validateAuth}
          onFinish={() => this.setState({ isSplashReady: true })}
          onError={console.warn}
          autoHideSplash={false}
        />
      );
    }

    if (!appIsReady) {
      return (
        <View style={{ flex: 1 }}>
          <CustomSplash
            startAsync={this.validateAuth}
            onFinish={this._cacheResourcesAsync}
            onError={console.warn}
          />
        </View>
      );
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
