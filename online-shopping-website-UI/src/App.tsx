import React from 'react';
import { ScrollProgress } from './components/ScrollProgress';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { Features } from './components/Features';
import { Newsletter } from './components/Newsletter';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ScrollProgress />
      <Hero />
      <Features />
      <Products />
      <Newsletter />
    </div>
  );
}

export default App;