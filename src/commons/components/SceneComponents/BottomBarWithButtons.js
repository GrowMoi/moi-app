import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { Image, View, TouchableOpacity } from 'react-native';
import MoIcon from '../MoIcon/MoIcon';
import { Size } from '../../styles';
import bottomBarWithButtons from '../../../../assets/images/bottomBar/bottom_bar_with_buttons.png';
import lightgreenButton from '../../../../assets/images/buttons/lightgreen_button.png';

const width = 637;
const height = 94;
const aspect = width / height;

const BottomBar = styled(Image)`
  width: ${props => props.width};
  height: ${props => Math.round(props.width / aspect)};
  flex-direction: row;
  overflow: visible;
`;

const ButtonsContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  top: ${Size.spaceXSmall};
`;

const Button = styled(View)`
  flex: 1;
  flex-direction: row;
`;

const TaskButton = styled(MoIcon)`
  justify-content: flex-end;
  left: ${props => props.pos.left || 0}px;
  bottom: ${props => props.pos.bottom || 0}px;
`;
const SearchButton = styled(MoIcon)`
  justify-content: flex-end;
  left: ${props => props.pos.left || 0}px;
  bottom: ${props => props.pos.bottom || 0}px;
`;
const RandomButton = styled(MoIcon)`
  justify-content: flex-end;
  left: ${props => props.pos.left || 0}px;
  bottom: ${props => props.pos.bottom || 0}px;
`;

const widthButton = 108;
const heightButton = 88;
const aspectButton = widthButton / heightButton;

const LightGreenButton = styled(Image)`
  width: ${props => props.width};
  height: ${props => Math.round(props.width / aspectButton)};
  right: ${props => props.pos.right || 5};
  top: ${props => props.pos.top || 1};
`;


const BottomBarWithButtons = (props) => {
  const iconSize = 17;
  const hasHigherWidth = props.width > 320;

  const buttonPress = () => {
    Actions.tasks();
  };

  const readContent = () => {
    if (props.onPressReadButton) props.onPressReadButton();
  };

  return (
    <BottomBar
      width={props.width}
      source={bottomBarWithButtons}
      resizeMode='contain'>

      <ButtonsContainer>
        <Button>
          <TouchableOpacity onPress={buttonPress}>
            <TaskButton
              active
              pos={{
                left: hasHigherWidth ? 90 : 77,
              }}
              name='task'
              size={iconSize}
            />
          </TouchableOpacity>
        </Button>

        <Button>
          <TouchableOpacity>
            <SearchButton
              active
              pos={{
                left: hasHigherWidth ? 60 : 53,
              }}
              name='search'
              size={iconSize}
            />
          </TouchableOpacity>
        </Button>

        <Button>
          <TouchableOpacity>
            <RandomButton
              active
              pos={{
                left: hasHigherWidth ? 27 : 25,
                bottom: hasHigherWidth ? 2 : 4,
              }}
              name='random'
              size={iconSize}
            />
          </TouchableOpacity>
        </Button>
      </ButtonsContainer>

      <TouchableOpacity onPress={readContent}>
        <LightGreenButton
          pos={{
            right: 5,
            top: 0,
          }}
          source={lightgreenButton}
          resizeMode='contain'
          width={hasHigherWidth ? 65 : 55}
        />
      </TouchableOpacity>

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
