import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen pt-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center text-green-600 hover:text-green-800 mb-8">
          <ArrowLeft className="mr-2" size={20} />
          Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-8 text-green-900">Terms and Conditions</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 font-medium">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">1. Acceptance of Terms</h2>
            <p className="text-gray-700">
              By using Arabella Consultancy services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">2. Use of Services</h2>
            <p className="text-gray-700">
              You agree to use Arabella Consultancy services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account information.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">3. Intellectual Property</h2>
            <p className="text-gray-700">
              All content and materials available on Arabella Consultancy are the property of Arabella Consultancy or its licensors and are protected by copyright, trademark, and other intellectual property laws.
            </p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-green-800">4. Limitation of Liability</h2>
            <p className="text-gray-700">
              Arabella Consultancy shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-green-800">5. Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page. Your continued use of the service after any changes constitutes acceptance of those changes.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
