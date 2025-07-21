import React, { useState } from 'react';
import { X, MoreVertical, Trophy, Flag, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export  function EntriesList() {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-all duration-200 cursor-pointer"
              onClick={() => openModal(entry)}
            >
              {/* Header with title and more menu */}
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500">
                  {entry.title}
                </h3>
                <DropdownMenu>
                  <DropdownMenuTrigger 
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button className="p-1 hover:bg-gray-200 rounded-full transition-colors cursor-pointer">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      Pick As a winner
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2">
                      <Flag className="w-4 h-4" />
                      Report an issue
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Subtitle */}
              <h4 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                {entry.subtitle}
              </h4>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {entry.description}
              </p>

              {/* Footer with author and time */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                <img src="/belmaayo_avatar.png" alt="avatar"   
                    className=" rounded-2xl w-6 h-6"/>
                  <span>{entry.author}</span>
                </div>
                <span>{entry.timeAgo}</span>
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

                    <img src="/belmaayo_avatar.png" alt="avatar"   
                    className=" rounded-2xl w-6 h-6"/>
                    
                  <span className="ml-2 text-sm text-gray-600">{selectedEntry.author}</span>
                </div>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-600">{selectedEntry.timeAgo}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-600">{selectedEntry.title}</span>
              </div>
              <button className='text-gray-400 cursor-pointer border-2 border-gray-400 rounded-lg px-2 py-1 hover:text-gray-600 transition-colors flex items-center gap-1'>
                <Trophy className='w-5 h-5'></Trophy>
                pick winner
              </button>
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