import React from 'react';
import { Actions, Scene } from 'react-native-router-flux';
import Welcome from './containers/Welcome';
import Home from './containers/Home';
import TabIcon from '../src/commons/components/TabIcon/TabIcon';

const TaskIcon = ({ selected, title }) => <TabIcon name='task' selected={selected} title={title} size={30} />; //eslint-disable-line
const SearchIcon = ({ selected, title }) => <TabIcon name='search' selected={selected} title={title} size={35} />; //eslint-disable-line


const tabBarStyles = {
  backgroundColor: 'white',
  height: 70,
};

const routes = Actions.create(
  <Scene key="root">

    <Scene key='tabbars' tabs type='replace' initial tabBarStyle={tabBarStyles}>

      <Scene key='task' title='Task' icon={TaskIcon} initial>
        <Scene key='taskviews' component={Home} title='Home' />
      </Scene>

      <Scene key='search' title='Search' icon={SearchIcon}>
        <Scene key="welcome" component={Welcome} title="Welcome" hideNavBar />
      </Scene>

    </Scene>
  </Scene>,
);

export default routes;
