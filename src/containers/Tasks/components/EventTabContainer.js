import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import ItemTasks from './ItemTasks';
import { Palette } from '../../../commons/styles';
import SubItem from './SubItem';
import { TextBody } from '../../../commons/components/Typography';

@connect(state => ({
  data: state.user.events,
}), {})
class EventTabContainer extends PureComponent {
  state = {
    open: false,
    isLoading: false,
  }

  openContainer = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  _keyExtractor = (item, index) => uuid();

  _renderItem = (info) => {
    const item = info.item;
    const onPress = () => Actions.singleContent({ content_id: item.id, neuron_id: item.neuron_id, title: item.title, fromEvent: true });

    return (
      <SubItem
        title={item.title}
        source={item.media[0]}
        clickItem={onPress}
      />
    );
  }

  render() {
    const { title, icon, data = [], enableScroll, disableScroll } = this.props;
    const { open } = this.state;

    return (
      <View style={styles.tasks}>
        <ItemTasks onPress={this.openContainer} title={title} icon={icon} />
        {open && (
          <View style={styles.subItemContainer}
            onStartShouldSetResponderCapture={() => {
              disableScroll();
              setTimeout(() => {
                enableScroll();
              }, 1000);
            }}
          >
            <FlatList
              data={data}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
              numColumns={2}
              ListEmptyComponent={
                <TextBody style={styles.emptyText} center>{`No tienes eventos en progreso.`}</TextBody>
              }
            />
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    tasks: {
      width: '95%',
    },
    emptyText: {
      paddingHorizontal: 10,
    },
    subItemContainer: {
      backgroundColor: Palette.tasksSubList,
      width: '95%',
      marginRight: 5,
      marginLeft: 5,
      height: 250,
      marginBottom: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      paddingTop: 10,
      paddingBottom: 10,
      zIndex: -9
    },
  }
)

export default EventTabContainer;
