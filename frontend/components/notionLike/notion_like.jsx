"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { imageToBase64 } from "@/lib/helpers.js";
import { useRouter } from "next/navigation";

import { toast, Toaster } from "sonner";

export function ProfessionalEditor({ setIsPublish, setEditorContent, ideathon }) {
  const editorRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const hasRenderedRef = useRef(false);
  const editorInitializedRef = useRef(false);
  const isLoadingContentRef = useRef(false);
  const autoSaveTimeoutRef = useRef(null);

  // Auto-save function
  const autoSave = useCallback(async () => {
    if (!editorRef.current || !isReady) return;

    try {
      const editorData = await editorRef.current.save();
      
      // Create the data structure for auto-save
      const saveData = {
        document: {
          title: title.trim() || "",
          subtitle: subtitle.trim() || "",
        },
        blocks: editorData.blocks,
        savedAt: new Date().toISOString(),
      };

      // Here you can add your auto-save logic (e.g., save to localStorage, send to API)
      // For now, we'll just update the last saved timestamp
      setLastSaved(new Date());
      
      // Optional: Save to localStorage as backup
      localStorage.setItem('editor_autosave', JSON.stringify(saveData));
      
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  }, [title, subtitle, isReady]);

  // Debounced auto-save
  const triggerAutoSave = useCallback(() => {
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }
    
    autoSaveTimeoutRef.current = setTimeout(() => {
      autoSave();
    }, 2000); // Auto-save after 2 seconds of inactivity
  }, [autoSave]);

  // Initialize Editor
  useEffect(() => {
    if (editorInitializedRef.current) return;

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
            paragraph: {
              class: Paragraph,
              config: {
                placeholder: "",
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
                          url: base64,
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
                endpoint: "/api/fetchUrl",
              },
            },
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
            if (editorInitializedRef.current) {
              triggerAutoSave();
            }
          },
          onReady: () => {
            console.log("Enhanced Editor is ready!");
            setIsReady(true);
            editorInitializedRef.current = true;
          },
        });

        editorRef.current = editor;
      } catch (error) {
        console.error("Error loading editor:", error);
      }
    };

    loadEditor();

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }

      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
        editorInitializedRef.current = false;
        setIsReady(false);
        setContentLoaded(false);
        hasRenderedRef.current = false;
      }
    };
  }, [triggerAutoSave]);

  // Load content when ideathon data is available and editor is ready
  useEffect(() => {
    if (
      !ideathon?.description ||
      !isReady ||
      !editorRef.current ||
      hasRenderedRef.current ||
      isLoadingContentRef.current
    ) {
      return;
    }

    const loadContent = async () => {
      isLoadingContentRef.current = true;
      hasRenderedRef.current = true;

      try {
        const obj = JSON.parse(ideathon.description);
        console.log("Parsed content:", obj);

        // Set metadata first
        setTitle(obj.document?.title || "");
        setSubtitle(obj.document?.subtitle || "");

        if (obj.blocks && obj.blocks.length > 0) {
          console.log("Rendering blocks:", obj.blocks);

          await new Promise((resolve) => setTimeout(resolve, 200));

          if (editorRef.current?.clear) {
            await editorRef.current.clear();
          }

          if (editorRef.current?.render) {
            await editorRef.current.render({ blocks: obj.blocks });
            console.log("Content rendered successfully");
          }
        }

        setContentLoaded(true);
        isLoadingContentRef.current = false;
      } catch (error) {
        console.error("Error parsing or rendering content:", error);
        setContentLoaded(true);
        isLoadingContentRef.current = false;
      }
    };

    loadContent();
  }, [ideathon?.description, isReady]);

  // Title change handler with auto-save trigger
  const handleTitleChange = useCallback((e) => {
    setTitle(e.target.value);
    triggerAutoSave();
  }, [triggerAutoSave]);

  // Subtitle change handler with auto-save trigger
  const handleSubtitleChange = useCallback((e) => {
    setSubtitle(e.target.value);
    triggerAutoSave();
  }, [triggerAutoSave]);

  // Publish function
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
                items: []
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
              level: baseData.level || 'warning'
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

      // Generate table of contents from headers
      const tableOfContents = editorData.blocks
        .filter(block => block.type === 'header')
        .map((block, index) => ({
          id: block.id || `header_${index}`,
          text: block.data.text,
          level: block.data.level,
          anchor: block.data.text ? block.data.text.toLowerCase().replace(/[^a-z0-9]+/g, '-') : ''
        }));

      // Create enhanced data structure
      const enhancedData = {
        document: {
          id: `doc_${Date.now()}`,
          title: title.trim() || "Untitled",
          subtitle: subtitle.trim() || "",
          slug: (title || "untitled").toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          language: "en",
          version: "1.0.0",
          author: {
            id: "user_001",
            name: "Author Name",
            avatar: "/default-avatar.png",
            bio: "Content creator"
          }
        },

        // Timestamps
        publishedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),

        // Settings
        settings: {
          password: null,
          allowComments: true,
          allowSharing: true,
          seoOptimized: true,
          showTableOfContents: tableOfContents.length > 0,
          enableAnalytics: true
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

      setEditorContent(enhancedData);
      setIsPublish(true);
      toast.success("Content published successfully!");

    } catch (error) {
      toast.error(error.message || "Publishing failed");
    } finally {
      setIsPublishing(false);
    }
  }, [title, subtitle]);

  // Clear content
  const clearContent = useCallback(() => {
    setTitle("");
    setSubtitle("");
    setContentLoaded(false);
    hasRenderedRef.current = false;
    isLoadingContentRef.current = false;

    if (editorRef.current?.clear) {
      editorRef.current.clear().then(() => {
        setContentLoaded(true);
      });
    }

    // Clear auto-save data
    localStorage.removeItem('editor_autosave');
    toast.success("Content cleared");
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-6 py-4 border-b border-gray-200 gap-4 sm:gap-0">
        {/* Left section */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 lg:gap-6 w-full sm:w-auto">
          <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">Auto-save enabled</span>
          {lastSaved && (
            <span className="text-xs text-gray-400 whitespace-nowrap">
              Last saved: {lastSaved.toLocaleTimeString()}
            </span>
          )}
        </div>

        {/* Right section with action buttons */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={handlePublish}
            disabled={isPublishing || !isReady}
            className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm flex-1 sm:flex-none whitespace-nowrap transition-colors ${
              !isPublishing && isReady
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isPublishing ? "Publishing..." : "Publish"}
          </button>
          <button
            onClick={clearContent}
            disabled={isPublishing}
            className="bg-gray-100 text-black px-3 sm:px-4 py-2 border rounded-md text-xs sm:text-sm hover:bg-gray-200 disabled:opacity-50 cursor-pointer flex-1 sm:flex-none whitespace-nowrap"
          >
            Clear Content
          </button>
        </div>
      </div>

      {/* Editor Container */}
      <div className="px-3 sm:px-6 py-6 sm:py-8">
        {/* Title Input */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-start">
            <div className="w-1 h-4 sm:h-6 mr-2 sm:mr-4 mt-1 flex-shrink-0 bg-gray-800"></div>
            <div className="flex-1">
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Your compelling title goes here..."
                className="text-lg sm:text-2xl font-bold placeholder-gray-400 border-none outline-none w-full bg-transparent text-gray-800"
                style={{
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              />
            </div>
          </div>
        </div>

        {/* Subtitle Input */}
        <div className="mb-6 sm:mb-8">
          <div className="ml-3 sm:ml-5">
            <input
              type="text"
              value={subtitle}
              onChange={handleSubtitleChange}
              placeholder="Add a subtitle to provide more context..."
              className="text-base sm:text-lg placeholder-gray-400 border-none outline-none w-full bg-transparent text-gray-600"
              style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            />
          </div>
        </div>

        {!isReady && (
          <div className="flex items-center space-x-2 text-gray-400 mb-4">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400" />
            <span className="text-sm">Loading enhanced editor...</span>
          </div>
        )}

        {isLoadingContentRef.current && (
          <div className="flex items-center space-x-2 text-blue-600 mb-4">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600" />
            <span className="text-sm">Loading content...</span>
          </div>
        )}

        <div className="border-2 border-transparent rounded-lg transition-colors">
          <div
            id="professional-editor"
            className={`min-h-[300px] sm:min-h-[400px] transition-opacity p-4 ${
              isReady ? "opacity-100" : "opacity-50"
            }`}
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: "14px",
              lineHeight: "1.5",
              color: "#374151",
            }}
          />
        </div>
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}