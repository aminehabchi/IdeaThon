"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import "../app/globals.css";

export default function ProfessionalEditor({form}) {
    const editorRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const [wordCount, setWordCount] = useState(0);
    const [title, setTitle] = useState('');
    const [isPublishing, setIsPublishing] = useState(false);

    // Initialize Editor
    useEffect(() => {
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

                editor = new EditorJS({
                    holder: "professional-editor",
                    placeholder: "Start crafting your amazing content...",
                    minHeight: 300,
                    tools: {
                        header: {
                            class: Header,
                            config: {
                                levels: [1, 2, 3, 4],
                                defaultLevel: 2,
                                placeholder: "Enter a header"
                            },
                            shortcut: 'CMD+SHIFT+H'
                        },
                        list: {
                            class: List,
                            inlineToolbar: true,
                            config: {
                                defaultStyle: 'unordered'
                            },
                            shortcut: 'CMD+SHIFT+L'
                        },
                        quote: {
                            class: Quote,
                            inlineToolbar: true,
                            config: {
                                quotePlaceholder: 'Enter a quote',
                                captionPlaceholder: 'Quote\'s author',
                            },
                            shortcut: 'CMD+SHIFT+O'
                        },
                        code: {
                            class: Code,
                            config: {
                                placeholder: 'Enter your code here...'
                            },
                            shortcut: 'CMD+SHIFT+C'
                        },
                        delimiter: {
                            class: Delimiter,
                            shortcut: 'CMD+SHIFT+D'
                        },
                        table: {
                            class: Table,
                            inlineToolbar: true,
                            config: {
                                rows: 2,
                                cols: 3,
                            },
                            shortcut: 'CMD+ALT+T'
                        },
                        embed: {
                            class: Embed,
                            config: {
                                services: {
                                    youtube: true,
                                    coub: true,
                                    codepen: true,
                                    twitter: true,
                                    instagram: true
                                }
                            }
                        },
                        image: {
                            class: Image,
                            config: {
                                uploader: {
                                    async uploadByFile(file) {
                                        // Simulate upload delay
                                        await new Promise(resolve => setTimeout(resolve, 1000));
                                        return {
                                            success: 1,
                                            file: {
                                                url: URL.createObjectURL(file),
                                            },
                                        };
                                    },
                                    async uploadByUrl(url) {
                                        return {
                                            success: 1,
                                            file: {
                                                url: url,
                                            }
                                        };
                                    }
                                },
                                placeholder: 'Paste image URL or upload file'
                            }
                        },
                        // Inline tools
                        Marker: {
                            class: Marker,
                            shortcut: 'CMD+SHIFT+M',
                        },
                        inlineCode: {
                            class: InlineCode,
                            shortcut: 'CMD+SHIFT+X',
                        }
                    },
                    onChange: async () => {
                        await updateWordCount();
                    },
                    onReady: () => {
                        setIsReady(true);
                        console.log('Editor is ready!');
                    }
                });

                editorRef.current = editor;
            } catch (error) {
                console.error('Error loading editor:', error);
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
    }, []);

    // Update word count
    const updateWordCount = useCallback(async () => {
        if (editorRef.current) {
            try {
                const data = await editorRef.current.save();
                let totalWords = 0;
                
                data.blocks.forEach(block => {
                    if (block.data.text) {
                        const text = block.data.text.replace(/<[^>]*>/g, ''); // Remove HTML tags
                        totalWords += text.trim().split(/\s+/).filter(word => word.length > 0).length;
                    }
                });
                
                setWordCount(totalWords);
            } catch (error) {
                console.error('Error counting words:', error);
            }
        }
    }, []);

    // Save content (silently)
    const handleSave = useCallback(async () => {
        if (!editorRef.current) return;
        
        try {
            const data = await editorRef.current.save();
            
            // Simulate silent save to backend
            await new Promise(resolve => setTimeout(resolve, 500));
            
            setLastSaved(new Date());
            // Silent save - no user feedback
        } catch (error) {
            console.error('Save failed:', error);
        }
    }, []);

    // Publish content (submit form)
    const handlePublish = useCallback(async () => {
        if (!editorRef.current) return;
        
        setIsPublishing(true);
        try {
            const editorData = await editorRef.current.save();
            
            // Prepare JSON payload
            const payload = {
                title: title.trim() || 'Untitled',
                content: editorData,
                publishedAt: new Date().toISOString(),
                wordCount: wordCount
            };
            
            // Simulate API call to backend
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Log the JSON that would be sent to backend
            console.log('Publishing to backend:', JSON.stringify(payload, null, 2));
            console.log('==>',form);
            
            // Here you would make your actual API call:
            // const response = await fetch('/api/posts', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(payload)
            // });
            
            alert('Content published successfully!');
        } catch (error) {
            console.error('Publish failed:', error);
            alert('Failed to publish content. Please try again.');
        } finally {
            setIsPublishing(false);
        }
    }, [title, wordCount]);

    // Auto-save every 10 seconds (silently)
    useEffect(() => {
        if (!isReady) return;
        
        const interval = setInterval(() => {
            handleSave();
        }, 10000); // Save every 10 seconds

        return () => clearInterval(interval);
    }, [isReady, handleSave]);

    return (
        <div className="max-w-4xl mx-auto bg-white">
            {/* Clean Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-6">
                <div className="relative group">
                  <button className="text-sm text-gray-600 hover:text-gray-800">
                    Shortcuts
                  </button>
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 p-3 z-10 rounded-lg bg-gray-700 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
                    <p><kbd className="font-mono">Cmd+Shift+H</kbd>: Heading</p>
                    <p><kbd className="font-mono">Cmd+Shift+L</kbd>: List</p>
                    <p><kbd className="font-mono">Cmd+Shift+O</kbd>: Quote</p>
                    <p><kbd className="font-mono">Cmd+Shift+C</kbd>: Code</p>
                    <p><kbd className="font-mono">Cmd+Shift+D</kbd>: Divider</p>
                    <p><kbd className="font-mono">Cmd+Alt+T</kbd>: Table</p>
                    <p><kbd className="font-mono">Cmd+Shift+M</kbd>: Marker</p>
                    <p><kbd className="font-mono">Cmd+Shift+X</kbd>: Inline Code</p>
                  </div>
                </div>
                    <span className="text-sm text-gray-500">
                        Auto-save enabled
                    </span>
                    <span className="text-sm text-gray-500">
                        {wordCount} words
                    </span>
                </div>
                <button 
                    onClick={handlePublish}
                    disabled={isPublishing || !isReady}
                    className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 disabled:opacity-50"
                >
                    {isPublishing ? 'Publishing...' : 'Publish'}
                </button>
            </div>

            {/* Editor Container */}
            <div className="px-6 py-8">
                {/* Title Input */}
                <div className="mb-8">
                    <div className="flex items-start">
                        <div className="w-1 h-6 bg-gray-800 mr-4 mt-1 flex-shrink-0"></div>
                        <input
                            type="text"
                            placeholder="One Liner Title is going well here in this place"
                            className="text-2xl font-normal text-gray-800 placeholder-gray-400 border-none outline-none w-full bg-transparent"
                            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
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
                    className={`min-h-[400px] transition-opacity ${
                        isReady ? 'opacity-100' : 'opacity-50'
                    }`}
                    style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        fontSize: '16px',
                        lineHeight: '1.6',
                        color: '#374151'
                    }}
                />
            </div>
        </div>
    );
}