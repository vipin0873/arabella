import { Card, CardContent } from "@/components/ui/card"
import { Star } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "TechStart Inc.",
    content: "This accounting app has revolutionized our financial management. The real-time insights and easy-to-use interface have saved us countless hours and improved our decision-making process.",
    image : "https://i.pravatar.cc/100",
    rating: 5
  },
  {
    name: "Michael Chen",
    company: "GreenLeaf Restaurants",
    content: "As a restaurant chain owner, I needed a solution that could handle multiple locations and currencies. This app does it all, and the customer support is outstanding!",
    image : "https://i.pravatar.cc/140",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    company: "Rodriguez Law Firm",
    content: "The compliance features in this app are a game-changer for our law firm. It keeps us up-to-date with regulations and simplifies our tax reporting process significantly.",
    image : "https://i.pravatar.cc/120",
    rating: 4
  }
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            What Our Clients Say
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what business owners and financial professionals have to say about our accounting solution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">{testimonial.content}</p>
                  <div className="flex items-center">
                    <Image src={testimonial.image} alt={testimonial.name} width={40} height={40} className="rounded-full mr-4" />
                  </div>
                  <div className="font-semibold text-gray-800">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
