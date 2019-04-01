import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { Image, ImageBackground, View, TouchableOpacity } from 'react-native';
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
  bottom: ${props => props.bottom || 0};
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
const blueFrameHeight = 97;
const ReadFrame = styled(ImageBackground)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(blueFrameWidth, blueFrameHeight, props.width)};
  left: 0;
  bottom: 11;
  position: relative;
  overflow: visible;
`;

const bottomBarWidth = 788;
const bottomBarHeight = 65;
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
`;

const SearchButton = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(taskWidthBtn, taskHeightBtn, props.width)}
  bottom: 0;
`;

const RandomButton = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(taskWidthBtn, taskHeightBtn, props.width)}
  bottom: 0;
`;

const lightGreenBtnWidth = 108;
const lightGreenBtnHeight = 88;
const BlueButton = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(lightGreenBtnWidth, lightGreenBtnHeight, props.width)};
  left: 16;
  bottom: 3;
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
    if(scene.name === 'randomContents') {
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
      resizeMode: 'contain',
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

  render() {
    const minWidth = 320;
    const deviceIsBig = this.props.width > minWidth;

    const elementProps = {
      task: { width: 48, source: taskButtonImg, left: deviceIsBig ? 28 : 20, bottom: -2 },
      random: { width: 50, source: randomButtonImg, left: deviceIsBig ? 28 : 20 },
      search: { width: 50, source: searchButtonImg, left: deviceIsBig ? 28 : 20 },
      read: { width: 55, source: blueButtonImg },
    };

    return (
      <BottomBar
        width={this.props.width}
        source={bottomBarWithoutButtons}
        resizeMode='contain'>

        <Container>
          <ButtonsContainer>
            <ContainerButton zIndex={2} width={deviceIsBig ? 98 : 80} left={18} bottom={7}>
              {this.renderBadge()}
              <Button width={deviceIsBig ? 98 : 80} source={btnInf1} resizeMode='contain'>
                {this.renderButtonWithSound(TaskButton, elementProps.task, this.pressTaskButton, 'tasks')}
              </Button>
            </ContainerButton>

            <Button zIndex={1} width={deviceIsBig ? 92 : 80} source={btnInf2} resizeMode='contain' left={0} bottom={6.5}>
              {this.renderButtonWithSound(SearchButton, elementProps.search, this.pressSearchButton, 'search')}
            </Button>

            <Button zIndex={0} width={deviceIsBig ? 96 : 81} source={btnInf3} resizeMode='contain' left={-18} bottom={6.8}>
              {this.renderButtonWithSound(RandomButton, elementProps.random, this.goToRandomContent, 'random')}
            </Button>
          </ButtonsContainer>
        </Container>

        {this.props.readButton &&
          <ReadFrame width={70} source={btnInfBlue} resizeMode='contain'>
            {this.renderButtonWithSound(BlueButton, elementProps.read, this.readContent, 'learnContent')}
          </ReadFrame>
        }

      </BottomBar>
    );
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
