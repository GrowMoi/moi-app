import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { View, ScrollView, StyleSheet, Dimensions, Alert, KeyboardAvoidingView } from 'react-native';
import Navbar from '../../commons/components/Navbar/Navbar';
import userActions from './../../actions/userActions';
import Moibackground from '../../commons/components/Background/MoiBackground';
import Profile from '../../commons/components/Profile/Profile';
import { ContentBox } from '../../commons/components/ContentComponents';
import { TextBody, Title } from '../../commons/components/Typography';
import { Line } from '../../commons/components/SceneComponents';
import Button from '../../commons/components/Buttons/Button';
import { normalizeAllCapLetter } from '../../commons/utils/normalize';
import Form from './Form';
import PhotoPicker from '../../commons/components/Photo/PhotoPicker';
import Palette from '../../commons/styles/palette';
import api from '../../api';

const { width } = Dimensions.get('window');

const HeaderProfile = styled(View)`
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  align-self: stretch;
  margin-bottom: 15;
  padding-top: 20;
`;

const NameContainer = styled(View)`
  margin-left: 20;
  flex: 1;
`;

const paddingScrollContainer = 50;
const styles = StyleSheet.create({
  scrollContainer: {
    alignSelf: 'stretch',
    width: width - paddingScrollContainer,
  },
});

const FormBox = styled(KeyboardAvoidingView)`
  border-radius: 5;
  border-color: ${Palette.colors.darkenLightBlue};
  border-width: 2;
  background-color: ${Palette.colors.darkenLightBlue};
  padding-horizontal: 5;
  padding-vertical: 5;
  margin-top: 20;
  margin-bottom: 20;
`;

const StyledButton = styled(Button)`
  width: 120;
  align-self: flex-end;
`;


class EditProfileScene extends Component {
  logout = () => {
    const { logoutAsync } = this.props;
    logoutAsync();
  }

  _onPickerImage = async (result, mutation) => {
    const { getUserProfileAsync, user } = this.props;

    try {
      if (result.base64) {
        const imageBase64 = `data:image/jpeg;base64,${result.base64}`
        await api.user.updateUserProfileImage(imageBase64);
        await getUserProfileAsync(user.profile.id);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  submit = async (values = {}) => {
    const { updateUserAccountAsync, profile } = this.props;
    if(Object.keys(values).length) {
      const res = await updateUserAccountAsync(values, profile.id);

      if(res.status === 202) {
        Alert.alert('Editar Perfil', 'Datos actualizados correctamente!');
        Actions.pop();
      } else {
        Alert.alert('Editar Perfil', 'Ups! tuvimos un error intentalo más tarde por favor.');
      }
    }
  }

  render() {
    const { user, profile } = this.props;

    let userName = '-';
    if (profile.name) userName = normalizeAllCapLetter(profile.name);
    else if (profile.username) userName = normalizeAllCapLetter(profile.username);

    return (
      <Moibackground>
        <Navbar />
          <ContentBox>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <HeaderProfile>
                <Profile userImageUri={profile.image || profile.avatar}/>
                <NameContainer>
                  <Title numberOfLines={2} style={{ flex: 1 }} heavy>{userName}</Title>
                  <PhotoPicker cancelLabel={'Cancelar'}
                      onPickerImage={(result) => this._onPickerImage(result)}
                      pickPhotoLabel={'Seleccionar Imagen'}
                      takePhotoLabel={'Tomar Foto'}>
                    <TextBody color={Palette.accent.css()}>Cambiar foto de perfil</TextBody>
                  </PhotoPicker>
                </NameContainer>
              </HeaderProfile>

              <Line />

              <FormBox>
                <Form onSubmit={this.submit} />
              </FormBox>

            </ScrollView>
          </ContentBox>
      </Moibackground>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.userData,
  profile: state.user.profile,
})

const mapDispatchToProps = {
  logoutAsync: userActions.logoutAsync,
  updateUserAccountAsync: userActions.updateUserAccountAsync,
  getUserProfileAsync: userActions.getUserProfileAsync
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfileScene)
