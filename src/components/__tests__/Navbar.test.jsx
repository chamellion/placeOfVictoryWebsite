import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { mockCommonScreenSize } from '../../setupTests';
import Navbar from '../Navbar';

describe('Navbar', () => {
  beforeEach(() => {
    mockCommonScreenSize('desktop');
  });

  it('renders without crashing', () => {
    render(<Navbar />);
    expect(screen.getByRole('banner', { name: 'Site header' })).toBeInTheDocument();
  });

  it('handles mobile menu functionality', async () => {
    mockCommonScreenSize('mobile');
    render(<Navbar />);
    
    // Open menu
    const openButton = screen.getByRole('button', { name: 'Open mobile menu' });
    await userEvent.click(openButton);
    
    // Menu should be visible
    const mobileMenu = screen.getByRole('dialog', { name: 'Mobile navigation menu' });
    expect(mobileMenu).toHaveClass('opacity-100');
    expect(mobileMenu).toHaveClass('visible');
    
    // Close menu using the button in the mobile menu
    const closeButton = within(mobileMenu).getByRole('button', { name: 'Close mobile menu' });
    await userEvent.click(closeButton);
    
    // Menu should be closed
    expect(mobileMenu).toHaveClass('opacity-0');
    expect(mobileMenu).toHaveClass('invisible');
  });

  it('handles dropdown menus', async () => {
    render(<Navbar />);
    
    // Find the desktop About button
    const mainNav = screen.getByRole('navigation', { name: 'Main navigation' });
    const desktopButton = within(mainNav).getByRole('button', { name: /about/i });
    
    // Click to open dropdown
    await userEvent.click(desktopButton);
    
    // Wait for state update and check expanded state
    await waitFor(() => {
      const menu = screen.getByRole('menu', { name: 'About desktop submenu' });
      expect(menu).toBeVisible();
    });
    
    // Check dropdown items
    const expectedItems = ['Our History', 'Leadership', 'Our Beliefs'];
    const menu = screen.getByRole('menu', { name: 'About desktop submenu' });
    
    expectedItems.forEach(item => {
      const menuItem = within(menu).getByRole('menuitem', { name: item });
      expect(menuItem).toBeInTheDocument();
    });
    
    // Click outside to close
    await userEvent.click(document.body);
    
    // Wait for state update
    await waitFor(() => {
      expect(menu).toHaveClass('pointer-events-none');
    });
  });

  it('maintains accessibility features', () => {
    render(<Navbar />);
    
    // Check header
    expect(screen.getByRole('banner', { name: 'Site header' })).toBeInTheDocument();
    
    // Check navigation roles
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    
    // Check mobile menu button
    const mobileButton = screen.getByRole('button', { name: 'Open mobile menu' });
    expect(mobileButton).toHaveAttribute('aria-controls', 'mobile-menu');
    expect(mobileButton).toHaveAttribute('aria-expanded', 'false');
    
    // Check dropdown buttons
    const mainNav = screen.getByRole('navigation', { name: 'Main navigation' });
    const buttons = screen.getAllByRole('button', { name: /About|Worship & Events/ });
    const desktopButtons = buttons.filter(button => 
      button.closest('[role="navigation"]') === mainNav
    );
    
    desktopButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-haspopup', 'true');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-controls');
    });
  });

  it('is responsive across different screen sizes', async () => {
    const { rerender } = render(<Navbar />);
    
    // Test desktop view
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toHaveClass('md:flex');
    expect(screen.getByRole('button', { name: 'Open mobile menu' })).toHaveClass('md:hidden');
    
    // Test mobile view
    mockCommonScreenSize('mobile');
    rerender(<Navbar />);
    
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toHaveClass('hidden');
    expect(screen.getByRole('button', { name: 'Open mobile menu' })).toHaveClass('md:hidden');
  });
}); 