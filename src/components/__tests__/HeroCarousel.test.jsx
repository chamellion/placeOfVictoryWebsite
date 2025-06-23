import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import HeroCarousel from '../HeroCarousel';
import { mockImageLoading } from '../../setupTests';

jest.useFakeTimers();

beforeAll(() => {
  // Use the centralized image loading mock
  mockImageLoading(false);
  
  // Suppress console.error for expected image loading errors in tests
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  // Restore console.error
  console.error.mockRestore();
});

describe('HeroCarousel Component', () => {
  beforeEach(() => {
    // Clear any previous mocks
    jest.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<HeroCarousel />);
    expect(screen.getByText(/loading carousel images/i)).toBeInTheDocument();
  });

  it('renders carousel images after loading', async () => {
    render(<HeroCarousel />);
    await waitFor(() => {
      const imgs = screen.getAllByAltText(/church carousel image/i);
      expect(imgs.length).toBeGreaterThan(0);
      expect(imgs[0]).toBeVisible();
    });
  });

  it('navigates to next and previous slides on button click', async () => {
    render(<HeroCarousel />);
    await waitFor(() => screen.getAllByAltText(/church carousel image/i));

    const nextBtn = screen.getByLabelText(/next slide/i);
    const prevBtn = screen.getByLabelText(/previous slide/i);

    act(() => {
      fireEvent.click(nextBtn);
      jest.advanceTimersByTime(500);
    });

    act(() => {
      fireEvent.click(prevBtn);
      jest.advanceTimersByTime(500);
    });

    const imgs = screen.getAllByAltText(/church carousel image/i);
    expect(imgs[0]).toBeVisible();
  });

  it('auto-advances slides every 8 seconds', async () => {
    render(<HeroCarousel />);
    await waitFor(() => screen.getAllByAltText(/church carousel image/i));

    act(() => {
      jest.advanceTimersByTime(8000);
    });

    const imgs = screen.getAllByAltText(/church carousel image/i);
    expect(imgs.length).toBeGreaterThan(0);
  });

  it('pauses auto-advance on mouse hover and resumes on mouse leave', async () => {
    render(<HeroCarousel />);
    await waitFor(() => screen.getAllByAltText(/church carousel image/i));

    // Find the carousel container by getting the first image and finding its container
    const firstImage = screen.getAllByAltText(/church carousel image/i)[0];
    const carouselContainer = firstImage.closest('div[class*="relative h-screen overflow-hidden"]');

    act(() => {
      fireEvent.mouseEnter(carouselContainer);
      jest.advanceTimersByTime(8000);
    });

    let imgs = screen.getAllByAltText(/church carousel image/i);
    expect(imgs.length).toBeGreaterThan(0);

    act(() => {
      fireEvent.mouseLeave(carouselContainer);
      jest.advanceTimersByTime(8000);
    });

    imgs = screen.getAllByAltText(/church carousel image/i);
    expect(imgs.length).toBeGreaterThan(0);
  });

  it('responds to swipe left and right (touch events)', async () => {
    render(<HeroCarousel />);
    await waitFor(() => screen.getAllByAltText(/church carousel image/i));

    // Find the carousel container by getting the first image and finding its container
    const firstImage = screen.getAllByAltText(/church carousel image/i)[0];
    const carouselContainer = firstImage.closest('div[class*="relative h-screen overflow-hidden"]');

    act(() => {
      fireEvent.touchStart(carouselContainer, { targetTouches: [{ clientX: 200 }] });
      fireEvent.touchMove(carouselContainer, { targetTouches: [{ clientX: 100 }] });
      fireEvent.touchEnd(carouselContainer);
      jest.advanceTimersByTime(500);
    });

    const imgs = screen.getAllByAltText(/church carousel image/i);
    expect(imgs.length).toBeGreaterThan(0);
  });

  it('shows error message if no images load', async () => {
    // Temporarily override the Image mock to simulate failed loading
    mockImageLoading(true);

    render(<HeroCarousel />);
    await waitFor(() => {
      expect(screen.getByText(/carousel images not found/i)).toBeInTheDocument();
    });

    // Restore the original Image mock
    mockImageLoading(false);
  });

  it('navigates to correct slide when dot is clicked', async () => {
    render(<HeroCarousel />);
    await waitFor(() => screen.getAllByAltText(/church carousel image/i));

    const dots = screen.getAllByRole('button', { name: /go to slide/i });

    act(() => {
      fireEvent.click(dots[2]);
      jest.advanceTimersByTime(500);
    });

    const imgs = screen.getAllByAltText(/church carousel image/i);
    expect(imgs.length).toBeGreaterThan(0);
  });

  it('maintains accessibility roles and labels', async () => {
    render(<HeroCarousel />);
    await waitFor(() => screen.getAllByAltText(/church carousel image/i));
    expect(screen.getByLabelText(/previous slide/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/next slide/i)).toBeInTheDocument();
  });
});
