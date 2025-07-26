import { memo } from "react";

const SubtitleInput = memo(function SubtitleInput({ subtitle, onSubtitleChange }) {
  return (
    <div className="mb-8">
      <input
        type="text"
        value={subtitle}
        onChange={(e) => onSubtitleChange(e.target.value)}
        placeholder="Add a subtitle to provide more context..."
        className="text-lg text-gray-600 placeholder-gray-400 border-none outline-none w-full bg-transparent ml-5"
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      />
    </div>
  );
});

export default SubtitleInput;