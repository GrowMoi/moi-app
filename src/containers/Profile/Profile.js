import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { View, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import Navbar from '../../commons/components/Navbar/Navbar';
import userActions from './../../actions/userActions';
import Moibackground from '../../commons/components/Background/MoiBackground';
import Profile from '../../commons/components/Profile/Profile';
import { ContentBox } from '../../commons/components/ContentComponents';
import { TextBody, Title, Header } from '../../commons/components/Typography';
import { Line } from '../../commons/components/SceneComponents';
import Button from '../../commons/components/Buttons/Button';
import { normalizeAllCapLetter } from '../../commons/utils/normalize';
import { Size } from '../../commons/styles';
import Tabs from '../../commons/components/Tabs';
import FavoritesTab from './TabsContent/FavoritesTab';

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
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const paddingScrollContainer = 50;
const styles = StyleSheet.create({
  scrollContainer: {
    alignSelf: 'stretch',
    width: width - paddingScrollContainer,
  },
});

const PersonalInfo = styled(View)`
  background-color: #90b653;
  border-radius: 5px;
  border-color: #87a749;
  border-width: 1px;
  padding-horizontal: ${Size.spaceSmall};
  padding-vertical: ${Size.spaceSmall};
  flex-direction: row;
  margin-bottom: ${Size.spaceXSmall};
`;

const TreeImage = styled(Image)`
  border-radius: 5px;
  border-color: #87a749;
  border-width: 1px;
  margin-top: ${Size.spaceSmall};
  margin-bottom: ${Size.spaceSmall};
  padding-horizontal: ${Size.spaceSmall};
  padding-vertical: ${Size.spaceSmall};
  background-color: #90b653;
  height: 180;
`;

const DescriptionContainer = styled(View)`
  flex: 1;
`;

const TabContainer = styled(View)`
  flex: 1;
`;

@connect(store => ({
  user: store.user.userData,
  tree: store.tree.userTree,
}), {
  logoutAsync: userActions.logoutAsync,
})
export default class ProfileScene extends Component {
  logout = () => {
    const { logoutAsync } = this.props;
    logoutAsync();
  }

  editProfile = () => {
    Actions.editProfile();
  }

  render() {
    const { user, tree: { meta: { depth } } } = this.props;

    const latest = (
      <TabContainer>
        <TextBody>Latest llllllas</TextBody>
      </TabContainer>
    );

    const tutors = (
      <TabContainer>
        <TextBody>Tutores</TextBody>
      </TabContainer>
    );

    const tabsData = [
      { label: 'Favoritos', content: <FavoritesTab /> },
      { label: 'Ultimos 4', content: latest },
      { label: 'Tutores', content: tutors },
    ];

    let userName = 'INVITADO';
    if (user.profile.name) userName = normalizeAllCapLetter(user.profile.name);
    else if (user.profile.username) userName = normalizeAllCapLetter(user.profile.username);

    return (
      <Moibackground>
        <Navbar />

        <ContentBox>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <HeaderProfile>
              <Profile width={40}/>
              <NameContainer>
                <Title heavy>{userName}</Title>
                <Button onPress={this.editProfile} title='Editar' rightIcon='md-create' />
              </NameContainer>
            </HeaderProfile>

            <Line />

            <PersonalInfo>
              <DescriptionContainer>
                <Header inverted heavy small>Edad: {user.profile.birthday || '-'}</Header>
                <Header inverted heavy small>Curso: {'-'}</Header>
                <Header inverted heavy small>Nivel: {depth || '-'}</Header>
                <Header inverted heavy small>Escuela: {user.profile.school || '-'}</Header>
              </DescriptionContainer>
            </PersonalInfo>

            {user.profile.tree_image && (<TreeImage source={{ uri: user.profile.tree_image }} resizeMode='cover' />)}

            <Tabs data={tabsData} />

          </ScrollView>
        </ContentBox>
      </Moibackground>
    );
  }
}
