import { Car } from './car';

export interface CarsPage {
  cars: Car[],
  totalPageCount?: number,
  totalCarsCount?: number,
}
