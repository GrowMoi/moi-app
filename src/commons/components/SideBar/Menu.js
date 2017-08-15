import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';


const MenuView = styled(ScrollView)`
  flex: 1;
  width: ${width};
  height: ${height};
  background-color: white;
  padding-horizontal: 20;
  padding-vertical: 20;
`;

const Avatar = styled(Image)`
  width: 48;
  height: 48;
  border-radius: 24;
  flex: 1;
`;

const AvatarContainer = styled(View)`
  margin-bottom: 20;
  margin-top: 20;
`;

const Item = styled(Text)`
  font-size: 14;
  padding-horizontal: 10;
  padding-vertical: 10;
`;

const Menu = ({ onItemSelected }) => {
  return (
    <MenuView scrollsToTop={false}>
      <AvatarContainer>
        <Avatar source={{ uri }} />
        <Text>Your name</Text>
      </AvatarContainer>

      <Item onPress={() => onItemSelected('About')}>About</Item>
      <Item onPress={() => onItemSelected('Contacts')}>Contacts</Item>
    </MenuView>
  );
};

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};

export default Menu;
