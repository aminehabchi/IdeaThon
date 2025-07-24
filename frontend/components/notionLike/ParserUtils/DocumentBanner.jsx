"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";

export const DocumentBanner = ({ data }) => {
  console.log("DocumentBanner data:", data);

  // Handle different data structures
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
    // Check multiple possible locations for the banner image
    return data?.document?.featuredImage?.url || 
           data?.featuredImage?.url || 
           data?.banner || 
           data?.url || 
           null;
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
  const bannerImage = getBannerImage();
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
            <h1 className="text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {title}
            </h1>
            
            {/* Subtitle */}
            {subtitle && (
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {subtitle}
              </p>
            )}

            {/* Author and Meta Information */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
              {author && (
                <div className="flex items-center gap-3">
                  {author.avatar && (
                    <img 
                      src={author.avatar} 
                      alt={author.name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{author.name}</p>
                    {author.bio && (
                      <p className="text-sm text-gray-500">{author.bio}</p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Publication Date and Reading Time */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {publishedDate && (
                  <span>{formatDate(publishedDate)}</span>
                )}
                {meta.readingTime && (
                  <>
                    <span>•</span>
                    <span>{meta.readingTime} min read</span>
                  </>
                )}
                {meta.wordCount && (
                  <>
                    <span>•</span>
                    <span>{meta.wordCount.toLocaleString()} words</span>
                  </>
                )}
              </div>
            </div>
            
            {/* Categories */}
            {categories.length > 0 && (
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                {categories.map((cat, idx) => (
                  <Badge 
                    key={idx} 
                    variant="secondary" 
                    className="bg-gray-100 text-gray-600 font-normal px-4 py-2 text-sm rounded-full border-0 hover:bg-gray-200 transition-colors"
                  >
                    #{cat}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* Banner Image */}
          {bannerImage && (
            <div className="flex justify-center">
              <img 
                src={bannerImage} 
                alt={bannerAlt}
                className="w-full max-w-xs lg:max-w-sm rounded-lg shadow-lg object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  console.error('Failed to load banner image:', bannerImage);
                }}
              />
            </div>
          )}
        </div>
        
        {/* Additional Stats Row */}
        {(data.statistics || data.meta) && (
          <div className="pt-6">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-500">
              {data.statistics?.views && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{data.statistics.views.toLocaleString()} views</span>
                </div>
              )}
              
              {data.statistics?.likes && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{data.statistics.likes} likes</span>
                </div>
              )}
              
              {data.statistics?.comments && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{data.statistics.comments} comments</span>
                </div>
              )}
              
              {data.statistics?.blockCount && (
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <span>{data.statistics.blockCount} blocks</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};