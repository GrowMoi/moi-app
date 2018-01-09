import React from 'react';
import styled from 'styled-components/native';
import { View, Image, TouchableOpacity } from 'react-native';
import { TextBody } from '../Typography';
import { Size, Palette } from '../../styles';
import { getHeightAspectRatio } from '../../utils';

const width = 130;
const height = 100;

const StyledButton = styled(TouchableOpacity)`
  flex: 1;
  height: ${props => getHeightAspectRatio(width, height, props.width)};
  margin-horizontal: 5;
  margin-vertical: 5;
`;

const StyledImage = styled(Image)`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-start;
  position: relative;
  border-color: black;
  border-width: 1;
`;

const TitleContainer = styled(View)`
  padding-horizontal: 5;
  padding-vertical: 10;
  align-self: stretch;
  background-color: ${Palette.black.alpha(0.5).css()};
`;

const ContentImagePreview = ({ width = 130, data }) => {
  return (
    <StyledButton width={width}>
      <StyledImage source={data.media.length ? { uri: data.media[0] } : null } resizeMode='cover' >
        <TitleContainer>
          <TextBody numberOfLines={1} inverted>{data.title}</TextBody>
        </TitleContainer>
      </StyledImage>
    </StyledButton>
  );
};

export default ContentImagePreview;
