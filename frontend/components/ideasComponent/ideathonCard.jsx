import { getDaysLeft } from "@/lib/utils";

export default function Ideathon(idea) {
  const { banner, owner, entries, privacy, category, price, end_date } = idea;
  console.log("banner", banner);

  let data = idea.description;

  if (!data) {
    data = "{}";
  }

  let body;

  try {
    body = JSON.parse(data);
  } catch (err) {
    console.error("Failed to parse JSON:", err);
    body = {};
  }

  return (
    <div className="w-[320px] sm:w-[480px] md:w-[600px] lg:w-[800px] 
                flex flex-col md:flex-row justify-between items-start 
                p-4 bg-white gap-4 cursor-pointer
                border-b border-gray-200/50
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]
                transition-shadow duration-300">      {/* Left Section */}
      <div className="flex gap-4 flex-1 min-w-0">
        <img
          src={`/api${banner}`}
          alt="cover"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = "/ideathoonbanner.png";
          }}
          className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-fill flex-shrink-0"
        />


        <div className="min-w-0 flex-1">
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold line-clamp-2 break-all overflow-hidden hyphens-auto">
            {body?.document?.title || "No Title"}
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 mt-1 leading-tight line-clamp-2 break-all overflow-hidden hyphens-auto">
            {body?.document?.subtitle || "No SubTitle available."}
          </p>

          <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 mt-2 gap-1 md:gap-2 min-w-0">
            <span className="flex items-center gap-1 flex-shrink-0">
              {/* <span className="text-pink-500">●</span> */}
              <img
                src={`/api/${owner?.avatar}`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/empty_pfp.jpeg";
                }}
                className="w-4 h-4 rounded-2xl"
                alt="avatar"
              />
              <span className="font-semibold text-black truncate max-w-[80px] sm:max-w-[120px] md:max-w-[150px]">
                By {owner?.first_name ?? ""} {owner?.last_name ?? ""}
              </span>
            </span>
            <span className="hidden sm:inline text-gray-500/30">|</span>
            <span className="flex-shrink-0 text-xs sm:text-sm">{entries || 0} Entries</span>
            <span className="hidden sm:inline text-gray-500/30">|</span>
            <span className="flex-shrink-0 text-xs sm:text-sm truncate max-w-[60px] sm:max-w-[80px]">{privacy}</span>
            <span className="hidden sm:inline text-gray-500/30">|</span>
            {/* Display category joined by comma */}
            <span className="truncate max-w-[80px] sm:max-w-[120px] md:max-w-[200px] text-xs sm:text-sm">
              {category && category.length > 0
                ? category.map((cat) => `#${cat}`).join("  ")
                : "#NoCategory"}
            </span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end justify-between min-w-[70px] sm:min-w-[80px] h-full self-stretch flex-shrink-0">
        <div className="text-base sm:text-lg md:text-xl font-bold text-black truncate max-w-[70px] sm:max-w-[80px]">
          {(!price || price === 0) ? (
            <span className="text-sm text-gray-600 font-semibold">Free</span>
          ) : (
            `${price}$`
          )}
        </div>
        <div className="text-xs sm:text-sm text-gray-500 truncate max-w-[70px] sm:max-w-[80px] text-right">
          {(() => {
            const targetDate = new Date(end_date);
            const now = new Date();
            if (!end_date || targetDate - now <= 0) {
              return "Ended";
            }
            const daysLeft = Math.ceil((targetDate - now) / (1000 * 60 * 60 * 24));
            return `${daysLeft} Day${daysLeft > 1 ? "s" : ""} left`;
          })()}
        </div>
      </div>
    </div>
  );
}