export interface Car {
  stockNumber: number;
  manufacturerName: string;
  modelName: string;
  mileage: {
    number: number;
    unit: 'km' | 'mi';
  };
  fuelType: 'Diesel' | 'Petrol';
  color: string;
  pictureUrl: string;
}
