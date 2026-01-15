'use client';

import { getSocket } from '@/src/lib/socket';
import { useEffect, useState } from 'react';


interface Courier {
  trackingNumber: string;
  senderName: string;
  receiverName: string;
  status: string;
}

export default function TrackPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [courier, setCourier] = useState<Courier | null>(null);
  const [error, setError] = useState('');

  const trackCourier = async () => {
    setError('');
    setCourier(null);

    const res = await fetch(
      `http://localhost:5000/api/couriers/track/${trackingNumber}`
    );

    if (!res.ok) {
      setError('Courier not found');
      return;
    }

    const data = await res.json();
    setCourier(data);
  };

  useEffect(() => {
    if (!courier) return;

    const socket = getSocket();

    socket.on('courier-status-updated', (data) => {
      if (data.courierId === (courier as any).id) {
        setCourier((prev) =>
          prev ? { ...prev, status: data.status } : prev
        );
      }
    });

    return () => {
      socket.off('courier-status-updated');
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
        <div className="mt-6 border-t pt-4">
          <p><strong>Tracking:</strong> {courier.trackingNumber}</p>
          <p><strong>Sender:</strong> {courier.senderName}</p>
          <p><strong>Receiver:</strong> {courier.receiverName}</p>
          <p className="mt-2">
            <strong>Status:</strong>{' '}
            <span className="text-green-600 font-semibold">
              {courier.status}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
