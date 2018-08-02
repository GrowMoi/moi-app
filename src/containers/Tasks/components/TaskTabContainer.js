import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ItemTasks from './ItemTasks';
import SubItem from './SubItem';
import { TextBody } from '../../../commons/components/Typography';
import { Palette } from './../../../commons/styles';
import uuid from 'uuid/v4';

export default class TaskTabContainer extends Component {
  state = {
    open: false,
  }

  openContainer = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  _keyExtractor = (item, index) => uuid();

  render() {
    const { title, icon, data, onClickItem } = this.props;
    const { open } = this.state;

    return(
      <View style={styles.tasks}>
        <ItemTasks onPress={this.openContainer} title={title} icon={icon} />
        {open && (
          <View style={styles.subItemContainer}>
              <FlatList
                data={data}
                numColumns={2}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => {

                  return <SubItem
                    title={item.title}
                    source={item.media[0]}
                    clickItem={() => this.props.onClickItem(item)}
                  />
                }
                  }
                ListEmptyComponent={
                  <TextBody center>no tienes notas guardadas</TextBody>
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
