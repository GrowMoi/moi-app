import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { View } from 'react-native';

// Components
import Navbar from '../../commons/components/Navbar/Navbar';
import MoiBackground from '../../commons/components/Background/MoiBackground';
import TreeBottom from './components/TreeBottom';
import Tree from '../../commons/components/Tree';
import PassiveMessageAlert from '../../commons/components/Alert/PassiveMessageAlert';

//actions
import userActions from '../../actions/userActions';

const ContentScreen = styled(View)`
  flex: 1;
  position: relative;
  z-index: 1;
  overflow: hidden;
  margin-top: 40;
`;

const BottomBar = styled(TreeBottom)`
  position: relative;
  z-index: 0;
`

const Background = styled(MoiBackground)`
  position: relative;
`

const TopNavbar = styled(Navbar)`
  position: relative;
  z-index: 2;
`

class TreeScene extends Component {
  state = {
    isOpenPassiveMessage: false,
  }

  render() {
    const { scene, showPassiveMessage, showPassiveMessageAsync } = this.props

    return (
      <Background>
        <ContentScreen>
          <Tree />
        </ContentScreen>
        <TopNavbar />
        <BottomBar />

        <PassiveMessageAlert
          isOpenPassiveMessage={showPassiveMessage && scene.name === 'tree'}
          touchableProps={{
            onPress: () => {
              showPassiveMessageAsync(false);
            }
          }}
          message='El mundo del conocimiento espera por ti. Da clic en un fruto gris para conocer sus contenidos'
        />
      </Background>
    );
  }
}

TreeScene.propTypes = {
  title: PropTypes.string,
};

const mapStateToProps = (state) => ({
  scene: state.routes.scene,
  showPassiveMessage: state.user.showPassiveMessage,
})

const mapDispatchToProps = {
  showPassiveMessageAsync: userActions.showPassiveMessageAsync,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TreeScene)
