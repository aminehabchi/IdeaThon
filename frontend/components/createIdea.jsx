"use client";

import React, { useState } from 'react';
import { Calendar, ChevronDown, Upload, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CalendarShad } from '@/components/ui/calendar';
import { Input } from "@/components/ui/input";


// Predefined allowed categories
const allowedCategories = [
  "Technology", "Health", "Education", "Environment", "Business", "Finance",
  "Productivity", "Design", "Marketing", "Sustainability", "Innovation", "AI",
  "Startups", "Social Impact", "Remote Work", "Mental Health", "Mobility",
  "Entertainment", "E-commerce", "Food", "Fashion", "Gaming", "Travel Problem Solving",
  "Civic Tech", "Youth", "Equality", "Freelancing", "Future of Work"
];

// Popover Components
const Popover = ({ children, open, onOpenChange }) => (
  <div className="relative">
    {React.Children.map(children, child =>
      React.cloneElement(child, { open, onOpenChange })
    )}
  </div>
);

const PopoverTrigger = ({ children, open, onOpenChange }) =>
  React.cloneElement(children, {
    onClick: () => onOpenChange(!open)
  });

const PopoverContent = ({ children, open, className = "" }) => {
  if (!open) return null;
  return (
    <div className={`absolute top-full left-0 z-50 mt-1 p-4 bg-white border border-gray-200 rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export default function IdeathonForm() {
  const [endDate, setEndDate] = useState(undefined);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [privacy, setPrivacy] = useState('Select Privacy');
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
  const [priceType, setPriceType] = useState('Paid');
  const [price, setPrice] = useState(0);
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);

  const handleCategoryKeyPress = (e) => {
    if (e.key === 'Enter' && categoryInput.trim()) {
      e.preventDefault();
      const input = categoryInput.trim();
      if (!categories.includes(input) && allowedCategories.includes(input)) {
        setCategories([...categories, input]);
        setCategoryInput('');
      }
    }
  };

  const addCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([...categories, category]);
      setCategoryInput('');
      setShowCategorySuggestions(false);
    }
  };

  const getFilteredSuggestions = () => {
    const availableCategories = allowedCategories.filter(cat => !categories.includes(cat));
    
    if (!categoryInput.trim()) {
      return availableCategories;
    }
    
    return availableCategories.filter(cat => 
      cat.toLowerCase().includes(categoryInput.toLowerCase())
    );
  };

  const removeCategory = (cat) => {
    setCategories(categories.filter(c => c !== cat));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setBannerPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryInputChange = (e) => {
    setCategoryInput(e.target.value);
    if (!showCategorySuggestions) {
      setShowCategorySuggestions(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border-b-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Date</label>
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger>
                <Button variant="outline" className="w-full justify-start text-left font-normal border-gray-200 hover:bg-gray-50">
                  <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                  {endDate ? endDate.toLocaleDateString() : "Pick End Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" open={datePickerOpen}>
                <CalendarShad
                  mode="single"
                  selected={endDate}
                  onSelect={(date) => {
                    setEndDate(date);
                    setDatePickerOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Categories</label>
            <div className="space-y-3">
              {categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat, i) => (
                    <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700 border">
                      {cat}
                      <button 
                        onClick={() => removeCategory(cat)} 
                        className="ml-2 hover:text-gray-900 transition-colors"
                        type="button"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type category and press Enter or click to select"
                  value={categoryInput}
                  onChange={handleCategoryInputChange}
                  onKeyPress={handleCategoryKeyPress}
                  onFocus={() => setShowCategorySuggestions(true)}
                  onBlur={() => setTimeout(() => setShowCategorySuggestions(false), 200)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
                {showCategorySuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 max-h-60 overflow-y-auto">
                    {getFilteredSuggestions().length > 0 ? (
                      getFilteredSuggestions().map((category, i) => (
                        <button
                          key={i}
                          onClick={() => addCategory(category)}
                          className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                          type="button"
                        >
                          {category}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-gray-500">
                        {categoryInput ? 'No matching categories found' : 'All categories selected'}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400">
                {categories.length === 0 
                  ? "Click on the input field to see all available categories" 
                  : `${categories.length} categories selected. Type to search for more.`}
              </p>
            </div>
          </div>

          {/* Price Section */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">Price</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input type="radio" value="Paid" checked={priceType === 'Paid'} onChange={(e) => setPriceType(e.target.value)} className="h-4 w-4" />
                <span className="ml-2 text-sm">Paid</span>
              </label>
              <label className="flex items-center">
                <input type="radio" value="Free" checked={priceType === 'Free'} onChange={(e) => setPriceType(e.target.value)} className="h-4 w-4" />
                <span className="ml-2 text-sm">Free</span>
              </label>
              {priceType === 'Paid' && (
                <Input
                type="number"
                min={0}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="ml-4 w-24"
                />
              )}
            </div>
          </div>
        </div>

        {/* Banner + Privacy */}
        <div className="space-y-6">
          {/* Privacy */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Privacy</label>
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => setPrivacyOpen(!privacyOpen)}
                className="w-full justify-between font-normal"
              >
                <span className={privacy === 'Select Privacy' ? 'text-gray-500' : 'text-gray-900'}>
                  {privacy}
                </span>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${privacyOpen ? 'rotate-180' : ''}`} />
              </Button>
              {privacyOpen && (
                <div className="absolute w-full bg-white border border-gray-200 mt-1 rounded-lg shadow-lg z-40 overflow-hidden">
                  {['Public', 'Private'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setPrivacy(opt); setPrivacyOpen(false); }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      type="button"
                    >
                      <span className="flex items-center">
                        {privacy === opt && <span className="text-green-600 mr-2">✓</span>}
                        {opt}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Banner Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Banner</label>
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
