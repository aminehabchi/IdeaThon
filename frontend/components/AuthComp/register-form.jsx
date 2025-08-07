"use client";

import { GalleryVerticalEnd, Upload, AlertCircle } from "lucide-react";
import { useState } from "react";

// Assuming these are correctly aliased from your project
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fetcher } from "@/lib/helpers";
import Image from "next/image";
import { toast, Toaster } from "sonner";

export function SignUpForm({ className, ...props }) {
  // State to hold the avatar preview URL (base64)
  const [avatar, setAvatar] = useState(null);
  // State to hold all form data
  const [formData, setFormData] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    avatar: "",
    phone_number: "",
    bio: "",
  });

  // State to hold validation errors
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhone = (phone) => {
    // Basic phone validation - accepts various formats
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
  };

  const validateName = (name) => {
    return name.trim().length >= 2 && /^[a-zA-Z\s'-]+$/.test(name.trim());
  };

  const validateBio = (bio) => {
    return bio.length <= 500;
  };

  const validateFile = (file) => {
    if (!file) return true; // Avatar is optional
    
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.type)) {
      return "Please upload a valid image file (JPEG, PNG, or WebP)";
    }
    
    if (file.size > maxSize) {
      return "Image size must be less than 5MB";
    }
    
    return true;
  };

  // Real-time validation function
  const validateField = (name, value, file = null) => {
    let error = "";

    switch (name) {
      case "first_name":
        if (!value.trim()) {
          error = "First name is required";
        } else if (!validateName(value)) {
          error = "must be at least 2 letters";
        }
        break;
      case "last_name":
        if (!value.trim()) {
          error = "Last name is required";
        } else if (!validateName(value)) {
          error = "must be at least 2 letters";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!validateEmail(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (!validatePassword(value)) {
          error = "Password must be at least 8 characters with uppercase, lowercase, and number";
        }
        break;
      case "phone_number":
        if (!value.trim()) {
          error = "Phone number is required";
        } else if (!validatePhone(value)) {
          error = "Please enter a valid phone number";
        }
        break;
      case "bio":
        if (!validateBio(value)) {
          error = "Bio must be less than 500 characters";
        }
        break;
      case "avatar":
        if (file) {
          const fileValidation = validateFile(file);
          if (fileValidation !== true) {
            error = fileValidation;
          }
        }
        break;
      default:
        break;
    }

    return error;
  };

  /**
   * Handles changes for all text/number input fields with real-time validation.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update form data
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear existing error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    
    // Real-time validation (only show errors after user has started typing)
    if (value.length > 0 || formData[name].length > 0) {
      const error = validateField(name, value);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    }
  };

  /**
   * Handles the file input change for the avatar with validation.
   */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      // Validate file first
      const fileError = validateField("avatar", "", file);
      
      if (fileError) {
        setErrors((prev) => ({ ...prev, avatar: fileError }));
        toast.error(fileError);
        return;
      }
      
      // Clear any existing avatar errors
      setErrors((prev) => ({ ...prev, avatar: "" }));
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);
        setFormData((prev) => ({ ...prev, avatar: event.target.result }));
        toast.success("Profile picture uploaded successfully!");
      };
      reader.onerror = () => {
        toast.error("Failed to read the image file");
      };
      reader.readAsDataURL(file);
    }
  };

  // Comprehensive form validation before submission
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate all required fields
    Object.keys(formData).forEach((key) => {
      if (key !== "id" && key !== "avatar" && key !== "bio") { // bio is optional
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });

    // Validate optional bio field
    if (formData.bio) {
      const bioError = validateField("bio", formData.bio);
      if (bioError) {
        newErrors.bio = bioError;
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitInfo = async () => {
    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }

    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fix the errors below before submitting");
      return;
    }

    setIsSubmitting(true);

    try {
      toast.loading("Creating your account...");
      
      await fetcher({
        url: "http://localhost:8080/api/auth/register",
        method: "POST",
        data: formData,
        token: null,
        returned_status: 201,
      });
      
      toast.dismiss(); // Remove loading toast
      toast.success("Account created successfully! Redirecting...");
      
      // Small delay before redirect to show success message
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      
    } catch (error) {
      console.error("Registration failed:", error);
      toast.dismiss(); // Remove loading toast
      
      // Handle specific error messages from backend
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.status === 409) {
        toast.error("Email already exists. Please use a different email.");
      } else if (error.response?.status === 400) {
        toast.error("Invalid data provided. Please check your inputs.");
      } else {
        toast.error("Registration failed. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Toaster 
        position="top-center" 
        richColors 
        closeButton
        duration={4000}
      />
      <div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="/login"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex mb-4 items-center justify-center rounded-md">
                <Image
                  src="/Logo.svg"
                  alt="logo"
                  width={120}
                  height={40}
                  priority
                />
              </div>
            </a>
            <div className="text-center text-sm">
              Already have an account?{" "}
              <a href="/login" className="underline underline-offset-4">
                Sign in
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-4">
              {/* Avatar Upload Section */}
              <div className="flex flex-col items-center gap-3">
                <Label htmlFor="avatar">Profile Picture</Label>
                <div className="flex flex-col items-center gap-2">
                  <div className={cn(
                    "size-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2",
                    errors.avatar ? "border-red-500" : "border-gray-200"
                  )}>
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="Avatar Preview"
                        className="size-full object-cover"
                      />
                    ) : (
                      <Upload className="size-8 text-gray-400" />
                    )}
                  </div>
                  <Input
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("avatar").click()}
                  >
                    Choose Photo
                  </Button>
                  {errors.avatar && (
                    <div className="flex items-center gap-1 text-sm text-red-500">
                      <AlertCircle className="size-3" />
                      <span>{errors.avatar}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="John"
                    className={cn(errors.first_name && "border-red-500 focus-visible:ring-red-500")}
                    required
                  />
                  {errors.first_name && (
                    <div className="flex items-center gap-1 text-sm text-red-500">
                      <AlertCircle className="size-3" />
                      <span>{errors.first_name}</span>
                    </div>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Doe"
                    className={cn(errors.last_name && "border-red-500 focus-visible:ring-red-500")}
                    required
                  />
                  {errors.last_name && (
                    <div className="flex items-center gap-1 text-sm text-red-500">
                      <AlertCircle className="size-3" />
                      <span>{errors.last_name}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="m@example.com"
                  className={cn(errors.email && "border-red-500 focus-visible:ring-red-500")}
                  required
                />
                {errors.email && (
                  <div className="flex items-center gap-1 text-sm text-red-500">
                    <AlertCircle className="size-3" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Phone Number Field */}
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone_number"
                  type="tel"
                  value={formData.phone_number}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className={cn(errors.phone_number && "border-red-500 focus-visible:ring-red-500")}
                  required
                />
                {errors.phone_number && (
                  <div className="flex items-center gap-1 text-sm text-red-500">
                    <AlertCircle className="size-3" />
                    <span>{errors.phone_number}</span>
                  </div>
                )}
              </div>

              {/* Bio Textarea */}
              <div className="grid gap-2">
                <Label htmlFor="bio">
                  Bio <span className="text-sm text-gray-500">(Optional)</span>
                </Label>
                <Textarea
                  id="bio"
                  name="bio"
                  placeholder="Tell us about yourself..."
                  rows={3}
                  value={formData.bio}
                  onChange={handleChange}
                  className={cn(
                    "resize-none",
                    errors.bio && "border-red-500 focus-visible:ring-red-500"
                  )}
                />
                <div className="flex justify-between items-center">
                  {errors.bio ? (
                    <div className="flex items-center gap-1 text-sm text-red-500">
                      <AlertCircle className="size-3" />
                      <span>{errors.bio}</span>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <span className={cn(
                    "text-xs",
                    formData.bio.length > 450 ? "text-red-500" : "text-gray-500"
                  )}>
                    {formData.bio.length}/500
                  </span>
                </div>
              </div>

              {/* Password Field */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className={cn(errors.password && "border-red-500 focus-visible:ring-red-500")}
                  required
                />
                {errors.password && (
                  <div className="flex items-center gap-1 text-sm text-red-500">
                    <AlertCircle className="size-3" />
                    <span>{errors.password}</span>
                  </div>
                )}
                {!errors.password && formData.password && (
                  <div className="text-xs text-gray-500">
                    Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              onClick={submitInfo} 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </div>
        </div>
      </div>
      {/* Terms and Privacy Policy */}
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}