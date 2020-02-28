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
import { ContentImagePreview } from '../../../commons/components/ContentComponents';
import userActions from '../../../actions/userActions';
import SubItem from '../../Tasks/components/SubItem'

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

class ContentTab extends PureComponent {
  state = {
    dataLoaded: false,
    dataSource: [],
    page: 0,
    noMoreData: false,
    isLoading: false,
  }

  componentDidMount() {
    const { data: last_contents_learnt } = this.props;

    if (last_contents_learnt.length) {
      this.setState({ dataLoaded: true, dataSource: last_contents_learnt });
    }
  }

  _renderItem = ({ item }) => {
    const { device: { dimensions }, onClickItem } = this.props;
    const widthImagePreview = dimensions.width > 320 ? 150 : 130;

    return (
      <SubItem
        clickItem={{
          onPress: () => (onClickItem ? onClickItem(item) : null),
        }}
        title={item.title}
        source={item.media[0]}
        fontSize={13}
        style={{ width: '47%', height: 110, marginLeft: 6 }}
      />
    );
  }

  _keyExtractor = item => uuid();

  render() {
    const { onEndReached } = this.props;
    const { dataLoaded, dataSource, noMoreData, isLoading } = this.state;

    const hasItems = dataSource.length > 0;

    return (
      <Container>
        {isLoading && <Preloader />}
        {!isLoading && (hasItems ? (
          <TabContainer>
            <FlatList
              contentContainerStyle={styles.contentContainer}
              data={dataSource}
              onEndReached={onEndReached}
              renderItem={this._renderItem}
              onEndReachedThreshold={1}
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

ContentTab.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.array,
  onEndReached: PropTypes.func,
};

const mapStateToProps = (state) => ({
  device: state.device,
})

export default connect(mapStateToProps)(ContentTab);
