import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';

// Components
import { ContentBox } from '../../commons/components/ContentComponents';
import { Line } from '../../commons/components/SceneComponents';
import { TextBody, Title, Header } from '../../commons/components/Typography';
import { normalizeAllCapLetter } from '../../commons/utils/normalize';
import { Size, Palette } from '../../commons/styles';
import Button from '../../commons/components/Buttons/Button';
import Tabs from '../../commons/components/Tabs';
import Profile from '../../commons/components/Profile/Profile';

const { width } = Dimensions.get('window');

const Container = styled(ContentBox)`
  margin-bottom: 28;
`;

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

const TreeImage = styled(Image)`
  border-radius: 5px;
  border-color: #87a749;
  border-width: 1px;
  margin-top: ${Size.spaceSmall};
  margin-bottom: ${Size.spaceSmall};
  padding-horizontal: ${Size.spaceSmall};
  padding-vertical: ${Size.spaceSmall};
  background-color: ${Palette.white.alpha(0.2).css()};
  height: 180;
`;

const PersonalInfo = styled(View)`
  background-color: ${Palette.white.alpha(0.2).css()};
  border-radius: 5px;
  border-color: #87a749;
  border-width: 1px;
  padding-horizontal: ${Size.spaceSmall};
  padding-vertical: ${Size.spaceSmall};
  flex-direction: row;
  margin-bottom: ${Size.spaceXSmall};
`;

const DescriptionContainer = styled(View)`
  flex: 1;
`;

const TabContainer = styled(View)`
  flex: 1;
`;

const paddingScrollContainer = 50;
const styles = StyleSheet.create({
  scrollContainer: {
    alignSelf: 'stretch',
    width: width - paddingScrollContainer,
  },
});

const ProfileInfo = ({ data, isShared = false, onClickEdit, tabsData, onClickSignOut }) => {
  if(data === undefined) return null;

  const { profile, level } = data;

  if(profile === undefined) return null;

  let userName = '-';
  if (profile.name) userName = normalizeAllCapLetter(profile.name);
  else if (profile.username) userName = normalizeAllCapLetter(profile.username);

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <HeaderProfile>
          <Profile width={40}/>
          <NameContainer>
            <Title style={{ flex: 1 }} numberOfLines={1} heavy>{userName}</Title>
            {!isShared &&
              <Button onPress={onClickEdit && onClickEdit} title='Editar' rightIcon='md-create' />
            }
          </NameContainer>
        </HeaderProfile>

        <Line />

        <PersonalInfo>
          <DescriptionContainer>
            <Header inverted heavy small>Edad: {profile.age || '-'}</Header>
            <Header inverted heavy small>Curso: {'-'}</Header>
            <Header inverted heavy small>Nivel: {level || '-'}</Header>
            <Header inverted heavy small>Escuela: {profile.school || '-'}</Header>
            <Header inverted heavy small>Ciudad: {profile.city || '-'}</Header>
            <Header inverted heavy small>País: {profile.country || '-'}</Header>
          </DescriptionContainer>
        </PersonalInfo>

        {profile.tree_image && (
          <TreeImage source={{ uri: profile.tree_image }} resizeMode='contain' />
        )}

        {Object.keys(tabsData).length > 0 && <Tabs data={tabsData} transparent/>}

        {!isShared &&
          <Button style={{ marginTop: 20, marginBottom: 20 }} onPress={onClickSignOut && onClickSignOut} title='Cerrar mi sesión' rightIcon='md-log-out' />
        }
      </ScrollView>
    </Container>
  );
};

ProfileInfo.propTypes = {
  data: PropTypes.shape({
    profile: PropTypes.object,
    level: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
  tabsData: PropTypes.array,
  isShared: PropTypes.bool,
  onClickEdit: PropTypes.func,
};

export default ProfileInfo;
