import { Button, Form } from 'react-bootstrap';
import { FormEvent } from 'react';
import styles from './Filters.module.scss';
import { Filter } from '../types/filter';
import { Manufacturer } from '../types/manufacturer';

interface Props {
  colors: string[],
  manufacturers: Manufacturer[],
  onSubmit: (val: {[key in Filter]?: string }) => void,
  selectedColor?: string,
  selectedManufacturer?: string,
}

interface FiltersForm extends HTMLFormElement {
  [Filter.COLOR]: HTMLSelectElement,
  [Filter.MANUFACTURER]: HTMLSelectElement,
}

export function Filters({
  onSubmit, colors, manufacturers, selectedColor, selectedManufacturer,
}: Props) {
  const submitForm = (event: FormEvent<FiltersForm>) => {
    event.preventDefault();
    const { currentTarget } = event;
    const filters: {[key in Filter]?: string } = {};
    const handleValue = (filter: Filter, items: string[]): void => {
      const val = items.find((item) => item === currentTarget[filter].value);
      if (val) {
        filters[filter] = val;
      }
    };
    handleValue(Filter.MANUFACTURER, manufacturers.map(({ name }) => name));
    handleValue(Filter.COLOR, colors);
    onSubmit(filters);
  };

  return (
    <Form onSubmit={submitForm}>
      <Form.Group className={styles.filter} controlId={Filter.COLOR}>
        <Form.Label className={styles.label}>Color</Form.Label>
        <Form.Select defaultValue={selectedColor}>
          <option>All colors</option>
          {colors.map((color) => <option value={color} key={color}>{color}</option>)}
        </Form.Select>
      </Form.Group>

      <Form.Group className={styles.filter} controlId={Filter.MANUFACTURER}>
        <Form.Label className={styles.label}>Manufacturer</Form.Label>
        <Form.Select defaultValue={selectedManufacturer}>
          <option>All manufacturers</option>
          {manufacturers.map(({ name }) => <option value={name} key={name}>{name}</option>)}
        </Form.Select>
      </Form.Group>

      <Button className={styles.button} variant="primary" type="submit">
        Filter
      </Button>
    </Form>
  );
}
