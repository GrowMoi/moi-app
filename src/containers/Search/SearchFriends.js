import React, { PureComponent } from 'react';
import {
  FlatList,
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import PassiveMessageAlert from '../../commons/components/Alert/PassiveMessageAlert'

// Components
import MoiBackground from '../../commons/components/Background/MoiBackground';
import SearchInput from './SearchInput';
import { ContentBox } from '../../commons/components/ContentComponents';
import { Size } from '../../commons/styles';
import Preloader from '../../commons/components/Preloader/Preloader';
import Navbar from '../../commons/components/Navbar/Navbar';
import { BottomBarWithButtons } from '../../commons/components/SceneComponents';
import UserPreview from '../../commons/components/UserPreview';
import EmptyState from '../../commons/components/EmptyState';

// Actions
import searchActions from '../../actions/searchActions';
import profilesActions from '../../actions/profileActions';
import treeActions from '../../actions/treeActions';
import userActions from '../../actions/userActions';

@connect(store => ({
  device: store.device,
  search: store.search,
  scene: store.routes.scene,
  showPassiveMessage: store.user.showPassiveMessage,
}), {
  getUsersAsync: searchActions.getUsersAsync,
  getPublicProfileAsync: profilesActions.loadProfileAsync,
  loadTreeAsync: treeActions.loadTreeAsync,
  showPassiveMessageAsync: userActions.showPassiveMessageAsync,
})
export default class SearchFriends extends PureComponent {
  state = {
    loading: false,
    page: 0,
    dataSource: [],
    searching: false,
  }

  currentScene = '';
  prevScene = '';

  changeFriendState = (data, itemToActivate, resetAll = false) => {
    const friendIsLoading = false;

    return data.map(friend => {
      friend.loading = friendIsLoading;

      if(!resetAll) {
        if(friend.id === itemToActivate.id) {
          friend.loading = !friendIsLoading;
        }
      }
      return friend;
    });
  }

  setDataSource = (item, resetData = false) => {
    this.setState(({ dataSource }) => {
      const _data = this.changeFriendState(dataSource, item, resetData);
      return { dataSource: _data };
    });
  }

  onPressProfile = async (item) => {
    const { getPublicProfileAsync, loadTreeAsync } = this.props;

    if(item.username === undefined) return;

    this.setDataSource(item);

    const profile = await getPublicProfileAsync(item.username);

    const isPublic = true;
    const tree = await loadTreeAsync(item.username, isPublic);

    const resetData = true;
    this.setDataSource(item, resetData);

    Actions.publicProfile({
      profile: profile.data,
      level: tree.data.meta.depth,
    });
  }

  _keyExtractor = item => uuid();
  _renderItem = ({ item, index }) => {
    const { device } = this.props;
    const widthContentPreview = device.dimensions.width > 320 ? 150 : 100;

    return (
      <UserPreview
        name={item.name || item.username}
        school={item.school}
        country={item.country}
        loading={item.loading}
        onPress={ () => this.onPressProfile(item) }
      />
    );
  }

  onSubmit = async (query) => {
    if(!query.trim()) return;

    const { getUsersAsync } = this.props;
    const getInitialPage = 1;
    this.setState({ searching: true, dataSource: [] });

    await getUsersAsync(getInitialPage, query);
    const { search } = this.props;

    const _data = search.friends.map((friends) => {
      friends.loading = false;
      return friends;
    });
    this.setState({ dataSource: _data, searching: false });
  }

  render() {
    const { loading, dataSource, searching } = this.state;
    const { device, scene, showPassiveMessage, showPassiveMessageAsync } = this.props;

    const containerStyles = {
      width: (device.dimensions.width - Size.spaceMediumLarge),
      paddingHorizontal: Size.spaceSmall,
    };

    let results;
    if(dataSource.length) {
      results = (
        <FlatList
          contentContainerStyle={containerStyles}
          data={dataSource}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      );
    } else {
      if(searching) results = <EmptyState text='Buscando...' iconName='md-search' />;
      else results = <EmptyState text='No hay resultados que mostrar' />;
    }

    const contentBox = !loading && (
      <ContentBox>
        <SearchInput onSubmit={this.onSubmit}/>
        {results}
      </ContentBox>
    )

    const backScenes = ['profile', 'tasks', 'search', 'randomContents'];

    if(scene.name !== 'moiDrawer') {
      if(scene.name === 'searchFriends') {
        this.prevScene = scene.name;
      }
      this.currentScene = scene.name;
    } else if (this.prevScene && backScenes.indexOf(this.currentScene) !== -1) {
      this.currentScene = this.prevScene;
    }

    return (
      <MoiBackground>
        {contentBox}
        {loading && <Preloader />}
        <Navbar />
        <BottomBarWithButtons
          readButton={false}
          width={device.dimensions.width}
        />

        <PassiveMessageAlert
          isOpenPassiveMessage={showPassiveMessage && this.currentScene === 'searchFriends'}
          touchableProps={{
            onPress: () => {
              showPassiveMessageAsync(false);
            }
          }}
          message='Busca a tus amigos por su nombre. Podrás conocer su árbol y su progreso en Moi'
        />
      </MoiBackground>
    )
  }
};
