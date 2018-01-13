import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import { View, FlatList, StyleSheet } from 'react-native';
import Preloader from '../../../commons/components/Preloader/Preloader';
import { TextBody } from '../../../commons/components/Typography';
import { ContentImagePreview } from '../../../commons/components/ContentComponents';

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
  profile: store.user.profile,
  device: store.device,
}))
class LastContentsLearnt extends Component {
  state = {
    dataLoaded: false,
  }

  componentDidMount() {
    const { profile } = this.props;
    if (profile.last_contents_learnt) {
      this.setState({ dataLoaded: true });
    }
  }

  _renderItem = (data) => {
    const { profile, device: { dimensions } } = this.props;
    const widthImagePreview = dimensions.width > 320 ? 150 : 130;

    const onPress = () => Actions.singleContent({
      content_id: data.item.id,
      neuron_id: data.item.neuron_id,
      title: 'Últimos contenidos',
    });

    return (
      <ContentImagePreview
        touchProps={{
          onPress,
        }}
        data={data.item}
        width={widthImagePreview}
      />
    );
  }

  _keyExtractor = item => uuid();

  render() {
    const { dataLoaded } = this.state;
    const { profile } = this.props;

    const loading = !dataLoaded;
    const hasContents = dataLoaded && ((profile || {}).last_contents_learnt || []);

    return (
      <Container>
        {loading && <Preloader />}
        {!loading && (hasContents ? (
          <TabContainer>
            <FlatList
              contentContainerStyle={styles.contentContainer}
              data={profile.last_contents_learnt}
              numColumns={2}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
            />
          </TabContainer>
        ) : (
          <NotDataToDisplay>
            <MaterialIcons name='stars' size={35} color="#4f5325" />
            <TextBody>No tienes contenidos en este momento</TextBody>
          </NotDataToDisplay>
        ))}
      </Container>
    );
  }
};

LastContentsLearnt.propTypes = {
  profile: PropTypes.any,
};

export default LastContentsLearnt;
