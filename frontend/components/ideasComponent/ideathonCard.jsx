import { getDaysLeft } from "@/lib/utils";


export default function Ideathon(idea) {
  const { banner, owner, entries, privacy, category, price, end_date } = idea;

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
    <div className="w-full max-w-[700px] flex flex-col md:flex-row justify-between items-start p-4 rounded-xl shadow-md bg-white gap-4 cursor-pointer">
      {/* Left Section */}
      <div className="flex gap-4 flex-1">
        <img
          src={`${"http://localhost:8080/api" + banner}`}
          alt="cover"
          className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover flex-shrink-0"
        />
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-black">
            {body?.document?.title || "No Title"}
          </h2>
          <p className="text-sm text-gray-700 mt-1 leading-tight max-w-md">
            {/* Use a short excerpt or fallback text */}
            {body?.document?.subtitle || "No SubTitle available."}
          </p>
          <div className="flex flex-wrap items-center text-sm text-gray-500 mt-2 gap-2">
            <span className="flex items-center gap-1">
              <span className="text-pink-500">●</span>
              <span className="font-semibold text-black">
                By {owner?.first_name ?? ""} {owner?.last_name ?? ""}
              </span>
            </span>
            <span>|</span>
            <span>{entries} Entries</span>
            <span>|</span>
            <span>{privacy}</span>
            <span>|</span>
            {/* Display category joined by comma */}
            <span>
              {category && category.length > 0
                ? category.map((cat) => `#${cat}`).join("  ")
                : "#NoCategory"}
            </span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end justify-between min-w-[80px] h-full self-stretch">
        <div className="text-xl font-bold text-black">{price ?? 0}$</div>
        <div className="text-sm text-gray-500">{getDaysLeft(end_date)}</div>
      </div>
    </div>
  );
}

