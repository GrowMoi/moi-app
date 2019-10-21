import React, { Component } from 'react';
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
  TouchableOpacity,
} from 'react-native';

import userActions from './../../actions/userActions';
import { WoodTitle } from '../../commons/components/SceneComponents';
import { getHeightAspectRatio } from '../../commons/utils';
import Input from '../../commons/components/Input/Input';
import { Size } from '../../commons/styles';
import Button from '../../commons/components/Buttons/Button';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import Preloader from '../../commons/components/Preloader/Preloader';

// Login Images
import loginImages from '../Login/loginImages';
import LoginImage from '../Login/LoginImage';
import ActionSheet from '../../commons/components/ActionSheets/ActionSheet';
import array from '../../commons/utils/array';

const RegisterContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const bgTreeWidth = 522;
const bgTreeHeight = 650;
const BackgroundTree = styled(Image) `
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(bgTreeWidth, bgTreeHeight, props.width)};
  position: absolute;
  bottom: 0;
  right: 0;
`;

const FormContainer = styled(KeyboardAvoidingView) `
  width: ${props => props.width};
  padding-horizontal: ${Size.spaceSmall};
`;

const ButtonsContainer = styled(View) `
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${Size.spaceMedium};
`;

const Form = styled(View) `
  margin-top: ${Size.spaceMedium};
`;

const InputsContainer = styled(View) `
  height: auto;
  justify-content: center;
  flex-shrink: 1;
`;

const ContainerLoginImages = styled(View) `
  flex-direction: row;
  flex-wrap: wrap;
  align-self: stretch;
  align-items: center;
  justify-content: center;
`;
const AnimatableContainerLoginKeys = Animatable.createAnimatableComponent(ContainerLoginImages);

const requiredFields = ['username', 'email', 'school'];

let currentFields = [];

class Register extends Component {
    state = {
        username: '',
        email: '',
        year: '',
        school: '',
        country: '',
        city: '',
        authorization_key: '',
        showingSelectionKey: false,
        currentSelected: '',
        validating: false,
        validForm: false,
        loading: false,
        showSelectYear: false,
    }

    handleFormContainer = ref => this.formContainer = ref;

    onChangeInput = (id, text) => {
        const inputText = text.trim();
        if (inputText) {
            this.addField(id);
        } else {
            this.removeField(id);
        }

        this.setState(({
            [id]: inputText,
        }));

        this.validateRequiredFields();
    }

    addField(keyField) {
        if (currentFields.indexOf(keyField) === -1) {
            currentFields.push(keyField);
        }
    }

    removeField(keyField) {
        const indexKeyField = currentFields.indexOf(keyField);
        if (indexKeyField !== -1) {
            currentFields.splice(indexKeyField, 1);
        }
    }

    validateRequiredFields() {
        let valid = true;
        for (let fieldKey of requiredFields) {
            if (currentFields.indexOf(fieldKey) === -1) {
                valid = false;
            }
        }

        if(valid && this.state.email) {
            valid = this.validateMail(this.state.email);
        }
        this.setState({ validForm: valid });
    }

    validateMail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    componentWillMount() {
        const { user } = this.props;
        if (user.authenticate) Actions.tree();
    }

    generateAge(year) {
      const currentYear = (new Date()).getFullYear();
      return currentYear - Number(year);
    }

    submit = async () => {
        const { username, email, year, school, country, city, authorization_key } = this.state;

        if(!authorization_key) {
            Alert.alert('Necesita seleccionar una imagen');
            return;
        }

        const { registerAsync, loginAsync } = this.props;

        this.setState({ validating: true });

        try {
          await registerAsync({
            username,
            email,
            age: this.generateAge(year),
            school,
            country,
            city,
            authorization_key,
            onPressAlert: async () => {
              this.setState({ loading: true });

              try {
                await loginAsync({ login: username, authorization_key });
              } catch (error) {
                console.log('Error to login after to register', error.message);
                Alert.alert(error.message);
              }

              this.setState({ loading: false });
            }
          });
        } catch (error) {
          console.log('Error to register', error.message)
        }

        this.setState({ validating: false });
    }

    showSelectionKey = () => {
        this.setState({ showingSelectionKey: true });
    }

    onPressLoginImage = (data, key) => {
        this.setState({ authorization_key: key });
    }

    returnToFillFields = () => {
        this.setState({ showingSelectionKey: false });
    }

