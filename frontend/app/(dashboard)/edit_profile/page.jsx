"use client";

import { DashboardNavbar } from "@/components/dashboardNavbar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

export default function EditProfile() {
    const [profile, setProfile] = useState(null);
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        contactNumber: "",
        city: "",
        state: "",
        password: "",
    });

    const [avatarFile, setAvatarFile] = useState(null); // store selected avatar file
    const [avatarPreview, setAvatarPreview] = useState("/avatar.png"); // default avatar

    useEffect(() => {
        async function fetchProfile() {
            // Replace with your actual API fetch
            const data = {
                firstName: "Mehrab",
                lastName: "Bozorgi",
                email: "Mehrabbozorgi.business@gmail.com",
                address: "33062 Zboncak isle",
                contactNumber: "58077.79",
                city: "Mehrab",
                state: "Bozorgi",
                password: "sbdfbnd65sfvdb s",
                avatarUrl: "/avatar.png", // add avatar URL here from your backend
            };

            setProfile(data);
            setForm(data);
            setAvatarPreview(data.avatarUrl || "/avatar.png");
        }
        fetchProfile();
    }, []);

    const cities = ["Mehrab", "Tehran", "New York"];
    const states = ["Bozorgi", "California", "Texas"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // New handler for avatar file Input change
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setAvatarFile(file);

        // Preview new avatar locally
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatarPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleCancel = () => {
        setForm(profile);
        setAvatarPreview(profile.avatarUrl || "/avatar.png");
        setAvatarFile(null);
    };

    const handleSave = async () => {
        try {
            // Use FormData to send text fields + file together
            const formData = new FormData();

            formData.append("firstName", form.firstName);
            formData.append("lastName", form.lastName);
            formData.append("address", form.address);
            formData.append("contactNumber", form.contactNumber);
            formData.append("city", form.city);
            formData.append("state", form.state);
            formData.append("password", form.password);

            if (avatarFile) {
                formData.append("avatar", avatarFile);
            }

            // Replace with your API PATCH request URL
            const response = await fetch("/api/profile", {
                method: "PATCH",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Failed to save profile");
            }

            alert("Profile saved successfully!");
            // Optionally update profile state with new data here
        } catch (error) {
            console.error(error);
            alert("Error saving profile");
        }
    };

    if (!profile) return <p>Loading...</p>;

    return (
        <>
            <DashboardNavbar />
            <div className="max-w-xl mx-auto p-6">
                <h1 className="text-2xl font-semibold mb-6">Edit profile</h1>

                <div className="flex items-center mb-6 space-x-4">
                    <img
                    // {avatarPreview}
                        src="/belmaayo_avatar.png"
                        alt="avatar"
                        className="w-18 h-18 rounded-full border border-black object-cover object-center"
                    />
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="block"
                    />
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                    className="space-y-4"
                >
                    {/* Your Input fields here (firstName, lastName, etc.) */}
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <Label className="block text-sm font-medium mb-1">First Name</Label>
                            <Input
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                type="text"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>

                        <div className="flex-1">
                            <Label className="block text-sm font-medium mb-1">Last Name</Label>
                            <Input
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                type="text"
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                    </div>

                    <div>
                        <Label className="block text-sm font-medium mb-1">Address</Label>
                        <Input
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            type="text"
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div>
                        <Label className="block text-sm font-medium mb-1">Contact Number</Label>
                        <Input
                            name="contactNumber"
                            value={form.contactNumber}
                            onChange={handleChange}
                            type="text"
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <Label className="block text-sm font-medium mb-1">City</Label>
                            <select
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                {cities.map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex-1">
                            <Label className="block text-sm font-medium mb-1">State</Label>
                            <select
                                name="state"
                                value={form.state}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            >
                                {states.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <Label className="block text-sm font-medium mb-1">Password</Label>
                        <Input
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            type="password"
                            className="w-full border rounded px-3 py-2"
                        />
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <Button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 text-white rounded "
                        >
                            cancel
                        </Button>
                        <Button
                            type="submit"
                            className="px-6 py-2 text-white rounded "
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
