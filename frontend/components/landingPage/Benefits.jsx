export default function Benefits() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <nav className="bg-white px-4 py-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold text-gray-900">
            ideaThons
          </div>
          <div className="flex space-x-6 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900">Privacy</a>
            <a href="#" className="hover:text-gray-900">Terms</a>
            <a href="#" className="hover:text-gray-900">Support</a>
          </div>
        </div>
      </nav>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Benefits
            </h2>
            <p className="text-lg text-gray-600">
              How does our platform help both parts
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 md:divide-x md:divide-gray-300">
            {/* Innovators Column */}
            <div className="space-y-8 md:pr-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                Innovators
              </h3>
              <div className="space-y-6">
                <div className="text-gray-600 text-lg">
                  Get diverse perspectives quickly
                </div>
                <div className="text-gray-600 text-lg">
                  Validate ideas with real users
                </div>
                <div className="text-gray-600 text-lg">
                  Crowdsource creative solutions
                </div>
                <div className="text-gray-600 text-lg">
                  Build community and engagement
                </div>
                <div className="text-gray-600 text-lg">
                  Discover potential collaborator
                </div>
              </div>
            </div>

            {/* Ideators Column */}
            <div className="space-y-8 md:pl-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">
                Ideators
              </h3>
              <div className="space-y-6">
                <div className="text-gray-600 text-lg">
                  Gain exposure and recognition
                </div>
                <div className="text-gray-600 text-lg">
                  Build a portfolio of ideas
                </div>
                <div className="text-gray-600 text-lg">
                  Win prizes or rewards
                </div>
                <div className="text-gray-600 text-lg">
                  Help shape real products or initiatives
                </div>
                <div className="text-gray-600 text-lg">
                  Have fun competing creatively
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}