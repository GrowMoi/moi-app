# WIP
### Requirements
* Node v12.18.2
* Expo-cli 3.24.2
* Yarn 1.22.4
* Xcode
* Android Studio
* Xcode command line tools

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
