import Scenes from './src/Scenes';
import StorybookUI from './storybook';
import env from './environment';

let currentState;

if (env.STORYBOOK) currentState = StorybookUI;
else currentState = Scenes;

module.exports = currentState;

