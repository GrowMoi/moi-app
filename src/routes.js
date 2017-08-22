import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';
import Welcome from './containers/Welcome';
import Home from './containers/Home';
import TabIcon from '../src/commons/components/TabIcon/TabIcon';
import { Font } from './commons/styles';

const TaskIcon = ({ selected, title }) => <TabIcon name='task' selected={selected} title={title} size={30} />; //eslint-disable-line
const SearchIcon = ({ selected, title }) => <TabIcon name='search' selected={selected} title={title} size={35} />; //eslint-disable-line

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

    <Scene key='tree' title='Tree' initial navigationBarStyle={navigationStyles}>
      <Scene key='moiTree' component={Home} title='Árbol' titleStyle={titleStyle} />
    </Scene>

    <Scene key='search' title='Search' hideNavBar>
      <Scene key="welcome" component={Welcome} title="Welcome" hideNavBar />
    </Scene>
  </Scene>,
);

export default routes;
