import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-native-slider';
//TODO: remove this
import thumbImage from '../../../../assets/images/buttons/slider_button.png';

const SliderLevels = ({ value, ...rest }) => {
  const thumbStyle = { backgroundColor: 'transparent', top: 4, left: -5 };
  const trackStyle = { backgroundColor: '#4a5922', height: 15, borderColor: '#354516', borderWidth: 2, borderRadius: 3 };
  const sliderStyle = { height: 30 };
  return (
    <Slider value={value}
      thumbImage={thumbImage}
      thumbStyle={thumbStyle}
      trackStyle={trackStyle}
      style={sliderStyle}
      {...rest}
    />
  );
}

SliderLevels.defaultProps = {
  maximumValue: 2,
  minimumValue: 0,
  step: 1,
  value: 0,
};

SliderLevels.propTypes = {
  value: PropTypes.number,
};

export default SliderLevels;
