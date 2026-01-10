import { Router } from 'express';
import { verifyToken } from '../middlewares/authMiddleware';
import { allowRoles } from '../middlewares/roleMiddleware';

const router = Router();

// Admin only
router.get(
  '/admin',
  verifyToken,
  allowRoles('admin'),
  (req, res) => {
    res.json({ message: 'Welcome Admin' });
  }
);

// Customer only
router.get(
  '/customer',
  verifyToken,
  allowRoles('customer'),
  (req, res) => {
    res.json({ message: 'Welcome Customer' });
  }
);

// Staff only
router.get(
  '/staff',
  verifyToken,
  allowRoles('staff'),
  (req, res) => {
    res.json({ message: 'Welcome Staff' });
  }
);

export default router;
