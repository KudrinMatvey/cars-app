import {render, screen} from "@testing-library/react";
import {Card} from "./Card";
import {Car} from "../interfaces/car";
import {formatDetailsString} from "../utils/format-details-string";
import {MemoryRouter} from "react-router-dom";

const placeholderClass = 'placeholder';

describe('card component', () => {
  test('shows 4 placeholders if car is null', () => {
    render(<Card car={null}/>);
    expect(screen.getByRole('img')).toHaveClass(placeholderClass);
    expect(screen.getByTestId('model')).toHaveClass(placeholderClass);
    expect(screen.getByTestId('details')).toHaveClass(placeholderClass);
    expect(screen.getByTestId('link')).toHaveClass(placeholderClass);
  })

  test('shows data if a car is passed', () => {
    const car: Car = {
      color: "yellow",
      fuelType: 'Diesel',
      manufacturerName: "Skoda",
      mileage: {number: 100000, unit: "mi"},
      modelName: "Octavia",
      pictureUrl: "imgUrl",
      stockNumber: 0
    };
    render(<MemoryRouter><Card car={car}/></MemoryRouter>);
    expect(screen.getByRole('img')).toHaveAttribute('src', 'imgUrl');
    expect(screen.getByText('Skoda Octavia')).toBeInTheDocument();
    expect(screen.getByText(formatDetailsString(car))).toBeInTheDocument();
    expect(screen.getByText('View details')).toHaveAttribute('href', `/cars/${car.stockNumber}`);
  })
})