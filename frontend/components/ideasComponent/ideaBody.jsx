import React from "react";

export  function IdeaBody() {
  return (
    <div className="px-6 py-8 bg-white">
      <div className="max-w-9xl mx-auto">
        {/* Problem Section */}
        <div className="space-y-6">
          {/* Section Title */}
          <h1 className="text-xl font-semibold text-gray-900">
            Problem
          </h1>
          
          {/* Problem Description */}
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p className="text-sm">
              we are trying to build the next best thing and we want to have your feedback about ... we are trying to build the 
              next best thing and we want to have your feedback about ... we are trying to build the next best thing and we want 
              to have your feedback about.
            </p>
            
            <p className="text-sm">
              we are trying to build the next best thing and we want to have your feedback about ... we are trying to build the 
              next best thing and we want to have your feedback about ... we are trying to build the next best thing and we want 
              to have your feedback about.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}