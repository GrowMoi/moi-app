import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import profileImage from '../../../../assets/images/profile/profile_photo.png';
import { getHeightAspectRatio } from '../../utils';

const heightProfile = 65;
const widthProfile = 62;
const ProfileImage = styled(Image)`
  justify-content: center;
  align-items: center;
  width: ${props => getHeightAspectRatio(widthProfile, heightProfile, props.width)};
  height: ${props => props.width};
`;

const ProfileContainer = styled(View)``;

const Profile = ({ width, ...rest }) => (
  <ProfileContainer>
    <ProfileImage
      {...rest}
      width={width}
      source={profileImage}
      resizeMode='contain'
    />
  </ProfileContainer>
);

Profile.propTypes = {
  width: PropTypes.number,
};

Profile.defaultProps = {
  width: 70,
};

export default Profile;
