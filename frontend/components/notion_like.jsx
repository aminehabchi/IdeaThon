"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Download, Save, FileText } from "lucide-react";

export default function ProfessionalEditor() {
    const editorRef = useRef(null);
    const [isReady, setIsReady] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);
    const [wordCount, setWordCount] = useState(0);
    const fileInputRef = useRef(null);

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

    // Save content
    const handleSave = useCallback(async () => {
        if (!editorRef.current) return;
        
        setIsSaving(true);
        try {
            const data = await editorRef.current.save();
            
            // Simulate save to backend
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Save to localStorage as backup
            localStorage.setItem('editor-content', JSON.stringify(data));
            
            setLastSaved(new Date());
            console.log('Content saved successfully!', data);
        } catch (error) {
            console.error('Save failed:', error);
        } finally {
            setIsSaving(false);
        }
    }, []);

    // Export content
    const handleExport = useCallback(async () => {
        if (!editorRef.current) return;
        
        try {
            const data = await editorRef.current.save();
            const blob = new Blob([JSON.stringify(data, null, 2)], { 
                type: 'application/json' 
            });
            
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `document-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Export failed:', error);
        }
    }, []);

    // Import content
    const handleImport = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleFileImport = useCallback(async (event) => {
        const file = event.target.files?.[0];
        if (!file || !editorRef.current) return;

        try {
            const text = await file.text();
            const data = JSON.parse(text);
            await editorRef.current.render(data);
            updateWordCount();
        } catch (error) {
            console.error('Import failed:', error);
            // alert('Failed to import file. Please check the format.');
        }
        
        // Reset file input
        event.target.value = '';
    }, [updateWordCount]);

    // Auto-save every 30 seconds
    useEffect(() => {
        if (!isReady) return;
        
        const interval = setInterval(() => {
            handleSave();
        }, 30000);

        return () => clearInterval(interval);
    }, [isReady, handleSave]);

    // Load saved content on mount
    useEffect(() => {
        if (!isReady || !editorRef.current) return;
        
        const savedContent = localStorage.getItem('editor-content');
        if (savedContent) {
            try {
                const data = JSON.parse(savedContent);
                editorRef.current.render(data);
                updateWordCount();
            } catch (error) {
                console.error('Failed to load saved content:', error);
            }
        }
    }, [isReady, updateWordCount]);

    return (
      <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Toolbar */}
        <div className="bg-gray-50 border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center justify-between sm:justify-start sm:space-x-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">Content Editor</h2>
              </div>
    
              <div className="flex sm:hidden items-center space-x-1 text-xs text-gray-500">
                <div className={`w-2 h-2 rounded-full ${isReady ? 'bg-green-400' : 'bg-gray-400'}`} />
                <span>{isReady ? 'Ready' : 'Loading...'}</span>
              </div>
            </div>
    
            <div className="hidden sm:flex items-center space-x-1 text-sm text-gray-500">
              {/* <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${isReady ? 'bg-green-400' : 'bg-gray-400'}`} />
                <span>{isReady ? 'Ready' : 'Loading...'}</span>
              </div> */}
              {lastSaved && (
                <>
                  <span className="mx-2">•</span>
                  <span className="hidden md:inline">Saved {lastSaved.toLocaleTimeString()}</span>
                  <span className="md:hidden">{lastSaved.toLocaleTimeString([], { timeStyle: 'short' })}</span>
                </>
              )}
            </div>
    
            <div className="flex items-center justify-between sm:justify-end space-x-2">
              {/* Word Count */}
              <div className="text-xs sm:text-sm text-gray-500 px-2 sm:px-3 py-1 bg-white rounded-md border">
                <span className="sm:hidden">{wordCount}w</span>
                <span className="hidden sm:inline">{wordCount} words</span>
              </div>
    
              {/* Action Buttons */}
              <Button
                onClick={handleImport}
                variant="outline"
                className="space-x-1 text-xs sm:text-sm px-2 sm:px-3"
                disabled={!isReady}
              >
                <Upload className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:hidden lg:inline">Import</span>
              </Button>
    
              <Button
                onClick={handleExport}
                variant="outline"
                className="space-x-1 text-xs sm:text-sm px-2 sm:px-3"
                disabled={!isReady}
              >
                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline sm:hidden lg:inline">Export</span>
              </Button>
    
              <Button
                onClick={handleSave}
                disabled={isSaving || !isReady}
                className="space-x-1 text-xs sm:text-sm px-2 sm:px-3"
              >
                <Save className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">{isSaving ? 'Saving...' : 'Save'}</span>
                <span className="xs:hidden">{isSaving ? '...' : 'Save'}</span>
              </Button>
            </div>
          </div>
    
          {/* Shortcuts - Only show on large screens */}
          <div className="mt-3 text-xs text-gray-500 hidden xl:block">
            <span className="font-medium">Shortcuts:</span>
            <span className="ml-2">Header (⌘⇧H) • List (⌘⇧L) • Quote (⌘⇧O) • Code (⌘⇧C) • Table (⌘⌥T)</span>
          </div>
        </div>
    
        {/* Editor Container */}
        <div className="relative">
          {!isReady && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <div className="flex items-center space-x-2 text-gray-600">
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-blue-600" />
                <span className="text-sm sm:text-base">Loading editor...</span>
              </div>
            </div>
          )}
    
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            <div
              id="professional-editor"
              className={`bg-white text-gray-900 rounded-lg min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] prose prose-sm sm:prose prose-lg max-w-none focus:outline-none transition-opacity ${
                isReady ? 'opacity-100' : 'opacity-50'
              }`}
              style={{
                fontSize: '14px',
                '@media (min-width: 640px)': {
                  fontSize: '16px'
                },
                lineHeight: '1.6',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              }}
            />
          </div>
        </div>
    
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileImport}
          className="hidden"
        />
    
        {/* Status Bar */}
        <div className="bg-gray-50 border-t border-gray-200 px-3 sm:px-4 lg:px-6 py-2 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-2">

          <div className="flex items-center space-x-2 xs:space-x-4">
            <span>{wordCount} words</span>
            <span className="hidden xs:inline">•</span>
            <span className="hidden sm:inline">Auto-save enabled</span>
            <span className="sm:hidden">Auto-save</span>
            {lastSaved && (
              <>
                <span className="hidden xs:inline">•</span>
                <div className="xs:hidden text-xs text-gray-400">
                  Last saved: {lastSaved.toLocaleTimeString([], { timeStyle: 'short' })}
                </div>
                <span className="hidden xs:inline sm:hidden">
                  {lastSaved.toLocaleTimeString([], { timeStyle: 'short' })}
                </span>
                <span className="hidden sm:inline">
                  Last saved: {lastSaved.toLocaleTimeString()}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center space-x-2 xs:justify-end">
            <div className={`w-1.5 h-1.5 rounded-full ${isReady ? 'bg-green-400' : 'bg-gray-400'}`} />
            <span>{isReady ? 'Ready' : 'Loading'}</span>
          </div>
        </div>
      </div>
    );
}