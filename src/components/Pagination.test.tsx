import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';
import styles from './Pagination.module.scss';

describe('pagination', () => {
  it('should hide back if no going back', async () => {
    const jumpToPage = jest.fn();
    const page = 1;
    render(<Pagination page={page} totalAmount={10} jumpToPage={jumpToPage} />);
    expect(screen.getByText('Page 1 of 10')).toBeInTheDocument();
    expect(screen.queryByText('First')).toHaveClass(styles.buttonHidden);
    expect(screen.queryByText('Previous')).toHaveClass(styles.buttonHidden);

    // should call next page
    userEvent.click(screen.getByText('Next'));
    expect(jumpToPage).toHaveBeenCalledWith(page + 1);
  });

  it('should hide forward if no next page', () => {
    const jumpToPage = jest.fn();
    const page = 1;
    render(<Pagination page={page} totalAmount={page} jumpToPage={jumpToPage} />);
    expect(screen.queryByText('Next')).toHaveClass(styles.buttonHidden);
    expect(screen.queryByText('Last')).toHaveClass(styles.buttonHidden);
  });

  it('should display only page if total amount is not passed', () => {
    const jumpToPage = jest.fn();
    const page = 1;
    render(<Pagination page={page} jumpToPage={jumpToPage} />);
    expect(screen.getByText('Page 1')).toBeInTheDocument();
  });
});
