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
import { getHeightAspectRatio } from '../../commons/utils';
import Input from '../../commons/components/Input/Input';
import { Size } from '../../commons/styles';
import Button from '../../commons/components/Buttons/Button';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import backgroundTree from '../../../assets/images/background/fondo_arbol.png';

// Login Images
import loginImages from './loginImages';
import LoginImage from './LoginImage';

const LoginContainer = styled(View)`
  flex: 1;
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

const ContainerLoginImages = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
`;

@connect(store => ({
  user: store.user.userData,
  device: store.device,
}), {
  loginAsync: userActions.loginAsync,
  validateToken: userActions.validateToken,
})
export default class Login extends Component {
  state = {
    login: '',
    authorization_key: '',
    showingSelectionKey: false,
    showingUsername: true,
    currentSelected: '',
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
    const { login, authorization_key } = this.state;
    const { loginAsync } = this.props;
    loginAsync({ login, authorization_key });
  }

  showSelectionKey = () => {
    this.setState({ showingSelectionKey: true });
  }

  onPressLoginImage = (data, key) => {
    this.setState({ authorization_key: key });
  }

  returnToUsername = () => {
    this.setState({ showingSelectionKey: false });
  }

  render() {
    const { device } = this.props;
    const { showingSelectionKey, authorization_key: key, login } = this.state;
    const { width } = device.dimensions;

    return (
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <MoiBackground>
          <LoginContainer>
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
                {!showingSelectionKey &&
                  <Input
                    placeholder='nombre de usuario'
                    keyboardType='email-address'
                    autoCorrect={false}
                    value={login}
                    onChangeText={text => this.onChangeInput('login', text)}
                  />
                }
                {
                  showingSelectionKey &&
                  <ContainerLoginImages>
                    {loginImages.map((image) => {
                      const selected = image.key === key;
                      return (
                        <LoginImage
                          selected={selected}
                          selectedImage={image.selected}
                          key={image.key}
                          keyName={image.key}
                          source={image.source}
                          name={image.name}
                          onPress={this.onPressLoginImage}
                        />
                      );
                    })}
                  </ContainerLoginImages>
                }
                {!showingSelectionKey &&
                  <ButtonsContainer>
                    <Button style={{ width: 120, marginRight: Size.spaceMedium }} title='Registrarse' onPress={Actions.register} />
                    <Button style={{ width: 120 }} title='Siguiente' disabled={!((login.trim()).length > 0)} onPress={this.showSelectionKey} />
                  </ButtonsContainer>
                }
                {showingSelectionKey &&
                  <ButtonsContainer>
                    <Button style={{ width: 120, marginRight: Size.spaceMedium }} title='Atras' onPress={this.returnToUsername} />
                    <Button style={{ width: 120 }} title='Login' onPress={this.submit} />
                  </ButtonsContainer>
                }
              </Form>
            </FormContainer>
          </LoginContainer>
        </MoiBackground>
      </TouchableWithoutFeedback>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object,
  device: PropTypes.object,
};
