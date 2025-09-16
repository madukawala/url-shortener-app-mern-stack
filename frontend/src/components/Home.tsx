import React, { useState, useEffect } from 'react';
import UrlShortenerForm from './UrlShortenerForm';
import UrlList from './UrlList';
import { urlService } from '../services/api';
import { Url } from '../types';

const Home: React.FC = () => {
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

  const handleDelete = async (id: string) => {
    try {
      await urlService.deleteUrl(id);
      setUrls(prevUrls => prevUrls.filter(url => url._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete URL');
    }
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

          <UrlList urls={urls} loading={loading} onDelete={handleDelete} />
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

export default Home;