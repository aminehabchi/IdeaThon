import { imageToBase64 } from "@/lib/helpers.js";
import { toast } from "sonner";

export async function useEditorConfig(updateWordCount, handleAutoSave, setIsReady) {
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

  return {
    holder: "professional-editor",
    placeholder: "Start crafting your amazing content...",
    minHeight: 300,
    minWidth: 300,
    tools: {
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
      await updateWordCount();
      await handleAutoSave();
    },
    onReady: () => {
      setIsReady(true);
      console.log("Enhanced Editor is ready!");
    },
  };
}