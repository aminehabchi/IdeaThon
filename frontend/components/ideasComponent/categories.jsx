import { motion } from "framer-motion";

export function Categories({ selectedCategory, onCategorySelect }) {
  const categories = ["Technology", "Design", "Gaming", "Health", "Food"];

  const toggleCategory = (category) => {
    onCategorySelect((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <section className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-black">Ideathons</h2>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => {
            const isActive = selectedCategory.includes(category);
            return (
              <motion.button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`
                  px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                  ${
                    isActive
                      ? "bg-black text-white border-black"
                      : "bg-transparent text-gray-600 border-gray-300 hover:border-gray-400 hover:text-black"
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
