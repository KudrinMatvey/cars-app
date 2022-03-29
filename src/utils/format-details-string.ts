import {Car} from "../interfaces/car";
import {capitalize} from "./capitalize";

/**
 * @param car
 * @return string that contains cars details, like `Stock # 10067 - 189,228 KM - Diesel - Red`
 */
export function formatDetailsString(car: Car): string {
  return [
    `Stock # ${car.stockNumber}`,
    car.mileage ? `${car.mileage.number.toLocaleString('en-GB')} ${car.mileage.unit.toUpperCase()}` : '',
    car.fuelType,
    capitalize(car.color)
  ]
    .filter(Boolean)
    .join(' - ')
}