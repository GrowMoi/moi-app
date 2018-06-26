import { ActionConst } from 'react-native-router-flux';
import * as actionTypes from '../../actions/actionTypes';
import { Sound, sounds } from '../components/SoundPlayer';

let previousScene = '';
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

    if(!isDrawerScene(currentScene)) {
      if (((sounds[currentScene] || {}).soundName || '') !== ((sounds[previousScene] || {}).soundName || '')) {
        Sound.play(sounds[currentScene].payload);
      }
    }

    previousScene = currentScene;
  }

  if(action.type === actionTypes.STOP_CURRENT_AUDIO) {
    Sound.stop();
  }
  else if(action.type === actionTypes.PLAY_CURRENT_AUDIO) {
    const storedScene = ((store.getState().routes || {}).scene || {}).name;

    if(storedScene) {
      Sound.play(sounds[storedScene].payload);
    }
  }

  return next(action);
};

export default routeMiddleware;
