import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Navbar from '../../commons/components/Navbar/Navbar';
import userActions from './../../actions/userActions';
import Moibackground from '../../commons/components/Background/MoiBackground';
import Profile from '../../commons/components/Profile/Profile';
import { ContentBox } from '../../commons/components/ContentComponents';
import { TextBody, Title } from '../../commons/components/Typography';
import { Line } from '../../commons/components/SceneComponents';
import Button from '../../commons/components/Buttons/Button';
import { normalizeAllCapLetter } from '../../commons/utils/normalize';
import SolidInput from '../../commons/components/Input/SolidInput';

const { width } = Dimensions.get('window');

const HeaderProfile = styled(View)`
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  align-self: stretch;
  margin-bottom: 15;
`;

const NameContainer = styled(View)`
  margin-left: 20;
`;

const paddingScrollContainer = 50;
const styles = StyleSheet.create({
  scrollContainer: {
    alignSelf: 'stretch',
    width: width - paddingScrollContainer,
  },
});

const FormBox = styled(View)`
  border-radius: 5;
  border-color: #94aa5b;
  border-width: 2;
  background-color: #99b461;
  padding-horizontal: 5;
  padding-vertical: 5;
  margin-top: 20;
  margin-bottom: 20;
`;

const StyledButton = styled(Button)`
  width: 120;
  align-self: flex-end;
`;

@connect(store => ({
  user: store.user.userData,
}), {
  logoutAsync: userActions.logoutAsync,
})
export default class ProfileScene extends Component {
  logout = () => {
    const { logoutAsync } = this.props;
    logoutAsync();
  }

  onSave = () => {

  }

  render() {
    const { user } = this.props;

    let userName = 'INVITADO';
    if (user.profile.name) userName = normalizeAllCapLetter(user.profile.name);
    else if (user.profile.username) userName = normalizeAllCapLetter(user.profile.username);

    return (
      <Moibackground>
        <Navbar />

        <ContentBox>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <HeaderProfile>
              <Profile />
              <NameContainer>
                <Title heavy>{userName}</Title>
                <TextBody>Cambiar Photo</TextBody>
              </NameContainer>
            </HeaderProfile>

            <Line />

            <FormBox>
              <SolidInput label='Primer Nombre' />
              <SolidInput label='Apellidos' />
              <SolidInput label='Ciudad' />
              <SolidInput label='Pais' />
              <SolidInput label='E-mail' />
              <SolidInput label='Imagen Clave' />
              <SolidInput label='Edad' />
            </FormBox>

            <StyledButton title='Guardar' onPress={this.onSave}/>

          </ScrollView>
        </ContentBox>
      </Moibackground>
    );
  }
}
