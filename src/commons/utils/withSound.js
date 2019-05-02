import React from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
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
      <TouchableWithoutFeedback
        onPressIn={playSound}
        onPress={onPress}
      >
        <View >
          <WrapperComponent {...rest} />
          <View style={{ position: 'absolute', width: '100%', height: '100%' }} />
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return SoundOnPress;
}

export default withSound;