import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Startup Services | Tailored Solutions for Your Business',
  description: 'Expert services for startups, including business setup, financial management, and ERP integration.',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}
