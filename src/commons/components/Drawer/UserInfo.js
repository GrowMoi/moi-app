import React from 'react'
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import styled from 'styled-components/native';
import { Title, Header, TextBody } from '../Typography';
import MoIcon from '../MoIcon/MoIcon'
import { colors } from '../../styles/palette'
import { normalize } from '../../utils'
import ProfileAvatar from '../Profile/Profile'
import { Size, Palette } from '../../styles';

//Styles
const Container = styled(View)`
  padding: 10px 10px 10px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-color: ${colors.blueSubList};
`

const Avatar = styled(View)`
  margin-right: 15px;
`

const Info = styled(View)`
`

const Username = styled(Header)`
  color: ${Palette.colors.darkBlue}
  margin-bottom: 10px;
  width: 140px;
`

const Level = styled(TextBody)`
  color: ${Palette.colors.darkBlue}
`

//Component
const UserInfo = ({ name = '', level = 0, avatarImage = '', showAvatar = true, style }) => {
  const _name = normalize.normalizeFirstCapLetter(name)
  return (
    <Container style={style}>
      {showAvatar &&<Avatar>
        <ProfileAvatar userImageUri={avatarImage} width={50} />
      </Avatar>}

      <Info>
        <Username numberOfLines={1} small heavy>{_name}</Username>
        <Level small heavy>Nivel: {level}</Level>
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
