import { Link } from 'react-router-dom';
import { Placeholder } from 'react-bootstrap';
import { Car } from '../types/car';
import styles from './Card.module.scss';
import { formatDetailsString } from '../utils/format-details-string';

interface Props {
  car: Car | null;
}

export function Card({ car }: Props) {
  if (!car) {
    return (
      <Placeholder data-testid="placeholder" as="div" className={styles.card} animation="glow">
        <Placeholder as="img" className={styles.image} />
        <Placeholder className={styles.model} xs={4} />
        <Placeholder className={styles.details} xs={4} />
        <Placeholder className={styles.link} xs={3} />
      </Placeholder>
    );
  }
  return (
    <div className={styles.card}>
      <img className={styles.image} src={car.pictureUrl} alt={car.modelName} />
      <span className={styles.model}>
        {car.manufacturerName}
        {' '}
        {car.modelName}
      </span>
      <span className={styles.details}>{formatDetailsString(car)}</span>
      <Link className={styles.link} to={`/cars/${car.stockNumber}`}>View details</Link>
    </div>
  );
}
