import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import Commits from '../../components/Commits'
import Chart from '../../components/CommitsChart'
import { commitsByDate } from "../../types";

test('renders commits', () => {
  const { container } = render(<Commits/>);
  expect(container).toMatchSnapshot();
  });