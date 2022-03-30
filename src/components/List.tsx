import { Placeholder } from 'react-bootstrap';
import React from 'react';
import styles from './List.module.scss';
import { Card } from './Card';
import { Car } from '../types/car';

interface Props {
  cars: Car[],
  totalCarsCount?: number,
  loaded: boolean,
}

export function List({ loaded, cars, totalCarsCount }: Props) {
  return (
    <>
      <h3 className={styles.title}>
        Available cars
      </h3>
      {loaded ? (
        <div className={styles.subtitle}>
          Showing
          {' '}
          {cars.length}
          {' '}
          of
          {' '}
          {totalCarsCount}
          {' '}
          results
        </div>
      ) : <Placeholder as="div" animation="glow" className={styles.subtitle}><Placeholder xs={5} /></Placeholder>}
      <ul className={styles.list}>
        {cars.map((car, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li className={styles.listItem} key={index}>
            <Card car={car} />
          </li>
        ))}
      </ul>
    </>
  );
}
