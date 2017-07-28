import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';

import Welcome from './containers/Welcome';
import Home from './containers/Home';

const routes = Actions.create(
  <Scene key="root">
    <Scene key="welcome" component={Welcome} title="Welcome"/>
    <Scene key="home" component={Home} title="Home" />
  </Scene>,
);

export default routes;
