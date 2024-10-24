import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen pt-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-800 mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8 text-green-900">Privacy Policy</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 font-medium">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">1. Introduction</h2>
            <p className="text-gray-700">
              Arabella Consultancy is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our financial services application.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">2. Information We Collect</h2>
            <p className="text-gray-700">
              We collect personal information that you provide to us, such as your name, email address, and financial data. We also collect information automatically when you use our app, including usage data and device information.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">3. How We Use Your Information</h2>
            <p className="text-gray-700">
              We use your information to provide and improve our services, communicate with you, and comply with legal obligations. We may also use your data for analytics and marketing purposes.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">4. Data Security</h2>
            <p className="text-gray-700">
              We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-800">5. Your Rights</h2>
            <p className="text-gray-700">
              You have the right to access, correct, or delete your personal information. You may also have the right to restrict or object to certain processing of your data.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
