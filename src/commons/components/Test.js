import React from 'react';
import { View } from 'react-native';
import CancelQuizButton from './Buttons/CancelQuizButton'

class Test extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, position: 'relative', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', backgroundColor: 'red' }}>
        <CancelQuizButton style={{ position: 'absolute', top: 0, right: 0 }}/>
      </View>
    );
  }
}

export default Test;
