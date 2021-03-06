import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button, Placeholder } from 'react-bootstrap';
import { getCar } from '../api/requests';
import { Car } from '../types/car';
import { formatDetailsString } from '../utils/format-details-string';
import styles from './Details.module.scss';

export function Details() {
  const params = useParams<'id'>();
  const navigate = useNavigate();
  const id = parseInt(params.id as string, 10);
  const [car, setCar] = useState<Car>();
  const [imgStatus, setImgStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  useEffect(() => {
    getCar(id)
      .then(setCar)
      .catch(() => navigate('/not-found', { replace: true }));
  }, [id, navigate]);

  const showImage = car?.pictureUrl && imgStatus === 'loaded';
  const showImagePlaceholder = imgStatus === 'loading';
  return (
    <div className={styles.pageWrapper}>
      {showImagePlaceholder && (
      <Placeholder
        as="img"
        className={styles.img}
        src={car?.pictureUrl}
        alt=""
        onLoad={() => setImgStatus('loaded')}
        onError={() => setImgStatus('error')}
      />
      )}
      {showImage && <img data-testid="image" className={styles.img} src={car.pictureUrl} alt="" />}

      <div className={styles.contentWrapper}>
        <main className={styles.main}>
          {car ? (
            <h3 className={styles.title}>
              {car.manufacturerName}
              {' '}
              {car.modelName}
            </h3>
          ) : <Placeholder as="h3" />}
          <div className={styles.details}>{formatDetailsString(car)}</div>
          <p className={styles.deliveryText}>
            This car is currently available and can be delivered as soon as tomorrow morning.
            Please be aware that delivery times shown in this page are not definitive and may change due
            to bad weather conditions.
          </p>
        </main>
        <aside className={styles.aside}>
          <p className={styles.saveText}>
            If you like this car, click the button and save it in your collection of favourite items.
          </p>
          <Button className={styles.button} variant="primary">Save</Button>
        </aside>
      </div>
    </div>
  );
}
