import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ItemTasks from './ItemTasks';
import SubItemRow from './SubItemRow';
import { TextBody } from '../../../commons/components/Typography';
import { Palette } from './../../../commons/styles';
import uuid from 'uuid/v4';

export default class NotesTabContainer extends Component {
  state = {
    open: false,
  }

  openContainer = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  _keyExtractor = (item, index) => uuid();

  handleLoadMore = () => {
    const { onLoadMore } = this.props;
    if(onLoadMore) onLoadMore();
  }

  render() {
    const { title, icon, data = [], onClickItem = () => null } = this.props;
    const { open } = this.state;

    return(
      <View style={styles.tasks}>
        <ItemTasks onPress={this.openContainer} title={title} icon={icon} />
        {open && (
          <View style={styles.subItemContainer}>
              <FlatList
                data={data}
                onEndReached={this.handleLoadMore}
                onEndReachedThreshold={0}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => {
                  return <SubItemRow
                    title={item.note}
                    description={item.description}
                    onPress={() => onClickItem(item)}
                  />
                }
                  }
                ListEmptyComponent={
                  <TextBody style={styles.emptyText} center>{`No tienes ${(title || '').toLowerCase()}.`}</TextBody>
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
