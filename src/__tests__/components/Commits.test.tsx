import { render } from '@testing-library/react';
import Commits from '../../components/Commits'

test('renders commits', () => {
  const { container } = render(<Commits/>);
  expect(container).toMatchSnapshot();
  });