export default function EditorCore({ isReady }) {
    return (
      <>
        {!isReady && (
          <div className="flex items-center space-x-2 text-gray-400 mb-4">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400" />
            <span className="text-sm">Loading enhanced editor...</span>
          </div>
        )}
  
        <div
          id="professional-editor"
          className={`min-h-[400px] transition-opacity${
            isReady ? "opacity-100 mr-30" : "opacity-50"
          }`}
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: "16px",
            lineHeight: "1.6",
            color: "#374151",
          }}
        />
      </>
    );
  }