import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux'

// Components
import { ContentBox } from '../../commons/components/ContentComponents';
import { Line } from '../../commons/components/SceneComponents';
import { Title, Header } from '../../commons/components/Typography';
import { normalizeAllCapLetter } from '../../commons/utils/normalize';
import { Size, Palette } from '../../commons/styles';
import Button from '../../commons/components/Buttons/Button';
import Tabs from '../../commons/components/Tabs';
import ProfileAvatar from '../../commons/components/Profile/Profile';
import TreeScreenShot from '../../commons/components/TreeScreenShot/TreeScreenShot';
import { getHeightAspectRatio } from '../../commons/utils';
import deviceUtils from '../../commons/utils/device-utils';
import * as routeTypes from '../../routeTypes';

const isTablet = deviceUtils.isTablet();
const { width } = Dimensions.get('window');

const treeBackgroundProfileWidth = 117;
const treeBackgroundProfileHeight = 73;//original 73
const heightBackgroundProfile = getHeightAspectRatio(treeBackgroundProfileWidth, treeBackgroundProfileHeight, width)

const Container = styled(ContentBox)`
  align-items: center;
  justify-content: center;
`;

const EditContainer = styled(View)`
  height: 50%;
  margin:auto;
  flex-direction: row;
  justify-content: flex-end;
  border-top-left-radius: 21;
  border-top-right-radius: 23;
  border-bottom-right-radius: 13;
  border-bottom-left-radius: 20;
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
  margin-bottom: 2;
  margin-left: 10;
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
  background-color: ${Palette.colors.darkenLightBlue};
  border-top-left-radius: 21;
  border-top-right-radius: 17;
  border-bottom-right-radius: 28;
  border-bottom-left-radius: 10;
  border-bottom-color: #02a3b9;
  border-left-color: #02a3b9;
  border-bottom-width: 2px;
  border-left-width:2px;
  padding-horizontal: ${Size.spaceSmall};
  padding-vertical: ${Size.spaceSmall};
  flex-direction: row;
  margin-bottom: ${Size.spaceXSmall};
`;

const DescriptionContainer = styled(View)`
  flex: 1;
`;

const styles = StyleSheet.create({
  scrollContainer: {
    alignSelf: 'center',
    width: '100%',
  },
  infoStyles: {
    marginLeft: 5,
    color:'#013b5b'
  }
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
            <ProfileAvatar width={50} userImageUri={profile.avatar || profile.image}/>
            <NameContainer>
              <Title color={Palette.colors.white} style={{ flex: 1}} numberOfLines={1} lighter>{userName}</Title>
            </NameContainer>
            {isShared && (
              <Button onPress={() => Actions[routeTypes.TASKS]()} title="Mensaje"/>
            )}
          </HeaderProfile>

          <Line style={{borderWidth: 1, borderColor: Palette.colors.darkBlue, margin:10}}/>

          <PersonalInfo>
            <DescriptionContainer>
              <Header style={{marginBottom: 10, color: Palette.colors.darkBlue}} condensed small>Descripción personal</Header>
              <Header style={ styles.infoStyles } condensed small>Edad: {profile.age || '-'}</Header>
              <Header style={ styles.infoStyles } condensed small>Curso: {'-'}</Header>
              <Header style={ styles.infoStyles } condensed small>Nivel: {level || '-'}</Header>
            </DescriptionContainer>
            <EditContainer>
              {!isShared &&
                <Button onPress={onClickEdit && onClickEdit} title='Editar' rightIcon='md-create' />
              }
            </EditContainer>

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
