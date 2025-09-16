import React, { useState, useEffect } from 'react';
import UrlShortenerForm from './components/UrlShortenerForm';
import UrlList from './components/UrlList';
import { urlService } from './services/api';
import { Url } from './types';
import './App.css';

const App: React.FC = () => {
  const [urls, setUrls] = useState<Url[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUrls = async () => {
    try {
      setLoading(true);
      setError('');
      const urlsData = await urlService.getAllUrls();
      setUrls(urlsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch URLs');
      console.error('Error fetching URLs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleUrlCreated = (newUrl: Url) => {
    setUrls(prevUrls => [newUrl, ...prevUrls]);
  };

  const handleRefresh = () => {
    fetchUrls();
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <h1>URL Shortener</h1>
          <p>Create short links and track their performance</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <UrlShortenerForm onUrlCreated={handleUrlCreated} />
          
          {error && (
            <div className="card error-card">
              <p style={{ color: '#ef4444', marginBottom: '12px' }}>
                Error: {error}
              </p>
              <button onClick={handleRefresh} className="btn btn-primary">
                Try Again
              </button>
            </div>
          )}

          <UrlList urls={urls} loading={loading} />
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2024 URL Shortener. Built with React, Node.js, and MongoDB.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;