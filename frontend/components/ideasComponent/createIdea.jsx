"use client";

import React, { useEffect, useState } from 'react';
import { Calendar, ChevronDown, Upload, X, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CalendarShad } from '@/components/ui/calendar';
import { Label } from "@/components/ui/label";

const allowedCategories = [
  "Technology", "Social", "Business", "Creative", "open"
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

// Error Message Component
const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div className="flex items-center mt-1 text-sm text-red-600">
      <AlertCircle className="h-4 w-4 mr-1" />
      {message}
    </div>
  );
};

export default function IdeathonForm({ setForm, ideathon, setisThereError }) {
  const [endDate, setEndDate] = useState(undefined);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [privacy, setPrivacy] = useState('Select Privacy');
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState('');
  const [showCategorySuggestions, setShowCategorySuggestions] = useState(false);
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  useEffect(() => {
    const isValid = runValidation();
    setisThereError(!isValid);
  }, [endDate, categories, privacy, bannerImage]);
  useEffect(() => {
    if (!ideathon) return;

    setEndDate(ideathon.end_date ? new Date(ideathon.end_date) : undefined);
    setPrivacy(ideathon.privacy || 'Select Privacy');
    setCategories(ideathon.category || []);
    setBannerPreview(ideathon.banner || null);
  }, [ideathon]);

  // Validation states

  // Validation functions
  const validateEndDate = (date) => {
    if (!date) return "End date is required";
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date < today) return "End date cannot be in the past";
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 2);
    if (date > maxDate) return "End date cannot be more than 2 years from now";
    return null;
  };

  const validateCategories = (cats) => {
    if (cats.length === 0) return "At least one category is required";
    if (cats.length > 5) return "Maximum 5 categories allowed";
    return null;
  };

  const validatePrivacy = (privacyValue) => {
    if (privacyValue === 'Select Privacy') return "Please select a privacy option";
    return null;
  };

  const validateBanner = (image) => {
    if (!image) return null; // optional

    if (image.size > 5 * 1024 * 1024) return "Banner image must be less than 5MB";

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(image.type)) {
      return "Banner must be a valid image file (JPEG, PNG, GIF, or WebP)";
    }

    return null;
  };

  // Validation runner
  const runValidation = () => {
    const newErrors = {};

    const dateError = validateEndDate(endDate);
    if (dateError) newErrors.endDate = dateError;

    const categoryError = validateCategories(categories);
    if (categoryError) newErrors.categories = categoryError;

    const privacyError = validatePrivacy(privacy);
    if (privacyError) newErrors.privacy = privacyError;

    const bannerError = validateBanner(bannerImage);
    if (bannerError) newErrors.banner = bannerError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const markAsTouched = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      runValidation();
    }

    setForm({
      endDate,
      categories,
      price: 0, // always free for MVP
      privacy,
      banner: bannerImage,
      isValid: runValidation()
    });
  }, [endDate, categories, privacy, bannerImage, touched]);

  const handleCategoryKeyPress = (e) => {
    if (e.key === 'Enter' && categoryInput.trim()) {
      e.preventDefault();
      const input = categoryInput.trim();
      if (!categories.includes(input) && allowedCategories.includes(input)) {
        setCategories([...categories, input]);
        setCategoryInput('');
        markAsTouched('categories');
      }
    }
  };

  const addCategory = (category) => {
    if (!categories.includes(category) && categories.length < 5) {
      setCategories([...categories, category]);
      setCategoryInput('');
      setShowCategorySuggestions(false);
      markAsTouched('categories');
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
    markAsTouched('categories');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setBannerPreview(reader.result);
      reader.readAsDataURL(file);
      markAsTouched('banner');
    }
  };

  const handleCategoryInputChange = (e) => {
    setCategoryInput(e.target.value);
    if (!showCategorySuggestions) {
      setShowCategorySuggestions(true);
    }
  };

  const handleDateSelect = (date) => {
    setEndDate(date);
    setDatePickerOpen(false);
    markAsTouched('endDate');
  };

  const handlePrivacySelect = (opt) => {
    setPrivacy(opt);
    setPrivacyOpen(false);
    markAsTouched('privacy');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border-b-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Date Picker */}
          <div>
            <Label className="block text-sm font-medium text-gray-900 mb-2">
              Date <span className="text-red-500">*</span>
            </Label>
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal border-gray-200 hover:bg-gray-50 ${errors.endDate && touched.endDate ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
                >
                  <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                  {endDate ? endDate.toLocaleDateString() : "Pick End Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" open={datePickerOpen}>
                <CalendarShad
                  mode="single"
                  selected={endDate}
                  onSelect={handleDateSelect}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <ErrorMessage message={touched.endDate ? errors.endDate : null} />
          </div>

          {/* Categories */}
          <div>
            <Label className="block text-sm font-medium text-gray-900 mb-2">
              Categories <span className="text-red-500">*</span>
            </Label>
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
                  onFocus={() => {
                    setShowCategorySuggestions(true);
                    markAsTouched('categories');
                  }}
                  onBlur={() => setTimeout(() => setShowCategorySuggestions(false), 200)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:border-transparent ${errors.categories && touched.categories ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-blue-200'}`}
                  disabled={categories.length >= 5}
                />
                {showCategorySuggestions && categories.length < 5 && (
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
              <p className={`text-xs ${categories.length >= 5 ? 'text-red-500' : 'text-gray-400'}`}>
                {categories.length === 0
                  ? "Click on the input field to see all available categories"
                  : `${categories.length}/5 categories selected. ${categories.length >= 5 ? 'Maximum reached.' : 'Type to search for more.'}`}
              </p>
            </div>
            <ErrorMessage message={touched.categories ? errors.categories : null} />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-900 mb-2">
              Price
            </Label>
            <p className="text-sm text-gray-600">Free - <span className="text-gray-400">(Payments coming soon)</span></p>
          </div>
        </div>

        {/* Banner + Privacy */}
        <div className="space-y-6">
          {/* Privacy */}
          <div>
            <Label className="block text-sm font-medium text-gray-900 mb-2">
              Privacy <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Button
                variant="outline"
                onClick={() => {
                  setPrivacyOpen(!privacyOpen);
                  markAsTouched('privacy');
                }}
                className={`w-full justify-between font-normal ${errors.privacy && touched.privacy ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : ''}`}
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
                      onClick={() => handlePrivacySelect(opt)}
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
            <ErrorMessage message={touched.privacy ? errors.privacy : null} />
          </div>

          {/* Banner Upload */}
          <div>
            <Label className="block text-sm font-medium text-gray-900 mb-2">
              Banner
            </Label>
            <div className="relative">
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                onChange={handleImageUpload}
                className="absolute inset-0 opacity-0 z-10 cursor-pointer"
              />
              <div className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${errors.banner && touched.banner
                ? 'border-red-300'
                : bannerPreview
                  ? 'border-gray-300'
                  : 'border-gray-200 hover:border-gray-400'
                }`}>
                {bannerPreview ? (
                  <>
                    <img className="max-w-full max-h-48 mx-auto rounded-lg object-cover" src={bannerPreview} alt="image preview" />

                    <div className="mt-2 text-sm text-gray-500">Click to change image</div>
                  </>
                ) : (
                  <>
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Upload Banner Image (Optional)</p>
                    <p className="text-xs text-gray-400 mt-1">Click or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-1">JPEG, PNG, GIF, WebP (max 5MB)</p>
                  </>
                )}
              </div>
            </div>
            <ErrorMessage message={touched.banner ? errors.banner : null} />
          </div>
        </div>
      </div>

      {/* Validation Summary */}
      {Object.keys(errors).length > 0 && Object.keys(touched).length > 0 && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
            <span className="text-sm font-medium text-red-800">Please fix the following errors:</span>
          </div>
          <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
            {Object.values(errors).map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}