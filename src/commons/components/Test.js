import React from 'react';
import { View, Animated, Easing, Button, ImageBackground } from 'react-native';
import Alert from './Alert/Alert';
import TutorGenericAlert from './Alert/TutorGenericAlert';
import WoodLabel from './WoodLabel/WoodLabel';


class Test extends React.Component {
  state = {
    buttonAppear: false,
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <WoodLabel appear={this.state.buttonAppear} text='Mate' onPress={() => null}/>
        <Button title='Press' onPress={() => this.setState(prevState => ({ buttonAppear: !prevState.buttonAppear }))} />
      </View>
    );
  }
}

export default Test;
