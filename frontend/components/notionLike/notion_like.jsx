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
    let isMounted = true; // Cancellation flag

    const loadEditor = async () => {
      try {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;
        const Paragraph = (await import("@editorjs/paragraph")).default;
        const List = (await import("@editorjs/list")).default;
        const Image = (await import("@editorjs/image")).default;

        // Check if component is still mounted before creating editor
        if (!isMounted) return;

        // Check if editor already exists
        if (editorRef.current) {
          console.warn("Editor already exists, skipping creation");
          return;
        }

        editor = new EditorJS({
          holder: "professional-editor",
          placeholder: "Start writing...",
          minHeight: 300,
          tools: {
            paragraph: { class: Paragraph },
            header: { class: Header, shortcut: "CMD+SHIFT+H" },
            list: { class: List, inlineToolbar: true, shortcut: "CMD+SHIFT+L" },
            image: {
              class: Image,
              config: {
                uploader: {
                  async uploadByFile(file) {
                    const base64 = await imageToBase64(file);
                    return { success: 1, file: { url: base64 } };
                  },
                  async uploadByUrl(url) {
                    const res = await fetch(url);
                    const blob = await res.blob();
                    const base64 = await imageToBase64(blob);
                    return { success: 1, file: { url: base64 } };
                  },
                },
              },
            },
          },
          onReady: async () => {
            if (isMounted) {
              setIsReady(true);
              // Load initial blocks if provided and not already loaded
              if (initialBlocks && initialBlocks.length > 0 && !hasLoadedBlocks) {
                try {
                  await editor.render({ blocks: initialBlocks });
                  setHasLoadedBlocks(true);
                } catch (err) {
                  console.error("Failed to load initial blocks", err);
                }
              }
            }
          },
        });

        editorRef.current = editor;
      } catch (error) {
        console.error("Error loading editor:", error);
        if (isMounted) {
          toast.error("Editor failed to load");
        }
      }
    };

    loadEditor();

    return () => {
      isMounted = false; // Mark as unmounted
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
        setIsReady(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialBlocks]);

  // Update title/subtitle if props change (for hot reload or prop update)
  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);
  useEffect(() => {
    setSubtitle(initialSubtitle);
  }, [initialSubtitle]);

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
      console.error(error);
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