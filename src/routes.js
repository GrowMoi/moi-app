import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';
import Welcome from './containers/Welcome';
import Menu from './commons/components/Drawer';
import TreeScene from './containers/Tree';
import ContentScene from './containers/Content/Content';
import Profile from './containers/Profile';
// import TabIcon from '../src/commons/components/TabIcon/TabIcon';
import navbarPropStyles from './commons/components/Navbar/navbarPropStyles';

// const SearchIcon = ({ selected, title }) => <TabIcon name='search' selected={selected} title={title} size={35} />; //eslint-disable-line

const routes = Actions.create(
  <Scene key="root">

    <Scene key='moiDrawer' title='Tree' component={Menu} open={false}>
      <Scene key="main" tabs>
        <Scene
          key='tree'
          initial
          component={TreeScene}
          {...navbarPropStyles}
          title='Arbol' />
        <Scene
          key='content'
          component={ContentScene}
          {...navbarPropStyles}
          title='Contenido' />
        <Scene
          key="profile"
          title="Profile"
          component={Profile}
          {...navbarPropStyles} />
      </Scene>
    </Scene>

    <Scene key='search' title='Search' {...navbarPropStyles}>
      <Scene key="welcome" component={Welcome} title="Welcome" hideNavBar />
    </Scene>
  </Scene>,
);

export default routes;
