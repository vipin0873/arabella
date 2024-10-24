'use client'

import { Check, PhoneCall, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuoteModal } from '../app/contexts/QuoteModalContext';
import { useRouter } from 'next/navigation';

const resources = [
  { title: "Payable Management", icon: "💼", description: "Comprehensive management of purchase process and vendor payments." },
  { title: "Receivables Management", icon: "💰", description: "End-to-end management of sales process and accounts receivable." },
  { title: "Reporting", icon: "📊", description: "Timely preparation and review of financial statements and analysis." },
  { title: "Payroll Services", icon: "👥", description: "Accurate processing of payroll and related expense reporting." },
  { title: "Fixed Assets Management", icon: "🏢", description: "Maintenance of fixed asset register and depreciation schedules." },
  { title: "Tax Support", icon: "📋", description: "Assistance with tax return preparation and compliance." },
  { title: "Startup Services", icon: "🚀", description: "Tailored financial solutions for digital startups and e-commerce." },
  { title: "ERP Integration", icon: "🔗", description: "Seamless integration of ERPs for various online business models." },
];

export default function ResourcesSection() {
  const { openQuoteModal } = useQuoteModal();
  const router = useRouter();

  return (
    <section className="py-24 bg-gradient-to-br from-green-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-green-900 mb-6">
            Empowering Financial Success
          </h2>
          <p className="text-lg sm:text-xl text-green-700 max-w-3xl mx-auto">
            Discover our comprehensive suite of tailored solutions designed to elevate financial professionals and business owners. From part-time assistance to full-time support, we're here to drive your success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-8 mb-16">
          {resources.map((resource, index) => (
            <div
              key={resource.title}
              className="bg-white rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-green-200"
            >
              <div className="flex items-center mb-6">
                <span className="text-5xl mr-4">{resource.icon}</span>
                <h3 className="text-2xl font-semibold text-green-900">{resource.title}</h3>
              </div>
              <p className="text-green-700 font-semibold mb-6">
                {resource.description}
              </p>
              <div className="flex items-center text-green-900">
                <Check className="w-5 h-5 mr-2" />
                <span className="font-semibold">Customized support available</span>
              </div>
              <Button
                variant="link"
                onClick={() => {resource.title.includes("Startup Services") || resource.title.includes("ERP Integration") ? router.push("/startup-services") : router.push("/services")}}
                className="mt-4 text-green-900 hover:text-green-700 transition-colors duration-300"
              >
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={openQuoteModal}
            className="bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold px-10 py-6 rounded-full hover:shadow-lg transition-all duration-300 group text-lg"
          >
            <PhoneCall className="w-6 h-6 mr-3 group-hover:animate-pulse" />
            Schedule a Free Consultation
          </Button>
        </div>
      </div>
    </section>
  );
}
