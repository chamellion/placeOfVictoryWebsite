import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FlipCard from '../FlipCard';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, whileHover, onHoverStart, onHoverEnd, ...props }) => (
      <div {...props}>{children}</div>
    )
  }
}));

// Mock window resize event
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
});

describe('FlipCard', () => {
  const defaultProps = {
    name: 'Jeffrey Nsofor',
    role: 'Lead Pastor',
    bio: 'Jeffrey oversees our spiritual direction and leads with wisdom and humility.',
    imageUrl: '/images/leaders/jeffrey_nsofor.jpg'
  };

  beforeEach(() => {
    // Reset window width to desktop
    window.innerWidth = 1024;
  });

  test('renders with all props', () => {
    render(<FlipCard {...defaultProps} />);
    
    // Check that name appears
    const nameElements = screen.getAllByText('Jeffrey Nsofor');
    expect(nameElements.length).toBeGreaterThan(0);
    
    // Check that role appears
    const roleElements = screen.getAllByText('Lead Pastor');
    expect(roleElements.length).toBeGreaterThan(0);
    
    // Check that bio appears
    expect(screen.getByText('Jeffrey oversees our spiritual direction and leads with wisdom and humility.')).toBeInTheDocument();
    
    // Check that image exists
    const images = screen.getAllByAltText('Jeffrey Nsofor');
    expect(images.length).toBeGreaterThan(0);
  });

  test('renders without bio', () => {
    const propsWithoutBio = { ...defaultProps };
    delete propsWithoutBio.bio;
    
    render(<FlipCard {...propsWithoutBio} />);
    
    // Check that name appears
    const nameElements = screen.getAllByText('Jeffrey Nsofor');
    expect(nameElements.length).toBeGreaterThan(0);
    
    // Check that role appears
    const roleElements = screen.getAllByText('Lead Pastor');
    expect(roleElements.length).toBeGreaterThan(0);
    
    // Bio should not appear
    expect(screen.queryByText('Jeffrey oversees our spiritual direction and leads with wisdom and humility.')).not.toBeInTheDocument();
  });

  test('handles image loading error gracefully', () => {
    render(<FlipCard {...defaultProps} />);
    
    const images = screen.getAllByAltText('Jeffrey Nsofor');
    expect(images.length).toBeGreaterThan(0);
    
    // Simulate image load error on first image
    images[0].dispatchEvent(new Event('error'));
    
    // Should still render the card content
    const nameElements = screen.getAllByText('Jeffrey Nsofor');
    expect(nameElements.length).toBeGreaterThan(0);
    const roleElements = screen.getAllByText('Lead Pastor');
    expect(roleElements.length).toBeGreaterThan(0);
  });

  test('shows mobile layout on mobile screen', () => {
    window.innerWidth = 375;
    render(<FlipCard {...defaultProps} />);
    
    // Should show mobile button
    expect(screen.getByText('Read Bio')).toBeInTheDocument();
  });

  test('handles mobile flip on button click', () => {
    window.innerWidth = 375;
    render(<FlipCard {...defaultProps} />);
    
    const flipButton = screen.getByText('Read Bio');
    fireEvent.click(flipButton);
    
    // Should show "Hide Bio" button after flip
    expect(screen.getByText('Hide Bio')).toBeInTheDocument();
  });

  test('handles keyboard navigation on mobile', () => {
    window.innerWidth = 375;
    render(<FlipCard {...defaultProps} />);
    
    // Get the main container (first button with role="button")
    const containers = screen.getAllByRole('button');
    const mainContainer = containers[0]; // The main flip container
    
    fireEvent.keyDown(mainContainer, { key: 'Enter' });
    
    // Should show "Hide Bio" button after keyboard flip
    expect(screen.getByText('Hide Bio')).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    render(<FlipCard {...defaultProps} />);
    
    const containers = screen.getAllByRole('button');
    const mainContainer = containers[0]; // The main flip container
    expect(mainContainer).toHaveAttribute('aria-label', 'Flip card for Jeffrey Nsofor');
  });
}); 