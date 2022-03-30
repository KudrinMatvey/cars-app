import { useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getCars, getColors, getManufacturers } from '../api/requests';
import { Manufacturer } from '../types/manufacturer';
import { CarsPage } from '../types/cars-page';
import styles from './Home.module.scss';
import { List } from './List';
import { Filters } from './Filters';
import { Filter } from '../types/filter';
import { Pagination } from './Pagination';

const initialPageData = { cars: new Array(10).fill(null) };

export function Home() {
  const [data, setData] = useState<CarsPage>(initialPageData);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedColor = searchParams.get('color') || undefined;
  const selectedManufacturer = searchParams.get('manufacturer') || undefined;
  const page = parseInt(searchParams.get('page') as string, 10) || 1;
  const [manufacturers, setManufactures] = useState<Manufacturer[]>(selectedManufacturer
    ? [{ name: selectedManufacturer, models: [] }]
    : []);
  const [colors, setColors] = useState<string[]>(selectedColor ? [selectedColor] : []);

  useEffect(() => {
    setData(initialPageData);
    getCars({
      color: selectedColor,
      page: String(page),
      manufacturer: selectedManufacturer,
    }).then(setData);
  }, [selectedColor, selectedManufacturer, page]);
  useEffect(() => { getColors().then(setColors); }, []);
  useEffect(() => { getManufacturers().then(setManufactures); }, []);
  const loaded = !!data.cars[0];

  const submitFilters = (val: {[key in Filter]?: string }) => {
    if (val.color) {
      searchParams.set(Filter.COLOR, val.color);
    } else {
      searchParams.delete(Filter.COLOR);
    }
    if (val.manufacturer) {
      searchParams.set(Filter.MANUFACTURER, val.manufacturer);
    } else {
      searchParams.delete(Filter.MANUFACTURER);
    }
    searchParams.set('page', String(1));
    setSearchParams(searchParams);
  };

  const jumpToPage = (number = 1) => {
    searchParams.set('page', String(number));
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.page}>
      <aside className={styles.filters}>
        <Filters
          colors={colors}
          manufacturers={manufacturers}
          onSubmit={submitFilters}
          selectedColor={selectedColor}
          selectedManufacturer={selectedManufacturer}
        />
      </aside>
      <main className={styles.main}>
        <List cars={data.cars} loaded={loaded} totalCarsCount={data.totalCarsCount} />
        <Pagination page={page} totalAmount={data.totalPageCount} jumpToPage={jumpToPage} />
      </main>
    </div>
  );
}
