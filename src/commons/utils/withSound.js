import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import Sound from '../components/SoundPlayer/Sound';

const withSound = (WrapperComponent) => {
  const SoundOnPress = ({
    soundName,
    onPress,
    onPressIn,
    ...rest
  }) => {
    let playSoundOnPress = true;
    const playSound = () => {
      if (onPressIn) onPressIn();
      Sound.playOverBackgroundSound(soundName);
      playSoundOnPress = false;
    }

    const onPressElement = () => {
      if (playSoundOnPress) {
        playSound();
      }
      onPress();
    }

    return (
      <WrapperComponent
        onPress={onPressElement}
        onPressIn={playSound}
        {...rest} />
    );
  }

  return SoundOnPress;
};

export default withSound;