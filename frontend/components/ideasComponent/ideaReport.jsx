import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Toaster, toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Flag } from "lucide-react";
import { fetcher } from "@/lib/helpers";
import { useAuth } from "@/context/AuthContext";

export default function ReportIdeaPopup({ 
  isOpen, 
  onClose, 
  // Legacy entry props (for backward compatibility)
  entryId, 
  entryNumber,
  // New ideathon props
  ideathonId,
  ideathonTitle,
  reportType = "entrie" // Default to "entrie" for backward compatibility
}) {
  const { user } = useAuth();
  
  const [issue, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Determine which data to use based on what's provided
  const targetId = ideathonId || entryId;
  const targetTitle = ideathonTitle || (entryNumber ? `Entry #${entryNumber}` : `Entry ${entryId}`);
  const targetType = reportType;

  const handleSubmit = async () => {
    if (!issue) {
       toast.error("Please select an issue type");
      return;
    }

    if (!description.trim()) {
      toast.error("Please provide a description");
      return;
    }

    if (description.trim().length < 20) {
      toast.error("Description must be at least 20 characters.");
      return;
    }

    if (!user || !user.id) {
      toast.error("You must be logged in to submit a report");
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate a subject based on the issue type and target
      const subjectMap = {
        spam: "Spam Content Report",
        harassment: "Harassment Report", 
        misinformation: "Misinformation Report",
        copyright: "Copyright Violation Report",
        inappropriate: "Inappropriate Content Report",
        illegal: "Illegal Content Report",
        other: "Other Issue Report"
      };

      const typeLabel = targetType === "ideathon" ? "Ideathon" : "Entry";
      const subject = `${subjectMap[issue] || "Content Report"} - ${typeLabel}: ${targetTitle}`;

      // Prepare data according to the backend struct
      const reportData = {
        user_id: user.id, // Required: The user submitting the report
        type_id: targetId, // The ideathon/entry ID being reported
        email: user.email || "", // Required: User's email (fallback to empty string)
        subject: subject, // Required: Generated subject
        type: targetType, // Required: "ideathon" or "entrie"
        issue: issue, // Required: The selected issue type
        description: description.trim(), // Required: The description from textarea
        is_solved: false // Boolean: Not solved yet (false instead of 0)
        // created_at will be set by the backend automatically
      };

      const response = await fetcher({
        url: "/api/report/add",
        method: "POST",
        data: reportData,
        token: null, // Add actual token if your API requires authentication
        returned_status: 201
      });

      // Reset form and close
      setIssueType("");
      setDescription("");
      onClose();
      
      // Show success message
      toast.success("Report submitted successfully. We'll review it shortly.");

    } catch (error) {
      // More specific error handling
      if (error.message && error.message.includes("20 characters")) {
        toast.error("Description must be at least 20 characters.");
      } else if (error.status === 400) {
        toast.error("Invalid report data. Please check all fields.");
      } else if (error.status === 401) {
        toast.error("You must be logged in to submit a report.");
      } else {
        toast.error("Failed to submit report. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIssueType("");
    setDescription("");
    onClose();
  };

  // Don't render if user is not logged in
  if (!user) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-2 text-base font-medium text-gray-900">
            <Flag className="w-4 h-4" />
            Report {targetType === "ideathon" ? "Ideathon" : "Entry"}: {targetTitle}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Issue Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="issue-type" className="text-sm font-medium text-gray-900">
              Issue Type <span className="text-red-500">*</span>
            </Label>
            <Select value={issue} onValueChange={setIssueType}>
              <SelectTrigger id="issue-type" className="w-full">
                <SelectValue placeholder="Select an issue type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="illegal">Illegal Content</SelectItem>
                <SelectItem value="spam">Spam</SelectItem>
                <SelectItem value="inappropriate">Inappropriate Content</SelectItem>
                <SelectItem value="copyright">Copyright Violation</SelectItem>
                <SelectItem value="harassment">Harassment</SelectItem>
                <SelectItem value="misinformation">Misinformation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-900">
              Describe the issue <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Please provide details about the issue you're reporting (minimum 20 characters)..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px] resize-none"
              maxLength={1000}
            />
            <div className="text-xs text-gray-500 text-right">
              {description.length}/1000 characters (minimum 20)
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="px-6"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="px-6 bg-gray-900 hover:bg-gray-800"
              disabled={isSubmitting || !issue || !description.trim() || description.trim().length < 20}
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}