import { useMemo, useState } from "react";
import { programs } from "../../data/programs.js";
import { coaches } from "../../data/coaches.js";
import { categories } from "../../data/categories.js";
import ProgramCard from "../../components/program/ProgramCard.jsx";
import Icon from "../../components/common/Icon.jsx";
import Input from "../../components/common/Input.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import Button from "../../components/common/Button.jsx";

const sortOptions = [
  { id: "popular", label: "الأكثر اشتراكًا" },
  { id: "price-asc", label: "السعر: من الأقل للأعلى" },
  { id: "price-desc", label: "السعر: من الأعلى للأقل" },
  { id: "duration", label: "المدة: من الأقصر للأطول" },
];

export default function Programs() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const coachOf = (id) => coaches.find((c) => c.id === id);
  const categoryOf = (id) => categories.find((c) => c.id === id);

  const filteredPrograms = useMemo(() => {
    let list = programs.filter((program) => {
      const matchesQuery = query.trim() === "" || program.title.includes(query);
      const matchesCategory = activeCategory === "all" || program.categoryId === activeCategory;
      return matchesQuery && matchesCategory;
    });

    switch (sortBy) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "duration":
        list = [...list].sort((a, b) => a.durationWeeks - b.durationWeeks);
        break;
      default:
        list = [...list].sort((a, b) => (b.subscribersCount || 0) - (a.subscribersCount || 0));
    }
    return list;
  }, [query, activeCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">البرامج التدريبية</h1>
        <p className="text-white/45 text-sm mt-2">{filteredPrograms.length} برنامج متاح لتحقيق هدفك الرياضي</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        <Input
          icon={<Icon name="search" className="w-4 h-4" />}
          placeholder="ابحث عن برنامج تدريبي..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          containerClassName="flex-1"
        />
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

      <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-5 px-5 lg:mx-0 lg:px-0 mb-9">
        <button
          onClick={() => setActiveCategory("all")}
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
            onClick={() => setActiveCategory(cat.id)}
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

      {filteredPrograms.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPrograms.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              coach={coachOf(program.coachId)}
              category={categoryOf(program.categoryId)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="flex"
          title="لا توجد برامج مطابقة"
          description="جرّب/ي تعديل كلمة البحث أو التصنيف المستخدم."
          action={
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setQuery("");
                setActiveCategory("all");
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