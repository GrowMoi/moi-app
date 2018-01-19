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

@connect(store => ({
  neuronSelected: store.neuron.neuronSelected,
  device: store.device,
  user: store.user,
  search: store.search,
  form: store.form,
}), {
  getContentsAsync: searchActions.getContentsAsync,
})
export default class Search extends PureComponent {
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
    const normalizeKind = `¿${normalize.normalizeFirstCapLetter(item.kind)}?`
    const oddInverted = index % 2 === 1;

    return (
      <ContentPreview
        width={widthContentPreview}
        title={item.title}
        subtitle={normalizeKind}
        inverted={oddInverted}
        source={{ uri: item.media[0] }}
        onPress={() => this.onPressRowContent(item)}
      />
    );
  }

  onSubmit = async (query) => {
    if(!query.trim()) return;

    const { getContentsAsync, form } = this.props;
    const getInitialPage = 1;
    this.setState({ searching: true, dataSource: [] });

    await getContentsAsync(getInitialPage, query);
    const { search } = this.props;
    this.setState({ dataSource: search.contents, searching: false });
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
