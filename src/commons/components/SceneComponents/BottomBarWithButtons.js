import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { Image, ImageBackground, View, TouchableOpacity } from 'react-native';
import { isIphoneX } from 'react-native-device-detection';
import { getHeightAspectRatio } from '../../utils';

// Frames and Buttons
import bottomBarWithoutButtons from '../../../../assets/images/bottomBar/barra.png';
import btnInf1 from '../../../../assets/images/bottomBar/Boton_inf_1.png';
import btnInf2 from '../../../../assets/images/bottomBar/Boton_inf_2.png';
import btnInf3 from '../../../../assets/images/bottomBar/Boton_inf_3.png';
import btnInfBlue from '../../../../assets/images/bottomBar/Boton_inf_blue.png';
import blueButtonImg from '../../../../assets/images/buttons/lightgreen_button.png';
import taskButtonImg from '../../../../assets/images/buttons/task_button.png';
import randomButtonImg from '../../../../assets/images/buttons/random_button.png';
import searchButtonImg from '../../../../assets/images/buttons/search_button.png';
import Badge from '../Badge/Badge';
import userActions from '../../../actions/userActions';
import tutorActions from '../../../actions/tutorActions';
import withSound from '../../utils/withSound';

const wCommonBtn = 194;
const hCommonBtn = 73;
const Button = styled(ImageBackground)`
  width: ${props => props.width};
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
  background-color: #888B48;
`;

const BottomBar = styled(ImageBackground)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(bottomBarWidth, bottomBarHeight, props.width)};
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

@connect(store => ({
  notifications: store.user.notifications,
  details: store.tutor.details,
  scene: store.routes.scene,
}), {
    getNotificationsAsync: userActions.getNotificationsAsync,
    setReloadRandomContents: userActions.setReloadRandomContents,
    getTutorDetailsAsync: tutorActions.getTutorDetailsAsync,
  })
class BottomBarWithButtons extends Component {

  async componentWillMount() {
    const { getNotificationsAsync, getTutorDetailsAsync } = this.props;
    await getNotificationsAsync();
    await getTutorDetailsAsync();
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

  renderBadge = () => {
    const { notifications: { meta: { total_count = 0 } }, details: { recommendation_contents_pending = 0 } } = this.props;

    const counterNotifications = total_count + recommendation_contents_pending;

    if (counterNotifications == 0) return null;

    return (
      <View style={{ position: 'absolute', zIndex: 8, top: 1, right: 12 }}>
        <Badge value={counterNotifications}
          size={16} />
      </View>
    );
  }

  renderBottomBar() {
    const { width, readButton } = this.props;

    const minWidth = 320;
    const deviceIsBig = width > minWidth;

    const marginLeftButton = {
      task: readButton ? 39 : 15,
      search: readButton ? 13 : -5,
      random: readButton ? -14 : -25,
    };

    const elementProps = {
      task: { width: deviceIsBig ? 63 : 57, source: taskButtonImg, marginLeft: deviceIsBig ? 33 : 28, bottom: -2 },
      random: { width: deviceIsBig ? 65 : 55, source: randomButtonImg, marginLeft: deviceIsBig ? 38 : 32, bottom: -1 },
      search: { width: deviceIsBig ? 63 : 56, source: searchButtonImg, marginLeft: 28, bottom: deviceIsBig ? 0 : -2 },
      read: { width: deviceIsBig ? 72 : 65, source: blueButtonImg, marginLeft: deviceIsBig ? 10 : 7, bottom: deviceIsBig ? 2 : 2 },
    };

    return (
      <BottomBar
        width={width}
        source={bottomBarWithoutButtons}
        resizeMode='stretch'>

        <Container>
          <ButtonsContainer>
            <ContainerButton zIndex={2} width={deviceIsBig ? 120 : 105} left={marginLeftButton.task} bottom={deviceIsBig ? 7 : 6.5}>
              {this.renderBadge()}
              <Button width={deviceIsBig ? 120 : 105} source={btnInf1} resizeMode='stretch'>
                {this.renderButtonWithSound(TaskButton, elementProps.task, this.pressTaskButton, 'tasks')}
              </Button>
            </ContainerButton>

            <Button zIndex={1} width={deviceIsBig ? 114 : 104} source={btnInf2} resizeMode='stretch' left={marginLeftButton.search} bottom={deviceIsBig ? 7.5 : 7}>
              {this.renderButtonWithSound(SearchButton, elementProps.search, this.pressSearchButton, 'search')}
            </Button>

            <Button zIndex={0} width={deviceIsBig ? 125 : 105} source={btnInf3} resizeMode='stretch' left={marginLeftButton.random} bottom={deviceIsBig ? 8 : 7.5}>
              {this.renderButtonWithSound(RandomButton, elementProps.random, this.goToRandomContent, 'random')}
            </Button>
          </ButtonsContainer>
        </Container>

        {readButton &&
          <ReadFrame width={deviceIsBig ? 101 : 90} source={btnInfBlue} resizeMode='stretch' bottom={deviceIsBig ? 19 : 17}>
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

BottomBarWithButtons.defaultProps = {
  width: 320,
  readButton: true,
};

BottomBarWithButtons.propTypes = {
  width: PropTypes.number,
  onPressReadButton: PropTypes.func,
  readButton: PropTypes.bool,
};

export default BottomBarWithButtons;
