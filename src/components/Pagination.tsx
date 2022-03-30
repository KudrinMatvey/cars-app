import { Button } from 'react-bootstrap';
import styles from './Pagination.module.scss';

interface Props {
  page: number,
  totalAmount?: number,
  jumpToPage: (page?: number) => void
}

export function Pagination({ page, totalAmount, jumpToPage }: Props) {
  return (
    <div className={styles.wrapper}>
      <Button
        className={page === 1 ? styles.buttonHidden : styles.button}
        onClick={() => jumpToPage()}
        variant="link"
      >
        First
      </Button>
      <Button
        className={page === 1 ? styles.buttonHidden : styles.button}
        onClick={() => jumpToPage(page - 1)}
        variant="link"
      >
        Previous
      </Button>
      <span>
        Page
        {' '}
        {page}
        {' '}
        {totalAmount ? `of ${totalAmount}` : ''}
      </span>
      <Button
        className={page === totalAmount || !totalAmount ? styles.buttonHidden : styles.button}
        onClick={() => jumpToPage(page + 1)}
        variant="link"
      >
        Next
      </Button>
      <Button
        className={page === totalAmount || !totalAmount ? styles.buttonHidden : styles.button}
        onClick={() => jumpToPage(totalAmount)}
        variant="link"
      >
        Last
      </Button>
    </div>
  );
}
