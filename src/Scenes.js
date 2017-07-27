import React, { Component } from 'react';
import { Router } from 'react-native-router-flux';
import { connect, Provider } from 'react-redux';
import routes from './routes';
import store from './store';

const RouterWithRedux = connect()(Router);

export default class Scenes extends Component {
  render() {
    return (
      <Provider store={store}>
        <RouterWithRedux scenes={routes}/>
      </Provider>
    );
  }
}
