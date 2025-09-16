import express from 'express';
import { createShortUrl, redirectUrl, getAllUrls, getUrlStats } from '../controllers/urlController';

const router = express.Router();

router.post('/shorten', createShortUrl);

router.get('/urls', getAllUrls);

router.get('/stats/:shortCode', getUrlStats);

router.get('/:shortCode', redirectUrl);

export default router;