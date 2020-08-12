# WIP
### Requirements
* Node v10.16.0
* Expo-cli 3.22.3
* Yarn 1.22.4
* Xcode 11.5
* Android Studio
* Xcode command line tools
* react-native-cli: 2.0.1
*react-native: 0.62.2

### Install Project
- 1.- `npm install -g expo-cli`
- 2.- `yarn`
- 3.- `npx pod-install` for install pods from `/`.

### Run Project
#### iOS
- 1.- `yarn start`
- 2.- open xcode > file => `moi.xcworkspace`

#### Android
- 1.- `yarn start`
- 2.- Open a new terminal and run `yarn android`

#### Generate an APK
- 1.- Add credentials on `/android/app/build.gradle` > `android` > `signingConfigs` > `release`
- 2.- `cd android`
- 3.- Run `./gradlew app:assembleRelease`

More info https://docs.expo.io/