import { categories } from "../../data/categories.js";
import CategoryCard from "../category/CategoryCard.jsx";

export default function CategoriesSection() {
  return (
    <section className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
      <div className="flex items-end justify-between mb-7">
        <div>
          <h2 className="text-2xl font-bold text-white">اختر مجالك</h2>
          <p className="text-white/45 text-sm mt-1">تصفّح المدربين حسب التخصص الرياضي</p>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 -mx-5 px-5 lg:mx-0 lg:px-0 scroll-smooth">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}
