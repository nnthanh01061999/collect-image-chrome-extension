import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect';

test('renders learn react link', async () => {
    render(<App />);

    const linkElement = screen.getByText(/Image/i);

    expect(linkElement).toBeInTheDocument();
});
