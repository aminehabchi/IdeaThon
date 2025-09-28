"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { imageToBase64 } from "@/lib/helpers.js";
import { toast, Toaster } from "sonner";

export function ProfessionalEditor({ setIsPublish, setEditorContent, ideathon }) {
  const editorRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  // Initialize Editor
  useEffect(() => {
    let editor;

    const loadEditor = async () => {
      try {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        const Header = (await import("@editorjs/header")).default;
        const Paragraph = (await import("@editorjs/paragraph")).default;
        const List = (await import("@editorjs/list")).default;
        const Image = (await import("@editorjs/image")).default;

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
          onReady: () => setIsReady(true),
        });

        editorRef.current = editor;
      } catch (error) {
        console.error("Error loading editor:", error);
      }
    };

    loadEditor();

    return () => {
      if (editorRef.current?.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
        setIsReady(false);
      }
    };
  }, []);

  // Load existing content if available
  useEffect(() => {
    if (!ideathon?.description || !isReady || !editorRef.current) return;

    const loadContent = async () => {
      try {
        const obj = JSON.parse(ideathon.description);
        setTitle(obj.document?.title || "");
        setSubtitle(obj.document?.subtitle || "");

        if (obj.blocks && obj.blocks.length > 0) {
          await editorRef.current.clear();
          await editorRef.current.render({ blocks: obj.blocks });
        }
      } catch (error) {
        console.error("Failed to load content:", error);
      }
    };

    loadContent();
  }, [ideathon?.description, isReady]);

  const handlePublish = useCallback(async () => {
    if (!editorRef.current) return;

    try {
      const editorData = await editorRef.current.save();
      const data = {
        document: {
          title: title.trim() || "Untitled",
          subtitle: subtitle.trim() || "",
        },
        blocks: editorData.blocks,
      };

      setEditorContent(data);
      setIsPublish(true);
      toast.success("Content published!");
    } catch (error) {
      toast.error("Publishing failed");
    }
  }, [title, subtitle]);

  return (
    <div className="w-full max-w-7xl mx-auto bg-white flex flex-col">
      {/* Title, Subtitle on left and Publish button on right */}
      <div className="flex justify-between items-start w-full mb-2">
        {/* Title & Subtitle */}
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

        {/* Publish button */}
        <button
          onClick={handlePublish}
          disabled={!isReady}
          className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 whitespace-nowrap"
        >
          Publish
        </button>
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
      {/* Editor */}
      <div className="w-full">
        <div
          id="professional-editor"
          className="min-h-[300px] sm:min-h-[400px] border-0 p-0 m-0"
        />
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
}
