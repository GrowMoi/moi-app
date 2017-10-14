import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

import userActions from './../../actions/userActions';
import { WoodTitle } from '../../commons/components/SceneComponents';
import backgroundTree from '../../../assets/images/background/fondo_arbol.png';
import backgound from '../../../assets/images/background/background_tree_portrait.jpg';
import { getHeightAspectRatio } from '../../commons/utils';
import Input from '../../commons/components/Input/Input';
import { Size } from '../../commons/styles';
import Button from '../../commons/components/Buttons/Button';

const Background = styled(Image)`
  flex: 1;
  width: ${props => props.width};
  height: ${props => props.height};
  justify-content: center;
  align-items: center;
`;

const bgTreeWidth = 522;
const bgTreeHeight = 650;
const BackgroundTree = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(bgTreeWidth, bgTreeHeight, props.width)};
  position: absolute;
  bottom: 0;
  right: 0;
`;

const FormContainer = styled(KeyboardAvoidingView)`
  width: ${props => props.width};
  padding-horizontal: ${Size.spaceSmall};
`;

const ButtonsContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${Size.spaceMedium};
`;

const Form = styled(View)`
  margin-top: ${Size.spaceMedium};
`;

@connect(store => ({
  user: store.user,
  device: store.device,
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
    this.setState(({
      [id]: text.trim(),
    }));
  }

  componentWillMount() {
    const { user } = this.props;
    if (user.authenticate) Actions.moiDrawer();
  }

  submit = async () => {
    const { email, password } = this.state;
    const { loginAsync } = this.props;
    loginAsync({ email, password });
  }

  render() {
    const { device } = this.props;
    const { width, height } = device.dimensions;

    return (
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <Background
          source={backgound}
          width={width}
          height={height}
        >
          <BackgroundTree
            source={backgroundTree}
            width={width}
          />
          <FormContainer
            behavior="padding"
            width={width - Size.spaceXLarge}
            keyboardVerticalOffset={Size.spaceLarge}
          >
            <StatusBar hidden/>
            <WoodTitle title='Login' />

            <Form>
              <Input
                placeholder='email'
                keyboardType='email-address'
                onChangeText={text => this.onChangeInput('email', text)}
              />
              <Input
                placeholder='contraseña'
                secureTextEntry
                onChangeText={text => this.onChangeInput('password', text)}
              />

              <ButtonsContainer>
                <Button style={{ flex: 1, marginRight: Size.spaceMedium }} title='Registrarse' onPress={Actions.register} />
                <Button style={{ flex: 1 }} title='Jugar' onPress={this.submit} />
              </ButtonsContainer>
            </Form>
          </FormContainer>
        </Background>
      </TouchableWithoutFeedback>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object,
};
