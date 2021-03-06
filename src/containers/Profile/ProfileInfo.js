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
import ProfileAvatar from '../../commons/components/Profile/Profile';
import TreeScreenShot from '../../commons/components/TreeScreenShot/TreeScreenShot';
import { getHeightAspectRatio } from '../../commons/utils';
import deviceUtils from '../../commons/utils/device-utils';

const isTablet = deviceUtils.isTablet();
const { width } = Dimensions.get('window');

const treeBackgroundProfileWidth = 117;
const treeBackgroundProfileHeight = 73;//original 73
const heightBackgroundProfile = getHeightAspectRatio(treeBackgroundProfileWidth, treeBackgroundProfileHeight, width)

const Container = styled(ContentBox)`
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled(View)`
  width: ${isTablet ? '90%' : '98%'};
  height:${isTablet ? '97%' : '100%'};
`;

const HeaderProfile = styled(View)`
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  align-self: stretch;
  margin-bottom: 15;
  z-index: 10;
`;

const NameContainer = styled(View)`
  margin-left: 20;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
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
    alignSelf: 'center',
    width: '100%',
  },
});

const ProfileInfo = ({ data, isShared = false, onClickEdit, tabsData, onClickSignOut, onProfileInfoReady = () => {} }) => {
  if(data === undefined) return null;

  const { profile, level } = data;

  if(profile === undefined) return null;

  let userName = '-';
  if (profile.name) userName = normalizeAllCapLetter(profile.name);
  else if (profile.username) userName = normalizeAllCapLetter(profile.username);

  return (
    <Container>
      <ContentContainer>
      <ScrollView contentContainerStyle={styles.scrollContainer} ref={(e) => { onProfileInfoReady(e) }} >
        <HeaderProfile>
          <ProfileAvatar width={65} userImageUri={profile.image}/>
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

        {profile.tree_image_app && (
          <TreeScreenShot width={width - 100} height={isTablet ? heightBackgroundProfile : heightBackgroundProfile + 40} treeBackground={'background_profile'} profileImage={profile.tree_image_app} style={{marginVertical : 10}}/>
        )}

        {Object.keys(tabsData).length > 0 && <Tabs data={tabsData} transparent/>}

        {!isShared &&
          <Button style={{ marginTop: 20, marginBottom: 20 }} onPress={onClickSignOut && onClickSignOut} title='Cerrar mi sesión' rightIcon='md-log-out' />
        }
      </ScrollView>
      </ContentContainer>
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
