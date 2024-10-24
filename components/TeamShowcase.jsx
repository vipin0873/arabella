'use client'

import { Calculator, FileCheck, Users } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"

const teamRoles = [
  {
    title: "Financial Analyst",
    icon: Calculator,
    color: "bg-teal-800",
    iconColor: "text-teal-200",
    responsibilities: [
      "In-depth financial analysis",
      "Custom financial reports",
      "Cost-saving opportunities",
      "Financial trend forecasting",
      "Budgeting and planning assistance",
      "Actionable financial insights"
    ]
  },
  {
    title: "Compliance Specialist",
    icon: FileCheck,
    color: "bg-blue-800",
    iconColor: "text-blue-200",
    responsibilities: [
      "Accounting standards adherence",
      "Tax compliance and reporting",
      "Internal audits",
      "Regulatory change updates",
      "Financial statement preparation",
      "Risk management strategies"
    ]
  },
  {
    title: "Client Success Manager",
    icon: Users,
    color: "bg-purple-700",
    iconColor: "text-purple-200",
    responsibilities: [
      "Personalized financial guidance",
      "Regular client check-ins",
      "Query and concern resolution",
      "Tailored financial solutions",
      "Seamless communication",
      "Client satisfaction assurance"
    ]
  }
]

export default function TeamShowcase() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-800">
            Your All-in-One Accounting Solution
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of a full-fledged accounting team at your fingertips. Our app combines expert knowledge with cutting-edge technology to provide{" "}
            <span className="font-bold text-teal-600">comprehensive financial management</span> for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamRoles.map((role, index) => (
            <RoleCard key={role.title} role={role} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function RoleCard({ role, index }) {
  return (
    <div
    >
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
        <CardContent className="p-0">
          <div className={`p-6 ${role.color} bg-opacity-90 group-hover:bg-opacity-100 transition-all duration-300`}>
            <div className="flex items-center mb-4">
              <role.icon className={`w-8 h-8 ${role.iconColor} mr-4`} />
              <h3 className="text-2xl font-bold text-white">{role.title}</h3>
            </div>
            <ul className="space-y-2">
              {role.responsibilities.map((responsibility, idx) => (
                <li
                  key={idx}
                  className="flex items-start text-white"
                >
                  <svg className="w-5 h-5 text-white/80 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className='font-bold'>{responsibility}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
