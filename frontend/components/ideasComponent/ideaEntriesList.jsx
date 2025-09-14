"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, MoreVertical, Trophy, Flag, Edit, Trash2, FileX } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import ReportIdeaPopup from './ideaReport';
import { fetcher, timeAgo } from '@/lib/helpers';
import {IdeaLoader} from "@/components/ui/cosloader"
import { DocumentContent } from "@/components/notionLike/ParserUtils/DocumentContent"
import { Toaster, toast } from 'sonner';
import Link from "next/link"

// Component for fetching and displaying entries for a specific ideathon
export function EntriesList({ id }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const router = useRouter();

  useEffect(() => {
    async function fetch_entry() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetcher({
          url: " /api/entries/get",
          method: "POST",
          data: { offset: 0, ideathon_id: id },
          token: null,
          returned_status: 200,
        });

        if (data && Array.isArray(data)) {
          data.map((d) => {
            d.description = JSON.parse(d.description)
          })
          setEntries(data);
        } else {
          setEntries([]);
        }
      } catch (err) {
        console.error("Error fetching entries:", err);
        setError("Failed to load entries. Please try again.");
        setEntries([]);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetch_entry();
    }
  }, [id])

  // Loading state
  if (loading || !id) {
    return (
       <IdeaLoader></IdeaLoader>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="mt-8 pt-8 border-gray-100">
        <div className="flex flex-col items-center justify-center py-12">
          <FileX className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Entries</h3>
          <p className="text-gray-500 text-sm text-center mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Use the shared EntriesGrid component
  return <EntriesGrid entries={entries} setEntries={setEntries} ideathonId={id} />;
}

// Component for displaying already-fetched entries (used in ProfileContent)
export function EntriesDisplay({ entries }) {
  const [entriesState, setEntriesState] = useState(entries);
  
  // Use the shared EntriesGrid component
  return <EntriesGrid entries={entriesState} setEntries={setEntriesState} />;
}

// Shared component for rendering the entries grid
function EntriesGrid({ entries, setEntries, ideathonId }) {
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [reportTargetEntry, setReportTargetEntry] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const router = useRouter();

  const openModal = (entry) => {
    setSelectedEntry(entry);
  };

  const closeModal = () => {
    setSelectedEntry(null);
  };
  
  const openReportPopup = (entry) => {
    setReportTargetEntry(entry);
    console.log("entry from popup", entry);
    setIsReportOpen(true);
  };

  const openDeleteDialog = (entry, e) => {
    e.stopPropagation();
    setEntryToDelete(entry);
    setShowDeleteDialog(true);
  };

  const handleDeleteEntry = async () => {
    if (!entryToDelete) return;
    
    setIsDeleting(true);
    
    try {
      console.log("Deleting entry...", entryToDelete.id);
      
      // Using query parameter since that matches the original code pattern
      await fetcher({
        url: `/api/entries/delete?entries_id=${entryToDelete.id}`,
        method: "DELETE",
        token: null,
        returned_status: 204
      });

      // Success - remove entry from local state
      if (setEntries) {
        setEntries(prevEntries => prevEntries.filter(entry => entry.id !== entryToDelete.id));
      }
      
      setShowDeleteDialog(false);
      setEntryToDelete(null);
      toast.success("Entry deleted successfully");
      
    } catch (error) {
      console.error("Error deleting entry:", error);
      
      // Show error message based on status
      if (error.status === 404) {
        toast.error("Entry not found");
      } else if (error.status === 403) {
        toast.error("You don't have permission to delete this entry");
      } else if (error.status === 401) {
        toast.error("You must be logged in to delete this entry");
      } else {
        toast.error("Failed to delete entry. Please try again.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // Empty state
  if (!entries || entries.length === 0) {
    return (
      <div className="mt-8 pt-8 border-gray-100">
        <div className="flex flex-col items-center justify-center py-12">
          <FileX className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Entries Found</h3>
          <p className="text-gray-500 text-sm text-center mb-4">
            {ideathonId 
              ? "There are no entries for this ideathon yet. Be the first to submit your idea!"
              : "You haven't submitted any entries yet. Participate in ideathons to see your entries here!"
            }
          </p>
          {ideathonId && (
            <button 
              onClick={() => {
                router.push(`/ideas/${ideathonId}/create`);
              }}
              className="px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
            >
              Submit an Entry
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 pt-8 border-gray-100">
        {/* Entries count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'} found
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map((entry) => {
            // Parse description if it's a string
            const description = typeof entry.description === 'string' 
              ? JSON.parse(entry.description) 
              : entry.description;

            return (
              <div
                key={entry.id}
                className="relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-sm transition-all duration-200 cursor-pointer"
                onClick={() => openModal({...entry, description})}
              >
                {/* Header with title and more menu */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500">
                    {description?.document?.title || "Untitled Entry"}
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

                      <DropdownMenuItem
                        className="flex items-center gap-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          openReportPopup({...entry, description});
                        }}
                      >
                        <Flag className="w-4 h-4" />
                        Report an issue
                      </DropdownMenuItem>

                      <DropdownMenuItem 
                        className="flex items-center gap-2 text-red-600 hover:text-red-600 focus:text-red-600"
                        onClick={(e) => openDeleteDialog({...entry, description}, e)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                        Delete
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link
                          href={`/ideas/${ideathonId || entry.ideathon_id}/entries/${entry.id}/update`}
                          className="flex items-center gap-2 text-black w-full"
                        >
                          <Edit className="w-4 h-4" />
                          Update
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Subtitle */}
                <h4
                  className="text-lg font-semibold text-gray-700 mb-3 leading-tight text-ellipsis overflow-hidden whitespace-nowrap"
                  dangerouslySetInnerHTML={{
                    __html: description?.blocks?.[0]?.data?.text || "No content available"
                  }}
                ></h4>

                {/* Description */}
                <p
                  className="text-sm text-gray-600 mb-4 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: description?.blocks?.[1]?.data?.text || ""
                  }}
                ></p>

                {/* Footer with author and time */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <img 
                      src={entry.owner?.avatar ? `/api/${entry.owner.avatar}` : "/empty_pfp.jpeg"} 
                      alt="avatar"
                      className="rounded-2xl w-6 h-6" 
                      onError={(e) => {
                        e.target.src = "/empty_pfp.jpeg";
                      }}
                    />
                    <span>
                      {entry?.owner?.first_name && entry?.owner?.last_name
                        ? `${entry.owner.first_name} ${entry.owner.last_name}`
                        : "Unknown Author"}
                    </span>
                  </div>
                  <span>{entry.created_at ? timeAgo(entry.created_at) : "Unknown date"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Entry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{entryToDelete?.description?.document?.title || 'this entry'}"? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => {
                setShowDeleteDialog(false);
                setEntryToDelete(null);
              }}
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEntry}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal Popup */}
      {selectedEntry && (
        <EntryPopUp 
          setSelectedEntry={setSelectedEntry} 
          selectedEntry={selectedEntry} 
          openReportPopup={openReportPopup} 
        />
      )}

      {/* Report popup */}
      {reportTargetEntry && (
        <ReportIdeaPopup
          isOpen={isReportOpen}
          onClose={() => {
            setIsReportOpen(false);
            setReportTargetEntry(null);
          }}
          entryId={reportTargetEntry.id}
        />
      )}
      <Toaster position="bottom-right"></Toaster>
    </>
  );
}

function EntryPopUp({ openReportPopup, setSelectedEntry, selectedEntry }) {
  const handleCloseModal = () => {
    setSelectedEntry(null);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg w-full max-w-full sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-6 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1">
              <img
                src={selectedEntry.owner?.avatar ? `/api/${selectedEntry.owner.avatar}` : "/empty_pfp.jpeg"}
                alt="avatar"
                className="rounded-2xl w-6 h-6"
                onError={(e) => {
                  e.target.src = "/default-avatar.png";
                }}
              />
              <span className="ml-2 text-sm text-gray-600">
                {selectedEntry?.owner?.first_name && selectedEntry?.owner?.last_name
                  ? `${selectedEntry.owner.first_name} ${selectedEntry.owner.last_name}`
                  : "Unknown Author"}
              </span>
            </div>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-600">
              {selectedEntry?.created_at ? timeAgo(selectedEntry.created_at) : "Unknown date"}
            </span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-600">
              {selectedEntry?.description?.document?.title || "Untitled"}
            </span>
            <span className="text-sm text-gray-400">•</span>
            <button 
              className="cursor-pointer text-gray-400 hover:text-gray-600 text-sm px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                openReportPopup(selectedEntry);
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
              onClick={handleCloseModal}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Modal Content */}
        {selectedEntry.description ? (
          <DocumentContent data={selectedEntry.description} />
        ) : (
          <div className="p-6 text-center">
            <p className="text-gray-500">No content available for this entry.</p>
          </div>
        )}
      </div>
    </div>
  );
}