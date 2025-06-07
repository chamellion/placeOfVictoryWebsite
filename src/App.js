import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Sermons from './pages/Sermons';
import Events from './pages/Events';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          } 
        />
        <Route 
          path="/about" 
          element={
            <MainLayout>
              <About />
            </MainLayout>
          } 
        />
        <Route 
          path="/about/history" 
          element={
            <MainLayout>
              <About section="history" />
            </MainLayout>
          } 
        />
        <Route 
          path="/about/leadership" 
          element={
            <MainLayout>
              <About section="leadership" />
            </MainLayout>
          } 
        />
        <Route 
          path="/about/beliefs" 
          element={
            <MainLayout>
              <About section="beliefs" />
            </MainLayout>
          } 
        />
        <Route 
          path="/about/services" 
          element={
            <MainLayout>
              <About section="services" />
            </MainLayout>
          } 
        />
        <Route 
          path="/sermons" 
          element={
            <MainLayout>
              <Sermons />
            </MainLayout>
          } 
        />
        <Route 
          path="/events" 
          element={
            <MainLayout>
              <Events />
            </MainLayout>
          } 
        />
        <Route 
          path="/contact" 
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
