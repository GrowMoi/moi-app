import { ActionConst } from 'react-native-router-flux';
import * as actionTypes from '../../actions/actionTypes';
import { Sound, sounds } from '../components/SoundPlayer';
import neuronActions from '../../actions/neuronActions';

let previousScene = '';
const conflictScenes = ['content', 'profile'];

const isDrawerScene = (currentScene) => {
  return currentScene === 'moiDrawer';
};

const routeMiddleware = args => store => next => async(action) => {
  if (action.type === ActionConst.FOCUS) {
    let currentScene = action.scene.name;

    if (conflictScenes.indexOf(previousScene) !== -1 && isDrawerScene(currentScene)) {
      currentScene = 'tree';
    }

    const previousAudio = store.getState().tree.audio;
    if(previousScene === 'profile' && previousAudio.soundName === 'content' && previousAudio.scene !== 'profile') {
      currentScene = previousAudio.scene;
    }

    if(!isDrawerScene(currentScene)) {
      store.dispatch(neuronActions.setCurrentBackgroundAudio({
        ...sounds[currentScene],
        scene: currentScene,
        previousScene
      }));

      const currentAudio = store.getState().tree.audio;
      if (currentAudio) {
        if(sounds.playIn[currentAudio.soundName].includes(currentScene) !== sounds.playIn[currentAudio.soundName].includes(previousScene)) {
          await Sound.play(currentAudio.payload);
        }
      }
      previousScene = currentScene;
    }
  }

  if(action.type === actionTypes.STOP_CURRENT_AUDIO) {
    Sound.stop();
  }
  else if(action.type === actionTypes.PLAY_CURRENT_AUDIO) {
    const currentAudio = store.getState().tree.audio;
      if (currentAudio) {
          await Sound.play(currentAudio.payload);
      }
  }

  return next(action);
};

export default routeMiddleware;
