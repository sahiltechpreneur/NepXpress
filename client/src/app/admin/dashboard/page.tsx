'use client';

import PaymentChart from '@/src/components/admin/PaymentChart';
import { useEffect, useState } from 'react';

interface Courier {
  id: string;
  paymentStatus: 'paid' | 'unpaid';
}

export default function AdminDashboard() {
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCouriers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/couriers/admin/all`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        const data = await res.json();

        // handle different backend response shapes safely
        setCouriers(data.couriers || data.data || []);
      } catch (error) {
        console.error('Failed to load couriers', error);
        setCouriers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCouriers();
  }, []);

  if (loading) {
    return <p className="p-8">Loading dashboard...</p>;
  }

  const total = couriers.length;
  const paid = couriers.filter((c) => c.paymentStatus === 'paid').length;
  const unpaid = total - paid;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow rounded p-4">
          <p className="text-gray-500">Total Couriers</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="bg-green-100 shadow rounded p-4">
          <p className="text-gray-600">Paid Couriers</p>
          <p className="text-2xl font-bold">{paid}</p>
        </div>

        <div className="bg-red-100 shadow rounded p-4">
          <p className="text-gray-600">Unpaid Couriers</p>
          <p className="text-2xl font-bold">{unpaid}</p>
        </div>
      </div>

      {/* Payment Chart */}
      <div className="bg-white shadow rounded p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Payment Overview</h2>
        <PaymentChart paid={paid} unpaid={unpaid} />
      </div>

      {/* Reports */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-xl font-semibold mb-4">Reports</h2>

        <div className="flex gap-4">
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/api/reports/payments/excel`}
            target="_blank"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Download Excel
          </a>

          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/api/reports/payments/pdf`}
            target="_blank"
            className="bg-gray-800 text-white px-4 py-2 rounded"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}
