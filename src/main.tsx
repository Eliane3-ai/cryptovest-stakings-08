
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Add performance measurement
const startTime = performance.now();

// Preload critical resources
const preloadCriticalResources = () => {
  // Preload important stylesheets, fonts or scripts
  const resources = [
    { type: 'style', href: '/src/index.css' }
  ];
  
  resources.forEach(resource => {
    if (resource.type === 'style') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = resource.href;
      document.head.appendChild(link);
    }
  });
};

// Add error handling
const renderApp = () => {
  try {
    console.log('Initializing application...');
    
    // Preload critical resources
    preloadCriticalResources();
    
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
    
    // Prioritize rendering the main app
    const renderTimeout = setTimeout(() => {
      console.log('Rendering App component...');
      root.render(<App />);
      
      // Log performance metrics
      const loadTime = performance.now() - startTime;
      console.log(`App rendered successfully in ${loadTime.toFixed(2)}ms`);
    }, 0);

    // Optimization: Use the browser's idle time to load non-critical resources
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        console.log('Running deferred initialization...');
        // Load any non-critical features here
      }, { timeout: 1000 });
    }
    
    return () => clearTimeout(renderTimeout);
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

// Execute app rendering
renderApp();
