import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Document Parser
export class DocumentParser {
  static parseDocument(data) {
    if (!data || !data.blocks) {
      return null;
    }

    return {
      title: data.document?.title || data.title || "Untitled Project",
      banner: data.banner || data.document?.featuredImage?.url || "/belmaayo_avatar.png",
      categories: data.categories || [],
      privacy: data.privacy || "Public",
      price: data.price || 0,
      publishedAt: data.publishedAt,
      endDate: data.endDate,
      meta: data.meta || data.statistics || {},
      blocks: this.parseBlocks(data.blocks)
    };
  }

  static parseBlocks(blocks) {
    return blocks.map(block => ({
      id: block.id,
      type: block.type,
      data: block.data
    }));
  }

  static getDaysLeft(endDate) {
    if (!endDate) return null;
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }
}

export function getDaysLeft(dateString) {
  const targetDate = new Date(dateString);
  const now = new Date();

  // Calculate the difference in milliseconds
  const diff = targetDate - now;

  if (diff <= 0) {
    return "Ended";
  }

  const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return `${daysLeft} Day${daysLeft > 1 ? "s" : ""} left`;
}

// Function to extract and normalize data from the raw data structure
export const  extractDocumentData = (data) => {
  // If data is an array, grab the first item; otherwise use it directly
  const item = Array.isArray(data) ? data[0] : data;
  
  // Try to parse the description JSON
  let documentData = {};
  try {
    documentData = JSON.parse(item?.description || "{}");
  } catch (err) {
    console.error("Failed to parse description:", err);
  }

  // Extract the fields with safe fallbacks
  return {
    // Raw data
    item,
    documentData,
    
    // Owner information
    owner: item?.owner || {},
    
    // Document basic info
    title: documentData.document?.title || "Untitled",
    subtitle: documentData.document?.subtitle || "",
    slug: documentData.document?.slug || "",
    language: documentData.document?.language || "en",
    
    // Privacy and settings
    privacy: item?.privacy || documentData.settings?.privacy || "Public",
    allowComments: documentData.settings?.allowComments ?? true,
    allowSharing: documentData.settings?.allowSharing ?? true,
    
    // Pricing information
    price: item?.price ?? documentData.pricing?.price ?? 0,
    currency: documentData.pricing?.currency || "USD",
    pricingType: documentData.pricing?.type || "free",
    discount: documentData.pricing?.discount || null,
    
    // Dates and scheduling
    daysLeft: getDaysLeft(item?.end_date),
    startDate: item?.start_date,
    endDate: item?.end_date,
    publishedAt: documentData.publishedAt,
    updatedAt: documentData.updatedAt,
    createdAt: documentData.createdAt,
    
    // Categories and tags
    categories: item?.category || documentData.categories || [],
    tags: documentData.tags || [],
    
    // Statistics and meta
    wordCount: documentData.meta?.wordCount || documentData.statistics?.wordCount || 0,
    readingTime: documentData.meta?.readingTime || documentData.statistics?.readingTime || 0,
    characterCount: documentData.meta?.characterCount || 0,
    views: documentData.statistics?.views || 0,
    likes: documentData.statistics?.likes || 0,
    shares: documentData.statistics?.shares || 0,
    comments: documentData.statistics?.comments || 0,
    blockCount: documentData.statistics?.blockCount || 0,
    
    // SEO information
    metaTitle: documentData.seo?.metaTitle || "",
    metaDescription: documentData.seo?.metaDescription || "",
    keywords: documentData.seo?.keywords || [],
    canonicalUrl: documentData.seo?.canonicalUrl || "",
    
    // Media
    banner: item?.banner || "",
    featuredImage: documentData.document?.featuredImage || {},
    
    // Content blocks
    blocks: documentData.blocks || [],
    tableOfContents: documentData.tableOfContents || [],
    
    // Schedule settings
    schedule: {
      publishAt: documentData.schedule?.publishAt,
      unpublishAt: documentData.schedule?.unpublishAt,
      featured: documentData.schedule?.featured || { enabled: false }
    }
  };
};