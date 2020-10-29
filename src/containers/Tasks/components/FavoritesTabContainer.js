import React, { Component } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ItemTasks from './ItemTasks';
import SubItem from './SubItem';
import { TextBody } from '../../../commons/components/Typography';
import { Palette } from './../../../commons/styles';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';

// Actions
import userActions from '../../../actions/userActions';

class FavoritesTabContainer extends Component {
  state = {
    open: false,
  }

  openContainer = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  }

  _keyExtractor = (item, index) => uuid();

  loadMore = async () => {
    const { getMoreFavoritesAsync } = this.props;

    try {
      await getMoreFavoritesAsync();
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { title, icon, data = [], enableScroll, disableScroll } = this.props;
    const { open } = this.state;

    return(
      <View style={styles.tasks}
        onStartShouldSetResponderCapture={() => {
          if(disableScroll) {
            disableScroll();
          }

          setTimeout(() => {
            if(enableScroll) {
              enableScroll();
            }
          }, 1000);
        }}
      >
        <ItemTasks onPress={this.openContainer} title={title} icon={icon} />
        {open && (
          <View style={styles.subItemContainer}>
              <FlatList
                data={((data.content_tasks || {}).content_tasks || [])}
                keyExtractor={this._keyExtractor}
                onEndReachedThreshold={0}
                onEndReached={this.loadMore}
                numColumns={2}
                renderItem={({ item }) => {
                  return <SubItem
                    title={item.title}
                    source={item.media[0]}
                    clickItem={() => this.props.onClickItem(item)}
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
      width: '100%',
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

const mapStateToProps = (state) => ({
  data: state.user.favorites,
})

const mapDispatchToProps = {
  getMoreFavoritesAsync: userActions.getMoreFavoritesAsync,
}


export default connect(mapStateToProps, mapDispatchToProps)(FavoritesTabContainer)
