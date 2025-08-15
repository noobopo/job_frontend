import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { ThumbsUp, Clock, CheckCircle, Headphones } from 'lucide-react'

const reasons = [
  {
    title: 'Fast Hiring',
    description: 'Employers fill roles quickly with our streamlined platform.',
    icon: Clock
  },
  {
    title: 'Verified Candidates',
    description: 'All profiles are authentic and skill‑verified for quality hires.',
    icon: CheckCircle
  },
  {
    title: 'Trusted by Many',
    description: 'Thousands of candidates and employers trust our platform.',
    icon: ThumbsUp
  },
  {
    title: '24/7 Support',
    description: 'We provide assistance anytime you need help or guidance.',
    icon: Headphones
  }
]

const FeaturesSection = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">Why Choose Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reasons.map((reason, index) => (
            <Card key={index} className="rounded-xl shadow-sm">
              <CardHeader className="flex flex-row items-center gap-3">
                <reason.icon className="h-6 w-6 text-gray-700" />
                <CardTitle className="text-lg">{reason.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
