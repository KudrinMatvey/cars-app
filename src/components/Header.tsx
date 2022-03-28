import {Link} from "react-router-dom";
import React from "react";
import styles from './Header.module.scss';

export const Header = () =>
  <header className={styles.header}>
    <img className={styles.image} src="logo.png" alt="logo"/>
    <nav className={styles.nav}>
      <Link className={styles.link} to="/purchase">Purchase</Link>
      <Link className={styles.link} to="/my-orders">My Orders</Link>
      <Link className={styles.link} to="/sell">Sell</Link>
    </nav>
  </header>