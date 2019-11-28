import React from 'react';
import TreeScene from './containers/Tree';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import ContentListScene from './containers/Content/ContentList';
import SingleContentScene from './containers/Content/SingleContent';
import ProfileScene, { EditProfileScene, PublicProfileScene } from './containers/Profile';
import Tasks from './containers/Tasks/Tasks';
import RandomContents from './containers/RandomContents/RandomContents';
import Settings from './containers/Settings/Settings';
import QuizScene from './containers/Quiz/Quiz';
import QuizTutorScene from './containers/Quiz/QuizTutorScene';
import BackButton from './commons/components/SceneComponents/BackButton';
import LeaderBoard from './containers/LeaderBoard/Leaderboard';
import Search from './containers/Search/Search';
import SearchFriends from './containers/Search/SearchFriends';
import Inventory from './containers/Inventory/Inventory';
import TabIcon from '../src/commons/components/TabIcon/TabIcon';
import navbarPropStyles, { HamburgerButton } from './commons/components/Navbar/navbarPropStyles';
import withSound from './commons/utils/withSound';
import VideoScene from './containers/VideoScene/VideoScene';
import { Actions, Scene, ActionConst, Modal } from 'react-native-router-flux';
import backButtonWithSound from './commons/components/Buttons/backButtonWithSound';
import UserInactivity from 'react-native-user-inactivity';

// import Test from './commons/components/Test';

const backButton = () => backButtonWithSound(Actions.pop);
const backButtonQuiz = () => backButtonWithSound(Actions.tree, { type: 'reset' });
const backButtonTutorQuiz = () =>  backButtonWithSound(Actions.pop);
const SearchIcon = ({ selected, title }) => <TabIcon name='search' selected={selected} title={title} size={35} />; //eslint-disable-line

const routes = () => {
  return (
    <Scene key='modal' component={Modal}>
        <Scene key="root">
          {/* <Scene
            key='test'
            component={Test}
          /> */}
          <Scene
            key={'login'}
            component={Login}
            {...navbarPropStyles}
            renderBackButton={() => (null)}
            renderLeftButton={null}
            renderRightButton={null}
          />
          <Scene
            key={'register'}
            component={Register}
            {...navbarPropStyles}
            renderLeftButton={null}
            renderRightButton={null}
          />
          <Scene
            key={'tree'}
            type={ActionConst.REPLACE}
            component={TreeScene}
            {...navbarPropStyles}
            title='Arbol' />
          <Scene
            key={'settings'}
            type={ActionConst.REPLACE}
            title='Settings'
            component={Settings}
            {...navbarPropStyles} />
          <Scene
            key={'leaderboard'}
            type={ActionConst.REPLACE}
            title='Leaderboard'
            component={LeaderBoard}
            {...navbarPropStyles} />
          <Scene
            key={'searchFriends'}
            type={ActionConst.REPLACE}
            title="Buscar Amigos"
            component={SearchFriends}
            {...navbarPropStyles}
          />
          <Scene
            key={'inventory'}
            type={ActionConst.REPLACE}
            title="Inventario"
            component={Inventory}
            {...navbarPropStyles}
          />
          <Scene
            key={'content'}
            component={ContentListScene}
            renderBackButton={HamburgerButton}
            {...navbarPropStyles}
            title='Contenido' />
          <Scene
            key={'singleContent'}
            component={SingleContentScene}
            renderBackButton={backButton}
            {...navbarPropStyles}
            title='Contenido Individual'
            renderRightButton={null}
          />
          <Scene
            key={'tasks'}
            title="Tareas"
            component={Tasks}
            renderBackButton={backButton}
            {...navbarPropStyles}
          />
          <Scene
            key={'search'}
            title="Busqueda"
            component={Search}
            renderBackButton={backButton}
            {...navbarPropStyles}
          />
          <Scene
            key={'profile'}
            title="Perfil"
            component={ProfileScene}
            renderBackButton={backButton}
            {...navbarPropStyles}
            renderRightButton={null}
          />
          <Scene
            key={'editProfile'}
            title="Editar Perfil"
            component={EditProfileScene}
            renderBackButton={backButton}
            {...navbarPropStyles}
            renderRightButton={null}
          />
          <Scene
            key={'publicProfile'}
            title="Perfil de Usuario"
            component={PublicProfileScene}
            renderBackButton={backButton}
            {...navbarPropStyles}
          />
          <Scene
            key={'quiz'}
            component={QuizScene}
            title='Test'
            {...navbarPropStyles}
            renderBackButton={backButtonQuiz}
            renderRightButton={null}
          />
          <Scene
            key={'tutorQuiz'}
            component={QuizTutorScene}
            title='Tutor Test'
            {...navbarPropStyles}
            renderBackButton={backButtonTutorQuiz}
            renderRightButton={null}
          />
          <Scene
            key={'randomContents'}
            title="Contenidos Aleatorios"
            component={RandomContents}
            renderBackButton={backButton}
            {...navbarPropStyles}
          />
        </Scene>
      <Scene key='videoPlayer' component={VideoScene} />
    </Scene>
  )
}

export default routes;
