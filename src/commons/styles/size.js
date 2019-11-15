import deviceUtils from '../utils/device-utils';
import React, {Platform, Dimensions} from 'react-native';

const windowSize = Dimensions.get('window');
const isTablet = deviceUtils.isTablet();


let isPhoneFiveInch;
let isPhoneSixInch;
if ( Platform.OS === 'ios' && !Platform.isTVOS ) {
    isPhoneFiveInch = windowSize.height === 812 || windowSize.width === 812 ? true : false;
    isPhoneSixInch = windowSize.height === 896 || windowSize.width === 896 ? true : false;
}


export default {
  fontBody: isTablet ? 22 : 15,
  fontBodySmall: 13,

  fontTitle: 25,
  fontTitleSmall: isTablet ? 22 : 17,
  fontDescription: isTablet ? 15 : 11,

  fontHeader: isTablet ? 25 : 20,
  fontHeaderSmall: isTablet ? 22 : 15 ,
  fontHeaderSuperSmall: isTablet ? 19 : 12,

  fontContentMinimized: isTablet ? 23 : 18,

  spaceXSmall: 5,
  spaceSmall: 10,
  spaceMedium: 20,
  spaceLarge: 40,
  spaceMediumLarge: isTablet ? 120 : 60,
  spaceXLarge: 80,

  navbarHeight: isPhoneFiveInch ? 70 : isPhoneSixInch ? 80 : isTablet ? 55 : 45,
  bottomBarHeight: isTablet ? 35 : 20,
  mavbarTopSpace: isPhoneFiveInch ? 23 : isPhoneSixInch ? 30 : 0,
  paddingLeft: isTablet ? 50 : 20,
  paddingRight: isTablet ? 40 : 10,
  paddingTop: isTablet ? 60 : 30,
  paddingBottom: isTablet ? 80 : 50,

  hamburgerContainerWidth: isTablet ? 80 : 60,
  hamburgerContainerHeigth: isTablet ? 48 : 38,
  hamburgerSize: isTablet ? 43 : 30,
  profileAvatarSize: isTablet ? 35 : 30,
  borderRadiusProfileIcon: isTablet ? 25 : 15,

  //bottom bar buttons

  bottomBarButtonsHeigth: isTablet ? 50 : 39,
  //task button
  taskButtonContainerWidth: isTablet ? 150 : 120,
  taskButtonBottom: isTablet ? 8 : 7,
  taskButtonContainerLeft: isTablet ? -60 : 15,
  taskButtonLeftRead: isTablet ? -40 : 39,
  taskButtonWidth: isTablet ? 80 : 63,
  taskButtonLeft: isTablet ? 40 : 33,
  badgeTaskSize: isTablet ? 25 : 18,

  //search button
  searchButtonContainerWidth: isTablet ? 150 : 114,
  searchButtonWidth: isTablet ? 80 : 63,
  searchButtonLeft: isTablet ? 39 : 28,
  searchButtonBottom: isTablet ? -1 : 0,

  //random button
  randomButtonContainerWidth: isTablet ? 154 : 125,
  randomButtonContainerBottom: isTablet ? 9 : 8,
  randomButtonContainerLeft: isTablet ? 55 : -25,
  randomButtonLeftRead: isTablet ? 70 : -14,
  randomButtonWidth: isTablet ? 80 : 65,
  randomButtonLeft: isTablet ? 45 : 38,
  randomButtonBottom: isTablet ? -2 : -1,

  //read button
  readButtonContainerWidth: isTablet ? 125 : 101,
  readButtonContainerBottom: isTablet ? 23 : 19,
  readButtonWidth: isTablet ? 89 : 72,
  readButtonLeft: isTablet ? 17 : 10,

  //tasks view
  paddingRightBadge: isTablet ? 9 : 0,

  //side menu
  heigthTreeContainer: isTablet ? 440 : 290,

  //Leaderboard
  heigthLeaderRow: isTablet ? 60 : 40,

  //events
  fontSizeEventDescription: isTablet ? 19 : 13,
  heigthModalListEvent: isTablet ? 300 : 215,
  heigthModalEventInfo: isTablet ? 350 : 275,
  iconSizeEvent: isTablet ? 80 : 40,
  iconSizeEventInfo: isTablet ? 100 : 70,
  neuronContainerSizeEventInfo: isTablet ? 70 : 50,
  neuronSizeEventInfo: isTablet ? 28 : 15,
  titleNeuronSizeEventInfo: isTablet ? 12 : 8,
  marginTopSeparatorNeurons: isTablet ? 12 : 7,
  heigthModalAlert: isTablet ? 190 : 145,
  iconSizeModalAlert: isTablet ? 160 : 130,

  //settings
  heigthRowLevel: isTablet ? 50 : 30,
  lineSwitchHeigth: isTablet ? 20 : 16,

  //login
  buttonWidth: isTablet ? 150 : 130,
  loginImageWidth: isTablet ? 60 : 40,
  fontSizeLoginImage: isTablet ? 18 : 10,
  fontSizeInput: isTablet ? 24 : 16,

  //loader view
  fontBarLoader: isTablet ? 23 : 13,

  //quiz
  containerQuizWidth: isTablet ? 480 : 240,

  //certificate
  heigthTitle: isTablet ? 80 : 45,
  heigthBody: isTablet ? 270 : 150,
  certificateFont: isTablet ? 25 : 14,
  sizeChart: isTablet ? 100 : 60,
};
