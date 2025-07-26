import { useCallback } from "react";

export function useAutoSave(editorRef, isReady, title, subtitle, setLastSaved) {
  const handleAutoSave = useCallback(async () => {
    if (!editorRef.current || !isReady) return;

    try {
      const data = await editorRef.current.save();
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
  }, [editorRef, isReady, title, subtitle, setLastSaved]);

  return { handleAutoSave };
}