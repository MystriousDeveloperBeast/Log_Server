import express from 'express';
import { getLogs, uploadLogFile } from '../controllers/log.controller';

const router = express.Router();

router.get('/', getLogs);
router.post('/upload', uploadLogFile);

export default router;
