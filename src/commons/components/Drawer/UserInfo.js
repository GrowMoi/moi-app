import React from 'react'
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import { Title, Header, TextBody } from '../Typography';
import MoIcon from '../MoIcon/MoIcon'
import { colors } from '../../styles/palette'
import { normalize } from '../../utils'
import ProfileAvatar from '../Profile/Profile'

//Styles
const Container = styled(View)`
  padding: 10px 10px 10px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-color: ${colors.greenSubList};
`

const Avatar = styled(View)`
  margin-right: 15px;
`

const Info = styled(View)`
`

const Username = styled(Header)`
  margin-bottom: 10px;
  width: 140px;
`


//Component
const UserInfo = ({ name = '', level = 0, avatarImage = '' }) => {
  const _name = normalize.normalizeFirstCapLetter(name)
  return (
    <Container>
      <Avatar>
        <ProfileAvatar userImageUri={avatarImage} width={50} />
      </Avatar>

      <Info>
        <Username numberOfLines={1} small heavy>{_name}</Username>
        <TextBody small heavy>Nivel: {level}</TextBody>
      </Info>
    </Container>
  )
}

// Props
UserInfo.propTypes = {
  name: PropTypes.string,
  level: PropTypes.number,
  avatar: PropTypes.any,
}

export default UserInfo
