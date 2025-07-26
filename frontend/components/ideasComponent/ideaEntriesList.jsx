"use client"
import React, { useState, useEffect } from 'react';
import { X, MoreVertical, Trophy, Flag, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ReportIdeaPopup from './ideaReport';
import { fetcher, timeAgo } from '@/lib/helpers';

import { DocumentContent } from "@/components/notionLike/ParserUtils/DocumentContent"

export function EntriesList({ id }) {
  console.log("entries id", id);

  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function fetch_entry() {

      const data = await fetcher({
        url: " http://localhost:8080/api/entries/get",
        method: "POST",
        data: { offset: 0, ideathon_id: id },
        token: null,
        returned_status: 200,
      });


      console.log("entries data 7777777", data);
      data.map((d) => {
        d.description = JSON.parse(d.description)
      })
      setEntries(data);
      // console.log(data[0].description.content.blocks[0].data.text);
    }

    fetch_entry();
  }, [])

  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportTargetEntry, setReportTargetEntry] = useState(null);



  const openModal = (entry) => {
    setSelectedEntry(entry);
  };

  const closeModal = () => {
    setSelectedEntry(null);
  };

  const openReportPopup = (entry = null) => {
    setReportTargetEntry(entry);
    setIsReportOpen(true);
  };
  // console.log("entries------------->",entries);

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
                  {entry.description.document.title}
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
                    <DropdownMenuItem className="cursor-pointer w-full flex items-center gap-2 whitespace-nowrap">
                      <Trophy className="w-4 h-4" />
                      Pick As a winner
                    </DropdownMenuItem>


                    {/* Report button */}
                    <DropdownMenuItem
                      className="flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent modal opening
                        openReportPopup(entry);
                      }}
                    >
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
              <h4
                className="text-lg font-semibold text-gray-700 mb-3 leading-tight text-ellipsis overflow-hidden whitespace-nowrap"
                dangerouslySetInnerHTML={{
                  __html: entry.description.blocks?.[0]?.data?.text || ""
                }}
              ></h4>

              {/* Description */}
              <p
                className="text-sm text-gray-600 mb-4 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: entry.description.blocks?.[1]?.data?.text || ""
                }}
              ></p>

              {/* Footer with author and time */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <img src={`http://localhost:8080/api/${entry.owner.avatar}`} alt="avatar"
                    className=" rounded-2xl w-6 h-6" />
                  <span> {entry?.owner?.first_name && entry?.owner?.last_name
                    ? `${entry.owner.first_name} ${entry.owner.last_name}`
                    : "author name"}</span> {/* working on it*/}
                </div>
                <span>{timeAgo(entry.created_at)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup */}
      {selectedEntry && (
        < EntryPopUp setSelectedEntry={setSelectedEntry} selectedEntry={selectedEntry} openReportPopup={openReportPopup} />
      )}

      {/* report popup */}
      {reportTargetEntry && (
        <ReportIdeaPopup
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          entryId={reportTargetEntry.id}
        // entryNumber={reportTargetEntry.title.replace(/\D/g, '')}
        />
      )}
    </>
  );
}

function EntryPopUp({ openReportPopup, setSelectedEntry, selectedEntry }) {
  console.log(`localhost:8080/api/${selectedEntry.owner.avatar}`);

  return <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
    <div className=" bg-white  rounded-lg w-full max-w-full sm:max-w-4xl max-h-[90vh] overflow-y-auto">
      {/* Modal Header */}
      <div className="flex flex-col sm:flex-row sm:items-center  justify-between gap-4 p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1">
            <img
              src={`http://localhost:8080/api/${selectedEntry.owner.avatar}`}
              alt="avatar"
              className="rounded-2xl w-6 h-6"
            />
            <span className="ml-2 text-sm text-gray-600">
              {selectedEntry?.owner?.first_name && selectedEntry?.owner?.last_name
                ? `${selectedEntry.owner.first_name} ${selectedEntry.owner.last_name}`
                : "author name"}
            </span>
          </div>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-600">{timeAgo(selectedEntry?.created_at || "create at")}</span>
          <span className="text-sm text-gray-400">•</span>
          <span className="text-sm text-gray-600">{selectedEntry?.description?.document?.title || "title"}</span>
          <span className="text-sm text-gray-400">•</span>
          <button className="cursor-pointer text-gray-400 hover:text-gray-600 text-sm px-3 py-1.5 rounded-lg flex items-center gap-2  transition-colors"
            onClick={(e) => {
              e.stopPropagation(); // prevent modal opening
              openReportPopup(true);
            }}
          >
            <Flag className="w-4 h-4" />
            <span className="sm:inline">report</span>
          </button>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <button className="cursor-pointer bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
            <Trophy className="w-4 h-4" />
            <span className="sm:inline">Pick as a winner</span>
          </button>
          <button
            onClick={() => setSelectedEntry(null)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      {/* it should display the content of the selected entry from the parser*/}
      {/* Modal Content */}
      <DocumentContent data={selectedEntry.description} />
    </div>
  </div>
}



// <div className="p-4 sm:p-6">
//   {/* Title */}
//   <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
//     {selectedEntry.description.document.title}
//   </h1>

//   {/* Solution Section */}
//   <div className="mb-6">
//     <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
//       Solution
//     </h2>
//     <div className="space-y-3 sm:space-y-4 text-gray-700 text-sm leading-relaxed">
//       <p>
//         we are trying to build the next best thing and we want to have your
//         feedback about ... we are trying to build the next best thing and we
//         want to have your feedback about ...
//       </p>
//       <p>
//         we are trying to build the next best thing and we want to have your
//         feedback about ... we are trying to build the next best thing and we
//         want to have your feedback about ...
//       </p>
//     </div>
//   </div>

//   {/* Image Section */}
//   <div className="mb-4 sm:mb-6">
//     <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
//      <img
//       src={selectedEntry.banner || "/default-banner.jpg"}
//       alt="entry banner"
//       className="w-full h-full object-cover"
//     />
//     </div>
//   </div>
// </div>