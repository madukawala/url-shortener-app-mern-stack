import rateLimit from 'express-rate-limit';

export const createUrlLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    success: false,
    error: 'Too many URLs created from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const redirectLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 100, // limit each IP to 100 redirects per minute
  message: {
    success: false,
    error: 'Too many redirect requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});