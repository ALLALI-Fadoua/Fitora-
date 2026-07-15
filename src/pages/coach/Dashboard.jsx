import { Link } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import StatCard from "../../components/dashboard/StatCard.jsx";
import StatusDonutChart from "../../components/dashboard/StatusDonutChart.jsx";
import MiniEntityCard from "../../components/dashboard/MiniEntityCard.jsx";
import Card from "../../components/common/Card.jsx";
import Badge from "../../components/common/Badge.jsx";
import Icon from "../../components/common/Icon.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import { coachNavItems } from "../../data/dashboardNav.js";
import { coaches } from "../../data/coaches.js";
import { sessions } from "../../data/sessions.js";
import { bookings } from "../../data/bookings.js";
import { reviews } from "../../data/reviews.js";
import { programs } from "../../data/programs.js";
import { athletes } from "../../data/athletes.js";
import { useAuth } from "../../context/AuthContext.jsx";

// ملاحظة: البيانات الوهمية الحالية غير مربوطة بمعرّف المستخدم المسجَّل دخوله
// (لا يوجد باك-إند بعد)، لذا نعرض بيانات المدرب الأول (c1) كنموذج توضيحي.
const currentCoach = coaches[0];
const athleteName = (athleteId) => athletes.find((a) => a.id === athleteId)?.name || "متدرب";
const statusLabel = { upcoming: "قادمة", completed: "منتهية", cancelled: "ملغاة" };
const statusTone = { upcoming: "brand", completed: "neutral", cancelled: "outline" };

export default function Dashboard() {
  const { user } = useAuth();

  const coachSessions = sessions.filter((s) => s.coachId === currentCoach.id);
  const coachBookings = bookings.filter((b) => b.coachId === currentCoach.id);
  const coachReviews = reviews.filter((r) => r.coachId === currentCoach.id);
  const coachPrograms = programs.filter((p) => p.coachId === currentCoach.id);
  const pendingBookings = coachBookings.filter((b) => b.status === "pending");

  const sessionsChartData = [
    { name: "قادمة", value: coachSessions.filter((s) => s.status === "upcoming").length, color: "#34d399" },
    { name: "منتهية", value: coachSessions.filter((s) => s.status === "completed").length, color: "#0d9488" },
    { name: "ملغاة", value: coachSessions.filter((s) => s.status === "cancelled").length, color: "#3f4647" },
  ];

  const ratingChartData = [
    { name: "5 نجوم", value: coachReviews.filter((r) => r.rating === 5).length, color: "#34d399" },
    { name: "4 نجوم", value: coachReviews.filter((r) => r.rating === 4).length, color: "#0d9488" },
    { name: "3 نجوم وأقل", value: coachReviews.filter((r) => r.rating <= 3).length, color: "#3f4647" },
  ];

  return (
    <DashboardLayout
      navItems={coachNavItems}
      title={`مرحبًا، ${user?.name || currentCoach.name}`}
      subtitle="نظرة عامة على نشاطك التدريبي هذا الأسبوع"
    >
      {/* بطاقات الإحصائيات */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon="calendar" label="جلسات قادمة" value={coachSessions.filter((s) => s.status === "upcoming").length} />
        <StatCard icon="check" label="حجوزات بانتظار التأكيد" value={pendingBookings.length} />
        <StatCard icon="flex" label="برامج نشطة" value={coachPrograms.length} />
        <StatCard icon="star" label="متوسط التقييم" value={currentCoach.rating.toFixed(1)} trend={`${currentCoach.reviewsCount} تقييم`} />
      </div>

      {/* رسوم بيانية للتوزيع */}
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <StatusDonutChart title="توزيع الجلسات حسب الحالة" data={sessionsChartData} />
        <StatusDonutChart title="توزيع التقييمات" data={ratingChartData} total={coachReviews.length} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* الجلسات القادمة — بطاقات بدل قائمة */}
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">الجلسات القادمة</h3>
            <Link to="/coach/sessions" className="text-brand-400 text-xs font-semibold hover:text-brand-400/80">
              عرض الكل
            </Link>
          </div>

          {coachSessions.length > 0 ? (
            <div className="grid sm:grid-cols-2 gap-3">
              {coachSessions.map((session) => (
                <MiniEntityCard
                  key={session.id}
                  initials={athleteName(session.athleteId).split(" ")[0][0]}
                  title={athleteName(session.athleteId)}
                  subtitle={`${session.date} — ${session.time}`}
                  badge={<Badge tone={statusTone[session.status]}>{statusLabel[session.status]}</Badge>}
                />
              ))}
            </div>
          ) : (
            <EmptyState icon="calendar" title="لا توجد جلسات قادمة" description="ستظهر هنا جلساتك بمجرد أن يحجز المتدربون معك." />
          )}
        </Card>

        {/* آخر التقييمات */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">آخر التقييمات</h3>
            <Link to="/coach/reviews" className="text-brand-400 text-xs font-semibold hover:text-brand-400/80">
              الكل
            </Link>
          </div>

          {coachReviews.length > 0 ? (
            <div className="flex flex-col gap-4">
              {coachReviews.map((review) => (
                <div key={review.id} className="pb-4 border-b border-ink-700 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-white text-sm font-semibold">{review.athleteName}</span>
                    <Badge tone="neutral" icon={<Icon name="star" className="w-3.5 h-3.5 text-brand-400" />}>
                      {review.rating}
                    </Badge>
                  </div>
                  <p className="text-white/50 text-xs leading-6">{review.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon="star" title="لا توجد تقييمات بعد" description="ستظهر تقييمات متدربيك هنا بعد إتمام أول جلسة." />
          )}
        </Card>
      </div>

      {/* روابط سريعة */}
      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        <Link
          to="/coach/programs"
          className="flex items-center gap-3 p-4 bg-ink-900 border border-ink-700 rounded-2xl hover:border-brand-400/40 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-gradient-soft border border-brand-400/20 flex items-center justify-center text-brand-400 shrink-0">
            <Icon name="flex" className="w-5 h-5" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">إنشاء برنامج جديد</p>
            <p className="text-white/40 text-xs mt-0.5">أضف برنامجًا تدريبيًا جديدًا</p>
          </div>
        </Link>

        <Link
          to="/coach/bookings"
          className="flex items-center gap-3 p-4 bg-ink-900 border border-ink-700 rounded-2xl hover:border-brand-400/40 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-gradient-soft border border-brand-400/20 flex items-center justify-center text-brand-400 shrink-0">
            <Icon name="check" className="w-5 h-5" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">مراجعة الحجوزات</p>
            <p className="text-white/40 text-xs mt-0.5">{pendingBookings.length} بانتظار التأكيد</p>
          </div>
        </Link>

        <Link
          to="/coach/profile"
          className="flex items-center gap-3 p-4 bg-ink-900 border border-ink-700 rounded-2xl hover:border-brand-400/40 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-gradient-soft border border-brand-400/20 flex items-center justify-center text-brand-400 shrink-0">
            <Icon name="users" className="w-5 h-5" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">تحديث الملف الشخصي</p>
            <p className="text-white/40 text-xs mt-0.5">أبقِ معلوماتك محدّثة</p>
          </div>
        </Link>
      </div>
    </DashboardLayout>
  );
}