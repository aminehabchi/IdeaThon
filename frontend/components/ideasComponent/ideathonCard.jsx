export default function Ideathon(ideathon_data) {
    const {
        image,
        title,
        description,
        author,
        entries,
        visibility,
        tag,
        price,
        daysLeft,
    } = ideathon_data;

    return (
        <div className="w-full max-w-[700px] flex flex-col md:flex-row justify-between items-start p-4 rounded-xl shadow-md bg-white gap-4 cursor-pointer">
            {/* Left Section */}
            <div className="flex gap-4 flex-1">
                <img
                    src="/belmaayo_avatar.png" 
                    alt="cover"
                    className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover flex-shrink-0"
                />
                <div>
                    <h2 className="text-lg md:text-xl font-semibold text-black">
                        {title}
                    </h2>
                    <p className="text-sm text-gray-700 mt-1 leading-tight max-w-md">
                        {description}
                    </p>
                    <div className="flex flex-wrap items-center text-sm text-gray-500 mt-2 gap-2">
                        <span className="flex items-center gap-1">
                            <span className="text-pink-500">●</span>
                            <span className="font-semibold text-black">By {author}</span>
                        </span>
                        <span>|</span>
                        <span>{entries} Entries</span>
                        <span>|</span>
                        <span>{visibility}</span>
                        <span>|</span>
                        <span># {tag}</span>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex flex-col items-end justify-between min-w-[80px] h-full self-stretch">
                <div className="text-xl font-bold text-black">{price}$</div>
                <div className="text-sm text-gray-500">{daysLeft} Days Left</div>
            </div>
        </div>
    );
}
