import React from 'react';
import renderer from 'react-test-renderer';

import Scenes from '../Scenes';

it('renders without crashing', () => {
  const rendered = renderer.create(<Scenes />).toJSON();
  expect(rendered).toMatchSnapshot();
  expect(rendered).toBeTruthy();
});
