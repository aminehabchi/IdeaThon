"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Bug, AlertTriangle, HelpCircle, MessageSquare, Send, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { DashboardNavbar } from "@/components/navbarcomps/dashboardNavbar";
import { fetcher } from "@/lib/helpers";

export default function ReportPage() {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    description: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters long";
    } else if (formData.subject.trim().length > 100) {
      newErrors.subject = "Subject must be less than 100 characters";
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = "Please select an issue type";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Description must be at least 20 characters long";
    } else if (formData.description.trim().length > 2000) {
      newErrors.description = "Description must be less than 2000 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare data according to your database schema
      const reportData = {
        subject: formData.subject.trim(),
        issue: formData.category, // Maps to the issue field in DB
        type: "generale", // Fixed type for this form
        description: formData.description.trim(),
        email: formData.email.trim().toLowerCase()
      };

      await fetcher({
        url: "/api/report/add",
        method: "POST",
        data: reportData,
        token: null,
        returned_status: 201,
      });

      // If fetcher doesn't throw an error, submission was successful
      setSubmitted(true);
    } catch (error) {
      // The fetcher function already shows toast.error, so we just set our local error
      console.error("Error submitting report:", error);
      setSubmitError(error.message || "Failed to submit report. Please try again or contact support directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const reportCategories = [
    { value: "bug", label: "Bug Report", icon: Bug, color: "bg-red-100 text-red-800" },
    { value: "feature", label: "Feature Request", icon: MessageSquare, color: "bg-blue-100 text-blue-800" },
    { value: "security", label: "Security Issue", icon: AlertTriangle, color: "bg-orange-100 text-orange-800" },
    { value: "general", label: "General Inquiry", icon: HelpCircle, color: "bg-gray-100 text-gray-800" }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Your report has been submitted successfully. We'll review it and get back to you soon.
            </p>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/ideas">Back to Ideas</Link>
              </Button>
              <Button variant="outline" onClick={() => {
                setSubmitted(false);
                setFormData({
                  subject: "",
                  category: "",
                  description: "",
                  email: ""
                });
                setErrors({});
                setSubmitError("");
              }}>
                Submit Another Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <DashboardNavbar />
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4 cursor-pointer">
            <Link href="/ideas" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Ideas
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report an Issue</h1>
          <p className="text-gray-600">
            Help us improve by reporting bugs, requesting features, or asking questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Report Details
                </CardTitle>
                <CardDescription>
                  Please provide as much detail as possible to help us understand and resolve your issue.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {submitError && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">{submitError}</span>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of the issue"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className={errors.subject ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
                      required
                    />
                    {errors.subject && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.subject}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">{formData.subject.length}/100 characters</p>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Issue Type *</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => handleInputChange("category", value)}
                    >
                      <SelectTrigger className={errors.category ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {reportCategories.map((category) => {
                          const Icon = category.icon;
                          return (
                            <SelectItem key={category.value} value={category.value}>
                              <div className="flex items-center gap-2">
                                <Icon className="w-4 h-4" />
                                {category.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.category}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className={errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
                      required
                    />
                    {errors.email && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.email}
                      </p>
                    )}
                    <p className="text-sm text-gray-500">
                      We'll use this to follow up on your report.
                    </p>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Please describe the issue in detail. Include steps to reproduce, expected behavior, and any error messages..."
                      className={`min-h-[120px] ${errors.description ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      required
                    />
                    {errors.description && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">{formData.description.length}/2000 characters</p>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Report
                        </>
                      )}
                    </Button>
                    <Button type="button" variant="outline" asChild>
                      <Link href="/ideas">Cancel</Link>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-2">
            {/* Report Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Report Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {reportCategories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div key={category.value} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                      <Icon className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="font-medium text-sm">{category.label}</p>
                        <p className="text-xs text-gray-500">
                          {category.value === 'bug' && 'Something isn\'t working'}
                          {category.value === 'feature' && 'Suggest new functionality'}
                          {category.value === 'security' && 'Report security concerns'}
                          {category.value === 'general' && 'General questions or feedback'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need Immediate Help?</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                <p className="mb-3">
                  For urgent issues, you can also contact us directly:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> support@ideathoon.com</p>
                  <p><strong>Response Time:</strong> 24-48 hours</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}