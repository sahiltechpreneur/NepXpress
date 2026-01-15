'use client';

import { useEffect, useState } from 'react';
import { getSocket } from '@/src/lib/socket';

interface Courier {
  id: string;
  trackingNumber: string;
  senderName: string;
  receiverName: string;
  status: string;
  paymentStatus: 'paid' | 'unpaid';
}

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [courier, setCourier] = useState<Courier | null>(null);
  const [error, setError] = useState('');

  const trackCourier = async () => {
    setError('');
    setCourier(null);

    try {
      const res = await fetch(
        `http://localhost:5000/api/couriers/track/${trackingNumber}`
      );

      if (!res.ok) {
        setError('Courier not found');
        return;
      }

      const data = await res.json();
      setCourier(data);
    } catch (err) {
      setError('Something went wrong');
    }
  };

  useEffect(() => {
    if (!courier) return;

    const socket = getSocket();

    const handler = (data: any) => {
      if (data.courierId === courier.id) {
        setCourier((prev) =>
          prev ? { ...prev, status: data.status } : prev
        );
      }
    };

    socket.on('courier-status-updated', handler);

    return () => {
      socket.off('courier-status-updated', handler);
    };
  }, [courier]);

  return (
    <div className="max-w-xl mx-auto mt-20 p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Track Your Courier
      </h1>

      <input
        type="text"
        placeholder="Enter Tracking Number"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        className="w-full border p-2 rounded mb-3"
      />

      <button
        onClick={trackCourier}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Track
      </button>

      {error && (
        <p className="text-red-500 text-center mt-4">{error}</p>
      )}

      {courier && (
        <>
          {/* PAYMENT SECTION */}
          {courier.paymentStatus !== 'paid' && (
            <form
              action="https://esewa.com.np/epay/main"
              method="POST"
              className="mt-4"
            >
              <input type="hidden" name="amt" value="100" />
              <input type="hidden" name="txAmt" value="0" />
              <input type="hidden" name="psc" value="0" />
              <input type="hidden" name="pdc" value="0" />
              <input type="hidden" name="tAmt" value="100" />

              <input
                type="hidden"
                name="scd"
                value={process.env.NEXT_PUBLIC_ESEWA_MERCHANT_CODE}
              />

              <input type="hidden" name="oid" value={courier.id} />

              <input
                type="hidden"
                name="su"
                value="http://localhost:5000/api/payments/esewa/success"
              />
              <input
                type="hidden"
                name="fu"
                value="http://localhost:5000/api/payments/esewa/failure"
              />

              <button className="w-full bg-green-600 text-white py-2 rounded">
                Pay with eSewa
              </button>
            </form>
          )}

          {/* COURIER DETAILS */}
          <div className="mt-6 border-t pt-4">
            <p>
              <strong>Tracking:</strong> {courier.trackingNumber}
            </p>
            <p>
              <strong>Sender:</strong> {courier.senderName}
            </p>
            <p>
              <strong>Receiver:</strong> {courier.receiverName}
            </p>
            <p className="mt-2">
              <strong>Status:</strong>{' '}
              <span className="text-green-600 font-semibold">
                {courier.status}
              </span>
            </p>

            {courier.paymentStatus === 'paid' && (
              <p className="mt-2 text-green-700 font-semibold">
                Payment Completed ✔
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
