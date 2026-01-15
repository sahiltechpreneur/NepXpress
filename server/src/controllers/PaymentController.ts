import { Request, Response } from 'express';
import Courier from '../models/Courier';

export const esewaSuccess = async (req: Request, res: Response) => {
  try {
    const { oid } = req.query; // order id = courier id

    if (!oid) {
      return res.status(400).send('Invalid payment');
    }

    const courier = await Courier.findByPk(oid as string);

    if (!courier) {
      return res.status(404).send('Courier not found');
    }

    courier.paymentStatus = 'paid';
    await courier.save();

    res.redirect('http://localhost:3000/payment-success');
  } catch (error) {
    res.status(500).send('Payment verification failed');
  }
};

export const esewaFailure = (_req: Request, res: Response) => {
  res.redirect('http://localhost:3000/payment-failed');
};
