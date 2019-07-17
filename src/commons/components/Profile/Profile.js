import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import { getHeightAspectRatio } from '../../utils';

const heightProfile = 65;
const widthProfile = 62;
const ProfileImage = styled(Image)`
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: ${props => getHeightAspectRatio(widthProfile, heightProfile, props.width)};
  height: ${props => props.width};
`;

const ProfileContainer = styled(View)``;

const Profile = ({ width, userImageUri, ...rest }) => {
  const sourceImage = {uri: userImageUri ? userImageUri : 'profile_photo' };
  return (
    <ProfileContainer>
      <ProfileImage
        {...rest}
        width={width}
        source={sourceImage}
        resizeMode='cover'
      />
    </ProfileContainer>
  );
}

Profile.propTypes = {
  width: PropTypes.number,
};

Profile.defaultProps = {
  width: 70,
};

export default Profile;
