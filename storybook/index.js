import { getStorybookUI, configure } from '@storybook/react-native';
import { NativeModules } from 'react-native';
import url from 'url';

const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);

// import stories
configure(() => {
  require('./stories/stories/Moicon.story');
  require('./stories/stories/Badge.story');
  require('./stories/stories/TabIcon.story');
  require('./stories/stories/Typography.story');
  require('./stories/stories/ActionSheet.story');
  require('./stories/stories/Contents.story');
  require('./stories/stories/SideBar.story');
}, module);

const StorybookUI = getStorybookUI({ port: 7007, host: hostname });
export default StorybookUI;
