import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Comprehensive Financial Solutions',
  description: 'Explore our range of expert financial services including Payable & Receivable Management, Payroll & Tax Returns, Business Setup, and Fixed Asset Management etc. Tailored solutions for your business needs.',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
