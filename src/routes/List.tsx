import {useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {getCars, getColors, getManufacturers} from "../api/requests";
import {Car} from "../interfaces/car";
import {Manufacturer} from "../interfaces/manufacturer";
import {CarsPage} from "../interfaces/cars-page";

function Card(props: Car) {
  return <div>{JSON.stringify(props)}</div>
}

export function List() {
  const [page, setPage] = useState<CarsPage>({cars: new Array(10).fill(null)});
  const [manufacturers, setManufactures] = useState<Manufacturer[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {getCars().then(setPage)},[])
  useEffect(() => {getColors().then(setColors)},[])
  useEffect(() => {getManufacturers().then(setManufactures)},[])

  return <>
    <main>
      <h3>
        Available cars
      </h3>
      <div>
        Showing 10 of 100 results
      </div>
      <ul>
        {page.cars.map((car, index) =>
          <li key={car.stockNumber || index}>
            <Card car={car}/>
          </li>)}
      </ul>
    </main>
  </>
}
