import {Car} from "../interfaces/car";
import {Manufacturer} from "../interfaces/manufacturer";
import {CarsPage} from "../interfaces/cars-page";
import {FilterQuery} from "../interfaces/filter-query";
import {omitUndefined} from "../utils/omit-undefined";

export function getCar(stockNumber: number): Promise<Car> {
  return fetch(`https://auto1-mock-server.herokuapp.com/api/cars/${stockNumber}`)
    .then(res => res.json())
    .then(({car}) => car)
}

export function getCars(filters: FilterQuery): Promise<CarsPage> {
  const url = new URL('https://auto1-mock-server.herokuapp.com/api/cars');
  url.search = new URLSearchParams(omitUndefined(filters)).toString();
  return fetch(url.toString())
    .then(res => res.json())
}

export function getColors(): Promise<string[]> {
  return fetch('https://auto1-mock-server.herokuapp.com/api/colors')
    .then(res => res.json())
    .then(({colors}) => colors)
}

export function getManufacturers(): Promise<Manufacturer[]> {
  return fetch('https://auto1-mock-server.herokuapp.com/api/manufacturers')
    .then(res => res.json())
    .then(({manufacturers}) => manufacturers)
}