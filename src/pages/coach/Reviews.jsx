import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import Card from "../../components/common/Card.jsx";
import Icon from "../../components/common/Icon.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import ReviewCard from "../../components/review/ReviewCard.jsx";
import { coachNavItems } from "../../data/dashboardNav.js";
import { coaches } from "../../data/coaches.js";
import { reviews } from "../../data/reviews.js";

const currentCoach = coaches[0];

export default function Reviews() {
  const coachReviews = reviews.filter((r) => r.coachId === currentCoach.id);

  const breakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: coachReviews.filter((r) => r.rating === star).length,
  }));
  const maxCount = Math.max(1, ...breakdown.map((b) => b.count));

  return (
    <DashboardLayout navItems={coachNavItems} title="التقييمات" subtitle="آراء متدربيك حول جلساتك وبرامجك">
      {coachReviews.length > 0 ? (
        <>
          <Card className="p-6 mb-8 grid sm:grid-cols-[auto_1fr] gap-8 items-center">
            <div className="text-center sm:border-l sm:border-ink-700 sm:pl-8">
              <p className="text-4xl font-extrabold text-white">{currentCoach.rating.toFixed(1)}</p>
              <div className="flex items-center justify-center gap-1 mt-2 text-brand-400">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="star" className="w-4 h-4" />
                ))}
              </div>
              <p className="text-white/40 text-xs mt-2">{currentCoach.reviewsCount} تقييم</p>
            </div>

            <div className="flex flex-col gap-2">
              {breakdown.map((b) => (
                <div key={b.star} className="flex items-center gap-3">
                  <span className="text-white/50 text-xs w-10 shrink-0">{b.star} نجوم</span>
                  <div className="flex-1 h-2 bg-ink-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-gradient rounded-full"
                      style={{ width: `${(b.count / maxCount) * 100}%` }}
                    />
                  </div>
                  <span className="text-white/40 text-xs w-6 text-left shrink-0">{b.count}</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {coachReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </>
      ) : (
        <EmptyState icon="star" title="لا توجد تقييمات بعد" description="ستظهر هنا تقييمات المتدربين بعد إتمام أول جلسة." />
      )}
    </DashboardLayout>
  );
}
