import express from 'express';
import {
  esewaSuccess,
  esewaFailure,
} from '../controllers/PaymentController';

const router = express.Router();

router.get('/esewa/success', esewaSuccess);
router.get('/esewa/failure', esewaFailure);

export default router;
