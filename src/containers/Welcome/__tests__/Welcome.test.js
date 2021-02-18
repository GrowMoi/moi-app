import React from 'react';
import createComponentWithIntl from '../../../commons/utils/intl-jest';
import Welcome from '../Welcome';

describe('Welcome Scene', () => {
  it('renders expected markup', () => {
    const props = {
      name: 'welcome',
    };

    const wrapper = createComponentWithIntl(<Welcome {...props}/>)
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
