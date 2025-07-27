import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

export default function ReportIdeaPopup({ isOpen, onClose, entryId, entryNumber }) {
  console.log("entryId from report", entryId);
  
  const [issue, setIssueType] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!issue) {
      alert("Please select an issue type");
      return;
    }

    if (!description.trim()) {
      alert("Please provide a description");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare data according to the backend struct
      const reportData = {
        type_id: entryId, // The entry ID being reported
        issue: issue, // The selected issue type
        type: "entry", // Specify that this is an entry report
        description: description.trim() // The description from textarea
        // user_id will likely be set by the backend from authentication
        // created_at will be set by the backend
      };

      console.log("Submitting report:", reportData);

      const response = await fetcher({
        url: "http://localhost:8080/api/report/add",
        method: "POST",
        data: reportData, // Use 'data' instead of 'body' to match your fetcher function
        token: null, // Add actual token if you have user authentication
        returned_status: 201
      });

      console.log("Report submitted successfully:", response);
      
      // Reset form and close
      setIssueType("");
      setDescription("");
      onClose();
      
      // Optional: Show success message
      alert("Report submitted successfully");
      
    } catch (error) {
      console.error("Error submitting report:", error);
      alert("Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIssueType("");
    setDescription("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center gap-2 text-base font-medium text-gray-900">
            <Flag className="w-4 h-4" />
            Report Entry {entryNumber && `#${entryNumber}`} (ID: {entryId})
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
              placeholder="Please provide details about the issue you're reporting..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px] resize-none"
              maxLength={1000}
            />
            <div className="text-xs text-gray-500 text-right">
              {description.length}/1000 characters
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
              disabled={isSubmitting || !issue || !description.trim()}
            >
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}