import express from 'express';
import {
  createCourier,
  getMyCouriers,
  getAllCouriers,
  updateCourierStatus,
} from '../controllers/CourierController';
import { verifyToken } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';

const router = express.Router();

router.post('/', verifyToken, createCourier);
router.get('/my', verifyToken, getMyCouriers);
router.get(
  '/admin/all',
  verifyToken,
  adminMiddleware,
  getAllCouriers
);

router.put(
  '/admin/:id/status',
  verifyToken,
  adminMiddleware,
  updateCourierStatus
);


export default router;
