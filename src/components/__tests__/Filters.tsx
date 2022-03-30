import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Filters } from '../Filters';

const mockColorOptions = ['Yellow', 'Pink'];
const mockManufacturerOptions = [{ name: 'Porsche', models: [] }, { name: 'Audi', models: [] }];

describe('filters', () => {
  it('should propery fire submit event', async () => {
    const onSubmit = jest.fn();
    render(<Filters colors={mockColorOptions} manufacturers={mockManufacturerOptions} onSubmit={onSubmit} />);

    // no filters should be selected
    expect(screen.getByTestId('select-manufacturer')).toHaveValue('All manufacturers');
    expect(screen.getByTestId('select-color')).toHaveValue('All colors');

    // select only manufacturer
    userEvent.selectOptions(
      screen.getByTestId('select-manufacturer'),
      screen.getByText(mockManufacturerOptions[0].name),
    );
    userEvent.click(screen.getByRole('button'));
    expect(onSubmit).toHaveBeenCalledWith({ manufacturer: mockManufacturerOptions[0].name });

    // also select color
    userEvent.selectOptions(
      screen.getByTestId('select-color'),
      screen.getByText(mockColorOptions[0]),
    );
    userEvent.click(screen.getByRole('button'));
    expect(onSubmit).toHaveBeenCalledWith({
      manufacturer: mockManufacturerOptions[0].name,
      color: mockColorOptions[0],
    });
    expect(screen.getByTestId('form'));
  });

  it('should properly preselect values if they are passed', async () => {
    const onSubmit = jest.fn();
    render(
      <Filters
        colors={mockColorOptions}
        manufacturers={mockManufacturerOptions}
        onSubmit={onSubmit}
        selectedManufacturer={mockManufacturerOptions[0].name}
        selectedColor={mockColorOptions[1]}
      />,
    );

    expect(screen.getByTestId('select-manufacturer')).toHaveValue(mockManufacturerOptions[0].name);
    expect(screen.getByTestId('select-color')).toHaveValue(mockColorOptions[1]);
  });
});
