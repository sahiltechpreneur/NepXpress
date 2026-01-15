'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAdmin } from '@/src/lib/auth';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    useEffect(() => {
        if (!isAdmin()) {
            router.replace('/login');
        }
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white p-4 flex justify-between">
                <span className="font-bold">NepXpress Admin Panel</span>
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }}
                    className="bg-red-500 px-3 py-1 rounded"
                >
                    Logout
                </button>
            </header>


            <main className="p-6">{children}</main>
        </div>
    );
}
