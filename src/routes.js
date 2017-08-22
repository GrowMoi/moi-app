import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';
import Welcome from './containers/Welcome';
import Home from './containers/Home';
import Profile from './containers/Profile';
import TabIcon from '../src/commons/components/TabIcon/TabIcon';
import Moicon from './commons/components/MoIcon/MoIcon';
import { Font } from './commons/styles';

const TaskIcon = ({ selected, title }) => <TabIcon name='task' selected={selected} title={title} size={30} />; //eslint-disable-line
const SearchIcon = ({ selected, title }) => <TabIcon name='search' selected={selected} title={title} size={35} />; //eslint-disable-line
const ProfileButton = () => <Moicon name="profile" size={35} onPress={() => Actions.profile()} />; //eslint-disable-line

const profileStyles = {
  top: 0,
  position: 'absolute',
  right: 10,
};

const navigationStyles = {
  backgroundColor: 'transparent',
  borderBottomWidth: 0,
};

const titleStyle = {
  color: '#FFF',
  fontSize: 20,
  fontFamily: Font.museo('bolder'),
  top: -15,
};

const routes = Actions.create(
  <Scene key="root">

    <Scene key='moiTree' title='Tree' initial navigationBarStyle={navigationStyles}>
      <Scene
        key='tree'
        component={Home}
        title='Árbol'
        titleStyle={titleStyle}
        rightButtonStyle={profileStyles}
        renderRightButton={ProfileButton} />
      <Scene key="profile" title="Profile" component={Profile} />
    </Scene>


    <Scene key='search' title='Search' navigationBarStyle={navigationStyles}>
      <Scene key="welcome" component={Welcome} title="Welcome" hideNavBar />
    </Scene>
  </Scene>,
);

export default routes;
