import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import { View, FlatList, StyleSheet } from 'react-native';
import Preloader from '../../../commons/components/Preloader/Preloader';
import { TextBody } from '../../../commons/components/Typography';
import { ContentImagePreview } from '../../../commons/components/ContentComponents';
import userActions from '../../../actions/userActions';

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
`;

const styles = StyleSheet.create({
  contentContainer: {},
});

@connect(store => ({
  favorites: store.user.favorites,
  device: store.device,
}), {
  loadAllFavorites: userActions.loadAllFavorites,
})
class FavoritesTab extends PureComponent {
  state = {
    dataLoaded: false,
    dataSource: [],
    page: 0,
    noMoreData: false,
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    const { loadAllFavorites } = this.props;
    const { page, dataSource } = this.state;

    const nextPage = page + 1;
    await loadAllFavorites(nextPage);

    const { favorites: { content_tasks: { content_tasks } } } = this.props;

    if (content_tasks.length) {
      this.setState({ dataLoaded: true, dataSource: dataSource.concat(content_tasks), page: nextPage });
    } else if (!content_tasks.length) this.setState({ noMoreData: true });
  }

  fetchNewFavorites = async () => {
    const { loadAllFavorites } = this.props;
    const { page, dataSource } = this.state;

    const nextPage = page + 1;
    await loadAllFavorites(nextPage);
    const { favorites: { content_tasks: { content_tasks } } } = this.props;

    this.setState(({ page: nextPage, dataSource: dataSource.concat(content_tasks) }));
  }

  _renderItem = (info) => {
    const { device: { dimensions } } = this.props;
    const widthImagePreview = dimensions.width > 320 ? 150 : 130;

    const onPress = () => Actions.singleContent({ content_id: info.item.id, neuron_id: info.item.neuron_id, title: 'Favorito' });
    return (
      <ContentImagePreview
        touchProps={{
          onPress,
        }}
        data={info.item}
        width={widthImagePreview}
      />
    );
  }
  _keyExtractor = item => `${item.title}-${item.id}`;

  render() {
    const { favorites: data } = this.props;
    const { dataLoaded, dataSource, noMoreData } = this.state;

    const loading = !dataLoaded;
    const hasItems = dataLoaded && (((data || {}).meta || {}).total_items > 0);

    return (
      <Container>
        {loading && <Preloader />}
        {!loading && (hasItems ? (
          <TabContainer>
            <FlatList
              contentContainerStyle={styles.contentContainer}
              data={dataSource}
              onEndReached={this.getFavorites}
              ListFooterComponent={!noMoreData && <Preloader />}
              renderItem={this._renderItem}
              onEndReachedThreshold={0}
              keyExtractor={this._keyExtractor}
              numColumns={2}
            />
          </TabContainer>
        ) : (
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
