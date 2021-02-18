import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import Navbar from '../../commons/components/Navbar/Navbar';
import { BottomBar } from '../../commons/components/SceneComponents';
import LeaderBoardContent from './LeaderboardContent';
import styled from 'styled-components/native';
import { ContentBox } from '../../commons/components/ContentComponents';
import VerticalTabs from '../../commons/components/Tabs/VerticalTabs';
import { View, FlatList, Text, Modal, TouchableOpacity } from 'react-native';
import { Palette } from '../../commons/styles';
import { Header } from '../../commons/components/Typography';
import CloseIcon from '../../containers/Events/CloseIcon';

// Actions
import leaderboardActions from '../../actions/leaderboardActions';


const StyledContentBox = styled(ContentBox)`
  align-items: center;
  justify-content: center;
`

const Overlay = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${Palette.black.alpha(0.7).css()};
`;

const SortItem = styled(TouchableOpacity)`
  background-color: ${Palette.colors.blue};
  padding: 10px;
  margin: 4px 8px;
  border-radius: 5px;
`;

const SortItemTitle = styled(Header)`
  height: 30;
  color: white;
`;

const SortItemContainer = styled(View)`
  width: 90%;
  height: 50%;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
  background-color: ${Palette.colors.lightBlue};
  border-radius: 10px;
  border: 2px solid ${Palette.colors.blue};
`;

class LeaderBoard extends PureComponent {

  state = {
    showModal: false,
    tabLabel: '',
    sortValues: [],
    sortBy: ''
  }

  leaderboardEvents = {
    city: {
      reload: () => null
    },
    age: {
      reload: () => null
    },
    school: {
      reload: () => null
    }
  }

  _showModal = (tabLabel, sortValues = [], key) => {
    this.setState({
      showModal: true,
      tabLabel,
      sortBy: key,
      sortValues
    });
  }

  _hideModal = () => {
    this.setState({
      showModal: false,
      tabLabel: '',
      sortBy: '',
      sortValues: []
    });
  }

  getLeaderboardConfig = () => {
    const { profile } = this.props;
    return {
      city: {
        params: {
          label: 'ciudad',
          sort_by: 'city',
          user_id: profile.id,
        },
        actions: {
          showDropdownModal: this._showModal,
          onLoadComponent: (reloadCb) => (this.leaderboardEvents.city.reload = reloadCb)
        }
      },
      age: {
        params: {
          label: 'edad',
          sort_by: 'age',
          user_id: profile.id,
        },
        actions: {
          showDropdownModal: this._showModal,
          onLoadComponent: (reloadCb) => (this.leaderboardEvents.age.reload = reloadCb)
        }
      },
      school: {
        params: {
          label: 'escuela',
          sort_by: 'school',
          user_id: profile.id,
        },
        actions: {
          showDropdownModal: this._showModal,
          onLoadComponent: (reloadCb) => (this.leaderboardEvents.school.reload = reloadCb)
        }
      }
    }
  }

  _renderTabs() {
    const config = this.getLeaderboardConfig();

    const ContentSortByCity = <LeaderBoardContent
      key="sortedBy-city"
      leaderboardParams={config.city.params}
      actions={config.city.actions}/>

    const ContentSortByAge = <LeaderBoardContent
      key="sortedBy-age"
      leaderboardParams={config.age.params}
      actions={config.age.actions}/>

    const ContentSortBySchool = <LeaderBoardContent
      key="sortedBy-school"
      leaderboardParams={config.school.params}
      actions={config.school.actions}/>

    const tabsData = [
      { label: 'Ciudad', content: ContentSortByCity },
      { label: 'Edad', content: ContentSortByAge },
      { label: 'Escuela', content: ContentSortBySchool },
    ]

    return (
      <VerticalTabs data={tabsData} horizontalTabs />
    )
  }

  _onSelectSortItem = (item, key) => {

    const config = this.getLeaderboardConfig();
    const events = this.leaderboardEvents;

    switch (key) {
      case 'city': {
        const { params } = config.city;
        const { reload } = events.city;
        params.city = item;
        reload(params, item);
        break;
      }

      case 'age': {
        const { params } = config.age;
        const { reload } = events.age;
        params.age = item;
        reload(params, item);
        break;
      }

      case 'school': {
        const { params } = config.school;
        const { reload } = events.school;
        params.school = item;
        reload(params, item);
        break;
      }

      default:
        break;
    }

    this.setState({
      showModal: false,
      tabLabel: '',
      sortValues: []
    });
  }

  _keyExtractor = (item, index) => index.toString();

  _renderItem = ({ item, index }, key) => {
    return (
      <SortItem onPress={() => this._onSelectSortItem(item, key)}>
        <Text style={{color: 'white'}}>{item}</Text>
      </SortItem>
    )
  }

  render() {

    const {
      showModal,
      tabLabel,
      sortValues,
      sortBy
    } = this.state;

    return (
      <MoiBackground>
        <Navbar />
        <StyledContentBox image={'leaderboard_frame'}>
          {this._renderTabs()}
        </StyledContentBox>
        <BottomBar />
        <Modal
          animationType="fade"
          visible={showModal}
          transparent={true}
          supportedOrientations={['portrait', 'landscape']} >
          <Overlay>
            <SortItemContainer>
              <CloseIcon onPress={() => this._hideModal()}/>
              <SortItemTitle>Seleccione una {tabLabel}</SortItemTitle>
              {(sortValues || []).length > 0 && (
                <FlatList
                  style={{ height: '80%', width: '100%'}}
                  data={sortValues}
                  renderItem={(args) => this._renderItem(args, sortBy)}
                  keyExtractor={this._keyExtractor}
                />
              )}
            </SortItemContainer>
          </Overlay>
        </Modal>
      </MoiBackground>
    );
  }
}

const mapStateToProps = (state) => ({
  leaders: state.leaderboard.leaders,
  profile: state.user.profile,
})

const mapDispatchToProps = {
  getLeaderboardAsync: leaderboardActions.getLeadersAsync,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaderBoard)
