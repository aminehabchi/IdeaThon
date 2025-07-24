"use client";

import { GalleryVerticalEnd, Upload } from "lucide-react";
import { useState } from "react";

// Assuming these are correctly aliased from your project
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fetcher } from "@/lib/helpers";
import Image from "next/image";

export function SignUpForm({ className, ...props }) {
  // State to hold the avatar preview URL (base64)
  const [avatar, setAvatar] = useState(null);
  // State to hold all form data
  const [formData, setFormData] = useState({
    id: 0, // Consider if 'id' should be generated later or by backend
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    avatar: "", // This will store the base64 string of the avatar
    phone_number: "",
    bio: "",
  });

  /**
   * Handles changes for all text/number input fields.
   * It extracts the 'name' and 'value' from the event target
   * and updates the corresponding field in the formData state.
   * @param {Event} e - The change event object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles the file input change for the avatar.
   * Reads the selected file as a Data URL (base64 string)
   * and updates both the avatar preview state and the formData.
   * @param {Event} e - The change event object from the file input.
   */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target.result);

        setFormData((prev) => ({ ...prev, avatar: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const sumbitInfo = async () => {
    console.log("Form Data Submitted:", formData);
    try {
      await fetcher({
        url: "http://localhost:8080/api/auth/register",
        method: "POST",
        data: formData,
        token: null,
        returned_status: 201,
      });
      // Redirect after success
      window.location.href = "/login";
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle error UI here if you want
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="/login"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex mb-4 items-center justify-center rounded-md">
                {/* Icon for the brand/app */}
                {/* <GalleryVerticalEnd className="size-6" /> */}
                <Image
                  src="/Logo.svg"
                  alt="logo"
                  width={120}
                  height={40}
                  priority
                />
              </div>
              {/* <span className="sr-only">IdeaThon.</span> */}
            </a>
            {/* <h1 className="text-xl font-bold">Join IdeaThon.</h1> */}
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
                  <div className="size-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="Avatar Preview"
                        className="size-full object-cover"
                      />
                    ) : (
                      // Placeholder icon if no avatar is selected
                      <Upload className="size-8 text-gray-400" />
                    )}
                  </div>
                  <Input
                    id="avatar"
                    name="avatar" // Added name attribute for consistency, though handleAvatarChange handles it differently
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden" // Hide the default file input
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    // Programmatically click the hidden file input
                    onClick={() => document.getElementById("avatar").click()}
                  >
                    Choose Photo
                  </Button>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="first_name" // Added name attribute to match formData key
                    type="text"
                    value={formData.first_name}
                    onChange={handleChange} // Simplified onChange handler
                    placeholder="John"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="last_name" // Added name attribute to match formData key
                    type="text"
                    value={formData.last_name}
                    onChange={handleChange} // Simplified onChange handler
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email" // Added name attribute to match formData key
                  type="email"
                  value={formData.email}
                  onChange={handleChange} // Simplified onChange handler
                  placeholder="m@example.com"
                  required
                />
              </div>

              {/* Phone Number Field */}
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone_number" // Added name attribute to match formData key
                  type="tel"
                  value={formData.phone_number}
                  onChange={handleChange} // Simplified onChange handler
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>

              {/* Bio Textarea */}
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio" // Added name attribute to match formData key
                  placeholder="Tell us about yourself..."
                  rows={3}
                  value={formData.bio}
                  onChange={handleChange} // Simplified onChange handler
                  className="resize-none"
                />
              </div>

              {/* Password Field */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password" // Added name attribute to match formData key
                  type="password"
                  value={formData.password}
                  onChange={handleChange} // Simplified onChange handler
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" onClick={sumbitInfo} className="w-full">
              Create Account
            </Button>
          </div>
          {/* Or separator */}
          {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div> */}
          {/* Social Sign-in Buttons */}
          {/* <div className="grid gap-4 sm:grid-cols-2">
            <Button variant="outline" type="button" className="w-full"> */}
          {/* Apple Icon */}
          {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-4 mr-2"
              >
                <path
                  d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                  fill="currentColor"
                />
              </svg>
              Continue with Apple
            </Button>
            <Button variant="outline" type="button" className="w-full"> */}
          {/* Google Icon */}
          {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="size-4 mr-2"
              >
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with Google
            </Button> */}
          {/* </div> */}
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
