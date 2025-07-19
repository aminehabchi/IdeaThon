"use client";

import { useState, useEffect } from "react"
import { ArrowRight, Users, Lightbulb, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <>
      <IdeaThonsLanding></IdeaThonsLanding>
    </>
  );
}



// Navbar Component


// Stepper Component
function IdeathonStepper() {
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      number: 1,
      title: "Describe your Idea",
      description: "Explain your concept, the problem behind it, and what needs solving."
    },
    {
      number: 2,
      title: "Setup the contest details",
      description: ""
    },
    {
      number: 3,
      title: "Enjoy fresh ideas",
      description: ""
    },
    {
      number: 4,
      title: "Pick a winner",
      description: ""
    }
  ]

  // Auto advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div 
            key={step.number}
            className={`flex items-start space-x-4 cursor-pointer transition-all duration-300 ${
              activeStep === index ? 'opacity-100' : 'opacity-60 hover:opacity-80'
            }`}
            onClick={() => setActiveStep(index)}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 transition-colors duration-300 ${
              activeStep === index 
                ? 'bg-black text-white' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {step.number}
            </div>
            <div>
              <h4 className={`text-xl font-bold mb-2 transition-colors duration-300 ${
                activeStep === index ? 'text-black' : 'text-gray-500'
              }`}>
                {step.title}
              </h4>
              {step.description && (
                <p className={`transition-colors duration-300 ${
                  activeStep === index ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {step.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8">
        <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg">
          Start an IdeaThon
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  )
}

export  function IdeaThonsLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Use the separated Navbar component */}
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl lg:text-6xl font-bold text-black leading-tight">
              Brilliant Minds Think Differently — Together.
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Run an ideathon — a short idea challenge where people from your field 
              help you improve, challenge, or rethink your concept. In the end, the 
              best idea wins.
            </p>
          </div>
          
          {/* Hero Image Placeholder */}
          <div className="flex justify-center">
            <div className="w-80 h-80 bg-gray-100 rounded-3xl border-2 border-gray-200 flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <div className="text-sm font-medium">Hero Image</div>
                <div className="text-xs">Collaborative illustration</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post an Ideathon Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-black mb-6">Post an ideathon</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Run ideathons — short idea challenges where you post a concept and others help 
              improve, challenge, or reimagine it. Get diverse input from people who understand 
              your field. The best idea rises to the top.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Image Placeholder */}
            <div className="flex justify-center">
              <div className="w-full max-w-md h-96 bg-gray-100 rounded-xl border-2 border-gray-200 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <div className="text-lg font-medium mb-2">Smarter Planning for Remote Teams</div>
                  <div className="text-sm">Example ideathon image</div>
                </div>
              </div>
            </div>

            {/* Right Side - Interactive Stepper */}
            <IdeathonStepper />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold text-black">Collaborative Innovation</h4>
              <p className="text-gray-600">
                Harness the collective intelligence of your field to refine and improve your ideas.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Lightbulb className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-black">Fresh Perspectives</h4>
              <p className="text-gray-600">
                Get insights from diverse minds that can challenge and enhance your thinking.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Trophy className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold text-black">Best Ideas Win</h4>
              <p className="text-gray-600">
                Merit-based system ensures the most valuable contributions rise to the top.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-xl font-bold text-black">IdeaThons</div>
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-black transition-colors">Privacy</a>
              <a href="#" className="hover:text-black transition-colors">Terms</a>
              <a href="#" className="hover:text-black transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}