import {useSearchParams} from "react-router-dom";
import React, {FormEvent, useEffect, useState} from "react";
import {getCars, getColors, getManufacturers} from "../api/requests";
import {Manufacturer} from "../interfaces/manufacturer";
import {CarsPage} from "../interfaces/cars-page";
import {Button, Form} from "react-bootstrap";
import {Card} from "./Card";
import styles from './List.module.scss'

enum Filter {
  COLOR = 'color',
  MANUFACTURER = 'manufacturer',
}

interface FiltersForm extends HTMLFormElement{
  [Filter.COLOR]: HTMLSelectElement,
  [Filter.MANUFACTURER]: HTMLSelectElement,
}

const initialPageData = {cars: new Array(10).fill(null)};

//todo rename variables
export function List() {
  const [page, setPage] = useState<CarsPage>(initialPageData);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedColor = searchParams.get('color') || undefined;
  const selectedManufacturer = searchParams.get('manufacturer') || undefined;
  const [manufacturers, setManufactures] = useState<Manufacturer[]>(selectedManufacturer ?
    [{name: selectedManufacturer, models: []}] :
    []
  );
  const [colors, setColors] = useState<string[]>(selectedColor ? [selectedColor] : []);

  useEffect(() => {
    setPage((_page) => ({..._page, ...initialPageData}));
    getCars({
    color: selectedColor,
    page: pageNumber,
    manufacturer: selectedManufacturer
  }).then(setPage)},[selectedColor, selectedManufacturer, pageNumber]);
  useEffect(() => {getColors().then(setColors)},[]);
  useEffect(() => {getManufacturers().then(setManufactures)},[]);

  const submitForm = (event: FormEvent<FiltersForm>) => {
    event.preventDefault();
    const {currentTarget} = event;
    const handleValue = (filter: Filter, items: string[]) => {
      const val = items.find(item => item === currentTarget[filter].value);
      if(!val) {
        return searchParams.delete(filter);
      }
      searchParams.set(filter, val);
    };
    handleValue(Filter.MANUFACTURER, manufacturers.map(({name}) => name));
    handleValue(Filter.COLOR, colors);
    setSearchParams(searchParams);
  };

  return <div className={styles.page}>
    <aside className={styles.filters}>
      <Form onSubmit={submitForm}>
        <Form.Group className={styles.filter} controlId={Filter.COLOR}>
          <Form.Label className={styles.label}>Color</Form.Label>
          <Form.Select aria-label="Select color" defaultValue={selectedColor}>
            <option>All colors</option>
            {colors.map(color => <option value={color} key={color}>{color}</option> )}
          </Form.Select>
        </Form.Group>

        <Form.Group className={styles.filter} controlId={Filter.MANUFACTURER}>
          <Form.Label className={styles.label}>Manufacturer</Form.Label>
          <Form.Select aria-label="Select manufacturer" defaultValue={selectedManufacturer}>
            <option>All manufacturers</option>
            {manufacturers.map(({name}) => <option value={name} key={name}>{name}</option> )}
          </Form.Select>
        </Form.Group>

        <Button className={styles.button} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </aside>
    <main className={styles.main}>
      <h3>
        Available cars
      </h3>
      <div>
        Showing 10 of 100 results
      </div>
      <ul>
        {page.cars.map((car, index) =>
          <li key={car ? car.stockNumber : index}>
            <Card car={car}/>
          </li>)}
      </ul>
    </main>
  </div>
}
