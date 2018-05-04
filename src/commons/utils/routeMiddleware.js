import { ActionConst } from 'react-native-router-flux';
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

  return next(action);
};

export default routeMiddleware;
