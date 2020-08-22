import React, { Component } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Palette } from '../../commons/styles';
import { Field, reduxForm } from 'redux-form';
import { FontAwesome } from '@expo/vector-icons';
import ReduxFormInput from '../../commons/components/Input/ReduxFormInput';
import { Line } from '../../commons/components/SceneComponents';
import Button from '../../commons/components/Buttons/Button';

const Container = styled(View)`
  align-self: stretch;
`;

const InputContainer = styled(View)`
  flex-direction: row;
  height: 50;
`;

const Icon = styled(FontAwesome)`
  width: 30;
  position: absolute;
  right: 0;
  top: 7;
  z-index: 1;
`;

const FormInput = styled(ReduxFormInput)`
  height: 50;
`

class SearchInput extends Component {
  state = {
    query: '',
  }

  onChangeText = (text) => {
    this.setState({ query: text });
  }

  render() {
    const { query } = this.state;
    const { onSubmit } = this.props;
    return (
      <Container>
        <InputContainer>
          <FormInput
            placeholder='Buscar...'
            name='query'
            leftIcon='md-search'
            leftIconColor='white'
            input={{
              onChange: this.onChangeText,
            }}
          />
          <Button onPress={() => onSubmit(query)} title='Buscar'/>
        </InputContainer>
        <Line />
      </Container>
    );
  }
}

export default SearchInput;
