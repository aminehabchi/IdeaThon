"use client";
import { useEffect, useRef, useState, useCallback } from "react";
// import { fetcher, imageToBase64 } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import EditorHeader from "./EditorComps.jsx/EditorHeader";
import TitleInput from "./EditorComps.jsx/TitleInput";
import SubtitleInput from "./EditorComps.jsx/SubtitleInput";
import EditorCore from "./EditorComps.jsx/EditorCore";
import { useEditorConfig } from "./EditorComps.jsx/EditorHooks/useEditorConfig";
import { useWordCount } from "./EditorComps.jsx/EditorHooks/useWordCount";
import { useAutoSave } from "./EditorComps.jsx/EditorHooks/useAutoSave";
import { usePublisher } from "./EditorComps.jsx/EditorHooks/usePublisher";

export function ProfessionalEditor({ form, apiUrl }) {
  const editorRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  // Custom hooks
  const { wordCount, updateWordCount } = useWordCount(editorRef);
  const { handleAutoSave } = useAutoSave(editorRef, isReady, title, subtitle, setLastSaved);
  const { handlePublish } = usePublisher(editorRef, title, subtitle, wordCount, form, router, setIsPublishing, apiUrl);

  // Initialize Editor
  useEffect(() => {
    let editor;

    const loadEditor = async () => {
      try {
        const editorConfig = await useEditorConfig(updateWordCount, handleAutoSave, setIsReady);
        const EditorJS = (await import("@editorjs/editorjs")).default;
        
        editor = new EditorJS(editorConfig);
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
  }, [updateWordCount, handleAutoSave]);

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
      <EditorHeader
        wordCount={wordCount}
        lastSaved={lastSaved}
        isPublishing={isPublishing}
        isReady={isReady}
        onPublish={handlePublish}
      />

      <div className="px-6 py-8">
        <TitleInput
          title={title}
          onTitleChange={setTitle}
        />

        <SubtitleInput
          subtitle={subtitle}
          onSubtitleChange={setSubtitle}
        />

        <EditorCore
          isReady={isReady}
        />
      </div>
      
      <Toaster position="bottom-right" />
    </div>
  );
}