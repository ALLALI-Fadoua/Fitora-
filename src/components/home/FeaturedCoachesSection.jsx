import { Link } from "react-router-dom";
import { getFeaturedCoaches } from "../../data/coaches.js";
import CoachCard from "../coach/CoachCard.jsx";
import Icon from "../common/Icon.jsx";

export default function FeaturedCoachesSection() {
  const featured = getFeaturedCoaches(4);

  return (
    <section className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
      <div className="flex items-end justify-between mb-7">
        <div>
          <h2 className="text-2xl font-bold text-white">مدربون مميزون</h2>
          <p className="text-white/45 text-sm mt-1">الأعلى تقييمًا هذا الأسبوع</p>
        </div>
        <Link
          to="/coaches"
          className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-brand-400 hover:text-brand-400/80 transition-colors"
        >
          عرض الكل
          <Icon name="arrowLeft" className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {featured.map((coach) => (
          <CoachCard key={coach.id} coach={coach} />
        ))}
      </div>
    </section>
  );
}
