import {Car} from "../interfaces/car";
import {Link} from "react-router-dom";
import {Placeholder} from "react-bootstrap";
import styles from './Card.module.scss'
import {capitalize} from "../utils/capitalize";

function formatDetailsString(car: Car) {
  return [
    `Stock # ${car.stockNumber}`,
    car.mileage ? `${car.mileage.number.toLocaleString('en-GB')} ${car.mileage.unit.toUpperCase()}` : '',
    car.fuelType,
    capitalize(car.color)
  ]
    .filter(Boolean)
    .join(' - ')
}

export function Card({car}: { car?: Car }) {
  return <div className={styles.card}>
    {car ? <>
      <img className={styles.image} src={car.pictureUrl} alt={car.modelName}/>
      <div className={styles.model}>{car.modelName}</div>
      <div className={styles.details}>{formatDetailsString(car)}</div>
      <Link className={styles.link} to={`/cars/${car.stockNumber}`}>View details</Link>
    </>: <>
      <Placeholder className={styles.image}/>
      <Placeholder className={styles.model} xs={4} animation="glow"/>
      <Placeholder className={styles.details} xs={4} animation="glow"/>
      <Placeholder className={styles.link} xs={3} animation="glow"/>
    </>
    }
  </div>
}