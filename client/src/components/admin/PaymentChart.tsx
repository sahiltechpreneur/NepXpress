'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function PaymentChart({
  paid,
  unpaid,
}: {
  paid: number;
  unpaid: number;
}) {
  const data = [
    { name: 'Paid', value: paid },
    { name: 'Unpaid', value: unpaid },
  ];

  const COLORS = ['#16a34a', '#dc2626'];

  return (
    <div className="h-64">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={data} dataKey="value" label>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
