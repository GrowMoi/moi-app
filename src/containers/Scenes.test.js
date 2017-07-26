import React from 'react';
import Scenes from './Scenes';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<Scenes />).toJSON();
  expect(rendered).toBeTruthy();
});
