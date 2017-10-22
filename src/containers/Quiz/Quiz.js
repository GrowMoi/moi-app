import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Title } from '../../commons/components/Typography';
import QuizPicker from '../../commons/components/QuizPicker/QuizPicker';

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const options = [
  { text: 'Quiz 1', id: 1 },
  { text: 'Quiz 2', id: 2 },
  { text: 'Quiz 3', id: 3 },
]


@connect(store => ({
  user: store.user,
}))
export default class QuizScene extends Component {
  render() {
    return (
      <Container>
        <QuizPicker
          options={options}
          selectedValue={(option) => console.log(option)}
        />
      </Container>
    );
  }
}
