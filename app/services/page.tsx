"use client"

import { useState } from 'react';
import { Shield, DollarSign, BarChart, Users, Building, FileText, ChevronUp, ChevronDown } from 'lucide-react';
import { useQuoteModal } from '../contexts/QuoteModalContext';

const services = [
  {
    icon: DollarSign,
    title: "Payable Management",
    description: "Comprehensive management of Purchase process, invoice processing, vendor payments, monthly reconciliation of accounts payable to ensure accuracy and timely reporting.",
    features: [
      "Streamlined purchase process",
      "Efficient invoice processing",
      "Timely vendor payments",
      "Accurate monthly reconciliations"
    ]
  },
  {
    icon: DollarSign,
    title: "Receivables Management",
    description: "End-to-end management of sales process, encompassing invoicing, collections, cash application, and reconciliation of accounts receivable, while identifying areas for revenue optimization.",
    features: [
      "Comprehensive sales process management",
      "Efficient invoicing and collections",
      "Accurate cash application",
      "Revenue optimization strategies"
    ]
  },
  {
    icon: BarChart,
    title: "Reporting",
    description: "Timely preparation and review of financial statements at the end of each reporting period, including variance analysis (budget vs. actual) and monthly reconciliations of bank accounts and general ledger accounts.",
    features: [
      "Timely financial statement preparation",
      "Detailed variance analysis",
      "Regular bank account reconciliations",
      "General ledger account management"
    ]
  },
  {
    icon: Users,
    title: "Payroll Services",
    description: "Accurate and timely processing of payroll for all employees, including generating journal entries related to payroll expenses and providing monthly reports on payroll-related variances.",
    features: [
      "Precise payroll processing",
      "Payroll expense journal entries",
      "Monthly payroll variance reports",
      "Compliance with payroll regulations"
    ]
  },
  {
    icon: Building,
    title: "Fixed Assets Management",
    description: "Maintenance of fixed asset register, depreciation schedules, along with reconciliation of fixed assets and capital expenditures to ensure accurate financial reporting.",
    features: [
      "Comprehensive fixed asset register",
      "Accurate depreciation schedules",
      "Regular fixed asset reconciliations",
      "Capital expenditure tracking"
    ]
  },
  {
    icon: FileText,
    title: "Tax Support",
    description: "Assistance with the preparation and filing of tax returns, including quarterly reconciliation of tax liabilities and payments, ensuring compliance with all relevant tax regulations.",
    features: [
      "Tax return preparation and filing",
      "Quarterly tax liability reconciliations",
      "Tax payment management",
      "Compliance with tax regulations"
    ]
  }
];

export default function Services() {
  const { openQuoteModal } = useQuoteModal();
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const toggleService = (index: number) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <main className="min-h-screen pt-20 bg-white">
      <div className="container mx-auto px-4 py-16 font-medium">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-green-900">Our Services</h1>
          <p className="text-lg sm:text-xl text-green-700 font-medium max-w-3xl mx-auto">
            Comprehensive financial solutions tailored to your business needs. Explore our range of services designed to drive your financial success.
          </p>
        </section>

        {/* Services List */}
        <section aria-labelledby="services-list">
          <h2 id="services-list" className="sr-only">Detailed Services List</h2>
          <div className="space-y-8">
            {services.map((service, index) => (
              <article
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div
                  className="p-4 sm:p-6 flex items-center justify-between cursor-pointer"
                  onClick={() => toggleService(index)}
                >
                  <div className="flex items-center">
                    <div className="mr-4">
                      <service.icon className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-3xl font-bold text-green-900">{service.title}</h3>
                      <p className="text-sm  sm:text-xl text-green-700">{service.description}</p>
                    </div>
                  </div>
                  {expandedService === index ? (
                    <ChevronUp className="w-20 h-20 sm:w-16 sm:h-16 text-green-600" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-20 h-20 sm:w-16 sm:h-16 text-green-600" aria-hidden="true" />
                  )}
                </div>
                {expandedService === index && (
                  <div className="px-6 pb-6">
                    <p className="text-[1.0625rem] text-green-700 mb-4">{service.description}</p>
                    <h4 className="font-bold text-lg text-green-900 mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside text-[1.0625rem] text-green-700 mb-4">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mt-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-green-900">Ready to Elevate Your Financial Management?</h2>
          <p className="text-base sm:text-xl text-green-700 mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to provide tailored solutions for your business. Let's discuss how we can help you achieve your financial goals.
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
