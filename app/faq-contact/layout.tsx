import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ & Contact | Expert Financial Services',
  description: 'Find answers to common questions and get in touch with our team for personalized financial solutions. We\'re here to help with your inquiries about jobs, support, and sales.',
};

export default function FAQContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
