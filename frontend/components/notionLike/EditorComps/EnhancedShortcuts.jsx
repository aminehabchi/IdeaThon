import { memo } from "react";

const EnhancedShortcuts = memo(function EnhancedShortcuts() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-80 p-4 z-10 rounded-lg bg-gray-700 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-lg">
      <div className="grid grid-cols-1 gap-1">
        <p><kbd className="font-mono">Cmd+Shift+H</kbd>: Heading</p>
        <p><kbd className="font-mono">Cmd+Shift+L</kbd>: List</p>
        <p><kbd className="font-mono">Cmd+Shift+K</kbd>: Checklist</p>
        <p><kbd className="font-mono">Cmd+Shift+O</kbd>: Quote</p>
        <p><kbd className="font-mono">Cmd+Shift+C</kbd>: Code Block</p>
        <p><kbd className="font-mono">Cmd+Shift+W</kbd>: Warning/Info</p>
        <p><kbd className="font-mono">Cmd+Shift+D</kbd>: Divider</p>
        <p><kbd className="font-mono">Cmd+Alt+T</kbd>: Table</p>
        <p><kbd className="font-mono">Cmd+Shift+R</kbd>: Raw HTML</p>
        <p><kbd className="font-mono">Cmd+Shift+M</kbd>: Highlight</p>
        <p><kbd className="font-mono">Cmd+Shift+X</kbd>: Inline Code</p>
      </div>
    </div>
  );
});

export default EnhancedShortcuts;