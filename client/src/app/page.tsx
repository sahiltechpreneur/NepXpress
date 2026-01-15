import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl font-bold leading-tight">
            Fast & Reliable Courier Service in Nepal
          </h1>

          <p className="mt-4 text-gray-600">
            Send packages anywhere in Nepal with real-time tracking and secure
            payments.
          </p>

          <div className="mt-6 space-x-4">
            <Link
              href="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded"
            >
              Get Started
            </Link>

            <Link
              href="/track"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded"
            >
              Track Courier
            </Link>
          </div>
        </div>

        <div className="hidden md:block">
          <img
            src="/delivery.svg"
            alt="Courier Illustration"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
