import { getStorybookUI, configure } from '@storybook/react-native';
import { NativeModules } from 'react-native';
import url from 'url';

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

// import stories
configure(() => {
  require('./stories/stories/Moicon.story');
  require('./stories/stories/Badge.story');
}, module);

const StorybookUI = getStorybookUI({ port: 7007, host: hostname, onDeviceUI: true });
export default StorybookUI;
