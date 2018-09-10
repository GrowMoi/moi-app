import React from 'react';
import { View, Animated, Easing } from 'react-native';
import Alert from './Alert/Alert';
import TutorGenericAlert from './Alert/TutorGenericAlert';

class Test extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Alert open={true}>
          <TutorGenericAlert
            message='Hola'
            description='hola hola'
            onCancel={() => null}
          />
        </Alert>
      </View>
    );
  }
}

export default Test;
