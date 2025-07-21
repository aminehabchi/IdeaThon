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
// import { Textarea } from "@/components/ui/textarea";
import { Flag } from "lucide-react";

export default function ReportIdeaPopup({ isOpen, onClose, entryId = "34343", entryNumber = "5" }) {
  const [issueType, setIssueType] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    // Handle form submission here
    console.log("Report submitted:", { issueType, description });
    onClose();
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
            Report Entrie #{entryNumber} , id {entryId}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
        {/* Issue Type Selection */}
        <div className="space-y-2">
            <Label htmlFor="issue-type" className="text-sm font-medium text-gray-900">
            Issue
            </Label>
            <Select value={issueType} onValueChange={setIssueType}>
            <SelectTrigger id="issue-type" className="w-full">
                <SelectValue placeholder="Illegal" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="illegal">Illegal</SelectItem>
                <SelectItem value="spam">Spam</SelectItem>
                <SelectItem value="inappropriate">Inappropriate Content</SelectItem>
                <SelectItem value="copyright">Copyright Violation</SelectItem>
                <SelectItem value="harassment">Harassment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
            </SelectContent>
            </Select>
        </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-900">
              Describe the issue
            </Label>
            <Textarea
              id="description"
              placeholder="free"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[120px] resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="px-6"
            >
              cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="px-6 bg-gray-900 hover:bg-gray-800"
            >
              Submit
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}