import {Car} from "../interfaces/car";
import {Link} from "react-router-dom";
import {Placeholder} from "react-bootstrap";
import styles from './Card.module.scss'
import {formatDetailsString} from "../utils/format-details-string";

interface CardProps {
  car: Car | null;
}

export function Card({car}: CardProps) {
  if (!car) {
    return <Placeholder as="div" className={styles.card} animation="glow">
      <Placeholder as="img" className={styles.image}/>
      <Placeholder data-testid="model" className={styles.model} xs={4}/>
      <Placeholder data-testid="details" className={styles.details} xs={4}/>
      <Placeholder data-testid="link" className={styles.link} xs={3}/>
    </Placeholder>;
  }
  return <div className={styles.card}>
    <img className={styles.image} src={car.pictureUrl} alt={car.modelName}/>
    <span className={styles.model}>{car.manufacturerName} {car.modelName}</span>
    <span className={styles.details}>{formatDetailsString(car)}</span>
    <Link className={styles.link} to={`/cars/${car.stockNumber}`}>View details</Link>
  </div>;
}