import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Alert,
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

// Components
import MoiBackground from '../../commons/components/Background/MoiBackground';
import SearchInput from './SearchInput';
import { ContentBox, ContentPreview } from '../../commons/components/ContentComponents';
import { Size } from '../../commons/styles';
import { normalize } from '../../commons/utils';
import Preloader from '../../commons/components/Preloader/Preloader';
import Navbar from '../../commons/components/Navbar/Navbar';
import { BottomBarWithButtons } from '../../commons/components/SceneComponents';
import { TextBody } from '../../commons/components/Typography';
import UserPreview from '../../commons/components/UserPreview';
import EmptyState from '../../commons/components/EmptyState';

// Actions
import searchActions from '../../actions/searchActions';
import profilesActions from '../../actions/profileActions';
import treeActions from '../../actions/treeActions';

@connect(store => ({
  device: store.device,
  search: store.search,
}), {
  getUsersAsync: searchActions.getUsersAsync,
  getPublicProfileAsync: profilesActions.loadProfileAsync,
  loadTreeAsync: treeActions.loadTreeAsync,
})
export default class SearchFriends extends PureComponent {
  state = {
    loading: false,
    page: 0,
    dataSource: [],
    searching: false,
  }

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

    // console.log(this.state.dataSource);
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
    const { device } = this.props;

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

    return (
      <MoiBackground>
        {contentBox}
        {loading && <Preloader />}
        <Navbar />
        <BottomBarWithButtons
          readButton={false}
          width={device.dimensions.width}
        />
      </MoiBackground>
    )
  }
};
