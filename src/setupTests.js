// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';

// Mock image loading
export const mockImageLoading = (shouldFail = false) => {
  if (shouldFail) {
    global.Image = class {
      constructor() {
        setTimeout(() => {
          if (this.onerror) this.onerror();
        }, 0);
      }
      set src(value) {
        this._src = value;
      }
      get src() {
        return this._src;
      }
    };
  } else {
    global.Image = class {
      constructor() {
        setTimeout(() => {
          if (this.onload) {
            this.width = 1920;
            this.height = 1080;
            this.complete = true;
            this.naturalWidth = 1920;
            this.naturalHeight = 1080;
            this.onload();
          }
        }, 0);
      }
      set src(value) {
        this._src = value;
      }
      get src() {
        return this._src;
      }
    };
  }
};

// Mock screen size utilities
export const mockCommonScreenSize = (size) => {
  const sizes = {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 },
  };

  const { width, height } = sizes[size] || sizes.desktop;
  
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });

  // Trigger resize event
  window.dispatchEvent(new Event('resize'));
};

// Basic render function for components that don't need router
export const renderWithProviders = (ui, options = {}) => {
  return render(ui, options);
};
