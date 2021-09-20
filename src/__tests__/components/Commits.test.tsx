import React from 'react';
import renderer from 'react-test-renderer';
import Commits from '../../Commits'

test('renders commits', () => {
    const tree = renderer.create(<Commits />).toJSON();
    expect(tree).toMatchSnapshot();
  });