import { isIphoneX } from 'react-native-device-detection';

export default {
  fontBody: 15,
  fontBodySmall: 13,

  fontTitle: 25,
  fontDescription: 11,

  fontHeader: 20,
  fontHeaderSmall: 15,
  fontHeaderSuperSmall: 12,

  spaceXSmall: 5,
  spaceSmall: 10,
  spaceMedium: 20,
  spaceLarge: 40,
  spaceMediumLarge: 60,
  spaceXLarge: 80,

  navbarHeight: isIphoneX ? 70 : 45,
  mavbarTopSpace: isIphoneX ? 23 : 0,
};
