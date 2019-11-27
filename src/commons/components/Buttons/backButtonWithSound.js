import React from 'react'
import withSound from '../../utils/withSound';
import { BackButton } from '../SceneComponents';


export default (action, params) => {
  const BackButtonWithSound = withSound(BackButton);

  return (
    <BackButtonWithSound style={{ left: -5, top: 3 }} onPress={() => action(params)} soundName="next" />
  );
}
