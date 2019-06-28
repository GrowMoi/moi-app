import { isAndroid, isTablet } from 'react-native-device-detection';
import { PixelRatio } from 'react-native';
import { LANDSCAPE } from '../../constants';

const deviceUtils = {
  getHeigthPercentage: (dimensions) => {
    const { width, height } = dimensions;
    let percent;
    let correctHeight;
    const aspectRatio = width / height;
    correctHeight = height / aspectRatio;
    percent = (100 * correctHeight) / height;
    if (deviceUtils.isTablet()) percent += (4.55 - aspectRatio);

    return percent;
  },

  isAndroidLandscape(dimensions) {
    return isAndroid && (dimensions.orientation === LANDSCAPE);
  },

  isTablet() {
    const pixelRatio = PixelRatio.get(); // The pixel ratio of the device
    console.log("TCL: isTablet -> pixelRatio", pixelRatio)
    if (!isAndroid) return isTablet;
    if (pixelRatio > 1.6) {
      return false;
    } else {
      return true;
    }
  }
}

export default deviceUtils;
