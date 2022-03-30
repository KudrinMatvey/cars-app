import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Details } from '../Details';
import { getCar } from '../../api/requests';
import Mock = jest.Mock;

jest.mock('../..q/api/requests');
jest.mock('react-router-dom');

const carWithImg = {
  manufacturerName: 'bmw',
  modelName: '5er',
  pictureUrl: 'url',
};

const carWithoutImg = {
  manufacturerName: 'bmw',
  modelName: '5er',
};

describe('details page', () => {
  test('shows img placeholder at first, then show actual image on load successful', async () => {
    (getCar as Mock).mockReturnValue(Promise.resolve(carWithImg));
    (useParams as Mock).mockReturnValue({ id: 1 });
    render(<Details />);

    // make sure placeholder is on screen
    const imgPlaceholder = await screen.findByRole('img');
    expect(screen.getByText('bmw 5er')).toBeInTheDocument();
    expect(imgPlaceholder).toHaveClass('placeholder');

    // after loading no placeholder on screen only our img
    fireEvent.load(imgPlaceholder);
    expect(await screen.findByTestId('image')).not.toHaveClass('placeholder');
  });

  test('hide image if no url', async () => {
    (getCar as Mock).mockReturnValue(Promise.resolve(carWithoutImg));
    (useParams as Mock).mockReturnValue({ id: 1 });
    render(<Details />);
    const imgPlaceholder = await screen.findByRole('img');
    fireEvent.load(imgPlaceholder);
    expect(screen.queryByRole('img')).toBeNull();
  });

  test('hide image if errored', async () => {
    (getCar as Mock).mockReturnValue(Promise.resolve(carWithImg));
    (useParams as Mock).mockReturnValue({ id: 1 });
    render(<Details />);
    const imgPlaceholder = await screen.findByRole('img');
    fireEvent.error(imgPlaceholder);
    expect(screen.queryByRole('img')).toBeNull();
  });
});
