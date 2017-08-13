import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { Button, View } from 'react-native';
import ActionSheet from '../../../src/commons/components/ActionSheets/ActionSheet';
// import { action } from '@storybook/addon-actions';
import CenterFontView from '../help-components/CenterFontView';


const stories = storiesOf('Action Sheet', module);
stories.addDecorator(getStory => <CenterFontView>{getStory()}</CenterFontView>);

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
    const { ...rest } = this.props;

    return (
      <View>
        <Button title='Open Options' onPress={this.toggleModal} />
        <ActionSheet
          {...rest}
          visible={isVisible}
          onDismiss={this.toggleModal} />
      </View>
    );
  }
}

const options = [
  { label: 'Galeria', icon: 'md-photos' },
  { label: 'Recomendaciones', icon: 'md-thumbs-up' },
  { label: 'Links', icon: 'md-link' },
  { label: 'Notas', icon: 'md-create' },
];

// Actions Sheet
stories.add('Basic Action sheet', () => <OpenActions options={options} />);
stories.add('Action sheet with cancel button', () => <OpenActions options={options} hasCancelOption />);
