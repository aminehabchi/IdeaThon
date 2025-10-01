"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Unlock, Clock, Lock, Edit, Trash2, Flag, MoreVertical } from "lucide-react";
import Link from "next/link";
import { extractDocumentData } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import ReportIdeaPopup from '@/components/ideasComponent/ideaReport';
import { fetcher } from "@/lib/helpers";
import { toast } from "sonner";

export const DocumentHeader = ({ data }) => {
  const { user } = useAuth();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  console.log("user header", user);
  
  const extractedData = extractDocumentData(data);
  const {
    item,
    owner,
    privacy,
    daysLeft,
    price,
    currency,
  } = extractedData;

  const isOwner = user && user.id === owner.id;

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    
    try {
      console.log("Deleting idea...");
      
      await fetcher({
        url: `/api/ideathons/delete?ideathon_id=${item.id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        token: null, // Add your auth token here if needed
        returned_status: 204
      });

      // Success - close dialog and show success message
      setShowDeleteDialog(false);
      toast.success("Idea deleted successfully");
      
      // Redirect to ideas list or refresh page
      // Option 1: Redirect to ideas list
      window.location.href = "/ideas";
      
      // Option 2: Refresh current page (uncomment if preferred)
      // window.location.reload();
      
    } catch (error) {
      console.error("Error deleting idea:", error);
      
      // Show error message based on status
      if (error.status === 404) {
        toast.error("Idea not found");
      } else if (error.status === 403) {
        toast.error("You don't have permission to delete this idea");
      } else if (error.status === 401) {
        toast.error("You must be logged in to delete this idea");
      } else {
        toast.error("Failed to delete idea. Please try again.");
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReportClick = () => {
    setShowReportDialog(true);
  };

  const handleReportClose = () => {
    setShowReportDialog(false);
  };

  return (
    <>
      <nav className="border-b bg-gray-100 py-4 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
          {/* Left: owner avatar/name, privacy badge, days left */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <img
                src={owner?.avatar ? `/api${owner.avatar}` : "/empty_pfp.jpeg"}
                alt={`${owner?.first_name || "User"} avatar`}
                className="w-6 h-6 rounded-2xl"
                onError={(e) => {
                  e.currentTarget.onerror = null; // prevent infinite loop
                  e.currentTarget.src = "/empty_pfp.jpeg";
                }}
              />
              <span className="font-medium text-gray-900">
                By {owner.first_name} {owner.last_name}
              </span>
            </div>

            <Badge
              variant="secondary"
              className="bg-gray-100 text-gray-600 hover:bg-gray-100 font-medium px-3 py-1 flex items-center"
            >
              {privacy.toLowerCase() === "private" ? (
                <Lock className="w-3 h-3 mr-1" />
              ) : (
                <Unlock className="w-3 h-3 mr-1" />
              )}
              {privacy}
            </Badge>

            {daysLeft !== null && (
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{daysLeft}</span>
              </div>
            )}

            {/* Three dots dropdown menu for owner actions */}
            {isOwner && (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-200 transition-colors">
                  <MoreVertical className="w-4 h-4 text-gray-600" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/ideas/${item.id}/update`}
                      className="flex items-center gap-2 w-full"
                    >
                      <Edit className="w-4 h-4" />
                      Update
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleDeleteClick}
                    className="flex items-center gap-2 text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleReportClick}
                    className="flex items-center gap-2"
                  >
                    <Flag className="w-4 h-4" />
                    Report
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Right: price and Participate button */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            {price === 0 ? (
              <span className="text-base sm:text-sm font-semibold text-gray-600  px-3 py-1 rounded">
                Free
              </span>
            ) : (
              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                {price} {currency}
              </span>
            )}

            {/* Show Participate only if user is not the owner and not ended */}
            {!isOwner && (
              daysLeft === 0 || daysLeft === "0" || daysLeft === "Ended" || daysLeft === null ? (
                <span className="text-gray-400 text-base font-medium px-6 py-2 rounded-md w-full sm:w-auto bg-gray-100 cursor-not-allowed select-none">
                  Ended
                </span>
              ) : (
                <Link
                  href={`/ideas/${item.id}/create`}
                  className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-2 rounded-md w-full sm:w-auto transition-colors"
                >
                  Participate
                </Link>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this idea?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your idea
              and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Report Ideathon Popup */}
      <ReportIdeaPopup 
        isOpen={showReportDialog}
        onClose={handleReportClose}
        ideathonId={item.id}
        ideathonTitle={item.title || item.name || `Idea ${item.id}`}
        reportType="ideathon"
      />
    </>
  );
};