import express from 'express';
import { exportExcel, exportPdf } from '../controllers/ReportController';
import { verifyToken } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';

const router = express.Router();

router.get('/payments/excel', verifyToken, adminMiddleware, exportExcel);
router.get('/payments/pdf', verifyToken, adminMiddleware, exportPdf);

export default router;
