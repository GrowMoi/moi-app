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

  onPressProfile = async (item) => {
    const { getPublicProfileAsync, loadTreeAsync } = this.props;

    if(item.username === undefined) return;

    const profile = await getPublicProfileAsync(item.username);

    const isPublic = true;
    const tree = await loadTreeAsync(item.username, isPublic);

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
    this.setState({ dataSource: search.friends, searching: false });
  }

  render() {
    const { loading, dataSource, searching } = this.state;
    const { device } = this.props;

    const containerStyles = {
      width: (device.dimensions.width - Size.spaceLarge),
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
      if(searching) results = <TextBody>Buscando...</TextBody>;
      else results = <TextBody>No hay resultados que mostrar</TextBody>;
    }

    const contentBox = !loading && (
      <ContentBox>
        <SearchInput handleSubmit={this.onSubmit}/>
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
