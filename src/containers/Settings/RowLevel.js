import React from 'react';
import PropTypes from 'prop-types';
import { View, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '../../commons/styles/palette';
import { Size } from '../../commons/styles';
import SliderLevels from '../../commons/components/SliderLevels/SliderLevels';
import { Description } from '../../commons/components/Typography';
import rowBox from '../../../assets/images/settings/row_levels.png';

const Row = styled(ImageBackground)`
  width: 270;
  align-items: center;
  height: 40;
  justify-content: center;
`;

const RowContainer = styled(View)`
  justify-content: space-between;
  padding-horizontal: ${Size.spaceMedium};
  flex-flow: row nowrap;
  align-items: center;
  align-self: stretch;
  padding-bottom: ${Size.spaceXSmall};
`;

const SliderContainer = styled(View)`
  width: 100;
`;

const DescriptionContainer = styled(View)`
  width: 125;
`;

const RowLevel = ({ title, onValueChange, kind, level }) => {

  const levelToShow = level - 1;
  return (
    <Row source={rowBox} resizeMode='contain'>
      <RowContainer>
        <DescriptionContainer>
          <Description ellipsizeMode='tail' numberOfLines={1} color={colors.cream.css()}>{title}</Description>
        </DescriptionContainer>
        <SliderContainer>
          <SliderLevels value={levelToShow} onSlidingComplete={currentLevel => {

            const levelToPush = currentLevel + 1;
            onValueChange(kind, levelToPush);
          }} />
        </SliderContainer>
      </RowContainer>
    </Row>
  );
};

RowLevel.propTypes = {
  title: PropTypes.string,
  onValueChange: PropTypes.func,
  kind: PropTypes.string,
  level: PropTypes.number,
};

export default RowLevel;
