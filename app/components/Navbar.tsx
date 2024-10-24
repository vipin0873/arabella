'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useQuoteModal } from '../contexts/QuoteModalContext'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Startup Services', href: '/startup-services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/faq-contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { openQuoteModal } = useQuoteModal();

  return (
    <nav className="bg-white bg-opacity-90 backdrop-blur-md shadow-lg fixed top-0 w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/">
              <div
                className=" text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent"
              >
                Arabella Consultants
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div
                key={item.name}
              >
                <Link
                  href={item.href}
                  className="text-green-700 hover:text-green-500 transition-colors duration-300 text-base font-medium"
                >
                  {item.name}
                </Link>
              </div>
            ))}
            <div
            >
              <Button
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300"
                onClick={openQuoteModal}
              >
                Get A Quote
              </Button>
            </div>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-600 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md p-2"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

        {isOpen && (
          <div
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-green-700 hover:text-green-500 hover:bg-green-50 transition duration-300"
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-4 px-3">
                <Button
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold py-2 rounded-full hover:shadow-lg transition-all duration-300"
                  onClick={openQuoteModal}
                >
                  Get A Quote
                </Button>
              </div>
            </div>
          </div>
        )}
            </nav>
  )
}
