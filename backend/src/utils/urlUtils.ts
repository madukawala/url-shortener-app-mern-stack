import { customAlphabet } from 'nanoid';
import validator from 'validator';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 7);

export const generateShortCode = (): string => {
  return nanoid();
};

export const isValidUrl = (url: string): boolean => {
  return validator.isURL(url, {
    protocols: ['http', 'https'],
    require_protocol: true,
  });
};

export const normalizeUrl = (url: string): string => {
  return url.trim().toLowerCase();
};