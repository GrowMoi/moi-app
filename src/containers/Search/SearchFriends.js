import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

import MoiBackground from '../../commons/components/Background/MoiBackground';
import SearchInput from './SearchInput';
import { ContentBox, ContentPreview } from '../../commons/components/ContentComponents';
import { Size } from '../../commons/styles';
import { normalize } from '../../commons/utils';
import Preloader from '../../commons/components/Preloader/Preloader';
import Navbar from '../../commons/components/Navbar/Navbar';
import { BottomBarWithButtons } from '../../commons/components/SceneComponents';
import searchActions from '../../actions/searchActions';
import { TextBody } from '../../commons/components/Typography';
import UserPreview from '../../commons/components/UserPreview';

@connect(store => ({
  device: store.device,
  search: store.search,
}), {
  getUsersAsync: searchActions.getUsersAsync,
})
export default class SearchFriends extends PureComponent {
  state = {
    loading: false,
    page: 0,
    dataSource: [],
    searching: false,
  }

  onPressRowContent = (item) => {
    Actions.singleContent({
      content_id: item.id,
      neuron_id: item.neuron_id,
      title: 'Resultado',
    })
  }

  _keyExtractor = item => uuid();
  _renderItem = ({ item, index }) => {
    const { device } = this.props;
    const widthContentPreview = device.dimensions.width > 320 ? 150 : 100;

    console.log(item);

    return (
      <UserPreview
        name={item.name || item.username}
        school={item.school}
        country={item.country}
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
        <BottomBarWithButtons width={device.dimensions.width} />
      </MoiBackground>
    )
  }
};
