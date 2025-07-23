"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import "../app/globals.css";
import { fetcher, imageToBase64 } from "@/lib/helpers.js";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

export default function ProfessionalEditor({ form }) {
  //console.log("from the start", form);

  const editorRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  // const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [title, setTitle] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  // Initialize Editor
  useEffect(() => {
    let editor;

    const loadEditor = async () => {
      try {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;
        const List = (await import("@editorjs/list")).default;
        const Image = (await import("@editorjs/image")).default;
        const Quote = (await import("@editorjs/quote")).default;
        const Code = (await import("@editorjs/code")).default;
        const Delimiter = (await import("@editorjs/delimiter")).default;
        const InlineCode = (await import("@editorjs/inline-code")).default;
        const Marker = (await import("@editorjs/marker")).default;
        const Embed = (await import("@editorjs/embed")).default;
        const Table = (await import("@editorjs/table")).default;

        editor = new EditorJS({
          holder: "professional-editor",
          placeholder: "Start crafting your amazing content...",
          minHeight: 300,
          tools: {
            header: {
              class: Header,
              config: {
                levels: [1, 2, 3, 4],
                defaultLevel: 2,
                placeholder: "Enter a header",
              },
              shortcut: "CMD+SHIFT+H",
            },
            list: {
              class: List,
              inlineToolbar: true,
              config: {
                defaultStyle: "unordered",
              },
              shortcut: "CMD+SHIFT+L",
            },
            quote: {
              class: Quote,
              inlineToolbar: true,
              config: {
                quotePlaceholder: "Enter a quote",
                captionPlaceholder: "Quote's author",
              },
              shortcut: "CMD+SHIFT+O",
            },
            code: {
              class: Code,
              config: {
                placeholder: "Enter your code here...",
              },
              shortcut: "CMD+SHIFT+C",
            },
            delimiter: {
              class: Delimiter,
              shortcut: "CMD+SHIFT+D",
            },
            table: {
              class: Table,
              inlineToolbar: true,
              config: {
                rows: 2,
                cols: 3,
              },
              shortcut: "CMD+ALT+T",
            },
            embed: {
              class: Embed,
              config: {
                services: {
                  youtube: true,
                  coub: true,
                  codepen: true,
                  twitter: true,
                  instagram: true,
                },
              },
            },
            image: {
              class: Image,
              config: {
                uploader: {
                  async uploadByFile(file) {
                    // Simulate upload delay
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    return {
                      success: 1,
                      file: {
                        url: URL.createObjectURL(file),
                      },
                    };
                  },
                  async uploadByUrl(url) {
                    return {
                      success: 1,
                      file: {
                        url: url,
                      },
                    };
                  },
                },
                placeholder: "Paste image URL or upload file",
              },
            },
            // Inline tools
            Marker: {
              class: Marker,
              shortcut: "CMD+SHIFT+M",
            },
            inlineCode: {
              class: InlineCode,
              shortcut: "CMD+SHIFT+X",
            },
          },
          onChange: async () => {
            await updateWordCount();
          },
          onReady: () => {
            setIsReady(true);
            console.log("Editor is ready!");
          },
        });

        editorRef.current = editor;
      } catch (error) {
        console.error("Error loading editor:", error);
      }
    };

    if (!editorRef.current) {
      loadEditor();
    }

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  // Update word count
  const updateWordCount = useCallback(async () => {
    if (editorRef.current) {
      try {
        const data = await editorRef.current.save();
        let totalWords = 0;

        data.blocks.forEach((block) => {
          if (block.data.text) {
            const text = block.data.text.replace(/<[^>]*>/g, ""); // Remove HTML tags
            totalWords += text
              .trim()
              .split(/\s+/)
              .filter((word) => word.length > 0).length;
          }
        });

        setWordCount(totalWords);
      } catch (error) {
        console.error("Error counting words:", error);
      }
    }
  }, []);

  // Save content (silently)
  const handleSave = useCallback(async () => {
    if (!editorRef.current) return;

    try {
      const data = await editorRef.current.save();

      // Simulate silent save to backend
      await new Promise((resolve) => setTimeout(resolve, 500));

      setLastSaved(new Date());
      // Silent save - no user feedback
    } catch (error) {
      toast.error("Publish failed:", error);
    }
  }, []);

  // REPLACE YOUR OLD handlePublish WITH THIS ENHANCED VERSION
  const handlePublish = useCallback(async () => {
    if (!editorRef.current) return;

    setIsPublishing(true);
    try {
      // Get raw EditorJS data
      const editorData = await editorRef.current.save();
      
      // Helper function to enhance block data
      function enhanceBlockData(block) {
        const baseData = { ...block.data };
        
        switch (block.type) {
          case 'header':
            return {
              ...baseData,
              anchor: baseData.text ? baseData.text.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''
            };
            
          case 'paragraph':
            return {
              ...baseData,
              alignment: baseData.alignment || 'left'
            };
            
          case 'image':
            return {
              ...baseData,
              alt: baseData.alt || baseData.caption || 'Image',
              alignment: baseData.alignment || 'center'
            };
            
          case 'list':
            return {
              ...baseData,
              items: baseData.items ? baseData.items.map(item => ({
                content: typeof item === 'string' ? item : item.content || item,
                items: [] // Support for nested items
              })) : []
            };
            
          case 'code':
            return {
              ...baseData,
              language: baseData.language || 'javascript',
              theme: 'dark',
              showLineNumbers: true
            };
            
          case 'quote':
            return {
              ...baseData,
              alignment: 'left',
              style: 'border-left'
            };
            
          default:
            return baseData;
        }
      }
      
      // Transform to enhanced structure
      const enhancedData = {
        meta: {
          version: "1.0",
          created: new Date().toISOString(),
          modified: new Date().toISOString(),
          wordCount: wordCount,
          readingTime: Math.ceil(wordCount / 250), // avg reading speed
          language: "en"
        },
        
        document: {
          id: `doc_${Date.now()}`,
          title: title.trim() || "Untitled",
          slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          status: "published",
          tags: form.categories || [],
          featuredImage: form.banner ? {
            url: form.banner,
            alt: "Featured image",
            caption: ""
          } : null
        },
        
        // Transform EditorJS blocks to enhanced format
        blocks: editorData.blocks.map((block, index) => ({
          id: block.id || `block_${index}`,
          type: block.type,
          data: enhanceBlockData(block),
          meta: {
            order: index,
            created: new Date().toISOString()
          }
        })),
        
        // Generate table of contents from headers
        tableOfContents: editorData.blocks
          .filter(block => block.type === 'header')
          .map((block, index) => ({
            id: block.id || `header_${index}`,
            text: block.data.text,
            level: block.data.level,
            anchor: block.data.text ? block.data.text.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''
          })),
        
        // Calculate statistics
        statistics: {
          blockCount: editorData.blocks.length,
          wordCount: wordCount,
          readingTime: Math.ceil(wordCount / 250),
          blockTypes: editorData.blocks.reduce((acc, block) => {
            acc[block.type] = (acc[block.type] || 0) + 1;
            return acc;
          }, {})
        },
        
        // Add form-specific data
        endDate: form.endDate,
        categories: form.categories,
        price: form.price,
        privacy: form.privacy,
        publishedAt: new Date().toISOString()
      };
      
      console.log("Enhanced Data:", enhancedData);

      // Send to api/create endpoint with enhanced structure
      await fetcher({
        url: "http://localhost:8080/api/ideathons/add",
        method: "POST",
        data: enhancedData,
        token: null,
        returned_status: 201,
      });
      
      router.push("/create/publish");
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPublishing(false);
    }
  }, [title, wordCount, form, router]);

  // Auto-save every 10 seconds (silently)
  useEffect(() => {
    if (!isReady) return;

    const interval = setInterval(() => {
      handleSave();
    }, 10000); // Save every 10 seconds

    return () => clearInterval(interval);
  }, [isReady, handleSave]);

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Clean Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-6">
          <div className="relative group">
            <button className="text-sm text-gray-600 hover:text-gray-800">
              Shortcuts
            </button>
            {/* noion like shortcuts */}
            <Shortcuts></Shortcuts>
          </div>
          <span className="text-sm text-gray-500">Auto-save enabled</span>
          <span className="text-sm text-gray-500">{wordCount} words</span>
        </div>
        <button
          onClick={handlePublish}
          disabled={isPublishing || !isReady}
          className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
        >
          {isPublishing ? "Publishing..." : "Publish"}
        </button>
      </div>

      {/* Editor Container */}
      <div className="px-6 py-8">
        {/* Title Input */}
        <div className="mb-8">
          <div className="flex items-start">
            <div className="w-1 h-6 bg-gray-800 mr-4 mt-1 flex-shrink-0"></div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="One Liner Title is going well here in this place"
              className="text-2xl font-normal text-gray-800 placeholder-gray-400 border-none outline-none w-full bg-transparent"
              style={{
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            />
          </div>
        </div>

        {!isReady && (
          <div className="flex items-center space-x-2 text-gray-400 mb-4">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400" />
            <span className="text-sm">Loading editor...</span>
          </div>
        )}

        <div
          id="professional-editor"
          className={`min-h-[400px] transition-opacity ${
            isReady ? "opacity-100" : "opacity-50"
          }`}
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#374151",
          }}
        />
      </div>
    </div>
  );
}

// notoion-like shortcuts:
export function Shortcuts() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 p-3 z-10 rounded-lg bg-gray-700 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
      <p>
        <kbd className="font-mono">Cmd+Shift+H</kbd>: Heading
      </p>
      <p>
        <kbd className="font-mono">Cmd+Shift+L</kbd>: List
      </p>
      <p>
        <kbd className="font-mono">Cmd+Shift+O</kbd>: Quote
      </p>
      <p>
        <kbd className="font-mono">Cmd+Shift+C</kbd>: Code
      </p>
      <p>
        <kbd className="font-mono">Cmd+Shift+D</kbd>: Divider
      </p>
      <p>
        <kbd className="font-mono">Cmd+Alt+T</kbd>: Table
      </p>
      <p>
        <kbd className="font-mono">Cmd+Shift+M</kbd>: Marker
      </p>
      <p>
        <kbd className="font-mono">Cmd+Shift+X</kbd>: Inline Code
      </p>
    </div>
  );
}