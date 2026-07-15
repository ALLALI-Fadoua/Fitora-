import { Link } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import StatCard from "../../components/dashboard/StatCard.jsx";
import StatusDonutChart from "../../components/dashboard/StatusDonutChart.jsx";
import MiniEntityCard from "../../components/dashboard/MiniEntityCard.jsx";
import Card from "../../components/common/Card.jsx";
import Badge from "../../components/common/Badge.jsx";
import Icon from "../../components/common/Icon.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import { athleteNavItems } from "../../data/dashboardNav.js";
import { athletes } from "../../data/athletes.js";
import { bookings } from "../../data/bookings.js";
import { programs } from "../../data/programs.js";
import { coaches } from "../../data/coaches.js";
import { notifications } from "../../data/notifications.js";
import { useAuth } from "../../context/AuthContext.jsx";

const currentAthlete = athletes[0];
const coachName = (id) => coaches.find((c) => c.id === id)?.name || "مدرب";
const programTitle = (id) => programs.find((p) => p.id === id)?.title || "برنامج";

const statusTone = { confirmed: "brand", pending: "outline", declined: "neutral" };
const statusLabel = { confirmed: "مؤكّد", pending: "بانتظار الرد", declined: "مرفوض" };

export default function Dashboard() {
  const { user } = useAuth();

  const myBookings = bookings.filter((b) => b.athleteId === currentAthlete.id);
  const confirmedBookings = myBookings.filter((b) => b.status === "confirmed");
  const activePrograms = [...new Set(confirmedBookings.map((b) => b.programId))];
  const unreadNotifications = notifications.filter((n) => n.userId === "u1" && !n.read);

  const bookingsChartData = [
    { name: "مؤكّدة", value: myBookings.filter((b) => b.status === "confirmed").length, color: "#34d399" },
    { name: "بانتظار الرد", value: myBookings.filter((b) => b.status === "pending").length, color: "#0d9488" },
    { name: "مرفوضة", value: myBookings.filter((b) => b.status === "declined").length, color: "#3f4647" },
  ];

  return (
    <DashboardLayout
      navItems={athleteNavItems}
      title={`مرحبًا، ${user?.name || currentAthlete.name}`}
      subtitle="نظرة عامة على رحلتك التدريبية"
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon="calendar" label="حجوزات مؤكّدة" value={confirmedBookings.length} />
        <StatCard icon="flex" label="برامج نشطة" value={activePrograms.length} />
        <StatCard icon="check" label="بانتظار الرد" value={myBookings.filter((b) => b.status === "pending").length} />
        <StatCard icon="quote" label="إشعارات غير مقروءة" value={unreadNotifications.length} />
      </div>

      <div className="mb-6">
        <StatusDonutChart title="توزيع حجوزاتي حسب الحالة" data={bookingsChartData} />
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">حجوزاتي الأخيرة</h3>
          <Link to="/athlete/bookings" className="text-brand-400 text-xs font-semibold hover:text-brand-400/80">
            عرض الكل
          </Link>
        </div>

        {myBookings.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-3">
            {myBookings.map((booking) => (
              <MiniEntityCard
                key={booking.id}
                initials={coachName(booking.coachId).split(" ")[0][0]}
                title={coachName(booking.coachId)}
                subtitle={programTitle(booking.programId)}
                badge={<Badge tone={statusTone[booking.status]}>{statusLabel[booking.status]}</Badge>}
              />
            ))}
          </div>
        ) : (
          <EmptyState icon="calendar" title="لا توجد حجوزات بعد" description="ابدأ رحلتك بتصفّح المدربين وحجز أول جلسة." />
        )}
      </Card>

      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        <Link
          to="/coaches"
          className="flex items-center gap-3 p-4 bg-ink-900 border border-ink-700 rounded-2xl hover:border-brand-400/40 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-gradient-soft border border-brand-400/20 flex items-center justify-center text-brand-400 shrink-0">
            <Icon name="search" className="w-5 h-5" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">ابحث عن مدرب</p>
            <p className="text-white/40 text-xs mt-0.5">احجز جلستك القادمة</p>
          </div>
        </Link>

        <Link
          to="/athlete/favorites"
          className="flex items-center gap-3 p-4 bg-ink-900 border border-ink-700 rounded-2xl hover:border-brand-400/40 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-gradient-soft border border-brand-400/20 flex items-center justify-center text-brand-400 shrink-0">
            <Icon name="star" className="w-5 h-5" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">المفضلة</p>
            <p className="text-white/40 text-xs mt-0.5">مدربوك المفضلون</p>
          </div>
        </Link>

        <Link
          to="/athlete/profile"
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