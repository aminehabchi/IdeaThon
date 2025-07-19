import React, { useState } from 'react';
import { Calendar, ChevronDown, Upload, X } from 'lucide-react';

// Predefined allowed categories
const allowedCategories = [
  "Technology", "Health", "Education", "Environment", "Business", "Finance",
  "Productivity", "Design", "Marketing", "Sustainability", "Innovation", "AI",
  "Startups", "Social Impact", "Remote Work", "Mental Health", "Mobility",
  "Entertainment", "E-commerce", "Food", "Fashion", "Gaming", "Travel Problem Solving",
  "Civic Tech", "Youth", "Equality", "Freelancing", "Future of Work"
];

// Reusable Button
const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

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

// Calendar component
const CalendarComponent = ({ mode, selected, onSelect, initialFocus }) => {
  const [viewDate, setViewDate] = useState(new Date());
  const monthNames = [..."January February March April May June July August September October November December".split(" ")];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const days = [];

    for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
    for (let day = 1; day <= lastDay.getDate(); day++) days.push(new Date(year, month, day));
    return days;
  };

  const isToday = (date) => {
    const today = new Date();
    return date &&
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date) =>
    selected && date &&
    date.getDate() === selected.getDate() &&
    date.getMonth() === selected.getMonth() &&
    date.getFullYear() === selected.getFullYear();

  const days = getDaysInMonth(viewDate);

  return (
    <div className="p-3">
      <div className="flex items-center justify-between mb-4">
        <Button variant="outline" size="sm" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}>‹</Button>
        <div className="font-semibold">{monthNames[viewDate.getMonth()]} {viewDate.getFullYear()}</div>
        <Button variant="outline" size="sm" onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}>›</Button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div key={index} className="p-1">
            {day ? (
              <Button
                variant={isSelected(day) ? "default" : "ghost"}
                size="sm"
                className={`w-full h-8 p-0 text-sm ${isToday(day) ? 'bg-accent' : ''} ${isSelected(day) ? 'bg-black text-white hover:bg-gray-800' : ''}`}
                onClick={() => onSelect(day)}
              >
                {day.getDate()}
              </Button>
            ) : <div className="w-full h-8"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function IdeathonForm() {
  const [endDate, setEndDate] = useState(null);
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
        setShowCategorySuggestions(false);
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
    if (!categoryInput.trim()) return allowedCategories.filter(cat => !categories.includes(cat)).slice(0, 8);
    return allowedCategories
      .filter(cat => 
        cat.toLowerCase().includes(categoryInput.toLowerCase()) && 
        !categories.includes(cat)
      )
      .slice(0, 8);
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

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
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
              <PopoverContent className="w-auto p-0">
                <CalendarComponent selected={endDate} onSelect={(date) => { setEndDate(date); setDatePickerOpen(false); }} />
              </PopoverContent>
            </Popover>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Categories</label>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, i) => (
                  <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                    {cat}
                    <button onClick={() => removeCategory(cat)} className="ml-2 hover:text-gray-900">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Type category and press Enter"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  onKeyPress={handleCategoryKeyPress}
                  onFocus={() => setShowCategorySuggestions(true)}
                  onBlur={() => setTimeout(() => setShowCategorySuggestions(false), 150)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                {showCategorySuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                    {getFilteredSuggestions().length > 0 ? (
                      getFilteredSuggestions().map((category, i) => (
                        <button
                          key={i}
                          onClick={() => addCategory(category)}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                        >
                          {category}
                        </button>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-500">
                        {categoryInput ? 'No matching categories found' : 'All categories selected'}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400">Select from suggested categories or type to search.</p>
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
                <input
                  type="number"
                  min={0}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="ml-4 w-20 px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-black"
                />
              )}
            </div>
          </div>
        </div>

        {/* Banner + Privacy */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Privacy</label>
            <div className="relative">
              <button
                onClick={() => setPrivacyOpen(!privacyOpen)}
                className="w-full flex items-center justify-between px-4 py-2 border border-gray-200 rounded-lg"
              >
                <span>{privacy}</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>
              {privacyOpen && (
                <div className="absolute w-full bg-white border border-gray-200 mt-1 rounded shadow z-10">
                  {['Public', 'Private'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => { setPrivacy(opt); setPrivacyOpen(false); }}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                      {privacy === opt ? "✓ " : ""}{opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Banner</label>
            <div className="relative">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="absolute inset-0 opacity-0 z-10 cursor-pointer" />
              <div className={`border-2 border-dashed rounded-lg p-12 text-center ${bannerPreview ? 'border-gray-300' : 'hover:border-gray-400'}`}>
                {bannerPreview ? (
                  <>
                    <img src={bannerPreview} alt="Banner" className="max-w-full max-h-48 mx-auto rounded-lg" />
                    <div className="mt-2 text-sm text-gray-500">Click to change image</div>
                  </>
                ) : (
                  <>
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Upload Banner Image</p>
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