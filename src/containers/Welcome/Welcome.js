import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components/native';
import { Actions } from 'react-native-router-flux';
import { LinearGradient } from 'expo-linear-gradient';

class Welcome extends Component {
  goToHome = () => Actions.tabbars();

  render() {
    return (
      <Gradient colors={['#5FE89F', '#5EDFA7', '#66CDF7']}
        start={[0.1, 0.1]}
        end={[1, 1]}>
        <Title color='white' onPress={this.goToHome}>
          <FormattedMessage id="commons.welcome" />!
        </Title>
        <SimpleText>
          <FormattedMessage id="commons.text" />
        </SimpleText>
      </Gradient>
    );
  }
}

/**
 * Styled components that use in this Scene
 */

const Title = styled.Text`
  color: ${({ color }) => color && color};
  font-size: 25;
  padding-vertical: 10;
  background-color: transparent;
  font-family: 'Futura';
`;

const SimpleText = styled.Text`
  background-color: transparent;
  font-family: 'Museo300';
`;

const Gradient = styled(LinearGradient)`
  flex: 1;
  align-self: stretch;
  align-items: center;
  justify-content: center;
`;

export default Welcome;
