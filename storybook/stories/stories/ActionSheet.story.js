import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Button, View } from 'react-native';
import ActionSheet from '../../../src/commons/components/ActionSheets/ActionSheet';
// import { action } from '@storybook/addon-actions';
import CenterView from '../help-components/CenterView';


const stories = storiesOf('Action Sheet', module);
stories.addDecorator(getStory => <CenterView>{getStory()}</CenterView>);

class OpenActions extends React.Component {
  state = {
    isVisible: false,
  }

  toggleModal = () => {
    const { isVisible } = this.state;
    this.setState({ isVisible: !isVisible });
  }

  render() {
    const { isVisible } = this.state;
    return (
      <View>
        <Button title='Open Options' onPress={this.toggleModal} />
        <ActionSheet
          visible={isVisible}
          onDismiss={this.toggleModal} />
      </View>
    );
  }
}

// Actions Sheet
stories.add('Basic Action sheet', () => <OpenActions />);
