import React, { useEffect } from 'react';
import './App.css';
import './theme.css';
import Home from './components/Home/Home';

// PUBLIC_INTERFACE
function App() {
  /**
   * App entry renders the Home screen for the food browsing app.
   * Applies Ocean Professional theme by default.
   */
  useEffect(() => {
    // Ensure we default to light/base theme colors
    document.documentElement.removeAttribute('data-theme');
  }, []);

  return (
    <div className="App" style={{ background: 'var(--background)' }}>
      <Home />
    </div>
  );
}

export default App;
