"use client";

import { DashboardNavbar } from "@/components/dashboardNavbar";
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
import { User, Mail, MapPin, Phone, Lock, Globe, Camera } from "lucide-react";
import { IdeaLoader } from "@/components/ui/cosloader";
// import { toast, Toaster } from "@/components/ui/sonner";

export default function EditProfile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    contactNumber: "",
    country: "",
    password: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("/avatar.png");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      const data = {
        firstName: "Mehrab",
        lastName: "Bozorgi",
        email: "Mehrabbozorgi.business@gmail.com",
        address: "33062 Zboncak isle",
        contactNumber: "+1 234 567 8900",
        country: "US",
        password: "sbdfbnd65sfvdb s",
        avatarUrl: "/belmaayo_avatar.png",
      };
      setProfile(data);
      setForm(data);
      setAvatarPreview(data.avatarUrl || "/belmaayo_avatar.png");
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
    setForm(profile);
    setAvatarPreview(profile.avatarUrl || "/avatar.png");
    setAvatarFile(null);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      for (const key in form) formData.append(key, form[key]);
      if (avatarFile) formData.append("avatar", avatarFile);

      const res = await fetch("/api/profile", {
        method: "PATCH",
        body: formData,
      });

      if (!res.ok)  {
        const error = await res.json();
        throw new Error(error.message || "Failed to save profile");
      }
      toast.success("Profile saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = () => {
    return `${form.firstName.charAt(0)}${form.lastName.charAt(0)}`.toUpperCase();
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
      <Toaster />
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
                  <AvatarFallback className="text-2xl bg-gradient-to-br  text-white">
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
                    <MapPin className="h-4 w-4" />
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter your full address"
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
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
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