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