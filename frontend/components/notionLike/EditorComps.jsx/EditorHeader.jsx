import EnhancedShortcuts from "./EnhancedShortcuts";

export default function EditorHeader({ wordCount, lastSaved, isPublishing, isReady, onPublish }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <div className="flex items-center space-x-6">
        <div className="relative group">
          <button className="text-sm text-gray-600 hover:text-gray-800">
            Shortcuts
          </button>
          <EnhancedShortcuts />
        </div>
        <span className="text-sm text-gray-500">Auto-save enabled</span>
        <span className="text-sm text-gray-500">{wordCount} words</span>
        <span className="text-sm text-gray-500">{Math.ceil(wordCount / 250)} min read</span>
        {lastSaved && (
          <span className="text-xs text-gray-400">
            Last saved: {lastSaved.toLocaleTimeString()}
          </span>
        )}
      </div>
      <button
        onClick={onPublish}
        disabled={isPublishing || !isReady}
        className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 disabled:opacity-50 cursor-pointer"
      >
        {isPublishing ? "Publishing..." : "Publish"}
      </button>
    </div>
  );
}