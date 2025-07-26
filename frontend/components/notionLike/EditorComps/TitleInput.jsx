import { memo } from "react";

const TitleInput = memo(function TitleInput({ title, onTitleChange }) {
  return (
    <div className="mb-6">
      <div className="flex items-start">
        <div className="w-1 h-6 bg-gray-800 mr-4 mt-1 flex-shrink-0"></div>
        <input
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="Your compelling title goes here..."
          className="text-2xl font-bold text-gray-800 placeholder-gray-400 border-none outline-none w-full bg-transparent"
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          }}
        />
      </div>
    </div>
  );
});

export default TitleInput;