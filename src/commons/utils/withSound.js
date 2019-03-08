import React from 'react';
import { Audio } from 'expo';
import { sounds } from '../components/SoundPlayer';

const withSound = (WrapperComponent) => {
  const SoundOnPress = ({
    soundName,
    onPress,
    ...rest
  }) => {
    const playSound = async () => {
      try {
        const { sound } = await Audio.Sound.create(sounds.buttons[soundName]);
        sound.playAsync();
      } catch (error) { }
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