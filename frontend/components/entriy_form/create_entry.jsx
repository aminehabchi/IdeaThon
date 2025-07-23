"use client";

import React, { useEffect, useState } from 'react';
import { Upload } from 'lucide-react';
import { Label } from "@/components/ui/label";


export default function EntryForm({ setForm }) {
    const [bannerImage, setBannerImage] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);


    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBannerImage(file);
            setForm({
                banner: file
            })
            const reader = new FileReader();
            reader.onloadend = () => setBannerPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-6 bg-white border-b-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Banner */}
                <div className="space-y-6">
                    {/* Banner Upload */}
                    <div>
                        <Label className="block text-sm font-medium text-gray-900 mb-2">Banner</Label>
                        <div className="relative">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                            />
                            <div className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${bannerPreview ? 'border-gray-300' : 'border-gray-200 hover:border-gray-400'}`}>
                                {bannerPreview ? (
                                    <>
                                        <img src={bannerPreview} alt="Banner" className="max-w-full max-h-48 mx-auto rounded-lg object-cover" />
                                        <div className="mt-2 text-sm text-gray-500">Click to change image</div>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-500">Upload Banner Image</p>
                                        <p className="text-xs text-gray-400 mt-1">Click or drag and drop</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
