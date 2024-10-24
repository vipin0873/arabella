'use client'

import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, ChevronDown, ChevronUp, Loader } from 'lucide-react';
import { useQuoteModal } from '../contexts/QuoteModalContext';
import { Button } from "@/components/ui/button";
import ContactForm from "../components/ContactForm";
import { getFAQs } from '../firebase';

export default function FAQContact() {
  const { openQuoteModal } = useQuoteModal();
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      console.log("Fetching FAQs...");
      setIsLoading(true);
      const fetchedFAQs = await getFAQs();
      console.log("Fetched FAQs:", fetchedFAQs);
      setFaqs(fetchedFAQs);
      setIsLoading(false);
    };
    fetchFAQs();
  }, []);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <main className="min-h-screen pt-20 bg-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-green-900">FAQ & Contact</h1>
          <p className="text-base sm:text-lg text-green-700 font-medium max-w-3xl mx-auto">
            Find answers to common questions and get in touch with our team. We're here to provide the information and support you need.
          </p>
        </section>

        {/* Contact Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-900">Contact Us</h2>
          <ContactForm />
        </section>

        {/* General Contact Information */}
        <section className="bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-lg shadow-lg mb-24">
          <h2 className="text-2xl font-bold mb-6 text-center text-green-900">Get in Touch</h2>
          <div className="flex flex-col md:flex-row justify-around items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Phone className="w-6 h-6 text-green-600 mr-2" />
              <span className="text-green-800">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center mb-4 md:mb-0">
              <Mail className="w-6 h-6 text-green-600 mr-2" />
              <a href="mailto: info@arabellaconsultants.com" className="text-green-800 hover:underline">info@arabellaconsultants.com</a>
            </div>
            <div className="flex items-center">
              <MapPin className="w-6 h-6 text-green-600 mr-2" />
              <span className="text-green-800">123 Financial St, City, State 12345</span>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-center text-green-900">Frequently Asked Questions</h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader className="w-8 h-8 text-green-600 animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={faq.id} className="border border-green-200 rounded-lg">
                  <button
                    className="flex justify-between items-center w-full p-4 text-left"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="text-xl font-semibold text-green-800">{faq.question}</span>
                    {expandedFAQ === index ? <ChevronUp className="w-6 h-6 text-green-600" /> : <ChevronDown className="w-6 h-6 text-green-600" />}
                  </button>
                  {expandedFAQ === index && (
                    <div className="p-4 bg-green-50">
                      <p className="text-green-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-green-900">Ready to Get Started?</h2>
          <p className="text-[1.1875rem] text-green-700 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your financial goals. Our team is ready to provide expert guidance tailored to your needs.
          </p>
          <Button
            onClick={openQuoteModal}
            className="bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            Schedule a Consultation
          </Button>
        </section>
      </div>
    </main>
  );
}
