import { render, screen } from '@testing-library/react';
import App from '../components/App';

test("renders", () => {
  const { container } = render(<App/>);
  expect(container).toMatchSnapshot();
});
