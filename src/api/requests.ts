import {Car} from "../interfaces/car";
import {Manufacturer} from "../interfaces/manufacturer";
import {CarsPage} from "../interfaces/cars-page";

export function getCar(stockNumber: number): Promise<Car> {
  return fetch(`https://auto1-mock-server.herokuapp.com/api//cars/${stockNumber}`)
    .then(res => res.json())
    .then(({car}) => car)
}

export function getCars(): Promise<CarsPage> {
  return fetch('https://auto1-mock-server.herokuapp.com/api/cars')
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