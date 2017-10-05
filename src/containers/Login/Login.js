import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { TextInput, View, Text, Button, Alert } from 'react-native';
import userActions from './../../actions/userActions';

@connect(store => ({
  user: store.user,
}), {
  loginAsync: userActions.loginAsync,
  validateToken: userActions.validateToken,
})
export default class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  onChangeInput = (id, text) => {
    this.setState(prevState => ({
      ...prevState,
      [id]: text,
    }));
  }

  componentWillMount() {
    const { user } = this.props;
    if (user.authenticate) Actions.moiDrawer();
  }

  submit = async () => {
    const { email, password } = this.state;
    const { loginAsync } = this.props;

    try {
      await loginAsync({ email, password });
      Actions.moiDrawer();
    } catch (error) {
      Alert.alert('Credenciales incorrectas');
    }
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 40 }}>
        <Text>Email</Text>
        <TextInput
          autoCapitalize='none'
          style={{ height: 40, alignSelf: 'stretch', borderColor: 'gray' }}
          onChangeText={text => this.onChangeInput('email', text)}
          value={this.state.email}
        />

        <Text>Password</Text>
        <TextInput
          autoCapitalize='none'
          style={{height: 40, alignSelf: 'stretch', borderColor: 'gray' }}
          onChangeText={text => this.onChangeInput('password', text)}
          value={this.state.password}
        />

        <Button title='Login' onPress={this.submit} />
      </View>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object,
};
