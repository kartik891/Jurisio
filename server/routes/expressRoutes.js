import express from 'express';
import multer from 'multer';
import { getData, getFile } from '../controller/textController.js';
import { getOriginal, getRisk, getSimplified, getSummary } from '../controller/summaryController.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage
});


router.post('/api', getData);

router.get('/simplified/:sessionId', getSimplified);

router.get('/original/:sessionId', getOriginal);

router.get('/summary/:sessionId', getSummary);

router.get('/risks/:sessionId', getRisk);

router.post('/upload', upload.single('legalFile'), getFile);

export default router;