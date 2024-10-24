"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { FileText, BarChart, ShieldCheck } from "lucide-react";

// Lazy load components
const ResourcesSection = dynamic(() => import("@/components/Resources"), {
  ssr: false,
});
const Statistics = dynamic(() => import("@/components/Statistics"), {
  ssr: false,
});
const TeamShowcase = dynamic(() => import("@/components/TeamShowcase"), {
  ssr: false,
});
const IndustriesServed = dynamic(
  () => import("@/components/IndustriesServed"),
  { ssr: false }
);
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  ssr: false,
});
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function Home() {
  return (
    <main>
      <div className="min-h-screen bg-white">
        <div className="mx-auto pt-24 pb-16">
          <div className="flex flex-col px-6 sm:px-16 lg:flex-row items-center justify-between">
            {/* Left side content */}
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0 pr-0 lg:pr-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-green-900 leading-tight">
                Empower Your{" "}
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-teal-600">
                  Financial Future
                </span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl mb-8 text-green-700 leading-relaxed">
                Unlock financial success with our expert remote services. From
                bookkeeping to tax returns, we've got you covered.
              </p>
              <a
                href="/services"
                className="bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                Explore Services
              </a>
            </div>

            {/* Right side illustration */}
            <div className="w-full lg:w-1/2">
              <Image
                src="/illustrations/hero-section.jpg"
                alt="Financial services illustration showcasing bookkeeping and analysis"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>

          {/* Service cards */}
          <section aria-labelledby="services-title">
            <h2 id="services-title" className="sr-only">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 px-6 sm:px-16 gap-8 mt-16">
              <ServiceCard
                icon={<FileText className="w-12 h-12 text-green-600" />}
                title="Expert Bookkeeping"
                description="Accurate and timely financial records to keep your business on track"
              />
              <ServiceCard
                icon={<BarChart className="w-12 h-12 text-teal-600" />}
                title="Financial Analysis"
                description="In-depth insights to drive informed business decisions"
              />
              <ServiceCard
                icon={<ShieldCheck className="w-12 h-12 text-emerald-600" />}
                title="Tax Optimization"
                description="Maximize deductions and ensure compliance with tax laws"
              />
            </div>
          </section>

          <ResourcesSection />
          <Statistics />
          <TeamShowcase />
          <IndustriesServed />
          <Testimonials />
        </div>
      </div>
    </main>
  );
}

function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="font-bold text-xl text-green-900 mb-2">{title}</h3>
      <p className="text-green-700">{description}</p>
    </div>
  );
}
