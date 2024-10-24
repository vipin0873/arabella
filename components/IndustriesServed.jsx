"use client";

import { useState } from "react";
import {
  Building2,
  ShoppingCart,
  Briefcase,
  Truck,
  HardHat,
  Stethoscope,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const industries = [
  {
    name: "Real Estate",
    icon: Building2,
    description:
      "Specialized accounting solutions for property management, development, and real estate transactions.",
  },
  {
    name: "Retail",
    icon: ShoppingCart,
    description:
      "Tailored financial services for inventory management, point-of-sale integration, and multi-location businesses.",
  },
  {
    name: "Professional Services",
    icon: Briefcase,
    description:
      "Customized accounting for consultancies, law firms, and other service-based businesses.",
  },
  {
    name: "Transportation",
    icon: Truck,
    description:
      "Comprehensive financial management for logistics, fleet operations, and transportation companies.",
  },
  {
    name: "Construction",
    icon: HardHat,
    description:
      "Project-based accounting solutions for contractors, builders, and construction firms.",
  },
  {
    name: "Healthcare",
    icon: Stethoscope,
    description:
      "Specialized financial services for medical practices, hospitals, and healthcare providers.",
  },
];

export default function IndustriesServed() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            Industries We Serve
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Our accounting solutions are tailored to meet the unique needs of
            various industries, providing specialized features and insights for
            each sector.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <IndustryCard
              key={industry.name}
              industry={industry}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function IndustryCard({ industry, index }) {
  return (
    <div>
      <Card className="overflow-hidden cursor-pointer group transition-all duration-300 h-56">
        <CardContent className="p-4 h-full">
          <div className="flex flex-col items-center text-center h-full relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 group-hover:-translate-y-full">
              <div className="bg-teal-500 p-3 rounded-full shadow-lg mb-3 group-hover:shadow-xl transition-all duration-300">
                <industry.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {industry.name}
              </h3>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-full group-hover:translate-y-0">
              <p className="text-gray-700 text-base px-2">
                {industry.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
