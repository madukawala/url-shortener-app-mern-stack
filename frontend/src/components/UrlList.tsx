import React, { useState } from 'react';
import { Url } from '../types';

interface Props {
  urls: Url[];
  loading: boolean;
  onDelete: (id: string) => void;
}

const UrlList: React.FC<Props> = ({ urls, loading, onDelete }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this URL?')) {
      setDeletingId(id);
      try {
        await onDelete(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateUrl = (url: string, maxLength: number = 50) => {
    return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
  };

  if (loading) {
    return (
      <div className="card">
        <div className="text-center">
          <div className="loading" style={{ width: '32px', height: '32px' }}></div>
          <p style={{ marginTop: '16px', color: '#6b7280' }}>Loading URLs...</p>
        </div>
      </div>
    );
  }

  if (urls.length === 0) {
    return (
      <div className="card">
        <div className="text-center">
          <p style={{ color: '#6b7280', fontSize: '18px' }}>
            No URLs created yet. Create your first short URL above!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="mb-4" style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937' }}>
        Your Shortened URLs ({urls.length})
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>
                Original URL
              </th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>
                Short URL
              </th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>
                Clicks
              </th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', color: '#374151' }}>
                Created
              </th>
              <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', color: '#374151' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '16px' }}>
                  <a
                    href={url.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={url.originalUrl}
                    style={{ 
                      color: '#3b82f6', 
                      textDecoration: 'none',
                      fontSize: '14px'
                    }}
                  >
                    {truncateUrl(url.originalUrl)}
                  </a>
                </td>
                <td style={{ padding: '16px' }}>
                  <a 
                    href={url.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <code style={{ 
                      backgroundColor: '#f3f4f6', 
                      padding: '4px 8px', 
                      borderRadius: '4px',
                      fontSize: '14px',
                      color: '#3b82f6',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}>
                      {url.shortUrl}
                    </code>
                  </a>
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <span style={{ 
                    backgroundColor: url.clickCount > 0 ? '#dcfce7' : '#f3f4f6',
                    color: url.clickCount > 0 ? '#166534' : '#6b7280',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600'
                  }}>
                    {url.clickCount}
                  </span>
                </td>
                <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }}>
                  {formatDate(url.createdAt)}
                </td>
                <td style={{ padding: '16px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <button
                      onClick={() => copyToClipboard(url.shortUrl, url._id)}
                      className="btn"
                      style={{
                        backgroundColor: copiedId === url._id ? '#10b981' : '#e5e7eb',
                        color: copiedId === url._id ? 'white' : '#374151',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: '500'
                      }}
                    >
                      {copiedId === url._id ? 'Copied!' : 'Copy'}
                    </button>
                    <button
                      onClick={() => handleDelete(url._id)}
                      disabled={deletingId === url._id}
                      className="btn"
                      style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        padding: '6px 12px',
                        fontSize: '12px',
                        fontWeight: '500',
                        opacity: deletingId === url._id ? 0.5 : 1,
                        cursor: deletingId === url._id ? 'not-allowed' : 'pointer'
                      }}
                    >
                      {deletingId === url._id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UrlList;