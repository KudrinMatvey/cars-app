import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

export function NotFound() {
  return (
    <div className={styles.wrapper}>
      <img className={styles.logo} src="/logo.png" alt="logo" />
      <h1 className={styles.header}>404 - Not found</h1>
      <p className={styles.par}>Sorry the page you are looking for does not exist.</p>
      <p className={styles.par}>
        You can always go to
        {' '}
        <Link to="/">homepage.</Link>
      </p>
    </div>
  );
}
