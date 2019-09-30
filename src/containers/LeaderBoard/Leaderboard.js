import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import Navbar from '../../commons/components/Navbar/Navbar';
import { BottomBar } from '../../commons/components/SceneComponents';
import LeaderBoardContent from './LeaderboardContent';

// Actions
import leaderboardActions from '../../actions/leaderboardActions';


class LeaderBoard extends PureComponent {
  state = {
    isLoadingLeaders: true,
  }

  async componentDidMount() {
    const { getLeaderboardAsync, profile } = this.props;
    const leaderboardParams = {
      user_id: profile.id
    };
    await getLeaderboardAsync(leaderboardParams, 1);
    this.setState({isLoadingLeaders: false});
  }

  render() {
    const { isLoadingLeaders } = this.state;
    const { profile } = this.props;
    const leaderboardParams = {
      user_id: profile.id
    };
    return (
      <MoiBackground>
        <Navbar />
        <LeaderBoardContent loading={isLoadingLeaders} leaderboardParams={leaderboardParams}/>
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
