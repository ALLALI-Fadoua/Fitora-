import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import Card from "../../components/common/Card.jsx";
import Icon from "../../components/common/Icon.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import { adminNavItems } from "../../data/dashboardNav.js";
import { reviews as initialReviews } from "../../data/reviews.js";
import { coaches } from "../../data/coaches.js";

const coachName = (id) => coaches.find((c) => c.id === id)?.name || "مدرب";

export default function Reviews() {
  const [reviews, setReviews] = useState(initialReviews);

  const handleDelete = (id) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <DashboardLayout navItems={adminNavItems} title="التقييمات" subtitle="مراجعة وإدارة تقييمات المتدربين">
      {reviews.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <Card key={review.id} className="p-5 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-brand-400 text-sm">
                  <Icon name="star" className="w-4 h-4" />
                  {review.rating}
                </div>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="text-white/40 hover:text-red-400 transition-colors text-xs font-medium"
                >
                  حذف
                </button>
              </div>
              <p className="text-white/70 text-sm leading-6 flex-1">{review.text}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-ink-700 text-xs">
                <span className="text-white font-medium">{review.athleteName}</span>
                <span className="text-white/40">عن {coachName(review.coachId)}</span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon="star" title="لا توجد تقييمات" description="ستظهر هنا كل تقييمات المتدربين للمراجعة." />
      )}
    </DashboardLayout>
  );
}