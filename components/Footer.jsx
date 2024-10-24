'use client'

import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div
            className="space-y-4"
          >
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">Arabella Consultants</h3>
            <p className="text-gray-400">Empowering businesses with intelligent financial management solutions.</p>
            <div className="flex space-x-4 mt-6">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                  aria-label={`${Icon.name} link`}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div
          >
            <h4 className="text-xl font-semibold mb-4 text-teal-400">Quick Links</h4>
            <ul className="space-y-2">
              {[['Home' , "/"], ['Faq And Contact', '/faq-contact'], ['Services', '/services'], ['Startup Services', '/startup-services'], ['About', '/about']].map((item, index) => (
                <li key={index}>
                  <Link href={item[1]} className="text-gray-400 hover:text-teal-400 transition-colors">
                    <span className="sr-only">Navigate to {item[0]}</span>
                    {item[0]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
          >
            <h4 className="text-xl font-semibold mb-4 text-teal-400">Services</h4>
            <ul className="space-y-2">
              {['Payable & Receivable Management', 'Payroll & Tax Returns', 'Business Setup', 'Fixed Asset Management' , "Specialized Services for startups"].map((item, index) => (
                <li key={index}>
                  <Link href={item.includes("Specialized Services for startups") ? "/startup-services" : "/services"} className="text-gray-400 hover:text-teal-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div
          >
            <h4 className="text-xl font-semibold mb-4 text-teal-400">Connect With Us</h4>
            <p className="text-gray-400 mb-4">Follow us on social media for the latest news and insights.</p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-teal-400 transition-colors"
                  aria-label={`${Icon.name} link`}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div

          className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400"
        >
          <p>&copy; {new Date().getFullYear()} Arabella Consultants. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            {['Privacy Policy', 'Terms and Conditions' , 'Sitemap.xml'].map((item, index) => (
              <Link key={index} href={`/${item.toLowerCase().replaceAll(' ', '-')}`} className="text-gray-400 hover:text-teal-400 transition-colors">
                <span className="sr-only">Navigate to {item}</span>
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}