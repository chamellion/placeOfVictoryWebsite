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

  it('handles About dropdown menu', async () => {
    render(<Navbar />);
    
    // Find the desktop About button
    const mainNav = screen.getByRole('navigation', { name: 'Main navigation' });
    const aboutButton = within(mainNav).getByRole('button', { name: 'About' });
    
    // Click to open dropdown
    await userEvent.click(aboutButton);
    
    // Wait for state update and check expanded state
    await waitFor(() => {
      const menu = screen.getByRole('menu', { name: 'About desktop submenu' });
      expect(menu).toBeVisible();
    });
    
    // Check dropdown items
    const expectedItems = ['Who We Are', 'Leadership', 'Beliefs'];
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

  it('handles Ministry dropdown menu', async () => {
    render(<Navbar />);
    
    // Find the desktop Ministry button
    const mainNav = screen.getByRole('navigation', { name: 'Main navigation' });
    const ministryButton = within(mainNav).getByRole('button', { name: 'Ministry' });
    
    // Click to open dropdown
    await userEvent.click(ministryButton);
    
    // Wait for state update and check expanded state
    await waitFor(() => {
      const menu = screen.getByRole('menu', { name: 'Ministry desktop submenu' });
      expect(menu).toBeVisible();
    });
    
    // Check dropdown items
    const expectedItems = ['Service Times', 'Events', 'Community Outreach', 'Testimonies', 'Prayer Requests'];
    const menu = screen.getByRole('menu', { name: 'Ministry desktop submenu' });
    
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
    const aboutButton = within(mainNav).getByRole('button', { name: 'About' });
    const ministryButton = within(mainNav).getByRole('button', { name: 'Ministry' });
    
    // Check About button accessibility
    expect(aboutButton).toHaveAttribute('aria-haspopup', 'true');
    expect(aboutButton).toHaveAttribute('aria-expanded', 'false');
    expect(aboutButton).toHaveAttribute('aria-controls', 'dropdown-menu-1');
    
    // Check Ministry button accessibility
    expect(ministryButton).toHaveAttribute('aria-haspopup', 'true');
    expect(ministryButton).toHaveAttribute('aria-expanded', 'false');
    expect(ministryButton).toHaveAttribute('aria-controls', 'dropdown-menu-2');
  });

  it('is responsive across different screen sizes', async () => {
    const { rerender } = render(<Navbar />);
    
    // Test desktop view
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toHaveClass('lg:flex');
    expect(screen.getByRole('button', { name: 'Open mobile menu' })).toHaveClass('lg:hidden');
    
    // Test mobile view
    mockCommonScreenSize('mobile');
    rerender(<Navbar />);
    
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toHaveClass('hidden');
    expect(screen.getByRole('button', { name: 'Open mobile menu' })).toHaveClass('lg:hidden');
  });
}); 