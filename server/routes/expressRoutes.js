import express from 'express';
import multer from 'multer';
import { getData, getSimplified, getSummary, getFile } from '../controller/summaryController.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage : storage});

router.post('/api', getData);

router.get('/summary/:sessionId', getSummary);

router.get('/simplified/:sessionId', getSimplified);

router.post('/upload', upload.single('legalFile'), getFile);

export default router;