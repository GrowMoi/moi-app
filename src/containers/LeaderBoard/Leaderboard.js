import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import Navbar from '../../commons/components/Navbar/Navbar';
import { BottomBar } from '../../commons/components/SceneComponents';
import LeaderBoardContent from './LeaderboardContent';

// Actions
import leaderboardActions from '../../actions/leaderboardActions';

@connect(state => ({
  leaders: state.leaderboard.leaders,
  profile: state.user.profile,
}), {
    getLeaderboardAsync: leaderboardActions.getLeadersAsync,
  })
export default class LeaderBoard extends PureComponent {
  state = {
    isLoadingLeaders: true,
  }

  async componentDidMount() {
    const { getLeaderboardAsync, profile } = this.props;
    await getLeaderboardAsync(profile.id, 1);
    this.setState({isLoadingLeaders: false});
  }

  render() {
    const { isLoadingLeaders } = this.state;

    return (
      <MoiBackground>
        <Navbar />
        <LeaderBoardContent loading={isLoadingLeaders} />
        <BottomBar />
      </MoiBackground>
    );
  }
}
