import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import { View, FlatList, StyleSheet } from 'react-native';
import uuid from 'uuid/v4';

import Preloader from '../../../commons/components/Preloader/Preloader';
import { TextBody } from '../../../commons/components/Typography';
import userActions from '../../../actions/userActions';
import SubItem from '../../Tasks/components/SubItem';

const Container = styled(View)`
  flex: 1;
  justify-content: center;
`;

const TabContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const NotDataToDisplay = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 250;
`;

const styles = StyleSheet.create({
  contentContainer: {},
});

@connect(store => ({
  favorites: store.user.favorites,
  device: store.device,
}), {
  loadAllFavorites: userActions.loadAllFavorites,
  getMoreFavoritesAsync: userActions.getMoreFavoritesAsync,
})
class FavoritesTab extends PureComponent {
  state = {
    dataLoaded: false,
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    const { loadAllFavorites } = this.props;

    try {
      await loadAllFavorites();
      this.setState({ dataLoaded: true});
    } catch (error) {
      this.setState({ dataLoaded: true });
    }
  }

  getMoreFavorites = async() => {
    const { getMoreFavoritesAsync } = this.props;

    try {
      await getMoreFavoritesAsync();
      this.setState({ dataLoaded: true});
    } catch (error) {
      this.setState({ dataLoaded: true });
      console.log(error);
    }
  }

  _renderItem = (info) => {
    const { device: { dimensions } } = this.props;
    const widthImagePreview = dimensions.width > 320 ? 150 : 130;
    const item = info.item;
    const onPress = () => Actions.singleContent({ content_id: item.id, neuron_id: item.neuron_id, title: 'Favorito' });

    return (
      <SubItem
        title={item.title}
        source={item.media[0]}
        clickItem={onPress}
        style={{width: '47%', height: 100, marginLeft: 6}}
        fontSize={13}
      />
    );
  }

  _keyExtractor = item => uuid();


  render() {
    const { favorites: data, enableScroll, disableScroll } = this.props;
    const { dataLoaded } = this.state;

    const loading = !dataLoaded;
    const hasItems = dataLoaded && (((data || {}).meta || {}).total_items > 0);

    return (
      <Container
      onStartShouldSetResponderCapture={() => {
        setTimeout(() => {
          disableScroll();
        }, 500);

        setTimeout(() => {
          enableScroll();
        }, 1000);
      }}
      >
        {loading && <Preloader />}
        {!loading && (hasItems ? (
          <TabContainer>
            <FlatList
              contentContainerStyle={styles.contentContainer}
              data={data.content_tasks.content_tasks}
              onEndReached={this.getMoreFavorites}
              renderItem={this._renderItem}
              onEndReachedThreshold={0.4}
              keyExtractor={this._keyExtractor}
              numColumns={2}
            />
          </TabContainer>
        ):(
          <NotDataToDisplay>
            <MaterialIcons name='stars' size={35} color="#4f5325" />
            <TextBody>No tienes favoritos</TextBody>
          </NotDataToDisplay>
        ))}
      </Container>
    );
  }
}

FavoritesTab.propTypes = {
  loading: PropTypes.bool,
  favorites: PropTypes.any,
};

export default FavoritesTab;
