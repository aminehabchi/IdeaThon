import React, { useState } from 'react';
import { X } from 'lucide-react';

export function EntriesList() {
  const [selectedEntry, setSelectedEntry] = useState(null);
  
  const entries = [
    {
      id: 1,
      title: "# IDEA 1",
      subtitle: "UI/UX Design Development",
      description: "we are trying to build the next best thing and we want to have your feedback about ...",
      fullContent: "we are trying to build the next best thing and we want to have your feedback about ... we are trying to build the next best thing and we want to have your feedback about ... we are trying to build the next best thing and we want to have your feedback about ...",
      imgPath: "/belmaayo_avatar.png",
      author: "By Asana",
      timeAgo: "5 Days ago"
    },
    {
      id: 2,
      title: "# IDEA 2", 
      subtitle: "Search for a better materials",
      description: "we are trying to build the next best thing and we want to have your feedback about ...",
      fullContent: "we are trying to build the next best thing and we want to have your feedback about ... we are trying to build the next best thing and we want to have your feedback about ... we are trying to build the next best thing and we want to have your feedback about ...",
      imgPath: "/belmaayo_avatar.png",
      author: "By Asana",
      timeAgo: "5 Days ago"
    },
    {
      id: 3,
      title: "# IDEA 3",
      subtitle: "Advanced Analytics Dashboard", 
      description: "we are trying to build the next best thing and we want to have your feedback about ...",
      fullContent: "we are trying to build the next best thing and we want to have your feedback about ... we are trying to build the next best thing and we want to have your feedback about ... we are trying to build the next best thing and we want to have your feedback about ...",
      imgPath: "/belmaayo_avatar.png",
      author: "By Asana", 
      timeAgo: "5 Days ago"
    }
  ];

  const openModal = (entry) => {
    setSelectedEntry(entry);
  };

  const closeModal = () => {
    setSelectedEntry(null);
  };

  return (
    <>
      <div className="mt-8 pt-8  border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => openModal(entry)}
              className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              {/* Image placeholder area */}
              <div className="h-32 bg-gray-100 relative overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <img
                    src={entry.imgPath}
                    alt="entry banner"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Hover overlay with blur effect */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium text-lg">Read</span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-4">
                {/* Title and subtitle */}
                <div className="mb-3">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    {entry.title}
                  </h3>
                  <h4 className="text-lg font-semibold text-gray-900 leading-tight">
                    {entry.subtitle}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {entry.description}
                </p>

                {/* Footer with author and time */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <img
                      src={entry.imgPath}
                      alt="Author Avatar"
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="ml-1">{entry.author}</span>
                  </div>
                  <span>{entry.timeAgo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      {selectedEntry && (
     <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                    <img src="/belmaayo_avatar.png" alt="avatar"  className="w-6 h-6 rounded-full"/>
                  <span className="ml-2 text-sm text-gray-600">{selectedEntry.author}</span>
                </div>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-600">{selectedEntry.timeAgo}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-600">{selectedEntry.title}</span>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Imagine the future of General robotics
              </h1>

              {/* Solution Section */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Solution
                </h2>
                <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
                  <p>
                    we are trying to build the next best thing and we want to have your feedback about ... we are trying to build the next best thing and we want to have your feedback about ... we are trying to build the next best thing and we want to have your feedback about ...
                  </p>
                  <p>
                    we are trying to build the next best thing and we want to have your feedback about ... we are trying to build the next best thing and we want to have your feedback about ... we are trying to build the next best thing and we want to have your feedback about ...
                  </p>
                </div>
              </div>

              {/* Image Section */}
              <div className="mb-6">
                <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
                  {/* Image placeholder - replace with actual image path */}
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={selectedEntry.imgPath}
                      alt="entry banner"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}