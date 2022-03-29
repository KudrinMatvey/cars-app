import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getCar} from "../api/requests";
import {Car} from "../interfaces/car";
import {formatDetailsString} from "../utils/format-details-string";
import {Button} from "react-bootstrap";
import styles from './Details.module.scss';

export function Details() {
  const params = useParams();
  const navigate = useNavigate();
  const id = parseInt(params.id as string);
  const [car, setCar] = useState<Car>()

  useEffect(() => {
    getCar(id)
      .then(setCar)
      .catch(() => navigate('/not-found', {replace: true}))
  }, [id , navigate]);
  if(!car) return null;
  return <div className={styles.pageWrapper}>
    {/*<Placeholder as="img"></Placeholder>*/}
    <img src={car.pictureUrl} alt={car.modelName}
         // onLoad={}
    />
    <div className={styles.contentWrapper}>
      <main className={styles.main}>
        <h3 className={styles.title}> {car.manufacturerName} {car.modelName} </h3>
        <div className={styles.details}>{formatDetailsString(car)}</div>
        <p className={styles.deliveryText}>
          This car is currently available and can be delivered as soon as tomorrow morning.
          Please be aware that delivery times shown in this page are not definitive and may change due
          to bad weather conditions.
        </p>
      </main>
      <aside className={styles.aside}>
        <p className={styles.saveText}>If you like this car, click the button and save it in your collection of favourite items.</p>
        <Button className={styles.button} variant="primary">Save</Button>
      </aside>
    </div>
  </div>
}
