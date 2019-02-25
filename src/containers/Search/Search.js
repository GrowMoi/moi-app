import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Keyboard,
} from 'react-native'
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import UserInactivity from 'react-native-user-inactivity'
import PassiveMessageAlert from '../../commons/components/Alert/PassiveMessageAlert'

import EmptyState from '../../commons/components/EmptyState';
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
  device: store.device,
  search: store.search,
  scene: store.routes.scene,
}), {
  getContentsAsync: searchActions.getContentsAsync,
})
export default class Search extends PureComponent {
  state = {
    loading: false,
    page: 0,
    dataSource: [],
    searching: false,
    isOpenPassiveMessage: false,
  }

  onPressRowContent = (item) => {
    Actions.singleContent({
      content_id: item.id,
      neuron_id: item.neuron_id,
      title: 'Contenido',
    })
  }

  _keyExtractor = item => uuid();
  _renderItem = ({ item, index }) => {
    const { device } = this.props;

    const widthContentPreview = device.dimensions.width > 320 ? 110 : 100;
    const normalizeKind = `¿${normalize.normalizeFirstCapLetter(item.kind)}?`
    const oddInverted = index % 2 === 1;
    const MILLISECONDS = 100;
    const delay = MILLISECONDS * index;

    return (
      <ContentPreview
        animationDelay={delay}
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

    const { getContentsAsync } = this.props;
    const getInitialPage = 1;
    this.setState({ searching: true, dataSource: [] });

    await getContentsAsync(getInitialPage, query);
    const { search } = this.props;
    this.setState({ dataSource: search.contents, searching: false });
  }

  render() {
    const { loading, dataSource, searching, isOpenPassiveMessage } = this.state;
    const { device, scene } = this.props;

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
      if(searching) results = <EmptyState text='Buscando...' iconName='md-search' />
      else results = <EmptyState text='No hay resultados que mostrar' />
    }

    const contentBox = !loading && (
      <ContentBox>
        <SearchInput onSubmit={this.onSubmit}/>
        {results}
      </ContentBox>
    )

    return (
      <UserInactivity
        timeForInactivity={6000}
        onAction={(isActive) => {
          if(!isActive && scene.name === 'search') {
            Keyboard.dismiss()
            this.setState({ isOpenPassiveMessage: !isActive })
          }
        }}
      >
        <MoiBackground>
          {contentBox}
          {loading && <Preloader />}
          <Navbar />
          <BottomBarWithButtons width={device.dimensions.width} />

          <PassiveMessageAlert
            isOpenPassiveMessage={isOpenPassiveMessage}
            touchableProps={{
              onPress: () => {
                this.setState(prevState => ({ isOpenPassiveMessage: !prevState.isOpenPassiveMessage }))
              }
            }}
            message='Escribe lo que quieres conocer y presiona el botón buscar'
          />
        </MoiBackground>
      </UserInactivity>
    )
  }
};
