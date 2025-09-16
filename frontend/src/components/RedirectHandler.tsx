import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RedirectHandler: React.FC = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redirectToUrl = async () => {
      if (!shortCode) {
        setError('Invalid short code');
        setLoading(false);
        return;
      }

      try {
        // Direct redirect to backend
        window.location.href = `http://localhost:5000/${shortCode}`;
      } catch (err) {
        setError('Failed to redirect');
        setLoading(false);
      }
    };

    redirectToUrl();
  }, [shortCode]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column' 
      }}>
        <div>Redirecting...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column' 
      }}>
        <h2>Error</h2>
        <p>{error}</p>
        <a href="/">Go back to home</a>
      </div>
    );
  }

  return null;
};

export default RedirectHandler;