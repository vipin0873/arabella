'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader } from 'lucide-react';
import { submitMessage } from '../firebase';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Confetti from 'react-confetti';

type ContactType = 'jobs' | 'support' | 'sales';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [contactType, setContactType] = useState<ContactType>('support');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const messageData = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      message,
      contactType,
      status: 'unread',
      timestamp: new Date(),
    };
    const result = await submitMessage(messageData);
    setIsSubmitting(false);
    if (result.success) {
      setIsSubmitted(true);
      setShowConfetti(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setShowConfetti(false);
        resetForm();
      }, 5000);
    } else {
      console.error('Failed to submit message');
    }
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setContactType('support');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {showConfetti && <Confetti />}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="contactType" className="block text-sm font-medium text-green-700 mb-1">
            I want to contact about:
          </label>
          <select
            id="contactType"
            value={contactType}
            onChange={(e) => setContactType(e.target.value as ContactType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="jobs">Jobs</option>
            <option value="support">Support</option>
            <option value="sales">Sales</option>
          </select>
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-green-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-green-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-green-700 mb-1">
            Phone Number
          </label>
          <PhoneInput
            country={'us'}
            value={phone}
            onChange={(phone) => setPhone(phone)}
            inputProps={{
              required: true,
              className: 'w-full pl-14 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500',
            }}
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-green-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={isSubmitting || isSubmitted}
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 transform hover:shadow-lg flex items-center justify-center"
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-6 h-6 border-t-2 border-white rounded-full"
            />
          ) : isSubmitted ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              <Check size={24} />
            </motion.div>
          ) : (
            'Submit Your Message'
          )}
        </button>
      </form>
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="mt-6 text-center text-green-600 font-semibold"
          >
            Thank you for your message! We'll get back to you soon.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
