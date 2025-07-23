"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Unlock, Clock } from "lucide-react";

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


export  function DataParserIdeas({ data=exampleData }) {
  if (!data || !data.blocks) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">No content to display</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderBlock = (block) => {
    const { type, data: blockData, id } = block;

    switch (type) {
      case "header": {
        const HeaderTag = `h${blockData.level || 2}`;
        const headerClasses = {
          1: "text-4xl font-bold mb-6 text-foreground",
          2: "text-3xl font-semibold mb-5 text-foreground",
          3: "text-2xl font-semibold mb-4 text-foreground",
          4: "text-xl font-medium mb-3 text-foreground",
        };

        return React.createElement(
          HeaderTag,
          {
            key: id,
            id: blockData.anchor,
            className: headerClasses[blockData.level || 2],
            style: { fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }
          },
          blockData.text
        );
      }

      case "paragraph":
        return (
          <div
            key={id}
            className={`mb-4 text-base leading-relaxed text-foreground ${
              blockData.alignment === "center"
                ? "text-center"
                : blockData.alignment === "right"
                ? "text-right"
                : "text-left"
            }`}
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              lineHeight: "1.6"
            }}
            dangerouslySetInnerHTML={{ __html: blockData.text }}
          />
        );

      case "list": {
        const ListTag = blockData.style === "ordered" ? "ol" : "ul";

        if (blockData.style === "checklist") {
          return (
            <div key={id} className="mb-4 space-y-2">
              {blockData.items?.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <input type="checkbox" checked={item.checked || false} readOnly className="w-4 h-4" />
                  <div className="text-base text-foreground leading-relaxed flex-1" dangerouslySetInnerHTML={{
                    __html: typeof item === 'string' ? item : item.content || item
                  }} />
                </div>
              ))}
            </div>
          );
        }

        return (
          <ListTag key={id} className="list-inside mb-4 space-y-2">
            {blockData.items?.map((item, index) => (
              <li
                key={index}
                className="text-base text-foreground leading-relaxed ml-4"
                dangerouslySetInnerHTML={{
                  __html: typeof item === 'string' ? item : item.content || item
                }}
              />
            ))}
          </ListTag>
        );
      }

      case "quote":
        return (
          <Card key={id} className="mb-6 border-l-4 border-l-primary">
            <CardContent className="p-6">
              <blockquote className="text-lg italic text-muted-foreground mb-3">
                "{blockData.text}"
              </blockquote>
              {blockData.caption && (
                <cite className="text-sm font-medium text-foreground">
                  — {blockData.caption}
                </cite>
              )}
            </CardContent>
          </Card>
        );

      case "code":
        return (
          <Card key={id} className="mb-6 bg-muted">
            <CardContent className="p-0">
              <div className="bg-muted-foreground/10 px-4 py-2 border-b">
                <Badge variant="secondary" className="text-xs">
                  {blockData.language || 'Code'}
                </Badge>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-sm font-mono text-foreground">
                  {blockData.code}
                </code>
              </pre>
            </CardContent>
          </Card>
        );

      case "image":
        return (
          <div key={id} className="mb-6">
            <Card className="inline-block overflow-hidden">
              <img
                src={blockData.file?.url || blockData.url}
                alt={blockData.alt || blockData.caption || "Image"}
                className="max-w-full h-auto"
              />
              {blockData.caption && (
                <CardContent className="p-3 bg-muted">
                  <p className="text-sm text-muted-foreground text-center">
                    {blockData.caption}
                  </p>
                </CardContent>
              )}
            </Card>
          </div>
        );

      case "delimiter":
        return (
          <div key={id} className="my-8 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-muted-foreground/50 rounded-full"></div>
              <div className="w-2 h-2 bg-muted-foreground/50 rounded-full"></div>
              <div className="w-2 h-2 bg-muted-foreground/50 rounded-full"></div>
            </div>
          </div>
        );

      default:
        return (
          <Card key={id} className="mb-4 border-dashed border-muted-foreground/30">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">
                Unsupported block type: {type}
              </p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="bg-white">
      <nav className="border-b bg-gray-100 py-4 px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 max-w-full">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <img src="/belmaayo_avatar.png" alt="Avatar" className="w-6 h-6 rounded-2xl" />
              <span className="font-medium text-gray-900">By OpenAI</span>
            </div>
            <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-100 font-medium px-3 py-1 flex items-center">
              <Unlock className="w-3 h-3 mr-1" />
              Public
            </Badge>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">5 Days Left</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <span className="text-xl sm:text-2xl font-bold text-gray-900">${data?.price || 0}</span>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-2 rounded-md w-full sm:w-auto">
              Participate
            </Button>
          </div>
        </div>
      </nav>

      <div className="px-6 py-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 border-b-2 border-gray-200 pb-8">
            <div className="lg:max-w-2xl text-center lg:text-left">
              <h1 className="text-5xl font-bold text-gray-900 mb-8 leading-tight">
                {data?.title || "Untitled Project"}
              </h1>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                {(data?.categories || []).map((cat, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-gray-100 text-gray-600 font-normal px-4 py-2 text-sm rounded-full border-0">
                    #{cat}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <img src={data?.banner || "/belmaayo_avatar.png"} alt="Banner" className="w-full max-w-xs rounded-lg shadow-lg" />
            </div>
          </div>

          <div className="px-6 py-8 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {data.blocks.map((block) => renderBlock(block))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}