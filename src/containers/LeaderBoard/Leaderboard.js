import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import Navbar from '../../commons/components/Navbar/Navbar';
import { BottomBar } from '../../commons/components/SceneComponents';
import LeaderBoardContent from './LeaderboardContent';

// Actions
import leaderboardActions from '../../actions/leaderboardActions';

@connect(state => ({
  leaders: state.leaderboard.leaders,
  device: state.device,
}), {
    getLeaderboardAsync: leaderboardActions.getLeadersAsync,
  })
export default class LeaderBoard extends PureComponent {
  state = {
    isLoadingProfile: false,
  }

  async componentDidMount() {
    const { getLeaderboardAsync } = this.props;
    await getLeaderboardAsync();
  }

  render() {
    const { leaders: dataLeaders } = this.props;

    return (
      <MoiBackground>
        <Navbar />
        <LeaderBoardContent data={dataLeaders} />
        <BottomBar />
      </MoiBackground>
    );
  }
}
