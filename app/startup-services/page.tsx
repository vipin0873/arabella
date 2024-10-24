"use client"
import { Rocket, Database, ChartBar, FileText, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useQuoteModal } from '../contexts/QuoteModalContext';

export default function StartupServices() {
    const { openQuoteModal } = useQuoteModal();

  return (
    <main className="min-h-screen pt-20 bg-white">
      <div className="container mx-auto px-4 py-16">
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-green-900">Services for Digital Startups</h1>
          <p className="text-lg sm:text-lg text-green-700 max-w-3xl mx-auto">
            Digital Startups are uniquely placed in our services portfolio. We understand the needs of startups and maintain an agile model of services as they need a comprehensive accounting companion in their journey of growth.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8 mb-12 font-medium">
          <h2 className="text-3xl font-bold mb-6 text-green-900">Our Startup Services</h2>
          <p className="text-[1.0625rem] text-green-700 mb-8">
            Our team is well accustomed to the challenges and needs of startups. We provide support from incorporation to recording transactions, reconciliations of payments, and finally reporting to authorities.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: Rocket, title: "Incorporation Support", description: "Guidance and assistance with the startup incorporation process." },
              { icon: Database, title: "Transaction Recording", description: "Accurate and timely recording of all business transactions." },
              { icon: ChartBar, title: "Payment Reconciliations", description: "Thorough reconciliation of all payments and financial accounts." },
              { icon: FileText, title: "Reporting to Authorities", description: "Preparation and submission of required reports to relevant authorities." }
            ].map((service, index) => (
              <div key={index} className="flex items-start">
                <service.icon className="w-8 h-8 text-green-600 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-green-900 mb-2">{service.title}</h3>
                  <p className="text-green-700">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-gradient-to-r from-green-50 to-teal-50 rounded-lg p-8 font-medium">
          <h2 className="text-3xl font-bold mb-4 text-green-900">ERP Integration for E-commerce</h2>
          <p className="text-[1.0625rem] text-green-700 mb-6">
            We specialize in integrating mini ERPs with various online business models, catering to all forms of e-commerce ventures. Our expertise ensures seamless integration and efficient management of your digital startup's financial operations.
          </p>
          <Button
            onClick={openQuoteModal}
            className="bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </section>
      </div>
    </main>
  );
}
