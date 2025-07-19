import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import HeroCarousel from '../HeroCarousel';
import { mockImageLoading } from '../../setupTests';

// Mock SWR
jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock Firebase client
jest.mock('../../lib/firebaseClient', () => ({
  getPublicCarouselSlides: jest.fn(),
}));

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
  const mockSlides = [
    {
      id: '1',
      imageUrl: '/media/carousel/church-worship.jpg',
      headline: 'Welcome to RCCG Place of Victory',
      subheadline: 'Join us in worship, community, and service',
      ctaText: 'Learn More',
      ctaLink: '/about'
    },
    {
      id: '2',
      imageUrl: '/media/carousel/church-community.jpg',
      headline: 'Building Community Together',
      subheadline: 'Growing in faith and fellowship',
      ctaText: 'Join Us',
      ctaLink: '/contact'
    }
  ];

  beforeEach(() => {
    // Clear any previous mocks
    jest.clearAllMocks();
    
    // Mock SWR to return slides
    const { default: useSWR } = require('swr');
    useSWR.mockReturnValue({
      data: mockSlides,
      isLoading: false,
      error: null
    });
  });

  it('renders loading state initially', () => {
    const { default: useSWR } = require('swr');
    useSWR.mockReturnValue({
      data: [],
      isLoading: true,
      error: null
    });

    render(<HeroCarousel />);
    expect(screen.getByText(/loading carousel/i)).toBeInTheDocument();
  });

  it('renders carousel slides after loading', async () => {
    render(<HeroCarousel />);
    await waitFor(() => {
      expect(screen.getByText('Welcome to RCCG Place of Victory')).toBeInTheDocument();
      expect(screen.getByText('Join us in worship, community, and service')).toBeInTheDocument();
    });
  });

  it('displays dynamic content from slides', async () => {
    render(<HeroCarousel />);
    
    await waitFor(() => {
      expect(screen.getByText('Welcome to RCCG Place of Victory')).toBeInTheDocument();
      expect(screen.getByText('Join us in worship, community, and service')).toBeInTheDocument();
      expect(screen.getByText('Learn More')).toBeInTheDocument();
    });
  });

  it('navigates to next and previous slides on button click', async () => {
    render(<HeroCarousel />);
    await waitFor(() => screen.getByText('Welcome to RCCG Place of Victory'));

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

    expect(screen.getByText('Welcome to RCCG Place of Victory')).toBeInTheDocument();
  });

  it('auto-advances slides every 8 seconds', async () => {
    render(<HeroCarousel />);
    await waitFor(() => screen.getByText('Welcome to RCCG Place of Victory'));

    act(() => {
      jest.advanceTimersByTime(8000);
    });

    expect(screen.getByText('Building Community Together')).toBeInTheDocument();
  });

  it('pauses auto-advance on mouse hover and resumes on mouse leave', async () => {
    render(<HeroCarousel />);
    await waitFor(() => screen.getByText('Welcome to RCCG Place of Victory'));

    // Find the carousel container
    const carouselContainer = screen.getByText('Welcome to RCCG Place of Victory').closest('div[class*="relative h-screen overflow-hidden"]');

    act(() => {
      fireEvent.mouseEnter(carouselContainer);
      jest.advanceTimersByTime(8000);
    });

    // Should still be on first slide due to pause
    expect(screen.getByText('Welcome to RCCG Place of Victory')).toBeInTheDocument();

    act(() => {
      fireEvent.mouseLeave(carouselContainer);
      jest.advanceTimersByTime(8000);
    });

    // Should advance to second slide after resume
    expect(screen.getByText('Building Community Together')).toBeInTheDocument();
  });

  it('responds to swipe left and right (touch events)', async () => {
    render(<HeroCarousel />);
    await waitFor(() => screen.getByText('Welcome to RCCG Place of Victory'));

    // Find the carousel container
    const carouselContainer = screen.getByText('Welcome to RCCG Place of Victory').closest('div[class*="relative h-screen overflow-hidden"]');

    act(() => {
      fireEvent.touchStart(carouselContainer, { targetTouches: [{ clientX: 200 }] });
      fireEvent.touchMove(carouselContainer, { targetTouches: [{ clientX: 100 }] });
      fireEvent.touchEnd(carouselContainer);
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByText('Building Community Together')).toBeInTheDocument();
  });

  it('shows error message if there is an error', async () => {
    const { default: useSWR } = require('swr');
    useSWR.mockReturnValue({
      data: [],
      isLoading: false,
      error: new Error('Failed to fetch slides')
    });

    render(<HeroCarousel />);
    await waitFor(() => {
      expect(screen.getByText(/unable to load carousel/i)).toBeInTheDocument();
    });
  });

  it('shows fallback content when no slides are available', async () => {
    const { default: useSWR } = require('swr');
    useSWR.mockReturnValue({
      data: [],
      isLoading: false,
      error: null
    });

    render(<HeroCarousel />);
    await waitFor(() => {
      expect(screen.getByText('Welcome to RCCG Place of Victory')).toBeInTheDocument();
      expect(screen.getByText('Join us in worship, community, and service as we grow together in faith.')).toBeInTheDocument();
    });
  });

  it('navigates to correct slide when dot is clicked', async () => {
    render(<HeroCarousel />);
    await waitFor(() => screen.getByText('Welcome to RCCG Place of Victory'));

    const dots = screen.getAllByRole('button', { name: /go to slide/i });

    act(() => {
      fireEvent.click(dots[1]); // Click second dot
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByText('Building Community Together')).toBeInTheDocument();
  });

  it('maintains accessibility roles and labels', async () => {
    render(<HeroCarousel />);
    await waitFor(() => screen.getByText('Welcome to RCCG Place of Victory'));
    expect(screen.getByLabelText(/previous slide/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/next slide/i)).toBeInTheDocument();
  });

  it('displays custom CTA buttons when provided in slide data', async () => {
    render(<HeroCarousel />);
    await waitFor(() => {
      expect(screen.getByText('Learn More')).toBeInTheDocument();
    });
  });
});
