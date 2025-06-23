import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Simple regression test for app shell
// This test verifies that the app renders without crashing
// and that the basic structure is present

describe('App regression', () => {
  it('renders without crashing and shows basic app structure', () => {
    // This will render the app with the router mock
    // We can still verify that the app doesn't crash
    render(<App />);
    
    // Check that the app renders something (the router div from our mock)
    expect(screen.getByTestId('router')).toBeInTheDocument();
    
    // This is a basic smoke test - if the app crashes, this test will fail
    // If we want more comprehensive testing, we'd need to set up proper router testing
  });
});
