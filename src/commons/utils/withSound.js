import React from 'react';
import Sound from '../components/SoundPlayer/Sound';

const withSound = (WrapperComponent) => {
  const SoundOnPress = ({
    soundName,
    onPress,
    onPressIn,
    ...rest
  }) => {
    const onPressInElement = () => {
      if (onPressIn) onPressIn();
      Sound.playOverBackgroundSound(soundName);
    }

    return (
      <WrapperComponent
        onPress={onPress}
        onPressIn={onPressInElement}
        {...rest} />
    );
  }

  return SoundOnPress;
};

export default withSound;