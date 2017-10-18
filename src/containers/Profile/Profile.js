import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Button } from 'react-native';
import Navbar from '../../commons/components/Navbar/Navbar';
import userActions from './../../actions/userActions';

@connect(store => ({
  user: store.user.userData,
}), {
  logoutAsync: userActions.logoutAsync,
})
export default class Profile extends Component {
  logout = () => {
    const { logoutAsync } = this.props;
    logoutAsync();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Navbar />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button onPress={this.logout} title='Cerrar Sesión' />
        </View>
      </View>
    );
  }
}
