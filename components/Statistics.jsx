'use client'

import { Trophy, Users, Briefcase, Clock, Laptop } from "lucide-react";
import { useInView } from "react-intersection-observer";

const statistics = [
  { icon: Trophy, value: "9+", label: "Years of Excellence", color: "from-amber-400 to-amber-600" },
  { icon: Users, value: "600+", label: "Satisfied Clients", color: "from-blue-400 to-blue-600" },
  { icon: Briefcase, value: "1,100+", label: "Successful Projects", color: "from-green-400 to-green-600" },
  { icon: Clock, value: "250k+", label: "Hours of Expertise", color: "from-purple-400 to-purple-600" },
  { icon: Laptop, value: "20+", label: "Software Mastered", color: "from-pink-400 to-pink-600" },
];

export default function StatisticsShowcase() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent"
        >
          Our Achievements in Numbers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {statistics.map((stat, index) => (
            <div
              key={stat.label}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-300"></div>
              <div className="relative bg-gray-800 rounded-2xl p-8 shadow-xl transform group-hover:-translate-y-2 transition-transform duration-300">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center mb-6 mx-auto`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3
                  className="text-4xl font-bold text-center mb-2"
                >
                  {stat.value}
                </h3>
                <p className="text-lg text-center text-gray-300">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}