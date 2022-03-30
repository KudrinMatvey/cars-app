import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.footer}>
      © Matvei Kudrin
      {' '}
      {new Date().getFullYear()}
    </footer>
  );
}
