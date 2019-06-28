import { isIphoneX } from 'react-native-device-detection';
import deviceUtils from '../utils/device-utils';

const isTablet = deviceUtils.isTablet();

export default {
  fontBody: isTablet ? 22 : 15,
  fontBodySmall: 13,

  fontTitle: 25,
  fontDescription: isTablet ? 15 : 11,

  fontHeader: isTablet ? 25 : 20,
  fontHeaderSmall: isTablet ? 22 : 15 ,
  fontHeaderSuperSmall: 12,

  fontContentMinimized: isTablet ? 23 : 18,

  spaceXSmall: 5,
  spaceSmall: 10,
  spaceMedium: 20,
  spaceLarge: 40,
  spaceMediumLarge: isTablet ? 100 : 60,
  spaceXLarge: 80,

  navbarHeight: isIphoneX ? 70 : isTablet ? 55 : 45,
  bottomBarHeight: isTablet ? 35 : 20,
  mavbarTopSpace: isIphoneX ? 23 : 0,
  paddingLeft: isTablet ? 50 : 20,
  paddingRight: isTablet ? 40 : 10,
  paddingTop: isTablet ? 60 : 30,
  paddingBottom: isTablet ? 80 : 50,

  hamburgerContainerWidth: isTablet ? 80 : 60,
  hamburgerContainerHeigth: isTablet ? 48 : 38,
  hamburgerSize: isTablet ? 43 : 30,
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
  heigthTreeContainer: isTablet ? 340 : 230,

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
  iconSizeEventDescription: isTablet ? 160 : 130,

  //settings
  heigthRowLevel: isTablet ? 50 : 30,
  lineSwitchHeigth: isTablet ? 20 : 16,

  //login
  buttonWidth: isTablet ? 150 : 130,
  loginImageWidth: isTablet ? 60 : 40,
  fontSizeLoginImage: isTablet ? 18 : 10,
  fontSizeInput: isTablet ? 20 : 13,

  //loader view
  fontBarLoader: isTablet ? 23 : 13,
};
