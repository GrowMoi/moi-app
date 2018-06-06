import React from 'react';
import PropTypes from 'prop-types';
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

const BottomBar = styled(ImageBackground)`
  width: ${props => props.width};
  height: 30;
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
  bottom: 1;
  left: 20;
`;

const SearchButton = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(taskWidthBtn, taskHeightBtn, props.width)}
  bottom: 0;
  left: 20;
`;

const RandomButton = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(taskWidthBtn, taskHeightBtn, props.width)}
  bottom: 0;
  left: 20;
`;

const lightGreenBtnWidth = 108;
const lightGreenBtnHeight = 88;
const BlueButton = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(lightGreenBtnWidth, lightGreenBtnHeight, props.width)};
  left: 16;
  bottom: 3;
`;

const BottomBarWithButtons = (props) => {
  const pressTaskButton = () => {
    Actions.tasks();
  };

  const pressSearchButton = () => {
    Actions.search();
  };

  const goToRandomContent = () => {
    Actions.randomContents();
  };

  const readContent = () => {
    if (props.onPressReadButton) props.onPressReadButton();
  };

  const renderButton = (NewButton, customProps, cb) => {
    const privateProps = {
      resizeMode: 'contain',
    };

    return (
      <TouchableOpacity onPress={cb}>
        <NewButton
          { ...privateProps }
          { ...customProps }
        />
      </TouchableOpacity>
    );
  };

  const elementProps = {
    task: { width: 48, source: taskButtonImg },
    random: { width: 50, source: randomButtonImg },
    search: { width: 50, source: searchButtonImg },
    read: { width: 55, source: blueButtonImg },
  };

  return (
    <BottomBar
      width={props.width}
      source={bottomBarWithoutButtons}
      resizeMode='contain'>

      <Container>
        <ButtonsContainer>
          <Button zIndex={2} width={80} source={btnInf1} resizeMode='contain' left={18} bottom={7}>
            {renderButton(TaskButton, elementProps.task, pressTaskButton)}
          </Button>

          <Button zIndex={1} width={80} source={btnInf2} resizeMode='contain' left={0} bottom={6.5}>
            {renderButton(SearchButton, elementProps.search, pressSearchButton)}
          </Button>

          <Button zIndex={0} width={81} source={btnInf3} resizeMode='contain' left={-18} bottom={6.8}>
            {renderButton(RandomButton, elementProps.random, goToRandomContent)}
          </Button>
        </ButtonsContainer>
      </Container>

      {props.readButton &&
        <ReadFrame width={70} source={btnInfBlue} resizeMode='contain'>
          {renderButton(BlueButton, elementProps.read, readContent)}
        </ReadFrame>
      }

    </BottomBar>
  );
};

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
