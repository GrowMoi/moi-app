import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';
import Welcome from './containers/Welcome';
import Menu from './commons/components/Drawer';
import TreeScene from './containers/Tree';
import ContentListScene from './containers/Content/ContentList';
import SingleContentScene from './containers/Content/SingleContent';
import Profile from './containers/Profile';
import BackButton from './commons/components/SceneComponents/BackButton';
// import TabIcon from '../src/commons/components/TabIcon/TabIcon';
import navbarPropStyles from './commons/components/Navbar/navbarPropStyles';

const backButton = () => <BackButton style={{ left: -5, top: 3 }} onPress={() => Actions.pop()}/>;
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
          key="profile"
          title="Profile"
          component={Profile}
          {...navbarPropStyles} />
      </Scene>
    </Scene>

    <Scene
      key='content'
      component={ContentListScene}
      renderBackButton={backButton}
      {...navbarPropStyles}
      title='Contenido' />
    <Scene
      key='singleContent'
      component={SingleContentScene}
      renderBackButton={backButton}
      {...navbarPropStyles}
      title='Contenido Individual'
    />

    <Scene key='search' title='Search' {...navbarPropStyles}>
      <Scene key="welcome" component={Welcome} title="Welcome" hideNavBar />
    </Scene>
  </Scene>,
);

export default routes;
