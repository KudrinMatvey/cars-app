import { useSearchParams } from 'react-router-dom';
import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getCars, getColors, getManufacturers } from '../api/requests';
import { Manufacturer } from '../types/manufacturer';
import { CarsPage } from '../types/cars-page';
import styles from './Home.module.scss';
import { Filter } from '../types/filter';
import { List } from './List';

interface FiltersForm extends HTMLFormElement {
  [Filter.COLOR]: HTMLSelectElement,
  [Filter.MANUFACTURER]: HTMLSelectElement,
}

const initialPageData = { cars: new Array(10).fill(null) };
// todo test if a new filter is performaed - page should reset
// todo rename variables
// extract components

export function Home() {
  const [page, setPage] = useState<CarsPage>(initialPageData);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedColor = searchParams.get('color') || undefined;
  const selectedManufacturer = searchParams.get('manufacturer') || undefined;
  const pageNumber = parseInt(searchParams.get('page') as string, 10) || 1;
  const [manufacturers, setManufactures] = useState<Manufacturer[]>(selectedManufacturer
    ? [{ name: selectedManufacturer, models: [] }]
    : []);
  const [colors, setColors] = useState<string[]>(selectedColor ? [selectedColor] : []);

  useEffect(() => {
    setPage((_page) => ({ ..._page, ...initialPageData }));
    getCars({
      color: selectedColor,
      page: String(pageNumber),
      manufacturer: selectedManufacturer,
    }).then(setPage);
  }, [selectedColor, selectedManufacturer, pageNumber]);
  useEffect(() => { getColors().then(setColors); }, []);
  useEffect(() => { getManufacturers().then(setManufactures); }, []);
  const loaded = !!page.cars[0];

  const submitForm = (event: FormEvent<FiltersForm>) => {
    event.preventDefault();
    const { currentTarget } = event;
    const handleValue = (filter: Filter, items: string[]): void => {
      const val = items.find((item) => item === currentTarget[filter].value);
      if (!val) {
        return searchParams.delete(filter);
      }
      return searchParams.set(filter, val);
    };
    handleValue(Filter.MANUFACTURER, manufacturers.map(({ name }) => name));
    handleValue(Filter.COLOR, colors);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const jumpToPage = (number = 1) => {
    searchParams.set('page', String(number));
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.page}>
      <aside className={styles.filters}>
        <Form onSubmit={submitForm}>
          <Form.Group className={styles.filter} controlId={Filter.COLOR}>
            <Form.Label className={styles.label}>Color</Form.Label>
            <Form.Select aria-label="Select color" defaultValue={selectedColor}>
              <option>All colors</option>
              {colors.map((color) => <option value={color} key={color}>{color}</option>)}
            </Form.Select>
          </Form.Group>

          <Form.Group className={styles.filter} controlId={Filter.MANUFACTURER}>
            <Form.Label className={styles.label}>Manufacturer</Form.Label>
            <Form.Select aria-label="Select manufacturer" defaultValue={selectedManufacturer}>
              <option>All manufacturers</option>
              {manufacturers.map(({ name }) => <option value={name} key={name}>{name}</option>)}
            </Form.Select>
          </Form.Group>

          <Button className={styles.filterButton} variant="primary" type="submit">
            Filter
          </Button>
        </Form>
      </aside>
      <main className={styles.main}>
        <List cars={page.cars} loaded={loaded} totalCarsCount={page.totalCarsCount} />
        {/* todo: place it in another component + have classnames in consts + fix initial Page 1 of */}
        <div className={styles.pageControl}>
          <Button
            className={pageNumber === 1 ? styles.buttonHidden : styles.button}
            onClick={() => jumpToPage()}
            variant="link"
          >
            First
          </Button>
          <Button
            className={pageNumber === 1 ? styles.buttonHidden : styles.button}
            onClick={() => jumpToPage(pageNumber - 1)}
            variant="link"
          >
            Previous
          </Button>
          <span>
            Page
            {' '}
            {pageNumber}
            {' '}
            {page.totalPageCount ? `of ${page.totalPageCount}` : ''}
          </span>
          <Button
            className={pageNumber === page.totalPageCount || !page.totalPageCount ? styles.buttonHidden : styles.button}
            onClick={() => jumpToPage(pageNumber + 1)}
            variant="link"
          >
            Next
          </Button>
          <Button
            className={pageNumber === page.totalPageCount || !page.totalPageCount ? styles.buttonHidden : styles.button}
            onClick={() => jumpToPage(page.totalPageCount)}
            variant="link"
          >
            Last
          </Button>
        </div>
      </main>
    </div>
  );
}
