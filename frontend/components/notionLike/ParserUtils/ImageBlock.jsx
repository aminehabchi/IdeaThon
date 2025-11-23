"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon, ExternalLink, Download } from "lucide-react";
import Image from "next/image";

export const ImageBlock = ({ block }) => {
  const { data } = block;
  // Debug: log the image block data to help diagnose issues
  if (typeof window !== "undefined") {
    // Only log on client
    // eslint-disable-next-line no-console
    console.log("[ImageBlock] data:", data);
  }

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Helper to get the correct image URL (supports base64, blob, http, or relative)
  const resolveImageUrl = (url) => {
    if (!url) return null;
    // If it's a base64 data URL, blob, or full URL, use as is
    if (url.startsWith("data:image/") || url.startsWith("blob:") || url.startsWith("http")) return url;
    // Otherwise, assume it's a relative path from backend
    return `/api${url}`;
  };

  // Try all possible fields for image URL (base64 or backend)
  const rawUrl = data?.file?.url || data?.url || data?.src;
  const imageUrl = resolveImageUrl(rawUrl);
  const caption = data.caption || data.alt || "";
  const stretched = data.stretched || false;
  const withBorder = data.withBorder || false;
  const withBackground = data.withBackground || false;

  const getAlignmentClass = () => {
    switch (data.alignment) {
      case "center":
        return "text-center";
      case "right":
        return "text-right";
      case "left":
      default:
        return "text-left";
    }
  };

  const handleOpenInNewTab = () => {
    try {
      // For base64 images, create a blob URL to avoid 431 error
      if (imageUrl.startsWith("data:image/")) {
        const arr = imageUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        const blobUrl = window.URL.createObjectURL(blob);
        window.open(blobUrl, "_blank");
        // Note: blob URL will be valid for this session
      } else {
        // For regular URLs, open directly
        window.open(imageUrl, "_blank");
      }
    } catch (error) {
      console.error("Failed to open image:", error);
    }
  };

  const handleDownload = async () => {
    try {
      let blob;

      // Handle base64 data URLs differently to avoid 431 error
      if (imageUrl.startsWith("data:image/")) {
        // Convert base64 to blob directly without HTTP request
        const arr = imageUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        blob = new Blob([u8arr], { type: mime });
      } else {
        // For regular URLs, fetch normally
        const response = await fetch(imageUrl);
        blob = await response.blob();
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `image-${Date.now()}.${blob.type.split("/")[1] || "jpg"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  if (!imageUrl || imageError) {
    return (
      <div className="mb-6">
        <Card className="border-dashed">
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <ImageIcon size={48} className="opacity-50" />
              <p className="text-sm">
                {imageError ? "Failed to load image" : "No image URL provided"}
              </p>
              {caption && (
                <p className="text-xs text-center italic">{caption}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`mb-6 ${getAlignmentClass()}`}>
      <figure className={`inline-block ${stretched ? "w-full" : "max-w-full"}`}>
        <div className={`overflow-hidden ${withBorder ? "border" : "border-0 shadow-none"}`}>
          <CardContent className={`p-0 ${withBackground ? "bg-muted" : ""}`}>
            <div className="relative group">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center min-h-[200px]">
                  <ImageIcon className="text-muted-foreground opacity-50" size={48} />
                </div>
              )}

              <Image
                src={imageUrl}
                alt={data.alt || caption || "Image"}
                width={600}
                height={338}
                className={`
                  mx-auto
                  h-auto
                  w-full
                  max-w-[600px]
                  transition-opacity duration-300
                  ${imageLoaded ? "opacity-100" : "opacity-0"}
                  ${withBackground ? "p-4 bg-muted rounded-lg" : ""}
                `}
                onLoad={() => setImageLoaded(true)}
                onError={() => {
                  setImageError(true);
                  setImageLoaded(true);
                }}
                loading="lazy"
                unoptimized
              />

              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="flex gap-1">
                  <button
                    onClick={handleOpenInNewTab}
                    className="p-1.5 bg-black/50 text-white rounded-md hover:bg-black/70 transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink size={14} />
                  </button>
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

          {caption && (
            <CardContent className="p-3 bg-muted/50 border-t">
              <p
                className="text-sm text-muted-foreground text-center leading-relaxed"
                dangerouslySetInnerHTML={{ __html: caption }}
              />
            </CardContent>
          )}
        </div>
      </figure>
    </div>
  );
};
