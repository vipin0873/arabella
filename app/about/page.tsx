'use client'

import Image from "next/image";
import { Clock, Users, Globe, Award } from "lucide-react";
import { useQuoteModal } from '../contexts/QuoteModalContext'


export default function About() {
    const { openQuoteModal } = useQuoteModal();
  return (
    <main className="min-h-screen pt-20 bg-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-green-900">About Our Company</h1>
          <p className="text-lg sm:text-lg text-green-700 max-w-3xl mx-auto">
            Empowering businesses with expert financial services since 2005. We're committed to your success.
          </p>
        </section>

        {/* Our Story Section */}
        <section className="flex flex-col lg:flex-row items-center mb-24">
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <h2 className="text-3xl font-bold mb-4 text-green-900">Our Story</h2>
            <p className="text-base sm:text-lg text-green-700 font-semibold mb-4">
              ARabella Consultants is promoted by Assurance & Accounting Professionals for providing outsourced services to Corporates, Assurance & Accounting firms in the USA, UK, Canada, Australia and Other countries for their Accounting, Assurance, Payroll, and Taxation Compliance requirements on regular basis.
            </p>
            <p className="text-base sm:text-lg text-green-700 font-semibold mb-4">
              Arabella has a team of professionals comprising CAs, CPAs, MBAs, B. Tech (Computer Science), and Commerce Graduates for outsourced services requirements from its various clients.
            </p>
            <p className="text-base sm:text-lg text-green-700 font-semibold mb-4">
              The company is providing Assurance & Audit, Accounting & Bookkeeping and Payroll services to CPA firms and their clients in the USA, Canada, UK, Italy, Dubai, and Australia.
            </p>
            <p className="text-base sm:text-lg text-green-700 font-semibold mb-4">
              Team Arabella regularly remains indulged in marketing activities to assess requirements for provision of outsourced solutions from prospective clients.
            </p>
            <p className="text-base sm:text-lg text-green-700 font-semibold mb-4">
              Key focus is to understand the business model, assess and evaluate requirements and provide tailor made solutions to serve their requirements.
            </p>
            <p className="text-base sm:text-lg text-green-700 font-semibold">
              Formulate strategy for transition, in discussion with prospective client encompassing all requirements with due recognition of specified policies & procedures.
            </p>
          </div>
          <div className="lg:w-1/2">
            <Image
              src="https://placehold.co/600x400"
              alt="Our diverse team of financial experts collaborating in a modern office setting"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        {/* Our Values Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-900">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={<Clock className="w-12 h-12 text-green-600" />}
              title="Efficiency"
              description="We value your time and strive to deliver prompt, accurate services."
            />
            <ValueCard
              icon={<Users className="w-12 h-12 text-teal-600" />}
              title="Client-Centric"
              description="Your success is our priority. We tailor our services to your unique needs."
            />
            <ValueCard
              icon={<Globe className="w-12 h-12 text-emerald-600" />}
              title="Innovation"
              description="We embrace cutting-edge technologies to provide the best financial solutions."
            />
            <ValueCard
              icon={<Award className="w-12 h-12 text-green-600" />}
              title="Excellence"
              description="We maintain the highest standards of quality in all our services."
            />
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-900">Our Approach</h2>
          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-lg shadow-lg font-medium">
            <p className="text-[1.0625rem] text-green-900  mb-4">
              At our core, we believe in a collaborative approach to financial services. We don't just work for you; we work with you. Our team of experts becomes an extension of your business, providing:
            </p>
            <ul className="list-disc list-inside text-[1.0625rem] text-green-700 mb-4">
              <li>Personalized strategies tailored to your industry and goals</li>
              <li>Proactive financial advice to help you navigate challenges and seize opportunities</li>
              <li>Transparent communication and regular updates on your financial health</li>
              <li>Cutting-edge technology integration for seamless collaboration and real-time insights</li>
            </ul>
            <p className="text-[1.0625rem] text-green-700">
              By combining our expertise with a deep understanding of your business, we empower you to make informed decisions and achieve sustainable growth.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-green-900">Ready to Transform Your Finances?</h2>
          <p className="text-[1.1875rem] text-green-700 mb-8 max-w-2xl mx-auto">
            Let's work together to unlock your business's full potential. Our team is ready to provide the expert financial guidance you need.
          </p>
          <button
            onClick={openQuoteModal}
            className="bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            Schedule a Consultation
          </button>
        </section>
      </div>
    </main>
  );
}

function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="font-bold text-xl text-green-900 mb-2">{title}</h3>
      <p className="text-green-700">{description}</p>
    </div>
  );
}
