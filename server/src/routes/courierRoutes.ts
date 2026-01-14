import express from 'express';
import {
  createCourier,
  getMyCouriers,
} from '../controllers/CourierController';
import { verifyToken } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', verifyToken, createCourier);
router.get('/my', verifyToken, getMyCouriers);

export default router;
