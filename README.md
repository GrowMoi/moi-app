# Moi Pacifico
## Managed workflow wit expo SDK-34

Moi Social learning app with technologies based in React Native.

### React-Native App - Android / iOS

### Requirements
* Node `v10.x.x`
* Expo-Cli `>= 3.1.2` [Expo](https://expo.io)
* Yarn `1.17.3`
* Xcode `10.3 (10G8)`
* Xcode command line tools
* react-native-cli: 2.0.1
* react-native: 0.59.8

**Note:** * All (*) requirements are optionals if you have a device.
* XCode and Android Studio are required for run app on the Simulator.


### Install
#### Only for first time - Environment
* `npm install -g expo-cli`
* `npm i -g react-native-cli`
* react-native-debugger `brew update && brew cask install react-native-debugger`

#### Project
* Install packages with `yarn` (It is preferred to use yarn)
* `react-native link`
* `expo install react-native-svg` ⚠️ Install this dependency after linking with react-native link. Its a necesary to work for now. ⚠️

#### iOS
* `cd ios/`
* `pod install`
* `cd ..`
* `yarn start -c`
*  open your's project `xcworkspace` file in Xcode and compile

#### Add the moi-pacifico symbolic link if not exists
* `cd ios/`
* `ln -s moi moi-pacifico`

[More info for developing with expo in iOS](https://docs.expo.io/versions/v34.0.0/workflow/ios-simulator/)
