'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          NepXpress
        </Link>

        <div className="space-x-6">
          <Link href="/track" className="text-gray-600 hover:text-blue-600">
            Track
          </Link>
          <Link href="/login" className="text-gray-600 hover:text-blue-600">
            Login
          </Link>
          <Link
            href="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
