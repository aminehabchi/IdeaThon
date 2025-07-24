"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon, ExternalLink, Download } from "lucide-react";
import Image from "next/image";

export const ImageBlock = ({ block }) => {
  const { data } = block;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Get image URL from various possible sources
  const imageUrl = data.file?.url || data.url || data.src;
  const caption = data.caption || data.alt || '';
  const stretched = data.stretched || false;
  const withBorder = data.withBorder || false;
  const withBackground = data.withBackground || false;
  
  // Handle alignment
  const getAlignmentClass = () => {
    switch (data.alignment) {
      case 'left':
        return 'text-left';
      case 'right':
        return 'text-right';
      case 'center':
      default:
        return 'text-center';
    }
  };

  // Handle image download
  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `image-${Date.now()}.${blob.type.split('/')[1] || 'jpg'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  // Handle image error
  if (!imageUrl || imageError) {
    return (
      <div className="mb-6">
        <Card className="border-dashed">
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <ImageIcon size={48} className="opacity-50" />
              <p className="text-sm">
                {imageError ? 'Failed to load image' : 'No image URL provided'}
              </p>
              {caption && (
                <p className="text-xs text-center italic">
                  {caption}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`mb-6 ${getAlignmentClass()}`}>
      <figure className={`inline-block ${stretched ? 'w-full' : 'max-w-full'}`}>
        <div className={`overflow-hidden ${withBorder ? 'border' : 'border-0 shadow-none'}`}>
          <CardContent className={`p-0 ${withBackground ? 'bg-muted' : ''}`}>
            <div className="relative group">
              {/* Loading skeleton */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center min-h-[200px]">
                  <ImageIcon className="text-muted-foreground opacity-50" size={48} />
                </div>
              )}
              
              {/* Main image */}
              <Image
                src={imageUrl}
                alt={data.alt || caption || "Image"}
                width={600}
                height={338} // optional, ~16:9 ratio
                className={`
                  mx-auto
                  h-auto
                  w-full
                  max-w-[600px]
                  transition-opacity duration-300
                  ${imageLoaded ? 'opacity-100' : 'opacity-0'}
                  ${withBackground ? 'p-4 bg-muted rounded-lg' : ''}
                `}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setImageLoaded(true);
                }}
                loading="lazy"
                unoptimized
              />



              
              {/* Image overlay with actions */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex gap-1">
                  {/* External link button */}
                  <button
                    onClick={() => window.open(imageUrl, '_blank')}
                    className="p-1.5 bg-black/50 text-white rounded-md hover:bg-black/70 transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink size={14} />
                  </button>
                  
                  {/* Download button */}
                  <button
                    onClick={handleDownload}
                    className="p-1.5 bg-black/50 text-white rounded-md hover:bg-black/70 transition-colors"
                    title="Download image"
                  >
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
          
          {/* Caption */}
          {caption && (
            <CardContent className="p-3 bg-muted/50 border-t">
              <p 
                className="text-sm text-muted-foreground text-center leading-relaxed"
                dangerouslySetInnerHTML={{ __html: caption }}
              />
            </CardContent>
          )}
        </div>
        
        {/* Image metadata */}
        {/* {imageLoaded && !imageError && (
          <div className="mt-2 text-xs text-muted-foreground text-center">
            <span className="opacity-70">
              Click and drag to view • Right-click to save
            </span>
          </div>
        )} */}
      </figure>
    </div>
  );
};