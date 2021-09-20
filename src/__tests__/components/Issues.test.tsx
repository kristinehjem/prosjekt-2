import React from 'react';
import renderer from 'react-test-renderer';
import Issues from '../../Issues'

test('renders issues', () => {
    const tree = renderer.create(<Issues />).toJSON();
    expect(tree).toMatchSnapshot();
  });