"use client";
import { useEffect, useRef } from "react";

export default function Editor() {
    const editorRef = useRef(null);

    useEffect(() => {
        let editor;

        const loadEditor = async () => {
            const EditorJS = (await import("@editorjs/editorjs")).default;
            const Header = (await import("@editorjs/header")).default;
            const List = (await import("@editorjs/list")).default;
            const Image = (await import("@editorjs/image")).default;

            editor = new EditorJS({
                holder: "editorjs",
                placeholder: "Start typing your awesome idea...",
                tools: {
                    header: {
                        class: Header,
                        config: {
                            levels: [1, 2, 3],
                            defaultLevel: 2,
                        },
                    },
                    list: List,
                    image: {
                        class: Image,
                        config: {
                            uploader: {
                                async uploadByFile(file) {
                                    return {
                                        success: 1,
                                        file: {
                                            url: URL.createObjectURL(file),
                                        },
                                    };
                                },
                            },
                        },
                    },
                },
            });

            editorRef.current = editor;
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

    return (
        <div className="p-4">
            <div
                id="editorjs"
                className="bg-white text-black p-4 rounded min-h-[200px] prose"
            />
        </div>
    );
}