export const validateUrl = (url: string): { isValid: boolean; error?: string } => {
  if (!url.trim()) {
    return { isValid: false, error: 'URL is required' };
  }

  try {
    const urlObj = new URL(url);
    
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return { 
        isValid: false, 
        error: 'URL must start with http:// or https://' 
      };
    }

    if (urlObj.hostname === 'localhost' || urlObj.hostname === '127.0.0.1') {
      return { 
        isValid: false, 
        error: 'Local URLs are not allowed' 
      };
    }

    return { isValid: true };
  } catch {
    return { 
      isValid: false, 
      error: 'Please enter a valid URL' 
    };
  }
};

export const sanitizeUrl = (url: string): string => {
  return url.trim().toLowerCase();
};