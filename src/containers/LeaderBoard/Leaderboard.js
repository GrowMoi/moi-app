import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import Navbar from '../../commons/components/Navbar/Navbar';
import { BottomBar } from '../../commons/components/SceneComponents';
import LeaderBoardContent from './LeaderboardContent';
import styled from 'styled-components/native'
import { ContentBox } from '../../commons/components/ContentComponents';
import VerticalTabs from '../../commons/components/Tabs/VerticalTabs'

// Actions
import leaderboardActions from '../../actions/leaderboardActions';


const StyledContentBox = styled(ContentBox)`
  align-items: center;
  justify-content: center;
`

class LeaderBoard extends PureComponent {

  _renderTabs() {
    const { profile } = this.props;

    const ContentSortByCity = <LeaderBoardContent key="sortedBy-city" sortBy='city' leaderboardParams={{ user_id: profile.id }} />
    const ContentSortByAge = <LeaderBoardContent key="sortedBy-age" sortBy='age' leaderboardParams={{ user_id: profile.id }} />
    const ContentSortBySchool = <LeaderBoardContent key="sortedBy-school" sortBy='school' leaderboardParams={{ user_id: profile.id }} />

    const tabsData = [
      { label: 'Ciudad', content: ContentSortByCity },
      { label: 'Edad', content: ContentSortByAge },
      { label: 'Escuela', content: ContentSortBySchool },
    ]

    return (
      <VerticalTabs data={tabsData} horizontalTabs />
    )
  }

  render() {
    return (
      <MoiBackground>
        <Navbar />
        <StyledContentBox image={'leaderboard_frame'}>
          {/* <LeaderBoardContent loading={isLoadingLeaders} leaderboardParams={leaderboardParams}/> */}
          {this._renderTabs()}
        </StyledContentBox>
        <BottomBar />
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