    returnToLogin = () => {
        Actions.login({type: ActionConst.RESET});
    }

    toggleSelectYearDropdown = () => {
      this.setState(prevState => ({showSelectYear: !prevState.showSelectYear}))
    }

    onSelectYear = year => {
      this.setState({year});
      this.toggleSelectYearDropdown();
    }

    generateYears() {
      const currentYear = (new Date()).getFullYear();
      const years = array.range(1990, currentYear, 1);
      return years.map(year => ({label: year.toString(), fn: this.onSelectYear}));
    }

    render() {
        const { device } = this.props;
        const { showingSelectionKey, authorization_key: key, validating, validForm, loading, showSelectYear } = this.state;

        const { username, email, year, school, country, city } = this.state;

        const { width } = device.dimensions;

        return (
            <TouchableWithoutFeedback
                onPress={() => Keyboard.dismiss()}
            >
                <MoiBackground>
                    <RegisterContainer>
                        {!loading && <FormContainer
                            behavior="padding"
                            width={width - Size.spaceXLarge}
                            keyboardVerticalOffset={Size.spaceLarge}
                        >
                            <Animatable.View ref={this.handleFormContainer}>
                                <StatusBar hidden />

                                <Animatable.View animation="bounceInDown" easing="ease-in">
                                    <WoodTitle title='REGISTRO' />
                                </Animatable.View>

                                <Form>
                                    <InputsContainer>
                                        {!showingSelectionKey &&
                                            <Animatable.View animation="fadeIn" delay={300}>
                                                <Input
                                                    placeholder='nombre de usuario'
                                                    keyboardType='default'
                                                    autoCorrect={false}
                                                    value={username}
                                                    onChangeText={text => this.onChangeInput('username', text)}
                                                />
                                                <Input
                                                    placeholder='correo electronico'
                                                    keyboardType='email-address'
                                                    autoCorrect={false}
                                                    value={email}
                                                    onChangeText={text => this.onChangeInput('email', text)}
                                                />
                                                <TouchableOpacity onPress={this.toggleSelectYearDropdown} activeOpacity={1}>
                                                  <Input
                                                    placeholder='año de nacimiento'
                                                    pointerEvents="none"
                                                    editable={false}
                                                    value={year}
                                                  />
                                                </TouchableOpacity>
                                                <Input
                                                    placeholder='escuela'
                                                    keyboardType='default'
                                                    autoCorrect={false}
                                                    value={school}
                                                    onChangeText={text => this.onChangeInput('school', text)}
                                                />
                                                <Input
                                                    placeholder='cuidad'
                                                    keyboardType='default'
                                                    autoCorrect={false}
                                                    value={city}
                                                    onChangeText={text => this.onChangeInput('city', text)}
                                                />
                                                <Input
                                                    placeholder='pais'
                                                    keyboardType='default'
                                                    autoCorrect={false}
                                                    value={country}
                                                    onChangeText={text => this.onChangeInput('country', text)}
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
                                                style={{ width: 130, marginRight: Size.spaceMedium }}
                                                title='Atras'
                                                onPress={!showingSelectionKey ? this.returnToLogin : this.returnToFillFields}
                                            />
                                        </Animatable.View>

                                        <Animatable.View animation="bounceInRight" easing="ease-in">
                                            <Button
                                                loading={validating}
                                                style={{ width: 130 }}
                                                title={!showingSelectionKey ? 'Siguiente' : 'Registrarse'}
                                                disabled={!validForm}
                                                onPress={!showingSelectionKey ? this.showSelectionKey : this.submit}
                                            />
                                        </Animatable.View>
                                    </ButtonsContainer>

                                </Form>
                            </Animatable.View>
                        </FormContainer>}
                        <ActionSheet
                          hasCancelOption
                          visible={showSelectYear}
                          options={this.generateYears()}
                          dismiss={this.toggleSelectYearDropdown}
                      />
                        {loading && <Preloader />}
                    </RegisterContainer>
                </MoiBackground>
            </TouchableWithoutFeedback>
        );
    }
}

Register.propTypes = {
    device: PropTypes.object,
};

const mapStateToProps = (state) => ({
  device: state.device,
  user: state.user.userData,
})

const mapDispatchToProps = {
  registerAsync: userActions.registerAsync,
  loginAsync: userActions.loginAsync,
  validateToken: userActions.validateToken,//no
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
