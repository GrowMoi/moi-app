import { isAndroid, isTablet } from 'react-native-device-detection';
import { LANDSCAPE } from '../../constants';

const deviceUtils = {
  getHeigthPercentage: (dimensions) => {
    const { width, height } = dimensions;
    let percent;
    let correctHeight;
    const aspectRatio = width / height;
    correctHeight = height / aspectRatio;
    percent = (100 * correctHeight) / height;
    if (isTablet) percent += (4.55 - aspectRatio);

    return percent;
  },

  isAndroidLandscape(dimensions) {
    return isAndroid && (dimensions.orientation === LANDSCAPE);
  }
}

export default deviceUtils;
