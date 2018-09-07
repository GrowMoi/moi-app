import React from 'react';
import { View, Animated, Easing } from 'react-native';
import Alert from './Alert/Alert';

class Test extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Alert open={true}>

        </Alert>
      </View>
    );
  }
}

export default Test;
