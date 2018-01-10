import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { Palette, Size } from '../../styles';
import { TextBody } from '../Typography';
import { normalizeAllCapLetter } from './../../utils/normalize';

const InputContainer = styled(View)`
  align-self: stretch;
`;

const StyledInput = styled(TextInput)`
  border-color: transparent;
  padding-vertical: ${Size.spaceXSmall};
  padding-horizontal: ${Size.spaceXSmall};
  color: ${props => props.textColor};
  margin-bottom: ${Size.spaceMedium};
  background-color: #b9d280;
  border-radius: 5;
`;

const ReduxFormInput = ({ input, meta, label, ...inputProps }) => {
  return (
    <InputContainer>
      {label && <TextBody bolder>{normalizeAllCapLetter(label)}</TextBody>}
      <StyledInput
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        {...inputProps}
      />
    </InputContainer>
  );
};

ReduxFormInput.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.any]),
};

ReduxFormInput.defaultProps = {
  autoCapitalize: 'none',
  underlineColorAndroid: 'transparent',
  placeholderTextColor: Palette.white.alpha(0.6).css(),
  borderWidth: 1,
  borderColor: Palette.white,
  textColor: Palette.white,
};

export default ReduxFormInput;
