import userEvent from '@testing-library/user-event';
import { useSearchParams } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Home } from './Home';
import { Filter } from '../types/filter';
import Mock = jest.Mock;

let mockFilters: {[key in Filter]?: string};
jest.mock('./Filters', () => ({
  Filters({ onSubmit }: any) {
    return <button type="submit" onClick={() => onSubmit(mockFilters)}> filter </button>;
  },
}));
jest.mock('react-router-dom');
describe('home', () => {
  test('properly sends requests to get cars', () => {
    let params = new URLSearchParams();
    (useSearchParams as Mock).mockReturnValue([params, (val: URLSearchParams) => { params = val; }]);
    render(<Home />);
    // ensure that url params are empty first
    expect(params.toString()).toStrictEqual('');

    // set both filters
    mockFilters = {
      [Filter.COLOR]: 'Blue',
      [Filter.MANUFACTURER]: 'Tesla',
    };
    userEvent.click(screen.getByText('filter'));
    expect(params.toString()).toEqual('color=Blue&manufacturer=Tesla&page=1');

    // check that if only 1 of filters is present the other one is removed
    mockFilters = {
      [Filter.COLOR]: 'White',
    };
    userEvent.click(screen.getByText('filter'));
    expect(params.toString()).toEqual('color=White&page=1');

    // next page keeps other filters untouched
    userEvent.click(screen.getByText('Next'));
    expect(params.toString()).toEqual('color=White&page=2');

    // when we do a new filter query - we jump to 1st page
    mockFilters = {
      [Filter.MANUFACTURER]: 'Volvo',
    };
    userEvent.click(screen.getByText('filter'));
    expect(params.toString()).toEqual('page=1&manufacturer=Volvo');
  });
});
