# moi-app
Moi app with React Native

[![CircleCI](https://circleci.com/gh/GrowMoi/moi-app.svg?style=svg)](https://circleci.com/gh/GrowMoi/moi-app)

#### Install
Install all dependencies: `yarn` or `npm i`

#### Requirements
  * node >= `v6.9`
  * Android Studio*
  * Xcode*
  * Xcode (Command Line Tools)*
  * expo global installed [Expo](https://expo.io)
  * react-native-cli
  * install react-native-debugger `brew update && brew cask install react-native-debugger`

**Note:** * All (*) requirements are optionals if you have a device.
* XCode and Android Studio are required for run app on the Simulator.

### Getting Started
  * `npm install`
  * `cd ios/`
  * `pod install`
  * `react-native link`
  *  open your's project `xcworkspace` file in Xcode and compile
  * Run app: `exp start` or `start project with exp desktop client`

[More info for developing with expo](https://docs.expo.io/versions/v16.0.0/guides/expokit.html#1-check-js-dependencies)

### Testing & Linter
  Run test:
  ```
  yarn test or npm test
  yarn lint or npm run lint
  ```

### WIP:Storybook
  comming soon
