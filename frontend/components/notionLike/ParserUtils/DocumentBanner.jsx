"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";

export const DocumentBanner = ({ parsedData: data }) => {
  // console.log("DocumentBanner data:", data.banner);

  // Handle different data structures
  // console.log("data", data);
  
  const getTitle = () => {
    return data?.document?.title || data?.title || "Untitled Document";
  };

  const getSubtitle = () => {
    return data?.document?.subtitle || data?.subtitle || "";
  };

  const getCategories = () => {
    return data?.categories || data?.document?.categories || [];
  };

const getBannerImage = () => {
      if (data?.banner) {
        // console.log("http://localhost:8080/api", data?.banner);
        
        // return `http://localhost:8080/api${data?.banner}` || "/ideathoonbanner.png";
        return `http://localhost:8080/api${data?.banner}` || "/ideathoonbanner.png";  
      }
      return null;
};


  const getBannerAlt = () => {
    return data?.document?.featuredImage?.alt || 
           data?.featuredImage?.alt || 
           data?.alt || 
           "Banner image";
  };

  const getAuthor = () => {
    return data?.document?.author || data?.author || null;
  };

  const getMeta = () => {
    return data?.meta || {};
  };

  const getPublishedDate = () => {
    return data?.publishedAt || data?.createdAt || null;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return "";
    }
  };

  const title = getTitle();
  const subtitle = getSubtitle();
  const categories = getCategories();
  // const bannerImage = getBannerImage();
  const bannerAlt = getBannerAlt();
  const author = getAuthor();
  const meta = getMeta();
  const publishedDate = getPublishedDate();

  return (
    <div className="px-6 py-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 border-b-2 border-gray-200 pb-8">
          <div className="lg:max-w-2xl text-center lg:text-left">
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight break-all hyphens-auto">
              {title}
            </h1>
            
            {/* Subtitle */}
            {subtitle && (
              <p className="text-xl text-gray-600 mb-6 leading-relaxed break-all hyphens-auto">
                {subtitle}
              </p>
            )}

            {/* Author and Meta Information */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
              {author && (
                <div className="flex items-center gap-3">
                  {author.avatar && (
                    <img 
                      src={author.avatar ? `http://localhost:8080/api/${author.avatar}` : "/empty_pfp.jpeg"} 
                      alt={author.name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div className="text-left">
                    <p className="font-medium text-gray-900 break-all hyphens-auto">{author.name}</p>
                    {author.bio && (
                      <p className="text-sm text-gray-500 break-all hyphens-auto">{author.bio}</p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Publication Date and Reading Time */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {publishedDate && (
                  <span className="break-all">{formatDate(publishedDate)}</span>
                )}
                {meta.readingTime && (
                  <>
                    <span>•</span>
                    <span className="break-all">{meta.readingTime} min read</span>
                  </>
                )}
                {meta.wordCount && (
                  <>
                    <span>•</span>
                    <span className="break-all">{meta.wordCount.toLocaleString()} words</span>
                  </>
                )}
              </div>
            </div>
            
            {/* Categories */}
            {categories.length > 0 && (
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {categories.map((cat, idx) => (
                  <Badge
                    key={idx}
                    variant="secondary"
                    className="text-sm font-medium px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-100 rounded-2xl break-all hyphens-auto"
                  >
                    #{cat}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* Banner Image */}
          {/* {bannerImage && ( */}
            <div className="flex justify-center">
              <img 
                src={data?.banner ? `http://localhost:8080/api${data?.banner}` : "/ideathoonbanner.png"} 
                alt={bannerAlt}
                className="w-full max-w-xs lg:max-w-sm rounded-lg shadow-lg object-cover"
                onError={(e) => {
                  e.target.src = "/ideathoonbanner.png";
                }}
              />
            </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};