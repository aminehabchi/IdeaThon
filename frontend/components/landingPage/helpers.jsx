"use client"

import { useState, useEffect } from 'react'


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
export  function IdeathonStepper() {
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