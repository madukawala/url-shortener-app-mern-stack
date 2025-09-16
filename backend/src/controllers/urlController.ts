import { Request, Response } from 'express';
import Url from '../models/Url';
import { generateShortCode, isValidUrl, normalizeUrl } from '../utils/urlUtils';
import { CreateUrlRequest, ApiResponse, UrlResponse } from '../types';

export const createShortUrl = async (req: Request<{}, ApiResponse<UrlResponse>, CreateUrlRequest>, res: Response<ApiResponse<UrlResponse>>): Promise<void> => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      res.status(400).json({
        success: false,
        error: 'Original URL is required'
      });
      return;
    }

    if (!isValidUrl(originalUrl)) {
      res.status(400).json({
        success: false,
        error: 'Please provide a valid URL with http:// or https://'
      });
      return;
    }

    const normalizedUrl = normalizeUrl(originalUrl);
    
    const existingUrl = await Url.findOne({ originalUrl: normalizedUrl });
    
    if (existingUrl) {
      res.json({
        success: true,
        data: {
          _id: existingUrl._id.toString(),
          originalUrl: existingUrl.originalUrl,
          shortCode: existingUrl.shortCode,
          shortUrl: existingUrl.shortUrl,
          clickCount: existingUrl.clickCount,
          createdAt: existingUrl.createdAt.toISOString(),
          updatedAt: existingUrl.updatedAt.toISOString(),
        }
      });
      return;
    }

    let shortCode: string;
    let isUnique = false;
    
    while (!isUnique) {
      shortCode = generateShortCode();
      const existingCode = await Url.findOne({ shortCode });
      if (!existingCode) {
        isUnique = true;
      }
    }

    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    const shortUrl = `${baseUrl}/${shortCode!}`;

    const newUrl = new Url({
      originalUrl: normalizedUrl,
      shortCode: shortCode!,
      shortUrl,
      clickCount: 0,
    });

    const savedUrl = await newUrl.save();

    res.status(201).json({
      success: true,
      data: {
        _id: savedUrl._id.toString(),
        originalUrl: savedUrl.originalUrl,
        shortCode: savedUrl.shortCode,
        shortUrl: savedUrl.shortUrl,
        clickCount: savedUrl.clickCount,
        createdAt: savedUrl.createdAt.toISOString(),
        updatedAt: savedUrl.updatedAt.toISOString(),
      },
      message: 'Short URL created successfully'
    });
  } catch (error) {
    console.error('Error creating short URL:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const redirectUrl = async (req: Request<{ shortCode: string }>, res: Response): Promise<void> => {
  try {
    const { shortCode } = req.params;

    if (!shortCode) {
      res.status(400).json({
        success: false,
        error: 'Short code is required'
      });
      return;
    }

    const url = await Url.findOne({ shortCode });

    if (!url) {
      res.status(404).json({
        success: false,
        error: 'URL not found'
      });
      return;
    }

    url.clickCount += 1;
    await url.save();

    res.redirect(301, url.originalUrl);
  } catch (error) {
    console.error('Error redirecting URL:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getAllUrls = async (req: Request, res: Response<ApiResponse<UrlResponse[]>>): Promise<void> => {
  try {
    const urls = await Url.find({}).sort({ createdAt: -1 }).limit(50);

    const formattedUrls: UrlResponse[] = urls.map(url => ({
      _id: url._id.toString(),
      originalUrl: url.originalUrl,
      shortCode: url.shortCode,
      shortUrl: url.shortUrl,
      clickCount: url.clickCount,
      createdAt: url.createdAt.toISOString(),
      updatedAt: url.updatedAt.toISOString(),
    }));

    res.json({
      success: true,
      data: formattedUrls
    });
  } catch (error) {
    console.error('Error fetching URLs:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getUrlStats = async (req: Request<{ shortCode: string }>, res: Response<ApiResponse<UrlResponse>>): Promise<void> => {
  try {
    const { shortCode } = req.params;

    const url = await Url.findOne({ shortCode });

    if (!url) {
      res.status(404).json({
        success: false,
        error: 'URL not found'
      });
      return;
    }

    res.json({
      success: true,
      data: {
        _id: url._id.toString(),
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        shortUrl: url.shortUrl,
        clickCount: url.clickCount,
        createdAt: url.createdAt.toISOString(),
        updatedAt: url.updatedAt.toISOString(),
      }
    });
  } catch (error) {
    console.error('Error fetching URL stats:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};