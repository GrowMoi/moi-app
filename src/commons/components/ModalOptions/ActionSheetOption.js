import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { TextBody } from '../../components/Typography'
import styled ,{ css } from 'styled-components/native';

const Option = styled(View)`
  background-color: white;
  padding: 20px 10px;
  margin-bottom: 5;
  border-radius: 5;

  ${props => props.cancel && css`
    background-color: white;
    margin-top: 10;
    margin-bottom: 0;
  `};
`;

const ActionSheetOption = ({ onPress, color, label, cancel = false }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Option cancel={cancel}>
        <TextBody center color={cancel ? 'red' : 'blue' }>{label}</TextBody>
      </Option>
    </TouchableOpacity>
  );
};

export default ActionSheetOption;
