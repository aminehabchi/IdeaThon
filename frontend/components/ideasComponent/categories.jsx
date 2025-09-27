import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

export function Categories({ selectedCategory, onCategorySelect }) {
  const [showAll, setShowAll] = useState(false);
  const scrollContainerRef = useRef(null);
  // const [showActiveFilters, setShowActiveFilters] = useState(true);

  const categories = [
    "Technology", "Social", "Business", "Creative", "open"
  ];

  const toggleCategory = (category) => {
    onCategorySelect((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const clearAllFilters = () => {
    onCategorySelect([]);
  };

  const visibleCategories = showAll ? categories : categories.slice(0, 12);

  return (
    <section className="bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold text-foreground">Browse Ideathons</h2>

          {selectedCategory.length > 0 && (
            <div className="flex justify-center items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {selectedCategory.length} selected
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="h-8 px-2 text-xs"
              >
                <X className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Mobile: Scrollable Carousel */}
        <div className="block md:hidden">
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 snap-x snap-mandatory px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((category) => {
                const isActive = selectedCategory.includes(category);
                return (
                  <motion.div
                    key={category}
                    className="flex-shrink-0 snap-start"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Badge
                      variant={isActive ? "default" : "outline"}
                      className={`
                        px-3 py-1 text-xs font-medium transition-all duration-200 cursor-pointer whitespace-nowrap
                        ${isActive
                          ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                          : "text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                        }
                      `}
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                    </Badge>
                  </motion.div>
                );
              })}
            </div>

            {/* Scroll Controls */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 rounded-full bg-background/90 backdrop-blur-sm border shadow-sm"
                onClick={() => scroll('left')}
              >
                <ChevronLeft className="h-3 w-3" />
              </Button>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 -mr-1">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 rounded-full bg-background/90 backdrop-blur-sm border shadow-sm"
                onClick={() => scroll('right')}
              >
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tablet: Grid with reduced columns */}
        <div className="hidden md:block lg:hidden">
          <div className="flex flex-wrap justify-center gap-2 transition-all duration-300">
            {visibleCategories.map((category) => {
              const isActive = selectedCategory.includes(category);
              return (
                <motion.div
                  key={category}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Badge
                    variant={isActive ? "default" : "outline"}
                    className={`
                      px-4 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer
                      ${isActive
                        ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                        : "text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                      }
                    `}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Desktop: Grid with Show More/Less */}
        <div className="hidden lg:block">
          <div className="flex flex-wrap justify-center gap-2 transition-all duration-300">
            {visibleCategories.map((category) => {
              const isActive = selectedCategory.includes(category);
              return (
                <motion.div
                  key={category}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Badge
                    variant={isActive ? "default" : "outline"}
                    className={`
                      px-4 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer
                      ${isActive
                        ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                        : "text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                      }
                    `}
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
                  </Badge>
                </motion.div>
              );
            })}
          </div>

          {/* Show More/Less Button */}
          <div className="hidden md:block">
            {categories.length > 12 && (
              <div className="flex justify-center mt-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowAll(!showAll)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  {showAll ? (
                    <>
                      <ChevronLeft className="h-3 w-3 mr-1 rotate-90" />
                      Show less categories
                    </>
                  ) : (
                    <>
                      <ChevronRight className="h-3 w-3 mr-1 rotate-90" />
                      Show all {categories.length} categories
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}