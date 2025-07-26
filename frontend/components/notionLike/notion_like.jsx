"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { fetcher, imageToBase64 } from "@/lib/helpers.js";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";

export  function ProfessionalEditor({ form , apiUrl}) {
  const editorRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [wordCount, setWordCount] = useState(0);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  // Initialize Editor with all supported tools
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
        const Checklist = (await import("@editorjs/checklist")).default;
        const Warning = (await import("@editorjs/warning")).default;
        const LinkTool = (await import("@editorjs/link")).default;
        const RawTool = (await import("@editorjs/raw")).default;
        const Paragraph = (await import("@editorjs/paragraph")).default;

        editor = new EditorJS({
          holder: "professional-editor",
          placeholder: "Start crafting your amazing content...",
          minHeight: 300,
          minWidth: 300,
          tools: {
            // Text formatting tools
            paragraph: {
              class: Paragraph,
              config: {
                placeholder: "Enter your text here...",
                preserveBlank: true,
              },
            },
            header: {
              class: Header,
              config: {
                levels: [1, 2, 3, 4, 5, 6],
                defaultLevel: 2,
                placeholder: "Enter a header",
                allowAnchor: true,
              },
              shortcut: "CMD+SHIFT+H",
            },
            
            // List tools
            list: {
              class: List,
              inlineToolbar: true,
              config: {
                defaultStyle: "unordered",
              },
              shortcut: "CMD+SHIFT+L",
            },
            checklist: {
              class: Checklist,
              inlineToolbar: true,
              shortcut: "CMD+SHIFT+K",
            },
            
            // Media tools
            image: {
              class: Image,
              config: {
                uploader: {
                  async uploadByFile(file) {
                    try {
                      const base64 = await imageToBase64(file);
                      return {
                        success: 1,
                        file: {
                          url: base64, // base64 string
                        },
                      };
                    } catch (err) {
                      console.error("Image conversion failed:", err);
                      toast.error("Image upload failed");
                      return { success: 0 };
                    }
                  },
                  async uploadByUrl(url) {
                    try {
                      const response = await fetch(url);
                      const blob = await response.blob();
                      const base64 = await imageToBase64(blob);
                      return {
                        success: 1,
                        file: {
                          url: base64,
                        },
                      };
                    } catch (err) {
                      console.error("Image URL conversion failed:", err);
                      toast.error("Image upload by URL failed");
                      return { success: 0 };
                    }
                  },
                },
                placeholder: "Paste image URL or upload file",
                captionPlaceholder: "Enter image caption",
                buttonContent: "Select an image",
                types: "image/*",
                withBorder: false,
                withBackground: false,
                stretched: false,
              },
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
                  facebook: true,
                  vimeo: true,
                  github: true,
                },
              },
            },
            
            // Content tools
            quote: {
              class: Quote,
              inlineToolbar: true,
              config: {
                quotePlaceholder: "Enter a quote",
                captionPlaceholder: "Quote's author",
              },
              shortcut: "CMD+SHIFT+O",
            },
            warning: {
              class: Warning,
              inlineToolbar: true,
              config: {
                titlePlaceholder: "Title",
                messagePlaceholder: "Message",
              },
              shortcut: "CMD+SHIFT+W",
            },
            
            // Code tools
            code: {
              class: Code,
              config: {
                placeholder: "Enter your code here...",
              },
              shortcut: "CMD+SHIFT+C",
            },
            raw: {
              class: RawTool,
              config: {
                placeholder: "Enter raw HTML...",
              },
              shortcut: "CMD+SHIFT+R",
            },
            
            // Structure tools
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
                withHeadings: true,
              },
              shortcut: "CMD+ALT+T",
            },
            linkTool: {
              class: LinkTool,
              config: {
                endpoint: "/api/fetchUrl", // Your endpoint for url data fetching
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
            await handleAutoSave();
          },
          onReady: () => {
            setIsReady(true);
            console.log("Enhanced Editor is ready!");
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

  // Enhanced word count calculation
  const updateWordCount = useCallback(async () => {
    if (editorRef.current) {
      try {
        const data = await editorRef.current.save();
        let totalWords = 0;

        data.blocks.forEach((block) => {
          let text = "";
          
          switch (block.type) {
            case "paragraph":
            case "header":
              text = block.data.text || "";
              break;
            case "list":
              text = block.data.items ? block.data.items.join(" ") : "";
              break;
            case "checklist":
              text = block.data.items ? block.data.items.map(item => item.text).join(" ") : "";
              break;
            case "quote":
              text = `${block.data.text || ""} ${block.data.caption || ""}`;
              break;
            case "code":
              text = block.data.code || "";
              break;
            case "warning":
              text = `${block.data.title || ""} ${block.data.message || ""}`;
              break;
            case "table":
              if (block.data.content) {
                text = block.data.content.flat().join(" ");
              }
              break;
            default:
              if (block.data.text) {
                text = block.data.text;
              }
          }

          if (text) {
            const cleanText = text.replace(/<[^>]*>/g, ""); // Remove HTML tags
            totalWords += cleanText
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

  // Auto-save functionality
  const handleAutoSave = useCallback(async () => {
    if (!editorRef.current || !isReady) return;

    try {
      const data = await editorRef.current.save();
      // Save to localStorage as backup
      localStorage.setItem('editor-autosave', JSON.stringify({
        title,
        subtitle,
        content: data,
        timestamp: new Date().toISOString()
      }));
      setLastSaved(new Date());
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  }, [title, subtitle, isReady]);

  // Enhanced publish function supporting all block types
  const handlePublish = useCallback(async () => {
    if (!editorRef.current) return;

    setIsPublishing(true);
    try {
      const editorData = await editorRef.current.save();
      
      // Enhanced block data processing
      function enhanceBlockData(block, index) {
        const baseData = { ...block.data };
        
        switch (block.type) {
          case 'header':
            return {
              ...baseData,
              anchor: baseData.text ? baseData.text.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '',
              alignment: baseData.alignment || 'left'
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
              alignment: baseData.alignment || 'center',
              stretched: baseData.stretched || false,
              withBorder: baseData.withBorder || false,
              withBackground: baseData.withBackground || false
            };
            
          case 'list':
            return {
              ...baseData,
              items: baseData.items ? baseData.items.map(item => ({
                content: typeof item === 'string' ? item : item.content || item,
                items: [] // Support for nested items
              })) : []
            };
            
          case 'checklist':
            return {
              ...baseData,
              items: baseData.items ? baseData.items.map(item => ({
                content: item.text || item.content,
                checked: item.checked || false
              })) : []
            };
            
          case 'code':
            return {
              ...baseData,
              language: baseData.language || 'javascript',
              showLineNumbers: true
            };
            
          case 'quote':
            return {
              ...baseData,
              alignment: 'left',
              style: 'border-left'
            };
            
          case 'warning':
            return {
              ...baseData,
              level: baseData.level || 'warning' // info, warning, error, success
            };
            
          case 'table':
            return {
              ...baseData,
              withHeadings: baseData.withHeadings !== false
            };
            
          case 'embed':
            return {
              ...baseData,
              width: baseData.width || 560,
              height: baseData.height || 315
            };
            
          default:
            return baseData;
        }
      }
      
      // Calculate reading time based on word count
      const readingTime = Math.ceil(wordCount / 250);
      
      // Generate table of contents from headers
      const tableOfContents = editorData.blocks
        .filter(block => block.type === 'header')
        .map((block, index) => ({
          id: block.id || `header_${index}`,
          text: block.data.text,
          level: block.data.level,
          anchor: block.data.text ? block.data.text.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''
        }));
      
      // Calculate block statistics
      const blockTypes = editorData.blocks.reduce((acc, block) => {
        acc[block.type] = (acc[block.type] || 0) + 1;
        return acc;
      }, {});

      // Create enhanced data structure
      const enhancedData = {
        document: {
          id: `doc_${Date.now()}`,
          title: title.trim() || "Untitled",
          subtitle: subtitle.trim() || "",
          slug: (title || "untitled").toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          language: "en",
          version: "1.0.0",
          featuredImage: form.banner ? {
            url: form.banner,
            alt: "Featured image",
            caption: ""
          } : null,
          author: {
            id: "user_001", // TODO: Replace with actual user data
            name: "Author Name",
            avatar: "/default-avatar.png",
            bio: "Content creator"
          }
        },
        
        // Timestamps
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        
        // Content metadata
        meta: {
          wordCount: wordCount,
          readingTime: readingTime,
          characterCount: JSON.stringify(editorData).length,
          estimatedReadingSpeed: 250
        },
        
        // Categories and tags
        categories: form.categories || [],
        tags: [], // Could be extracted from content or user input
        
        // Settings
        settings: {
          privacy: form.privacy || "public",
          password: null,
          allowComments: true,
          allowSharing: true,
          seoOptimized: true,
          showTableOfContents: tableOfContents.length > 0,
          enableAnalytics: true
        },
        
        // Pricing
        pricing: {
          type: form.price > 0 ? "paid" : "free",
          price: parseInt(form.price, 10) || 0,
          currency: "USD",
          discount: null
        },
        
        // Schedule
        schedule: {
          publishAt: new Date().toISOString(),
          unpublishAt: form.endDate || null,
          featured: {
            enabled: false,
            startDate: form.startDate || new Date().toISOString(),
            endDate: form.endDate || null
          }
        },
        
        // Statistics
        statistics: {
          blockCount: editorData.blocks.length,
          wordCount: wordCount,
          readingTime: readingTime,
          views: 0,
          likes: 0,
          shares: 0,
          comments: 0,
          blockTypes: blockTypes
        },
        
        // SEO
        seo: {
          metaTitle: title || "Untitled",
          metaDescription: subtitle || `Learn about ${title}`,
          keywords: form.categories || [],
          ogImage: form.banner || null,
          canonicalUrl: ""
        },
        
        // Enhanced blocks
        blocks: editorData.blocks.map((block, index) => ({
          id: block.id || `block_${index}`,
          type: block.type,
          data: enhanceBlockData(block, index),
          meta: {
            order: index,
            created: new Date().toISOString()
          }
        })),
        
        // Table of contents
        tableOfContents: tableOfContents
      };
    
      // Convert banner to base64 if exists
      let base64Banner = "";
      if (form.banner) {
        try {
          base64Banner = await imageToBase64(form.banner);
        } catch (err) {
          console.error("Banner conversion failed:", err);
          toast.error("Failed to convert banner image to base64.");
          return;
        }
      }

      console.log("Enhanced Data Structure:", enhancedData);

      // Backend payload
      const backendPayload = {
        user_id: 1, // TODO: Replace with actual logged-in user ID
        description: JSON.stringify(enhancedData),
        banner: base64Banner,
        price: parseInt(form.price, 10) || 0,
        created_at: new Date().toISOString(),
        start_date: form.startDate || "",
        end_date: form.endDate || "",
        category: Array.isArray(form.categories) ? form.categories : [],
        winner_id: null,
        privacy: form.privacy || "public"
      };

      // Send to backend
      console.log("Backend Payload:", backendPayload);
      
      await fetcher({
        url: `http://localhost:8080/${apiUrl}`,
        method: "POST",
        data: backendPayload,
        token: null,
        returned_status: 201,
      });
      
      // Clear autosave
      localStorage.removeItem('editor-autosave');
      
      toast.success("Content published successfully!");
      router.push("/create/publish");
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPublishing(false);
    }
  }, [title, subtitle, wordCount, form, router]);

  // Load autosaved content on mount
  useEffect(() => {
    const loadAutosave = () => {
      try {
        const autosave = JSON.parse(localStorage.getItem('editor-autosave') || '{}');
        if (autosave.title) setTitle(autosave.title);
        if (autosave.subtitle) setSubtitle(autosave.subtitle);
        
        if (autosave.content && editorRef.current && isReady) {
          editorRef.current.render(autosave.content);
        }
      } catch (error) {
        console.error("Failed to load autosave:", error);
      }
    };

    if (isReady) {
      loadAutosave();
    }
  }, [isReady]);

  // Auto-save every 10 seconds
  useEffect(() => {
    if (!isReady) return;

    const interval = setInterval(() => {
      handleAutoSave();
    }, 10000);

    return () => clearInterval(interval);
  }, [isReady, handleAutoSave]);

  return (
    <div className="max-w-4xl mx-auto bg-white">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center space-x-6">
          <div className="relative group">
            <button className="text-sm text-gray-600 hover:text-gray-800">
              Shortcuts
            </button>
            <EnhancedShortcuts />
          </div>
          <span className="text-sm text-gray-500">Auto-save enabled</span>
          <span className="text-sm text-gray-500">{wordCount} words</span>
          <span className="text-sm text-gray-500">{Math.ceil(wordCount / 250)} min read</span>
          {lastSaved && (
            <span className="text-xs text-gray-400">
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          )}
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
        <div className="mb-6">
          <div className="flex items-start">
            <div className="w-1 h-6 bg-gray-800 mr-4 mt-1 flex-shrink-0"></div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your compelling title goes here..."
              className="text-2xl font-bold text-gray-800 placeholder-gray-400 border-none outline-none w-full bg-transparent"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            />
          </div>
        </div>

        {/* Subtitle Input */}
        <div className="mb-8">
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Add a subtitle to provide more context..."
            className="text-lg text-gray-600 placeholder-gray-400 border-none outline-none w-full bg-transparent ml-5"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          />
        </div>

        {!isReady && (
          <div className="flex items-center space-x-2 text-gray-400 mb-4">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400" />
            <span className="text-sm">Loading enhanced editor...</span>
          </div>
        )}

        <div
          id="professional-editor"
          className={`min-h-[400px] transition-opacity${
            isReady ? "opacity-100 mr-30" : "opacity-50"
          }`}
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#374151",
          }}
        />
      </div>
      
      <Toaster position="bottom-right" />
    </div>
  );
}

// Enhanced shortcuts component
export function EnhancedShortcuts() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-80 p-4 z-10 rounded-lg bg-gray-700 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
      <div className="grid grid-cols-1 gap-1">
        <p><kbd className="font-mono">Cmd+Shift+H</kbd>: Heading</p>
        <p><kbd className="font-mono">Cmd+Shift+L</kbd>: List</p>
        <p><kbd className="font-mono">Cmd+Shift+K</kbd>: Checklist</p>
        <p><kbd className="font-mono">Cmd+Shift+O</kbd>: Quote</p>
        <p><kbd className="font-mono">Cmd+Shift+C</kbd>: Code Block</p>
        <p><kbd className="font-mono">Cmd+Shift+W</kbd>: Warning/Info</p>
        <p><kbd className="font-mono">Cmd+Shift+D</kbd>: Divider</p>
        <p><kbd className="font-mono">Cmd+Alt+T</kbd>: Table</p>
        <p><kbd className="font-mono">Cmd+Shift+R</kbd>: Raw HTML</p>
        <p><kbd className="font-mono">Cmd+Shift+M</kbd>: Highlight</p>
        <p><kbd className="font-mono">Cmd+Shift+X</kbd>: Inline Code</p>
      </div>
    </div>
  );
}