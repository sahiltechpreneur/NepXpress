export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white">NepXpress</h3>
          <p className="mt-2 text-sm">
            Fast, reliable and secure courier service across Nepal.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm">
            <li>Track Courier</li>
            <li>Login</li>
            <li>Register</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-2">Contact</h4>
          <p className="text-sm">Email: support@nepxpress.com</p>
          <p className="text-sm">Phone: +977-98XXXXXXXX</p>
        </div>
      </div>

      <div className="text-center text-sm border-t border-gray-700 py-4">
        © {new Date().getFullYear()} NepXpress. All rights reserved.
      </div>
    </footer>
  );
}
