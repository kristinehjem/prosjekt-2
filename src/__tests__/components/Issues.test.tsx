import renderer from 'react-test-renderer';
import {render, screen, cleanup} from '@testing-library/react'
import Issues from '../../components/Issues'
import userEvent from '@testing-library/user-event'

afterEach(cleanup);

test('renders issues', () => {
    const tree = renderer.create(<Issues />).toJSON();
    expect(tree).toMatchSnapshot();
  });

describe('testing filtering issues', () => {

  test('default filter is show all', () => {
      const {getByTestId} = render(<Issues/>);
      expect(getByTestId("selectFilterIssue")).toHaveTextContent("Show all");
  });

  test('filter changes to "Show closed"', () => {
    render(<Issues />);
    userEvent.selectOptions(screen.getByRole('combobox'), [screen.getByText("Show closed")]);
    const title = screen.getByRole('option', {name: "Show closed"}) as HTMLOptionElement;
    expect(title.selected).toBe(true);
  });

  test('filter changes to "Show open"', () => {
    render(<Issues />);
    userEvent.selectOptions(screen.getByRole('combobox'), [screen.getByText("Show open")]);
    const title = screen.getByRole('option', {name: "Show open"}) as HTMLOptionElement;
    expect(title.selected).toBe(true);
  });
  
});