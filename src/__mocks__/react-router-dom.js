import React from 'react';

export const Link = ({ children, to, ...props }) => (
  <a href={to} {...props}>{children}</a>
);

export const useLocation = () => ({
  pathname: '/',
  search: '',
  hash: '',
  state: null,
});

export const BrowserRouter = ({ children }) => (
  <div data-testid="router">{children}</div>
);

export const Routes = ({ children }) => <div>{children}</div>;
export const Route = ({ children }) => <div>{children}</div>; 