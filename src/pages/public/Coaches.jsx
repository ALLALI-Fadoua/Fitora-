import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { coaches } from "../../data/coaches.js";
import { categories } from "../../data/categories.js";
import CoachCard from "../../components/coach/CoachCard.jsx";
import Icon from "../../components/common/Icon.jsx";
import Input from "../../components/common/Input.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import Button from "../../components/common/Button.jsx";

const wilayas = [...new Set(coaches.map((c) => c.wilaya))];

const sortOptions = [
  { id: "rating", label: "الأعلى تقييمًا" },
  { id: "price-asc", label: "السعر: من الأقل للأعلى" },
  { id: "price-desc", label: "السعر: من الأعلى للأقل" },
];

export default function Coaches() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeWilaya, setActiveWilaya] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const handleCategoryChange = (id) => {
    setActiveCategory(id);
    if (id === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", id);
    }
    setSearchParams(searchParams, { replace: true });
  };

  const filteredCoaches = useMemo(() => {
    let list = coaches.filter((coach) => {
      const matchesQuery =
        query.trim() === "" ||
        coach.name.includes(query) ||
        coach.specialty.includes(query);
      const matchesCategory = activeCategory === "all" || coach.categoryId === activeCategory;
      const matchesWilaya = activeWilaya === "all" || coach.wilaya === activeWilaya;
      return matchesQuery && matchesCategory && matchesWilaya;
    });

    switch (sortBy) {
      case "price-asc":
        list = [...list].sort((a, b) => a.pricePerSession - b.pricePerSession);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.pricePerSession - a.pricePerSession);
        break;
      default:
        list = [...list].sort((a, b) => b.rating - a.rating);
    }
    return list;
  }, [query, activeCategory, activeWilaya, sortBy]);

  const activeCategoryLabel =
    categories.find((c) => c.id === activeCategory)?.name || "كل المجالات";

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12">
      {/* رأس الصفحة */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">تصفّح المدربين</h1>
        <p className="text-white/45 text-sm mt-2">
          {filteredCoaches.length} مدرب متاح في {activeCategoryLabel === "كل المجالات" ? "جميع المجالات" : activeCategoryLabel}
        </p>
      </div>

      {/* شريط البحث والفلاتر */}
      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <Input
          icon={<Icon name="search" className="w-4 h-4" />}
          placeholder="ابحث باسم المدرب أو التخصص..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          containerClassName="flex-1"
        />

        <select
          value={activeWilaya}
          onChange={(e) => setActiveWilaya(e.target.value)}
          className="bg-ink-900 border border-ink-600 rounded-xl px-4 py-3 text-sm text-white focus:border-brand-400/60 outline-none transition-colors lg:w-48"
        >
          <option value="all">كل الولايات</option>
          {wilayas.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-ink-900 border border-ink-600 rounded-xl px-4 py-3 text-sm text-white focus:border-brand-400/60 outline-none transition-colors lg:w-56"
        >
          {sortOptions.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* شرائح التصنيفات */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-5 px-5 lg:mx-0 lg:px-0 mb-9">
        <button
          onClick={() => handleCategoryChange("all")}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            activeCategory === "all"
              ? "bg-brand-gradient text-ink-950 border-transparent"
              : "border-ink-600 text-white/60 hover:text-white hover:border-ink-500"
          }`}
        >
          الكل
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              activeCategory === cat.id
                ? "bg-brand-gradient text-ink-950 border-transparent"
                : "border-ink-600 text-white/60 hover:text-white hover:border-ink-500"
            }`}
          >
            <Icon name={cat.icon} className="w-4 h-4" />
            {cat.name}
          </button>
        ))}
      </div>

      {/* نتائج البحث */}
      {filteredCoaches.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCoaches.map((coach) => (
            <CoachCard key={coach.id} coach={coach} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="search"
          title="لا توجد نتائج مطابقة"
          description="جرّب/ي تعديل كلمة البحث أو الفلاتر المستخدمة للعثور على مدرب مناسب."
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setQuery("");
                setActiveWilaya("all");
                handleCategoryChange("all");
              }}
            >
              إعادة ضبط الفلاتر
            </Button>
          }
        />
      )}
    </div>
  );
}
