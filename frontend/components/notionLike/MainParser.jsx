"use client";
import React from "react";
import { DocumentViewer } from "./DocumentViewer";

const exampleData = {
  document: {
    title: "My Notion-Like Document",
    featuredImage: {
      url: "/belmaayo_avatar.png",
      alt: "A sample banner image",
      caption: "An inspirational banner."
    }
  },
  banner: null,
  publishedAt: "2025-07-20T10:00:00Z",
  meta: {
    wordCount: 254,
    readingTime: 2
  },
  categories: ["Productivity", "Design", "Inspiration"],
  privacy: "Public",
  price: 19.99,
  endDate: "2025-08-01T00:00:00Z",
  statistics: {
    blockCount: 9,
    wordCount: 254,
    readingTime: 2
  },
  blocks: [
    {
      id: "1",
      type: "header",
      data: {
        text: "Welcome to My Guide",
        level: 1,
        anchor: "welcome"
      }
    },
    {
      id: "2",
      type: "paragraph",
      data: {
        text: "This is an example of a <strong>rich text</strong> paragraph with <a href='https://example.com'>a link</a>.",
        alignment: "left"
      }
    },
    {
      id: "3",
      type: "image",
      data: {
        url: "https://via.placeholder.com/600x400",
        alt: "A placeholder image",
        caption: "This is a caption",
        alignment: "center",
        stretched: true
      }
    },
    {
      id: "4",
      type: "list",
      data: {
        style: "unordered",
        items: ["First bullet", "Second bullet", "Third bullet"]
      }
    },
    {
      id: "5",
      type: "code",
      data: {
        code: "console.log('Hello World');",
        language: "javascript"
      }
    },
    {
      id: "6",
      type: "quote",
      data: {
        text: "The only way to do great work is to love what you do.",
        caption: "Steve Jobs"
      }
    },
    {
      id: "7",
      type: "delimiter",
      data: {}
    },
    {
      id: "8",
      type: "table",
      data: {
        content: [
          ["Feature", "Value"],
          ["Speed", "Fast"],
          ["Flexibility", "High"]
        ]
      }
    },
    {
      id: "9",
      type: "embed",
      data: {
        service: "youtube",
        embed: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        source: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        caption: "Watch this video"
      }
    }
  ]
};

export  function MainParser() {
  

  return <DocumentViewer data={exampleData} />;
}