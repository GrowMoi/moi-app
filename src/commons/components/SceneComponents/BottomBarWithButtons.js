import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { Image, View, TouchableOpacity } from 'react-native';
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
const Button = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(wCommonBtn, hCommonBtn, props.width)};
  flex: 1;
  flex-direction: row;
  bottom: ${props => props.bottom || 0};
  left: ${props => props.left || 0};
  position: relative;
  overflow: visible;
  z-index: ${props => props.zIndex || 0};
`;

const BottomBar = styled(Image)`
  width: ${props => props.width};
  height: 30;
  flex-direction: row;
  overflow: visible;
`;

const ButtonsContainer = styled(View)`
  bottom: -5px;
  width: 250px;
  flex-direction: row;
  align-items: center;
`;

const taskWidthBtn = 603;
const taskHeightBtn = 371;
const TaskButton = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(taskWidthBtn, taskHeightBtn, props.width)}
  position: absolute;
  bottom: 1;
  left: 20;
`;

const SearchButton = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(taskWidthBtn, taskHeightBtn, props.width)}
  position: absolute;
  bottom: 0;
  left: 20;
`;

const RandomButton = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(taskWidthBtn, taskHeightBtn, props.width)}
  position: absolute;
  bottom: 0;
  left: 20;
`;

const lightGreenBtnWidth = 108;
const lightGreenBtnHeight = 88;
const BlueButton = styled(Image)`
  width: ${props => props.width};
  height: ${props => getHeightAspectRatio(lightGreenBtnWidth, lightGreenBtnHeight, props.width)};
  left: 18;
  bottom: -2;
`;

const BottomBarWithButtons = (props) => {
  const buttonPress = () => {
    Actions.tasks();
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
    read: { width: 50, source: blueButtonImg },
  };

  return (
    <BottomBar
      width={props.width}
      source={bottomBarWithoutButtons}
      resizeMode='contain'>

      <ButtonsContainer>
        <Button zIndex={2} width={80} source={btnInf1} resizeMode='contain' left={0} bottom={7}>
          {renderButton(TaskButton, elementProps.task, buttonPress)}
        </Button>

        <Button zIndex={1} width={80} source={btnInf2} resizeMode='contain' left={-20} bottom={6.2}>
          {renderButton(SearchButton, elementProps.search, buttonPress)}
        </Button>

        <Button zIndex={0} width={81} source={btnInf3} resizeMode='contain' left={-38} bottom={6.5}>
          {renderButton(RandomButton, elementProps.random, buttonPress)}
        </Button>
      </ButtonsContainer>

      <Button width={120} source={btnInfBlue} resizeMode='contain' left={0} bottom={13.8}>
        {renderButton(BlueButton, elementProps.read, readContent)}
      </Button>

    </BottomBar>
  );
};

BottomBarWithButtons.defaultProps = {
  width: 320,
};

BottomBarWithButtons.propTypes = {
  width: PropTypes.number,
  onPressReadButton: PropTypes.func,
};

export default BottomBarWithButtons;
