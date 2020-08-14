import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { Image, ImageBackground, View, TouchableOpacity } from 'react-native';
import { isIphoneX } from 'react-native-device-detection';
import { getHeightAspectRatio } from '../../utils';
import Badge from '../Badge/Badge';
import userActions from '../../../actions/userActions';
import * as usersChatActions from '../../../actions/chatActions';
import tutorActions from '../../../actions/tutorActions';
import withSound from '../../utils/withSound';
import { Size } from '../../styles';
import deviceUtils from '../../utils/device-utils';
import PusherService from '../../utils/pusherService';

const wCommonBtn = 194;
const hCommonBtn = 73;

const Separator = styled(View)`
  width: ${props => `${props.width}px`};
`;

const Button = styled(ImageBackground)`
  width: ${props => `${props.width}px`};
  height: ${props => getHeightAspectRatio(wCommonBtn, hCommonBtn, props.width)};
  flex-direction: row;
  bottom: ${props => props.bottom || 1};
  left: ${props => props.left || 0};
  position: relative;
  overflow: visible;
  z-index: ${props => props.zIndex || 0};
`;

const ContainerButton = styled(View)`
  width: ${props => props.width};

  flex-direction: row;
  bottom: ${props => props.bottom || 0};
  left: ${props => props.left || 0};
  position: relative;
  overflow: visible;
  z-index: ${props => props.zIndex || 0};
`;

const blueFrameWidth = 174;
const blueFrameHeight = 100;
const ReadFrame = styled(ImageBackground)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(blueFrameWidth, blueFrameHeight, props.width)};
  right: -12;
  bottom: ${props => props.bottom};
  position: relative;
  overflow: visible;
`;

const bottomBarWidth = 788;
const bottomBarHeight = 85;

const BottomBarContainer = styled(View)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(bottomBarWidth, bottomBarHeight, props.width) + 10};
`;

const BottomBar = styled(ImageBackground)`
  width: ${props => props.width};
  height: ${props => {
    if(deviceUtils.isIphoneX()) {
      return 70;
    }
    return Size.bottomBarButtonsHeigth
  }};
  bottom: ${props => {
    if(deviceUtils.isIphoneX()){
      return 16;
    }

    return 0;
  }};
  flex-direction: row;
  overflow: visible;
`;

const Container = styled(View)`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex: 1;
`;

const ButtonsContainer = styled(View)`
  bottom: -5px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const taskWidthBtn = 603;
const taskHeightBtn = 371;
const TaskButton = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(taskWidthBtn, taskHeightBtn, props.width)}
  margin-left: ${props => props.marginLeft};
`;

const SearchButton = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(taskWidthBtn, taskHeightBtn, props.width)}

  margin-left: ${props => props.marginLeft};
`;

const RandomButton = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(taskWidthBtn, taskHeightBtn, props.width)}
  margin-left: ${props => props.marginLeft};
`;

const lightGreenBtnWidth = 108;
const lightGreenBtnHeight = 98;
const BlueButton = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(lightGreenBtnWidth, lightGreenBtnHeight, props.width)};
  left: 16;
