"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { imageToBase64 } from "@/lib/helpers.js";
import { toast } from "sonner";

export function ProfessionalEditor({ setEditorContent, initialTitle = "", initialSubtitle = "", initialBlocks = [] }) {
  const editorRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [subtitle, setSubtitle] = useState(initialSubtitle);
  const [hasLoadedBlocks, setHasLoadedBlocks] = useState(false);

  // Initialize EditorJS
  useEffect(() => {
    let editor;
    let isMounted = true;

    const loadEditor = async () => {
      try {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;
        const Paragraph = (await import("@editorjs/paragraph")).default;
        const List = (await import("@editorjs/list")).default;
        const Image = (await import("@editorjs/image")).default;
        const Quote = (await import("@editorjs/quote")).default;
        const Code = (await import("@editorjs/code")).default;
        const Delimiter = (await import("@editorjs/delimiter")).default;
        const Table = (await import("@editorjs/table")).default;

        if (!isMounted) return;
        if (editorRef.current) return;

        editor = new EditorJS({
          holder: "professional-editor",
          placeholder: "Start writing your content...",
          minHeight: 300,
          tools: {
            paragraph: {
              class: Paragraph,
              inlineToolbar: true
            },
            header: {
              class: Header,
              config: {
                levels: [1, 2, 3, 4],
                defaultLevel: 2
              },
              shortcut: "CMD+SHIFT+H"
            },
            list: {
              class: List,
              inlineToolbar: true,
              config: {
                defaultStyle: "unordered"
              },
              shortcut: "CMD+SHIFT+L"
            },
            quote: {
              class: Quote,
              inlineToolbar: true,
              config: {
                quotePlaceholder: "Enter a quote",
                captionPlaceholder: "Quote's author"
              },
              shortcut: "CMD+SHIFT+O"
            },
            code: {
              class: Code,
              shortcut: "CMD+SHIFT+C"
            },
            delimiter: {
              class: Delimiter,
              shortcut: "CMD+SHIFT+D"
            },
            table: {
              class: Table,
              inlineToolbar: true,
              config: {
                rows: 2,
                cols: 3
              }
            },
            image: {
              class: Image,
              config: {
                uploader: {
                  async uploadByFile(file) {
                    try {
                      const base64 = await imageToBase64(file);
                      return { success: 1, file: { url: base64 } };
                    } catch (err) {
                      toast.error("Failed to upload image");
                      return { success: 0 };
                    }
                  },
                  async uploadByUrl(url) {
                    try {
                      const res = await fetch(url);
                      const blob = await res.blob();
                      const base64 = await imageToBase64(blob);
                      return { success: 1, file: { url: base64 } };
                    } catch (err) {
                      toast.error("Failed to load image from URL");
                      return { success: 0 };
                    }
                  },
                },
                placeholder: "Paste image URL or upload file"
              },
            },
          },
          onReady: async () => {
            if (!isMounted) return;

            setIsReady(true);

            // Load initial blocks if provided
            if (initialBlocks && initialBlocks.length > 0 && !hasLoadedBlocks) {
              try {
                await editor.render({ blocks: initialBlocks });
                setHasLoadedBlocks(true);
              } catch (err) {
                toast.error("Failed to load initial content");
              }
            }
          },
        });

        editorRef.current = editor;
      } catch (error) {
        if (isMounted) {
          toast.error("Editor failed to load");
        }
      }
    };

    loadEditor();

    return () => {
      isMounted = false;
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
        setIsReady(false);
      }
    };
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update title/subtitle if props change
  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  useEffect(() => {
    setSubtitle(initialSubtitle);
  }, [initialSubtitle]);

  // Load initial blocks when they change (for edit mode)
  useEffect(() => {
    if (!editorRef.current || !isReady) return;
    if (!initialBlocks || initialBlocks.length === 0) return;
    if (hasLoadedBlocks) return;

    const loadBlocks = async () => {
      try {
        await editorRef.current.render({ blocks: initialBlocks });
        setHasLoadedBlocks(true);
      } catch (err) {
        toast.error("Failed to load content");
      }
    };

    loadBlocks();
  }, [initialBlocks, isReady, hasLoadedBlocks]);

  // Handle publish: save content and send to parent
  const handlePublish = useCallback(async () => {
    if (!editorRef.current) return;

    try {
      const editorData = await editorRef.current.save();

      if (!editorData.blocks || editorData.blocks.length === 0) {
        toast.error("Please add some content before publishing.");
        return;
      }

      const data = {
        document: {
          title: title.trim() || "Untitled",
          subtitle: subtitle.trim() || "",
        },
        blocks: editorData.blocks,
      };

      setEditorContent(data);
      toast.success("Content ready for publishing!");
    } catch (error) {
      toast.error("Publishing failed");
    }
  }, [title, subtitle, setEditorContent]);

  return (
    <div className="w-full max-w-7xl mx-auto bg-white flex flex-col">
      <div className="flex justify-between items-start w-full mb-2">
        <div className="flex flex-col flex-1 mr-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Your title..."
            className="text-lg sm:text-2xl font-bold border-none outline-none w-full bg-transparent mb-1 placeholder-gray-300 placeholder-opacity-50"
          />
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="Subtitle..."
            className="text-base sm:text-lg border-none outline-none w-full bg-transparent placeholder-gray-300 text-gray-600"
          />
        </div>

        <button
          onClick={handlePublish}
          disabled={!isReady}
          className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Publish
        </button>
      </div>

      <div className="w-full">
        <div
          id="professional-editor"
          className="min-h-[300px] sm:min-h-[400px] border-0 p-0 m-0"
        />
      </div>

      <style>{`
        #professional-editor .ce-block,
        #professional-editor .ce-block__content,
        #professional-editor .ce-paragraph {
          margin: 0 !important;
          padding: 0 !important;
          max-width: 100% !important;
        }
        #professional-editor .ce-toolbar__content {
          max-width: 100% !important;
        }
      `}</style>
    </div>
  );
}