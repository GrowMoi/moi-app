import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, View } from 'react-native';
import styled from 'styled-components/native';
import { Size, Font, Palette } from '../../styles';

const lineHeight = 20;
const Box = styled(View)`
  padding-horizontal: ${Size.spaceXSmall};
  position: relative;
`;
const Input = styled(TextInput)`
  font-size: ${Size.fontBody};
  font-family: ${Font.futura('normal')};
  color: ${Palette.white};
`;

const Line = styled(View)`
  height: ${lineHeight};
  border-color: transparent;
  border-bottom-color: ${Palette.white.alpha(0.3).css()};
  border-bottom-width: 1;
`;

const LinesContainer = styled(View)`
  position: absolute;
  height: ${props => props.height};
  top: 5;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default class NoteInput extends Component {
  state = {
    text: this.props.text || '',
    currentHeight: lineHeight,
  }

  static propTypes = {
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }

  render() {
    const { currentHeight } = this.state;
    const numberOfLines = Math.floor(currentHeight / lineHeight);
    const lines = new Array(numberOfLines).fill(0);

    return (
      <Box>
        <LinesContainer height={currentHeight}>
          {lines && lines.length > 0 && lines.map((line, i) => <Line key={i}/>)}
        </LinesContainer>
        <Input
          autoCorrect={false}
          onContentSizeChange={e => this.setState({ currentHeight: e.nativeEvent.contentSize.height })}
          underlineColorAndroid='transparent'
          editable
          multiline
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
          {...this.props}
        />
      </Box>
    );
  }
}
