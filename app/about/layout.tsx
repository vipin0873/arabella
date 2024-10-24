import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Expert Financial Services Company',
  description: 'Learn about our company\'s journey, values, and approach to providing expert financial services. Discover how we empower businesses.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
