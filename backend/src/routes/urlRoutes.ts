import express from 'express';
import { createShortUrl, redirectUrl, getAllUrls, getUrlStats, deleteUrl } from '../controllers/urlController';

const router = express.Router();

router.post('/shorten', createShortUrl);

router.get('/urls', getAllUrls);

router.get('/stats/:shortCode', getUrlStats);

router.delete('/urls/:id', deleteUrl);

router.get('/:shortCode', redirectUrl);

export default router;