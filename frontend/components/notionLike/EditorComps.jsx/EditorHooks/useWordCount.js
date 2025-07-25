import { useState, useCallback } from "react";

export function useWordCount(editorRef) {
  const [wordCount, setWordCount] = useState(0);

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
            const cleanText = text.replace(/<[^>]*>/g, "");
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
  }, [editorRef]);

  return { wordCount, updateWordCount };
}