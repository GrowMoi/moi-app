import React from 'react';
import renderer from 'react-test-renderer';

import Home from '../Home';

it('renders without crashing', () => {
  const rendered = renderer.create(<Home />).toJSON();
  expect(rendered).toMatchSnapshot();
  expect(rendered).toBeTruthy();
});
