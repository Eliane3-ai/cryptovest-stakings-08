
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add performance measurement
const startTime = performance.now();

// Add error handling
const renderApp = () => {
  try {
    console.log('Initializing application...');
    const rootElement = document.getElementById("root");
    
    if (!rootElement) {
      console.error('Root element not found in the DOM');
      return;
    }
    
    // Create root and render with optimization flags
    const root = createRoot(rootElement, {
      onRecoverableError: (err) => {
        console.warn('Recoverable error:', err);
      }
    });
    
    console.log('Rendering App component...');
    root.render(<App />);
    
    // Log performance metrics
    const loadTime = performance.now() - startTime;
    console.log(`App rendered successfully in ${loadTime.toFixed(2)}ms`);
  } catch (error) {
    console.error('Fatal error during application initialization:', error);
    
    // Display a fallback UI when the app fails to load
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 20px; text-align: center; font-family: sans-serif;">
          <h2>Application Error</h2>
          <p>We're sorry, but the application failed to load. Please try refreshing the page.</p>
          <button onclick="window.location.reload()" style="padding: 8px 16px; margin-top: 20px;">
            Refresh Page
          </button>
        </div>
      `;
    }
  }
};

// Preload critical resources
if ('requestIdleCallback' in window) {
  // Use requestIdleCallback to defer non-critical initialization
  window.requestIdleCallback(() => {
    console.log('Running deferred initialization...');
  });
}

// Execute app rendering
renderApp();
