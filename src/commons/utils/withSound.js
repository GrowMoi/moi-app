import React from 'react';
import { Audio } from 'expo';
import { sounds } from '../components/SoundPlayer';
import Sound from '../components/SoundPlayer/Sound';

const withSound = (WrapperComponent) => {
  const SoundOnPress = ({
    soundName,
    onPress,
    ...rest
  }) => {
    const playSound = () => {
      Sound.playOverBackgroundSound(soundName);
    }

    return (
      <WrapperComponent
        onPress={() => {
          playSound();
          onPress();
        }}
        {...rest}
      />
    );
  };

  return SoundOnPress;
}

export default withSound;