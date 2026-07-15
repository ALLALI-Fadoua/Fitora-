import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import CoachCard from "../../components/coach/CoachCard.jsx";
import Icon from "../../components/common/Icon.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import { athleteNavItems } from "../../data/dashboardNav.js";
import { coaches } from "../../data/coaches.js";

// USE_MOCK: قائمة مفضلة أولية إلى حين ربط API حقيقي
const initialFavoriteIds = ["c2", "c3", "c5"];

export default function Favorites() {
  const [favoriteIds, setFavoriteIds] = useState(initialFavoriteIds);
  const favoriteCoaches = coaches.filter((c) => favoriteIds.includes(c.id));

  const removeFavorite = (id) => {
    setFavoriteIds((prev) => prev.filter((f) => f !== id));
  };

  return (
    <DashboardLayout navItems={athleteNavItems} title="المفضلة" subtitle="المدربون الذين أضفتهم للمفضلة">
      {favoriteCoaches.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favoriteCoaches.map((coach) => (
            <div key={coach.id} className="relative">
              <button
                onClick={() => removeFavorite(coach.id)}
                aria-label="إزالة من المفضلة"
                className="absolute top-4 left-4 z-10 w-8 h-8 rounded-full bg-ink-950/80 border border-ink-600 flex items-center justify-center text-brand-400 hover:text-red-400 hover:border-red-400/40 transition-colors"
              >
                <Icon name="star" className="w-4 h-4" />
              </button>
              <CoachCard coach={coach} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="star"
          title="لا يوجد مدربون في المفضلة"
          description="أضف/ي مدربينك المفضلين من صفحة المدربين للعودة إليهم بسرعة."
        />
      )}
    </DashboardLayout>
  );
}