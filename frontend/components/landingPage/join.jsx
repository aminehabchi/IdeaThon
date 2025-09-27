import React from 'react';

const CommunityHero = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      {/* Single PNG Image - REPLACE WITH YOUR COMPLETE IMAGE */}
      <div className="mb-16">
        <img src="/bgg2.png" alt="Community" className="w-auto h-auto" />
      </div>

      <h1 className="text-5xl font-bold text-gray-900 text-center mb-4">
        Join +6 Minds And Think<br/>the future Together
      </h1>
      
      <p className="text-lg text-gray-600 mb-8">Help us build A comunity</p>

      <button className="flex items-center gap-2 bg-white px-6 py-3 rounded-full border border-gray-300 font-medium hover:bg-gray-50 hover:shadow-md transition-all cursor-pointer">
        Join Now
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 17L17 7"/>
          <path d="M7 7h10v10"/>
        </svg>
      </button>
    </div>
  );
};

export default CommunityHero;