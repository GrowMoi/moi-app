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
import { TextBody, Title, Header } from '../../commons/components/Typography';
import { Line } from '../../commons/components/SceneComponents';
import Button from '../../commons/components/Buttons/Button';
import { normalizeAllCapLetter } from '../../commons/utils/normalize';
import { Size } from '../../commons/styles';
import Tabs from '../../commons/components/Tabs';
import Preloader from '../../commons/components/Preloader/Preloader';

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

const PersonalInfo = styled(View)`
  background-color: #90b653;
  border-radius: 5px;
  border-color: #87a749;
  border-width: 1px;
  padding-horizontal: ${Size.spaceSmall};
  padding-vertical: ${Size.spaceSmall};
  flex-direction: row;
`;

const TreeImage = styled(View)`
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

const StyledButton = styled(Button)`
  width: 120;
  align-self: flex-end;
`;

const TabContainer = styled(View)`
  flex: 1;
`;

@connect(store => ({
  user: store.user.userData,
  favorites: store.user.favorites,
  tree: store.tree.userTree,
}), {
  logoutAsync: userActions.logoutAsync,
  loadAllFavoritesAsync: userActions.loadAllFavorites,
})
export default class ProfileScene extends Component {
  state = {
    favoritesLoading: true,
  }

  logout = () => {
    const { logoutAsync } = this.props;
    logoutAsync();
  }

  async componentDidMount() {
    const { loadAllFavoritesAsync, favorites } = this.props;

    if (!favorites) await loadAllFavoritesAsync(1);

    this.setState({ favoritesLoading: false });
  }

  editProfile = () => {
    Actions.editProfile();
  }

  render() {
    const { favoritesLoading } = this.state;
    const { user, tree: { meta: { depth } } } = this.props;

    const favorites = (
      <TabContainer>
        {favoritesLoading && <Preloader />}
      </TabContainer>
    );

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
      { label: 'Favoritos', content: favorites },
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
                <Button onPress={this.editProfile} title='Editar' />
              </NameContainer>
            </HeaderProfile>

            <Line />

            <PersonalInfo>
              <DescriptionContainer>
                <Header bolder small>Mensaje Personal:</Header>
                <TextBody></TextBody>
              </DescriptionContainer>
              <DescriptionContainer>
                <Header inverted bolder small>Edad: {user.profile.birthday || '-'}</Header>
                <Header inverted bolder small>Curso: {'-'}</Header>
                <Header inverted bolder small>Nivel: {depth || '-'}</Header>
                <Header inverted bolder small>Escuela: {user.profile.school || '-'}</Header>
              </DescriptionContainer>
            </PersonalInfo>
            <TreeImage>

            </TreeImage>
            <Tabs data={tabsData} />

          </ScrollView>
        </ContentBox>
      </Moibackground>
    );
  }
}
