
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

// Testimonial interface
interface Testimonial {
  name: string;
  location: string;
  text: string;
  amount: string;
}

const TestimonialsSection: React.FC = () => {
  // Sample testimonials data
  const testimonials: Testimonial[] = [
    {
      name: "John Smith",
      location: "United States",
      text: "I've been staking with Crypto Vest for 6 months and already withdrawn over $15,000. Best platform I've used!",
      amount: "$15,000"
    },
    {
      name: "Maria Rodriguez",
      location: "Spain",
      text: "The returns are amazing and withdrawals are processed within minutes. Very trustworthy platform!",
      amount: "$8,500"
    },
    {
      name: "Wei Zhang",
      location: "Singapore",
      text: "Started with just $500 and now making passive income daily. Customer support is excellent too.",
      amount: "$4,200"
    }
  ];

  return (
    <section className="py-20 bg-[#0B0E11]/70">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Withdrawals from <span className="text-[#F0B90B]">Real Users</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Don't just take our word for it. Here's what our users have to say about their experience.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-[#474D57] bg-[#1E2026] overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.location}</p>
                  </div>
                  <div className="bg-green-500/10 px-3 py-1 rounded-full flex items-center">
                    <span className="text-green-500 font-semibold">{testimonial.amount}</span>
                  </div>
                </div>
                <p className="text-gray-300">{testimonial.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
