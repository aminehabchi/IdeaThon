"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import "../../app/globals.css";
import { fetcher, imageToBase64 } from "@/lib/helpers.js";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

// --- Helper Functions ---

async function initializeEditor(editorRef, setIsReady, updateWordCount) {
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

        const editor = new EditorJS({
            holder: "professional-editor",
            placeholder: "Start crafting your amazing content...",
            minHeight: 300,
            tools: {
                header: { class: Header, config: { levels: [1, 2, 3, 4], defaultLevel: 2 }, shortcut: "CMD+SHIFT+H" },
                list: { class: List, inlineToolbar: true, config: { defaultStyle: "unordered" }, shortcut: "CMD+SHIFT+L" },
                quote: { class: Quote, inlineToolbar: true, config: { quotePlaceholder: "Enter a quote", captionPlaceholder: "Quote's author" }, shortcut: "CMD+SHIFT+O" },
                code: { class: Code, config: { placeholder: "Enter your code here..." }, shortcut: "CMD+SHIFT+C" },
                delimiter: { class: Delimiter, shortcut: "CMD+SHIFT+D" },
                table: { class: Table, inlineToolbar: true, config: { rows: 2, cols: 3 }, shortcut: "CMD+ALT+T" },
                embed: { class: Embed, config: { services: { youtube: true, coub: true, codepen: true, twitter: true, instagram: true } } },
                image: {
                    class: Image,
                    config: {
                        uploader: {
                            async uploadByFile(file) {
                                await new Promise((resolve) => setTimeout(resolve, 1000));
                                return { success: 1, file: { url: URL.createObjectURL(file) } };
                            },
                            async uploadByUrl(url) {
                                return { success: 1, file: { url } };
                            },
                        },
                        placeholder: "Paste image URL or upload file",
                    },
                },
                Marker: { class: Marker, shortcut: "CMD+SHIFT+M" },
                inlineCode: { class: InlineCode, shortcut: "CMD+SHIFT+X" },
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
}

async function calculateWordCount(editorRef, setWordCount) {
    try {
        const data = await editorRef.current.save();
        let totalWords = 0;
        data.blocks.forEach((block) => {
            if (block.data.text) {
                const text = block.data.text.replace(/<[^>]*>/g, "");
                totalWords += text.trim().split(/\s+/).filter((word) => word.length > 0).length;
            }
        });
        setWordCount(totalWords);
    } catch (error) {
        console.error("Error counting words:", error);
    }
}

async function silentSave(editorRef, setLastSaved) {
    try {
        await editorRef.current.save();
        await new Promise((resolve) => setTimeout(resolve, 500));
        setLastSaved(new Date());
    } catch (error) {
        toast.error("Publish failed:", error);
    }
}

async function publishContent({ editorRef, title, wordCount, form, ideathon_id, router, setIsPublishing }) {
    try {
        const editorData = await editorRef.current.save();

        const payload = {
            title: title.trim() || "Untitled",
            content: editorData,
            publishedAt: new Date().toISOString(),
            wordCount,
        };

        const banner = await imageToBase64(form.banner);
        console.log("ideathon_id", Number(ideathon_id));

        const obj = {
            ideathon_id: Number(ideathon_id),
            banner,
            description: JSON.stringify(payload, null, 2),
        };
        console.log(obj);

        await fetcher({
            url: "http://localhost:8080/api/entries/add",
            method: "POST",
            data: obj,
            token: null,
            returned_status: 201,
        });

        router.push(`/ideas/${ideathon_id}`);
    } catch (error) {
        toast.error(error.message);
    } finally {
        setIsPublishing(false);
    }
}

function Shortcuts() {
    return <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 p-3 z-10 rounded-lg bg-gray-700 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
        <p><kbd className="font-mono">Cmd+Shift+H</kbd>: Heading</p>
        <p><kbd className="font-mono">Cmd+Shift+L</kbd>: List</p>
        <p><kbd className="font-mono">Cmd+Shift+O</kbd>: Quote</p>
        <p><kbd className="font-mono">Cmd+Shift+C</kbd>: Code</p>
        <p><kbd className="font-mono">Cmd+Shift+D</kbd>: Divider</p>
        <p><kbd className="font-mono">Cmd+Alt+T</kbd>: Table</p>
        <p><kbd className="font-mono">Cmd+Shift+M</kbd>: Marker</p>
        <p><kbd className="font-mono">Cmd+Shift+X</kbd>: Inline Code</p>
    </div>
}

// --- Component ---

export default function ProfessionalEditor({ form }) {
    const editorRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    // const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const [wordCount, setWordCount] = useState(0);
    const [title, setTitle] = useState("");
    const [isPublishing, setIsPublishing] = useState(false);

    const router = useRouter();
    const pathname = usePathname();
    const ideathon_id = Number(pathname.split("/")[2]);

    const updateWordCount = useCallback(() => calculateWordCount(editorRef, setWordCount), []);
    const handleSave = useCallback(() => silentSave(editorRef, setLastSaved), []);
    const handlePublish = useCallback(() => {
        setIsPublishing(true);
        publishContent({ editorRef, title, wordCount, form, ideathon_id, router, setIsPublishing });
    }, [title, wordCount, form, ideathon_id, router]);

    // Load Editor
    useEffect(() => {
        if (!editorRef.current) {
            initializeEditor(editorRef, setIsReady, updateWordCount);
        }
        return () => {
            if (editorRef.current?.destroy) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);

    // Auto-save every 10s
    useEffect(() => {
        if (!isReady) return;
        const interval = setInterval(() => handleSave(), 10000);
        return () => clearInterval(interval);
    }, [isReady, handleSave]);

    return (
        <div className="max-w-4xl mx-auto bg-white">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-6">
                    <div className="relative group">
                        <button className="text-sm text-gray-600 hover:text-gray-800">Shortcuts</button>
                        {Shortcuts()}
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

            <div className="px-6 py-8">
                <div className="mb-8">
                    <div className="flex items-start">
                        <div className="w-1 h-6 bg-gray-800 mr-4 mt-1 flex-shrink-0"></div>
                        <input
                            type="text"
                            placeholder="One Liner Title is going well here in this place"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="text-2xl font-normal text-gray-800 placeholder-gray-400 border-none outline-none w-full bg-transparent"
                            style={{
                                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
                    className={`min-h-[400px] transition-opacity ${isReady ? "opacity-100" : "opacity-50"}`}
                    style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        fontSize: "16px",
                        lineHeight: "1.6",
                        color: "#374151",
                    }}
                />
            </div>
        </div>
    );
}
