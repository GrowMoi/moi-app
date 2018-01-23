import React, { Component } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Palette } from '../../commons/styles';
import { Field, reduxForm } from 'redux-form';
import { FontAwesome } from '@expo/vector-icons';
import ReduxFormInput from '../../commons/components/Input/ReduxFormInput';
import { Line } from '../../commons/components/SceneComponents';

const Container = styled(View)`
  align-self: stretch;
`;

const InputContainer = styled(View)`
  flex-direction: row;
`;

const Icon = styled(FontAwesome)`
  width: 30;
  position: absolute;
  right: 0;
  top: 7;
  z-index: 1;
`;

class SearchInput extends Component {
  state = {
    query: '',
  }

  onChangeText = (text) => {
    this.setState({ query: text });
  }

  render() {
    const { query } = this.state;
    const { handleSubmit } = this.props;
    return (
      <Container>
        <InputContainer>
          <ReduxFormInput
            placeholder='Buscar...'
            name='query'
            leftIcon='md-search'
            leftIconColor='white'
            rightIcon='md-refresh'
            onPressRightIcon={() => handleSubmit(query)}
            input={{
              onChange: this.onChangeText,
            }}
          />
        </InputContainer>
        <Line />
      </Container>
    );
  }
}

export default SearchInput;
