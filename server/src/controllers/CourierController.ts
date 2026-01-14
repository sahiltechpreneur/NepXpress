import { Request, Response } from 'express';
import Courier from '../models/Courier';

export const createCourier = async (req: Request, res: Response) => {
  try {
    const {
      senderName,
      senderPhone,
      senderAddress,
      receiverName,
      receiverPhone,
      receiverAddress,
    } = req.body;

    const userId = (req as any).user.id;

    const trackingNumber = 'NPX' + Date.now();

    const courier = await Courier.create({
      trackingNumber,
      senderName,
      senderPhone,
      senderAddress,
      receiverName,
      receiverPhone,
      receiverAddress,
      userId,
    });

    res.status(201).json({
      message: 'Courier booked successfully',
      courier,
    });
  } catch (error) {
    res.status(500).json({ message: 'Courier creation failed' });
  }
};

export const getMyCouriers = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;

    const couriers = await Courier.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    });

    res.json(couriers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch couriers' });
  }
};
