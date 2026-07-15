import { Link } from "react-router-dom";
import Icon from "../common/Icon.jsx";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/coaches?category=${category.id}`}
      className="group shrink-0 w-40 flex flex-col items-center justify-center gap-3 bg-ink-900 border border-ink-700 rounded-2xl py-6 px-4 transition-all duration-300 hover:border-brand-400/40 hover:-translate-y-1"
    >
      <div className="w-12 h-12 rounded-xl bg-brand-gradient-soft border border-brand-400/20 flex items-center justify-center text-brand-400 group-hover:bg-brand-gradient group-hover:text-ink-950 transition-colors">
        <Icon name={category.icon} className="w-6 h-6" />
      </div>
      <div className="text-center">
        <p className="text-white text-sm font-semibold">{category.name}</p>
        <p className="text-white/40 text-xs mt-0.5">{category.coachesCount} مدرب</p>
      </div>
    </Link>
  );
}
