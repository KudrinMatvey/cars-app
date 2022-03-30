import {render, screen} from '@testing-library/react';
import {Card} from './Card';

const placeholderClass = 'placeholder';

// todo: обновление страницы - выбираются нужные фильтры и нужная страница

describe('card component', () => {
  test('shows 4 placeholders if car is null', () => {
    render(<Card car={null} />);
    expect(screen.getByTestId('placeholder')).toBeInTheDocument();
  });
});
