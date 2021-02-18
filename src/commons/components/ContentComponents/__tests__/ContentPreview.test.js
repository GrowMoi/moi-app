import React from 'react';
import 'react-native';
import { shallow } from 'enzyme';
import ContentPreview from '../ContentPreview';

describe('Content Preview', () => {
  it('it should render row as expected', () => {
    const wrapper = shallow(
      <ContentPreview
        source={{ uri: 'http://www.wolaver.org/space/crab.jpg' }}
        title='Grab Nebula'
        subtitle='Que es?'
        description='lorem lorem loremlorem lorem lorem laskdj flakd jfalskdfj alskdf jsadkfj jasdl;fk jasdfkl diasdj asdfh aksdfjh akdfjh akldfjhas fjd'
      />,
    );
    const tree = wrapper.dive();

    expect(tree).toMatchSnapshot();
    expect(tree).toBeTruthy();
  });
});
