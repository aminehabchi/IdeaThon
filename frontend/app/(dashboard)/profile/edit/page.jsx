"use client";

import { DashboardNavbar } from "@/components/navbarcomps/dashboardNavbar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, MapPin, Phone, Lock, Globe, Camera, BookMinus } from "lucide-react";
import { IdeaLoader } from "@/components/ui/cosloader";
import { fetcher } from "@/lib/helpers";
import { toast } from "sonner";

export default function EditProfile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    contactNumber: "",
    country: "",
    password: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/avatar.png");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get token from localStorage
  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("token");
    }
    return null;
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        const token = getToken();
        const data = await fetcher({
          url: `http://localhost:8080/api/profile/get?profile_id=${0}`,
          data: { user_id: -1 },
          method: "GET",
          token: token,
          returned_status: 200,
        });

        setProfile("dataa", data);
        setForm({
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          bio: data.bio || "",
          contactNumber: data.phone_number || "",
          country: data.country || "",
          password: "", // optional
        });
        setAvatarPreview(`http://localhost:8080/api${data.avatar}` || "/belmaayo_avatar.png");
      } catch (err) {
        console.error("Failed to fetch profile", err);
        toast.error("Failed to load profile data");
      }
    }

    fetchProfile();
  }, []);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2");
        const data = await res.json();
        const sorted = data
          .map((c) => ({ code: c.cca2, name: c.name.common }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sorted);
      } catch (err) {
        console.error("Failed to fetch countries", err);
        toast.error("Failed to load countries");
      }
    }
    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }

    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCancel = () => {
    if (profile) {
      setForm({
        firstName: profile.first_name || "",
        lastName: profile.last_name || "",
        email: profile.email || "",
        address: profile.bio || "",
        contactNumber: profile.phone_number || "",
        country: profile.country || "",
        password: "",
      });
      setAvatarPreview(profile.avatar || "/belmaayo_avatar.png");
      setAvatarFile(null);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {};
      if (form.firstName.trim()) payload.first_name = form.firstName.trim();
      if (form.lastName.trim()) payload.last_name = form.lastName.trim();
      if (form.email.trim()) payload.email = form.email.trim();
      if (form.contactNumber.trim()) payload.phone_number = form.contactNumber.trim();
      if (form.country) payload.country = form.country;
      if (form.bio.trim()) payload.bio = form.bio.trim();
      if (form.password.trim()) payload.password = form.password.trim();

      // Convert avatar file to base64 if present
      if (avatarFile) {
        payload.avatar = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(avatarFile);
        });
      }

      // Send the update request
      await fetcher({
        url: "http://localhost:8080/api/updateprofile",
        method: "PATCH",
        data: payload,
        returned_status: 200,
      });

      toast.success("Profile updated successfully!");

      setProfile(prev => ({
        ...prev,
        ...payload,
      }));

      if (payload.avatar) {
        setAvatarPreview(payload.avatar);
      }
    } catch (err) {
      console.error("Error updating profile", err);
      toast.error(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };


  const getInitials = () => {
    const firstName = form.firstName || "";
    const lastName = form.lastName || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <IdeaLoader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <DashboardNavbar />
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Edit Profile</h1>
          <p className="text-gray-600 mt-2">Update your personal information and preferences</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Avatar Section */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Picture
              </CardTitle>
              <CardDescription>
                Upload a new profile picture. Max size: 5MB
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
                  <AvatarImage src={avatarPreview} alt="Profile" />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>

                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="avatar-upload"
                  />
                  <Button variant="outline" className="w-full" asChild>
                    <label htmlFor="avatar-upload" className="cursor-pointer flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Change Photo
                    </label>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className="transition-all focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className="transition-all focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Address Field */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <BookMinus className="h-4 w-4" />
                    Bio
                  </Label>
                  <Input
                    id="bio"
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    placeholder="Enter your full bio"
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Phone and Country */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactNumber" className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="contactNumber"
                      name="contactNumber"
                      value={form.contactNumber}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="transition-all focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Country
                    </Label>
                    <Select
                      value={form.country}
                      onValueChange={(val) => handleSelectChange("country", val)}
                    >
                      <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/20">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Password (Optional)
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Leave blank to keep current password"
                    className="transition-all focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
                  <Button
                    type="button"
                    onClick={handleCancel}
                    variant="outline"
                    className="order-2 sm:order-1 transition-all hover:bg-gray-50"
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="order-1 sm:order-2 transition-all hover:shadow-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </div>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}