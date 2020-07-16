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
  padding-top: 13
`;

const NotDataToDisplay = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const styles = StyleSheet.create({
  contentContainer: {},
});


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

  _renderItem = ({ item }) => {
    const { profile, device: { dimensions } } = this.props;
    const widthImagePreview = dimensions.width > 320 ? 150 : 130;

    const { id: content_id, neuron_id } = item;

    const onPress = () => Actions.singleContent({
      content_id,
      neuron_id,
      title: 'Últimos contenidos',
    });

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

const mapStateToProps = (state) => ({
  profile: state.user.profile,
  device: state.device,
})

LastContentsLearnt.propTypes = {
  profile: PropTypes.any,
};

export default connect(mapStateToProps)(LastContentsLearnt);
