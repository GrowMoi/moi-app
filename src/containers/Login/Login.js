import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { Actions, ActionConst } from 'react-native-router-flux';
import * as Animatable from 'react-native-animatable';
import {
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';

import userActions from './../../actions/userActions';
import { WoodTitle } from '../../commons/components/SceneComponents';
import { getHeightAspectRatio } from '../../commons/utils';
import Input from '../../commons/components/Input/Input';
import { Size } from '../../commons/styles';
import Button from '../../commons/components/Buttons/Button';
import MoiBackground from '../../commons/components/Background/MoiBackground';

// Login Images
import loginImages from './loginImages';
import LoginImage from './LoginImage';
import PassiveMessageAlert from '../../commons/components/Alert/PassiveMessageAlert';

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

const InputsContainer = styled(View)`
  height: ${Size.buttonWidth + 5};
  justify-content: center;
  flex-shrink: 1;
`;

const ContainerLoginImages = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  align-self: stretch;
  align-items: center;
  justify-content: center;
`;
const AnimatableContainerLoginKeys = Animatable.createAnimatableComponent(ContainerLoginImages);

@connect(store => ({
  user: store.user.userData,
  device: store.device,
  showPassiveMessage: store.user.showPassiveMessage,
}), {
  loginAsync: userActions.loginAsync,
  validateToken: userActions.validateToken,
  signOutAsync: userActions.signOutAsync,
  showPassiveMessageAsync: userActions.showPassiveMessageAsync,
})
export default class Login extends PureComponent {
  state = {
    login: '',
    authorization_key: '',
    showingSelectionKey: false,
    showingUsername: true,
    currentSelected: '',
    validating: false,
  }
  handleFormContainer = ref => this.formContainer = ref;

  onChangeInput = (id, text) => {
    this.setState(({
      [id]: text.trim(),
    }));
  }

  componentWillMount() {
    const { user } = this.props;
    console.log('USER AUTHENTICATE', user.authenticate)
    if (user.authenticate) Actions.tree();
  }

  submit = async () => {
    const { login, authorization_key } = this.state;
    const { loginAsync } = this.props;

    this.setState({ validating: true });

    try {
      await loginAsync({ login, authorization_key });
    } catch (error) {
      const { user: { authenticate } } = this.props
      if(!authenticate) {
        const animationTime = 800;
        this.formContainer.shake(animationTime);
        this.setState({ validating: false });

        setTimeout(() => {
          Alert.alert('Credenciales Incorrectas');
        }, animationTime / 2);
      };
    }

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

  goRegister = () => {
    Actions.register({type: ActionConst.RESET});
  }

  render() {
    const { device, showPassiveMessage, showPassiveMessageAsync } = this.props;
    const { showingSelectionKey, authorization_key: key, login, validating } = this.state;
    const { width } = device.dimensions;

    return (
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
      >
        <MoiBackground>
          <LoginContainer>
            <BackgroundTree
              source={{uri: 'fondo_arbol'}}
              width={width}
            />
            <FormContainer
              behavior="padding"
              width={width - Size.spaceXLarge}
              keyboardVerticalOffset={Size.spaceLarge}
            >
              <Animatable.View ref={this.handleFormContainer}>
                <StatusBar hidden/>

                <Animatable.View animation="bounceInDown" easing="ease-in">
                  <WoodTitle title='Login' />
                </Animatable.View>

                <Form>
                  <InputsContainer>
                    {!showingSelectionKey &&
                      <Animatable.View animation="fadeIn" delay={300}>
                        <Input
                          placeholder='nombre de usuario'
                          keyboardType='email-address'
                          autoCorrect={false}
                          value={login}
                          onChangeText={text => this.onChangeInput('login', text)}
                        />
                      </Animatable.View>
                    }
                    {showingSelectionKey &&
                      <AnimatableContainerLoginKeys animation="fadeIn">
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
                      </AnimatableContainerLoginKeys>
                    }
                  </InputsContainer>

                  <ButtonsContainer>
                    <Animatable.View animation="bounceInLeft" easing="ease-in">
                      <Button
                        style={{ width: Size.buttonWidth, marginRight: Size.spaceMedium }}
                        title={!showingSelectionKey ? 'Registrarse' : 'Atras' }
                        onPress={!showingSelectionKey ? this.goRegister : this.returnToUsername}
                      />
                    </Animatable.View>

                    <Animatable.View animation="bounceInRight" easing="ease-in">
                      <Button
                        loading={validating}
                        style={{ width: Size.buttonWidth }}
                        title={!showingSelectionKey ? 'Siguiente' : 'Login'}
                        disabled={!((login.trim()).length > 0)}
                        onPress={!showingSelectionKey ? this.showSelectionKey : this.submit}
                      />
                    </Animatable.View>
                  </ButtonsContainer>

                </Form>
              </Animatable.View>
            </FormContainer>
          </LoginContainer>

          <PassiveMessageAlert
            isOpenPassiveMessage={showPassiveMessage}
            touchableProps={{
              onPress: () => {
                showPassiveMessageAsync(false);
              }
            }}
            message='Hola! Ingresa tu nombre de usuario y presiona siguiente. Si no tienes uno, da clic en Registrarse'
          />

        </MoiBackground>
      </TouchableWithoutFeedback>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object,
  device: PropTypes.object,
};
