import React, { useState } from 'react';
import { urlService } from '../services/api';
import { Url } from '../types';

interface Props {
  onUrlCreated: (url: Url) => void;
}

const UrlShortenerForm: React.FC<Props> = ({ onUrlCreated }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return url.startsWith('http://') || url.startsWith('https://');
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!originalUrl.trim()) {
      setError('Please enter a URL');
      return;
    }

    if (!isValidUrl(originalUrl)) {
      setError('Please enter a valid URL starting with http:// or https://');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const newUrl = await urlService.createShortUrl({ originalUrl });
      setSuccess('Short URL created successfully!');
      setOriginalUrl('');
      onUrlCreated(newUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="mb-4" style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>
        Shorten Your URL
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="originalUrl" className="form-label">
            Enter URL to shorten
          </label>
          <input
            type="url"
            id="originalUrl"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className={`form-input ${error ? 'error' : ''}`}
            placeholder="https://example.com/very-long-url"
            disabled={loading}
          />
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
        </div>
        <button
          type="submit"
          disabled={loading || !originalUrl.trim()}
          className="btn btn-primary"
          style={{ width: '100%' }}
        >
          {loading ? (
            <>
              <span className="loading"></span>
              <span style={{ marginLeft: '8px' }}>Creating...</span>
            </>
          ) : (
            'Shorten URL'
          )}
        </button>
      </form>
    </div>
  );
};

export default UrlShortenerForm;