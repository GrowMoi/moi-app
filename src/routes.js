import React, { Component } from 'react';
import { Actions, Scene, Router } from 'react-native-router-flux';

import Welcome from './containers/Welcome';
import Home from './containers/Home';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="welcome" component={Welcome} title="Welcome"/>
    <Scene key="home" component={Home} title="Home" />
  </Scene>,
);

export default class RouterScenes extends Component {
  render() {
    return (
      <Router scenes={scenes} />
    );
  }
}

