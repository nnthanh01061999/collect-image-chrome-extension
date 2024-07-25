import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renders learn react link', () => {
    jest.spyOn(chrome.tabs, 'query').mockResolvedValue([]);
    render(<App />);
    const linkElement = screen.getByText(/Image/i);
    expect(linkElement).toBeInTheDocument();
});
