import { Request, Response } from 'express';
import Courier from '../models/Courier';
import { getIO } from '../socket';

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

export const getAllCouriers = async (req: Request, res: Response) => {
  try {
    const couriers = await Courier.findAll({
      order: [['createdAt', 'DESC']],
    });

    res.json(couriers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch all couriers' });
  }
};

export const updateCourierStatus = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id as string;

    const { status } = req.body;

    const courier = await Courier.findByPk(id);

    if (!courier) {
      return res.status(404).json({ message: 'Courier not found' });
    }

    courier.status = status;
    await courier.save();

    const io = getIO();
    io.emit('courier-status-updated', {
      courierId: courier.id,
      status: courier.status,
    });

    res.json({
      message: 'Courier status updated',
      courier,
    });
  } catch (error) {
    res.status(500).json({ message: 'Status update failed' });
  }
};

export const trackCourier = async (req: Request, res: Response) => {
  try {
    const { trackingNumber } = req.params;

    const courier = await Courier.findOne({
      where: { trackingNumber },
    });

    if (!courier) {
      return res.status(404).json({ message: 'Courier not found' });
    }

    res.json(courier);
  } catch (error) {
    res.status(500).json({ message: 'Tracking failed' });
  }
};
