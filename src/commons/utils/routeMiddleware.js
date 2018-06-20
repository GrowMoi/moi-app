import { ActionConst } from 'react-native-router-flux';
import * as actionTypes from '../../actions/actionTypes';
import { Sound, sounds } from '../components/SoundPlayer';

const previousScene = '';
const conflictScenes = ['content', 'profile']

const isDrawerScene = (currentScene) => {
  return currentScene === 'moiDrawer';
};

const routeMiddleware = args => store => next => action => {
  if (action.type === ActionConst.FOCUS) {
    let currentScene = action.scene.name;

    if (conflictScenes.indexOf(previousScene) !== -1 && isDrawerScene(currentScene)) {
      currentScene = 'tree';
    }

    if (!isDrawerScene(currentScene)) {
      Sound.play(sounds[currentScene]);
    }

    previousScene = currentScene;
  }

  if(action.type === actionTypes.STOP_CURRENT_AUDIO) {
    Sound.stop();
  }

  if(action.type === actionTypes.PLAY_CURRENT_AUDIO) {
    const storedScene = ((store.getState().routes || {}).scene || {}).name;

    if(storedScene) {
      Sound.play(sounds[storedScene]);
    }
  }

  return next(action);
};

export default routeMiddleware;