`;

class BottomBarWithButtons extends Component {

  async componentWillMount() {
    const {
      getNotificationsAsync,
      getTutorDetailsAsync,
      getContentsToLearnAsync,
      getEventsWeekAsync,
      getNotificationDetailsAsync
    } = this.props;

    await getNotificationDetailsAsync();
    await getNotificationsAsync();
    await getTutorDetailsAsync();
    await getContentsToLearnAsync();
    await getEventsWeekAsync();
  }

  componentDidMount() {
    const { profile } = this.props;
    const userChatNotificationChannel = {
      channelName: `userchatsnotifications.${profile.id}`,
      eventName: 'newmessage',
      action: {
        id: 'BottomBarCb',
        callback: (data) => {
          this.onChatMessageReceived(data)
        }
      }
    }
    PusherService.listen(userChatNotificationChannel)
  }

  shouldComponentUpdate(newProps){
    const currentCount = this.getNotificationsCount(this.props);
    const newCount = this.getNotificationsCount(newProps);
    return currentCount != newCount;
  }

  pressTaskButton = () => {
    Actions.tasks();
  };

  pressSearchButton = () => {
    Actions.search();
  };

  goToRandomContent = () => {
    const { scene, setReloadRandomContents } = this.props;
    if (scene.name === 'randomContents') {
      setReloadRandomContents();
    } else {
      Actions.randomContents();
    }
  };

  readContent = () => {
    if (this.props.onPressReadButton) this.props.onPressReadButton();
  };

  renderNewButton = (NewButton, customProps) => {
    const privateProps = {
      resizeMode: 'stretch',
    };

    return (
      <NewButton
        {...privateProps}
        {...customProps}
      />
    );
  };

  renderButtonWithSound = (NewButton, customProps, cb, soundName) => {
    const TouchableOpacityWithSound = withSound(TouchableOpacity);
    return (
      <TouchableOpacityWithSound style={{ zIndex: 3 }} onPress={cb} soundName={soundName}>
        {this.renderNewButton(NewButton, customProps)}
      </TouchableOpacityWithSound>
    );
  };

  getNotificationsCount(props) {
    const { notificationDetails } = props;
    return notificationDetails.total;
  }

  renderBadge = () => {
    const counterNotifications = this.getNotificationsCount(this.props);

    if (counterNotifications == 0) return null;

    return (
      <View style={{ position: 'absolute', zIndex: 8, top: 1, right: 12 }}>
        <Badge value={counterNotifications}
          size={Size.badgeTaskSize} />
      </View>
    );
  }

  onChatMessageReceived(data) {
    const { increaseNotificationCounter } = this.props;
    increaseNotificationCounter();
  }

  get separatorWidth () {
    const { width, readButton } = this.props;
    let percentage = readButton ? 50 : 30;
     return width / percentage;
  }

  renderBottomBar() {
    const { width, readButton } = this.props;

    const minWidth = 320;
    const deviceIsBig = width > minWidth;
    const isTablet = deviceUtils.isTablet();

    const marginLeftButton = {
      task: readButton ? Size.taskButtonLeftRead : Size.taskButtonContainerLeft,
      search: readButton ? 13 : -5,
      random: readButton ? Size.randomButtonLeftRead : Size.randomButtonContainerLeft,
    };


    const elementProps = {
      task: { width: deviceIsBig ? Size.taskButtonWidth : 57, source: {uri: 'task_button'}, marginLeft: deviceIsBig ? Size.taskButtonLeft : 28, bottom: -2 },
      search: { width: deviceIsBig ? Size.searchButtonWidth : 56, source: {uri: 'search_button'}, marginLeft: Size.searchButtonLeft, bottom: deviceIsBig ? Size.searchButtonBottom : -2 },
      random: { width: deviceIsBig ? Size.randomButtonWidth : 55, source: {uri: 'random_button'}, marginLeft: deviceIsBig ? Size.randomButtonLeft : 32, bottom: Size.randomButtonBottom },
      read: { width: deviceIsBig ? Size.readButtonWidth : 65, source: {uri: 'lightgreen_button'}, marginLeft: deviceIsBig ? Size.readButtonLeft : 7, bottom: 2 },
    };

    return (
      <BottomBar
        width={width}
        source={{uri: 'barra'}}
        resizeMode='stretch'>

        <Container>
          <ButtonsContainer>
            <ContainerButton zIndex={2} width={deviceIsBig ? Size.taskButtonContainerWidth : 105} left={isTablet ? 0 : marginLeftButton.task} bottom={deviceIsBig ? Size.taskButtonBottom : 6.5}>
              {this.renderBadge()}
              <Button width={deviceIsBig ? Size.taskButtonContainerWidth : 105} source={{uri: 'boton_inf_1'}} resizeMode='stretch'>
                {this.renderButtonWithSound(TaskButton, elementProps.task, this.pressTaskButton, 'tasks')}
              </Button>
            </ContainerButton>

            {deviceUtils.isTablet() && <Separator width={this.separatorWidth}/>}

            <Button zIndex={1} width={deviceIsBig ? Size.searchButtonContainerWidth : 104} source={{uri: 'boton_inf_2'}} resizeMode='stretch' left={isTablet ? 0 : marginLeftButton.search} bottom={deviceIsBig ? 7.5 : 7}>
              {this.renderButtonWithSound(SearchButton, elementProps.search, this.pressSearchButton, 'search')}
            </Button>

            {deviceUtils.isTablet() && <Separator width={this.separatorWidth}/>}

            <Button zIndex={0} width={deviceIsBig ? Size.randomButtonContainerWidth : 105} source={{uri: 'boton_inf_3'}} resizeMode='stretch' left={isTablet ? 0 : marginLeftButton.random} bottom={deviceIsBig ? Size.randomButtonContainerBottom : 7.5}>
              {this.renderButtonWithSound(RandomButton, elementProps.random, this.goToRandomContent, 'random')}
            </Button>
          </ButtonsContainer>
        </Container>

        {readButton &&
          <ReadFrame width={deviceIsBig ? Size.readButtonContainerWidth : 90} source={{uri: 'boton_inf_blue'}} resizeMode='stretch' bottom={deviceIsBig ? Size.readButtonContainerBottom : 17}>
            {this.renderButtonWithSound(BlueButton, elementProps.read, this.readContent, 'learnContent')}
          </ReadFrame>
        }

      </BottomBar>
    );
  }

  render() {

    return isIphoneX ?
      <BottomBarContainer width={this.props.width}>
        {this.renderBottomBar()}
      </BottomBarContainer>
      :
      this.renderBottomBar()
  };
}

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
  notificationDetails: state.user.notificationDetails,
  details: state.tutor.details,
  scene: state.routes.scene,
  contentsToLearn: state.user.contentsToLearn,
  eventsWeek: state.user.eventsWeek,
  profile: state.user.profile,
})

const mapDispatchToProps = {
  getNotificationsAsync: userActions.getNotificationsAsync,
  getNotificationDetailsAsync: userActions.getNotificationDetailsAsync,
  setReloadRandomContents: userActions.setReloadRandomContents,
  getTutorDetailsAsync: tutorActions.getTutorDetailsAsync,
  getContentsToLearnAsync: userActions.getContentsToLearnAsync,
  getEventsWeekAsync: userActions.getEventsWeekAsync,
  increaseNotificationCounter: userActions.increaseNotificationCounter,
}


BottomBarWithButtons.defaultProps = {
  width: 320,
  readButton: true,
};

BottomBarWithButtons.propTypes = {
  width: PropTypes.number,
  onPressReadButton: PropTypes.func,
  readButton: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomBarWithButtons);
