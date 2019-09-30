import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';
import ItemTasks from './ItemTasks';
import { Palette, Size } from '../../../commons/styles';
import SubItem from './SubItem';
import { TextBody } from '../../../commons/components/Typography';
import Badge from '../../../commons/components/Badge/Badge';
import userActions from '../../../actions/userActions';


class ContentsToLearnTabContainer extends PureComponent {
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

  renderBadge() {
    const { contentsToLearn: { meta: { total_items } } } = this.props;
    if (total_items === 0) return null;

    return (
      <View style={{ position: 'absolute', zIndex: 8, top: -8, right: Size.paddingRightBadge }}>
        <Badge value={total_items}
          size={Size.badgeTaskSize} />
      </View>
    );
  }

  handleLoadMore = () => {
      const { getMoreContentsToLearnAsync } = this.props;
      getMoreContentsToLearnAsync();
  }

  render() {
    const { title, icon, enableScroll, disableScroll, contentsToLearn } = this.props;
    const { open } = this.state;

    return (
      <View style={styles.tasks}>
        {this.renderBadge()}
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
              data={contentsToLearn.contents}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
              numColumns={2}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0}
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
  contentsToLearn: state.user.contentsToLearn,
})

const mapDispatchToProps = {
  getMoreContentsToLearnAsync: userActions.getMoreContentsToLearnAsync,
}


export default connect(mapStateToProps, mapDispatchToProps)(ContentsToLearnTabContainer);
