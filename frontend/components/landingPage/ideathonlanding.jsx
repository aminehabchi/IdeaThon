"use client";
import { Navbar } from "../navbar"
import {Users, Lightbulb, Trophy } from "lucide-react"
import { useState, useEffect } from "react";

export default  function IdeaThonsLanding() {
    return (
      <div className="min-h-screen bg-white">
        {/* Use the separated Navbar component */}
        <Navbar />
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl lg:text-5xl font-bold text-black leading-tight">
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
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 justify-items-center items-center  w-full">
                {/* Right Side - Interactive Stepper */}
              <IdeathonStepper />
                {/* Left Side - Dynamic Image */}
              <div className="w-full h-full  flex justify-center">
                <DynamicImage />
              </div>
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

  
let globalActiveStep = 0
const stepChangeListeners = []

function notifyStepChange(newStep) {
  globalActiveStep = newStep
  stepChangeListeners.forEach(listener => listener(newStep))
}

// Dynamic Image Component that changes based on stepper
export function DynamicImage() {
  const [activeStep, setActiveStep] = useState(0);

  const images = [
    { src: "/first.png" },
    { src: "/sec.png" },
    { src: "third.png" },
    { src: "fourth.png" },
  ];

  useEffect(() => {
    const listener = (newStep) => setActiveStep(newStep);
    stepChangeListeners.push(listener);

    return () => {
      const index = stepChangeListeners.indexOf(listener);
      if (index > -1) stepChangeListeners.splice(index, 1);
    };
  }, []);

  const current = images[activeStep];

  return (
    <div className="flex justify-center align-center items-center">
        <img
          src={current.src}
          alt={`Step ${activeStep + 1}`}
          className="object-contain h-full w-full transition-all duration-500"
        />
    </div>
  );
}


// Updated Stepper Component with left-side vertical progress bar
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
      description: "Set timeline, criteria, and participation rules."
    },
    {
      number: 3,
      title: "Enjoy fresh ideas",
      description: "Watch as participants submit and build on concepts."
    },
    {
      number: 4,
      title: "Pick a winner",
      description: "Review submissions and select the best solution."
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      const newStep = (activeStep + 1) % steps.length
      setActiveStep(newStep)
      notifyStepChange(newStep)
    }, 4000)

    return () => clearInterval(interval)
  }, [activeStep])

  const handleStepClick = (index) => {
    setActiveStep(index)
    notifyStepChange(index)
  }

  return (
    <div className="flex space-x-8">
      {/* Vertical Stepper */}
      <div className="relative flex flex-col items-center w-6">
        {/* Gray track */}
        <div className="absolute w-1 h-full bg-gray-200 rounded-full" />

        {/* Animated black progress bar aligned to step */}
        <div
          className="absolute w-[3px]  bg-black rounded-full transition-all  duration-600"
          style={{
            top: `${activeStep * 4}rem`,  // spacing between titles (each ~4rem apart)
            height: "3.2rem"
          }}
        />
      </div>

      {/* Step Titles and Descriptions */}
      <div className="flex-1 space-y-8">
        {steps.map((step, index) => (
          <div
            key={step.number}
            className={`cursor-pointer transition-opacity duration-300 ${
              activeStep === index ? 'opacity-100' : 'opacity-60 hover:opacity-80'
            }`}
            onClick={() => handleStepClick(index)}
          >
            <h4 className={`text-xl font-bold mb-2 ${
              activeStep === index ? 'text-black' : 'text-gray-500'
            }`}>
              {step.number} - {step.title}
            </h4>
            {activeStep === index && (
              <p className="text-gray-600 transition-all duration-300">
                {step.description}
              </p>
            )}
          </div>
        ))}

        {/* <div className="pt-8">
          <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg">
            Start an IdeaThon
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div> */}
      </div>
    </div>
  )
}

